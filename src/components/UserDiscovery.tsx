import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  isFollowing: boolean;
}

const UserDiscovery = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  const fetchCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const fetchUsers = async () => {
    if (!currentUserId) return;

    // Fetch all profiles except current user
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, bio")
      .neq("id", currentUserId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Fetch current user's follows
    const { data: follows } = await supabase
      .from("follows")
      .select("artist_id")
      .eq("follower_id", currentUserId);

    const followingIds = new Set(follows?.map(f => f.artist_id) || []);

    const usersWithFollowStatus = profiles?.map(profile => ({
      ...profile,
      isFollowing: followingIds.has(profile.id),
    })) || [];

    setUsers(usersWithFollowStatus);
    setLoading(false);
  };

  const handleFollow = async (userId: string) => {
    if (!currentUserId) return;

    const { error } = await supabase
      .from("follows")
      .insert({
        follower_id: currentUserId,
        artist_id: userId,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to follow user",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, isFollowing: true } : user
    ));

    toast({
      title: "Success",
      description: "You are now following this user",
    });
  };

  const handleUnfollow = async (userId: string) => {
    if (!currentUserId) return;

    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", currentUserId)
      .eq("artist_id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to unfollow user",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, isFollowing: false } : user
    ));

    toast({
      title: "Success",
      description: "You have unfollowed this user",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No users to discover yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback>
                  {user.display_name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">
                  {user.display_name || "Anonymous User"}
                </h3>
                {user.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                )}
              </div>

              <Button
                onClick={() => user.isFollowing ? handleUnfollow(user.id) : handleFollow(user.id)}
                variant={user.isFollowing ? "outline" : "default"}
                className="w-full"
              >
                {user.isFollowing ? (
                  <>
                    <UserMinus className="w-4 h-4 mr-2" />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserDiscovery;
