import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Following {
  id: string;
  artist_id: string;
  profiles: {
    id: string;
    display_name: string;
    avatar_url: string;
  };
}

const FollowingList = () => {
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const fetchFollowing = async () => {
    if (!currentUserId) return;

    const { data, error } = await supabase
      .from("follows")
      .select("*, profiles!follows_artist_id_fkey(*)")
      .eq("follower_id", currentUserId);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setFollowing(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchFollowing();
    }
  }, [currentUserId]);

  const handleUnfollow = async (id: string) => {
    const { error } = await supabase.from("follows").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Unfollowed", description: "Artist unfollowed successfully" });
      fetchFollowing();
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading following...</div>;

  if (following.length === 0) {
    return <div className="text-center text-muted-foreground py-8">Not following any artists yet.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {following.map((follow) => (
        <Card key={follow.id}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
              {follow.profiles.display_name?.[0] || "A"}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{follow.profiles.display_name || "Artist"}</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleUnfollow(follow.id)}>
              <UserMinus className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FollowingList;
