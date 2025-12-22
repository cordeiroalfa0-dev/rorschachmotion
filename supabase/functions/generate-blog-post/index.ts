import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating blog post about:", topic);

    // Generate blog post content
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `Você é um especialista em criar artigos para blogs de tecnologia e desenvolvimento web.

Quando receber um tema, crie um artigo completo e profissional seguindo este formato JSON:

{
  "title": "Título atrativo e otimizado para SEO",
  "slug": "url-amigavel-do-artigo",
  "excerpt": "Resumo de 1-2 frases que apareça na listagem (máximo 160 caracteres)",
  "category": "Uma categoria relevante (ex: Desenvolvimento Web, Inteligência Artificial, Design, etc)",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Conteúdo completo do artigo em HTML com parágrafos, headers h2/h3, listas, etc",
  "imagePrompt": "Descrição detalhada em inglês para gerar uma imagem de capa profissional para o artigo"
}

Regras:
- O conteúdo deve ter pelo menos 800 palavras
- Use HTML semântico: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Inclua uma introdução, desenvolvimento com subtópicos e conclusão
- Escreva em português brasileiro
- Seja informativo, atual e engajante
- O imagePrompt deve ser em inglês, descrevendo uma imagem moderna, abstrata e tecnológica relacionada ao tema
- Retorne APENAS o JSON, sem texto adicional`
          },
          { 
            role: "user", 
            content: `Crie um artigo completo sobre: ${topic}` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos esgotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao gerar artigo." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("Generated content:", content?.substring(0, 200));

    // Parse the JSON from the response
    let blogPost;
    try {
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      blogPost = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return new Response(JSON.stringify({ error: "Erro ao processar resposta da IA." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate cover image
    let coverImageUrl = null;
    
    try {
      console.log("Generating cover image with prompt:", blogPost.imagePrompt);
      
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: `Create a professional, modern blog cover image: ${blogPost.imagePrompt}. Style: Clean, minimalist, tech-inspired, suitable for a professional blog. Aspect ratio: 16:9 landscape.`
            }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const generatedImage = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (generatedImage && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
          console.log("Image generated, uploading to storage...");
          
          // Upload to Supabase Storage
          const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
          
          // Convert base64 to blob
          const base64Data = generatedImage.replace(/^data:image\/\w+;base64,/, '');
          const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          
          const fileName = `cover-${Date.now()}.png`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(fileName, binaryData, {
              contentType: 'image/png',
              upsert: false
            });
          
          if (uploadError) {
            console.error("Error uploading image:", uploadError);
          } else {
            const { data: publicUrl } = supabase.storage
              .from('blog-images')
              .getPublicUrl(fileName);
            
            coverImageUrl = publicUrl.publicUrl;
            console.log("Image uploaded successfully:", coverImageUrl);
          }
        } else if (generatedImage) {
          // If we can't upload, use the base64 directly (not ideal but works)
          coverImageUrl = generatedImage;
          console.log("Using base64 image directly");
        }
      } else {
        console.error("Image generation failed:", await imageResponse.text());
      }
    } catch (imageError) {
      console.error("Error generating image:", imageError);
      // Continue without image if generation fails
    }

    // Remove imagePrompt from response and add cover_image
    delete blogPost.imagePrompt;
    blogPost.cover_image = coverImageUrl;

    return new Response(JSON.stringify(blogPost), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Generate blog post error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
