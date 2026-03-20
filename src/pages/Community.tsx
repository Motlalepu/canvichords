import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import UserDiscovery from "@/components/UserDiscovery";
import FollowingList from "@/components/FollowingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Community</h1>
            <p className="text-muted-foreground text-lg">
              Discover and connect with other creators
            </p>
          </div>

          <Tabs defaultValue="discover" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="discover">Discover Users</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="mt-6">
              <UserDiscovery />
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <FollowingList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Community;
