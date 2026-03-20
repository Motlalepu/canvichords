import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Checking for expiring featured artworks...");

    // Get featured artworks expiring in 2 days
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const { data: expiringFeatures, error: expiringError } = await supabaseClient
      .from("featured_artworks")
      .select(`
        *,
        artworks (id, title),
        profiles:artist_id (id, display_name)
      `)
      .eq("is_active", true)
      .gte("end_date", twoDaysFromNow.toISOString())
      .lt("end_date", threeDaysFromNow.toISOString());

    if (expiringError) {
      console.error("Error fetching expiring features:", expiringError);
      throw expiringError;
    }

    console.log(`Found ${expiringFeatures?.length || 0} expiring features`);

    // Get expired features
    const now = new Date();
    const { data: expiredFeatures, error: expiredError } = await supabaseClient
      .from("featured_artworks")
      .select(`
        *,
        artworks (id, title),
        profiles:artist_id (id, display_name)
      `)
      .eq("is_active", true)
      .lt("end_date", now.toISOString());

    if (expiredError) {
      console.error("Error fetching expired features:", expiredError);
      throw expiredError;
    }

    console.log(`Found ${expiredFeatures?.length || 0} expired features`);

    // Process expiring features
    for (const feature of expiringFeatures || []) {
      const endDate = new Date(feature.end_date);
      const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      // Check if notification already sent
      const { data: existingNotif } = await supabaseClient
        .from("notifications")
        .select("id")
        .eq("user_id", feature.artist_id)
        .eq("type", "feature_expiring")
        .eq("related_id", feature.id)
        .single();

      if (!existingNotif) {
        // Create notification
        await supabaseClient.from("notifications").insert({
          user_id: feature.artist_id,
          title: "⏰ Feature Expiring Soon",
          message: `Your featured artwork "${feature.artworks?.title}" will expire in ${daysLeft} days.`,
          type: "feature_expiring",
          artwork_id: feature.artwork_id,
          related_id: feature.id,
        });

        console.log(`Created expiring notification for feature ${feature.id}`);

        // Get user email and send email
        const { data: { user } } = await supabaseClient.auth.admin.getUserById(feature.artist_id);
        
        if (user?.email) {
          await supabaseClient.functions.invoke("send-notification-email", {
            body: {
              to: user.email,
              artistName: feature.profiles?.display_name || "Artist",
              artworkTitle: feature.artworks?.title || "Your artwork",
              type: "expiring",
              daysLeft,
            },
          });
          console.log(`Sent expiring email to ${user.email}`);
        }
      }
    }

    // Process expired features
    for (const feature of expiredFeatures || []) {
      // Mark as inactive
      await supabaseClient
        .from("featured_artworks")
        .update({ is_active: false })
        .eq("id", feature.id);

      // Check if notification already sent
      const { data: existingNotif } = await supabaseClient
        .from("notifications")
        .select("id")
        .eq("user_id", feature.artist_id)
        .eq("type", "feature_expired")
        .eq("related_id", feature.id)
        .single();

      if (!existingNotif) {
        // Create notification
        await supabaseClient.from("notifications").insert({
          user_id: feature.artist_id,
          title: "Featured Period Ended",
          message: `Your featured artwork "${feature.artworks?.title}" has completed its 7-day featured period.`,
          type: "feature_expired",
          artwork_id: feature.artwork_id,
          related_id: feature.id,
        });

        console.log(`Created expired notification for feature ${feature.id}`);

        // Get user email and send email
        const { data: { user } } = await supabaseClient.auth.admin.getUserById(feature.artist_id);
        
        if (user?.email) {
          await supabaseClient.functions.invoke("send-notification-email", {
            body: {
              to: user.email,
              artistName: feature.profiles?.display_name || "Artist",
              artworkTitle: feature.artworks?.title || "Your artwork",
              type: "expired",
            },
          });
          console.log(`Sent expired email to ${user.email}`);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        expiring: expiringFeatures?.length || 0,
        expired: expiredFeatures?.length || 0,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in check-expiring-features function:", error);
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
