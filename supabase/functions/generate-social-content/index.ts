import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, blogPost, customPrompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "blog_to_social") {
      systemPrompt = `Você é um especialista em marketing digital e mídias sociais. Sua tarefa é criar posts engajadores para Instagram e Facebook baseados em artigos de blog.

Regras:
- Posts para Instagram devem ter no máximo 2200 caracteres
- Use emojis estrategicamente para aumentar engajamento
- Inclua call-to-action (CTA) no final
- Adapte o tom para ser mais casual e envolvente nas redes sociais
- Sugira 5-8 hashtags relevantes
- Crie versões separadas para Instagram e Facebook

Retorne no formato JSON:
{
  "instagram": {
    "content": "texto do post",
    "hashtags": ["tag1", "tag2"]
  },
  "facebook": {
    "content": "texto do post"
  }
}`;
      
      userPrompt = `Crie posts para redes sociais baseado neste artigo:

Título: ${blogPost.title}
Resumo: ${blogPost.excerpt || ""}
Conteúdo: ${blogPost.content?.substring(0, 1500) || ""}`;
    } else if (type === "campaign_ideas") {
      systemPrompt = `Você é um estrategista de marketing digital especializado em campanhas para pequenas e médias empresas de tecnologia.

Sua tarefa é sugerir ideias de campanhas e posts para redes sociais.

Retorne no formato JSON:
{
  "ideas": [
    {
      "title": "título da ideia",
      "description": "descrição breve",
      "content": "texto pronto para postar",
      "platforms": ["instagram", "facebook"],
      "type": "educational | promotional | engagement | announcement"
    }
  ]
}`;
      
      userPrompt = customPrompt || "Sugira 3 ideias de posts para uma agência de desenvolvimento web que quer aumentar seu engajamento nas redes sociais.";
    } else if (type === "improve_content") {
      systemPrompt = `Você é um copywriter especializado em mídias sociais. Sua tarefa é melhorar e otimizar textos para maior engajamento.

Retorne o texto melhorado mantendo a mensagem principal mas tornando mais atrativo e engajador.`;
      
      userPrompt = `Melhore este texto para redes sociais:\n\n${customPrompt}`;
    }

    console.log("Generating social content:", type);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erro ao gerar conteúdo");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    console.log("Generated content:", content);

    // Try to parse as JSON if it looks like JSON
    let parsedContent = content;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Keep as string if not valid JSON
    }

    return new Response(JSON.stringify({ content: parsedContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Generate social content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
