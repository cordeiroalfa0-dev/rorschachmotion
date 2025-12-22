import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting backup generation...");

    // Fetch all data from tables
    const [blogPostsResult, profilesResult, siteSettingsResult, socialCampaignsResult] = await Promise.all([
      supabase.from("blog_posts").select("*"),
      supabase.from("profiles").select("*"),
      supabase.from("site_settings").select("*"),
      supabase.from("social_campaigns").select("*"),
    ]);

    const backup = {
      generated_at: new Date().toISOString(),
      blog_posts: blogPostsResult.data || [],
      profiles: profilesResult.data || [],
      site_settings: siteSettingsResult.data || [],
      social_campaigns: socialCampaignsResult.data || [],
    };

    console.log("Backup data collected:", {
      blog_posts: backup.blog_posts.length,
      profiles: backup.profiles.length,
      site_settings: backup.site_settings.length,
      social_campaigns: backup.social_campaigns.length,
    });

    // Get admin email from site_settings
    const emailSetting = siteSettingsResult.data?.find((s: any) => s.key === "email");
    const adminEmail = emailSetting?.value || null;

    if (!adminEmail) {
      console.error("No admin email configured in site settings");
      return new Response(
        JSON.stringify({ error: "Email não configurado nas configurações do site" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending backup to:", adminEmail);

    const backupJson = JSON.stringify(backup, null, 2);
    const backupDate = new Date().toLocaleDateString("pt-BR");

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Backup Site <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `Backup do Site - ${backupDate}`,
        html: `
          <h1>Backup do Site</h1>
          <p>Segue em anexo o backup completo do site gerado em ${backupDate}.</p>
          <h2>Resumo:</h2>
          <ul>
            <li><strong>Posts do Blog:</strong> ${backup.blog_posts.length}</li>
            <li><strong>Perfis:</strong> ${backup.profiles.length}</li>
            <li><strong>Configurações:</strong> ${backup.site_settings.length}</li>
            <li><strong>Campanhas Sociais:</strong> ${backup.social_campaigns.length}</li>
          </ul>
          <p>Este backup foi gerado automaticamente pelo sistema.</p>
        `,
        attachments: [
          {
            filename: `backup-site-${new Date().toISOString().split('T')[0]}.json`,
            content: btoa(backupJson),
          },
        ],
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Error sending email:", emailResult);
      return new Response(
        JSON.stringify({ error: emailResult.message || "Erro ao enviar email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ success: true, message: "Backup enviado com sucesso!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-backup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});