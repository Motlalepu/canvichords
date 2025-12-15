import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  artistName: string;
  artworkTitle: string;
  type: "approved" | "expiring" | "expired" | "rejected";
  daysLeft?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, artistName, artworkTitle, type, daysLeft }: EmailRequest = await req.json();

    let subject = "";
    let html = "";

    switch (type) {
      case "approved":
        subject = "🎉 Your Artwork Has Been Approved for Featuring!";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8B5CF6;">Congratulations, ${artistName}!</h1>
            <p>Your artwork "<strong>${artworkTitle}</strong>" has been approved to be featured on Aura !LLA Art Space!</p>
            <p>You can now boost your visibility on the homepage for <strong>R20 (7 days)</strong>.</p>
            <p>Visit your dashboard to complete the payment and activate your featured spot.</p>
            <a href="${Deno.env.get("VITE_SUPABASE_URL")}/artist-dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                      color: white; padding: 12px 24px; text-decoration: none; 
                      border-radius: 8px; margin-top: 16px;">
              Go to Dashboard
            </a>
            <p style="margin-top: 32px; color: #666;">Best regards,<br>The Aura !LLA Art Space Team</p>
          </div>
        `;
        break;

      case "expiring":
        subject = "⏰ Your Featured Artwork is Expiring Soon";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #EC4899;">Feature Expiring Soon</h1>
            <p>Hi ${artistName},</p>
            <p>Your featured artwork "<strong>${artworkTitle}</strong>" will expire in <strong>${daysLeft} days</strong>.</p>
            <p>If you'd like to extend your featured spot, visit your dashboard to apply again.</p>
            <a href="${Deno.env.get("VITE_SUPABASE_URL")}/artist-dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                      color: white; padding: 12px 24px; text-decoration: none; 
                      border-radius: 8px; margin-top: 16px;">
              View Dashboard
            </a>
            <p style="margin-top: 32px; color: #666;">Best regards,<br>The Aura !LLA Art Space Team</p>
          </div>
        `;
        break;

      case "expired":
        subject = "Your Featured Period Has Ended";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8B5CF6;">Featured Period Ended</h1>
            <p>Hi ${artistName},</p>
            <p>Your featured artwork "<strong>${artworkTitle}</strong>" has completed its 7-day featured period.</p>
            <p>Thank you for being a part of Aura !LLA Art Space. Feel free to apply for featuring again anytime!</p>
            <a href="${Deno.env.get("VITE_SUPABASE_URL")}/artist-dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                      color: white; padding: 12px 24px; text-decoration: none; 
                      border-radius: 8px; margin-top: 16px;">
              Apply Again
            </a>
            <p style="margin-top: 32px; color: #666;">Best regards,<br>The Aura !LLA Art Space Team</p>
          </div>
        `;
        break;

      case "rejected":
        subject = "Update on Your Feature Application";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8B5CF6;">Feature Application Update</h1>
            <p>Hi ${artistName},</p>
            <p>Thank you for your interest in featuring "<strong>${artworkTitle}</strong>" on Aura !LLA Art Space.</p>
            <p>Unfortunately, we're unable to approve your application at this time. Please feel free to apply again with different artwork.</p>
            <p style="margin-top: 32px; color: #666;">Best regards,<br>The Aura !LLA Art Space Team</p>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "Aura !LLA Art Space <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
