import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArtworkUploadDialog from "@/components/ArtworkUploadDialog";
import ArtistArtworks from "@/components/ArtistArtworks";
import CollectorFavorites from "@/components/CollectorFavorites";
import FollowingList from "@/components/FollowingList";
import AdminFeaturesPanel from "@/components/AdminFeaturesPanel";
import BoostPaymentDialog from "@/components/BoostPaymentDialog";
import { Palette, Heart, Users, Eye, Sparkles, TrendingUp } from "lucide-react";

const ArtistDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ artworks: 0, followers: 0, views: 0, favorites: 0, following: 0, featuredViews: 0, featuredClicks: 0 });
  const [isAdmin, setIsAdmin] = useState(false);
  const [approvedApplications, setApprovedApplications] = useState<any[]>([]);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);

      // Check admin status
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();
      
      setIsAdmin(!!roleData);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      // Fetch stats
      const isArtist = profileData?.user_type === "artist";

      if (isArtist) {
        const { count: artworksCount } = await supabase
          .from("artworks")
          .select("*", { count: "exact", head: true })
          .eq("artist_id", user.id);

        const { count: followersCount } = await supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("artist_id", user.id);

        // Get featured artwork stats
        const { data: featuredData } = await supabase
          .from("featured_artworks")
          .select("views, clicks")
          .eq("artist_id", user.id);

        const totalViews = featuredData?.reduce((sum, item) => sum + item.views, 0) || 0;
        const totalClicks = featuredData?.reduce((sum, item) => sum + item.clicks, 0) || 0;

        // Get approved applications that haven't been paid yet
        const { data: applicationsData } = await supabase
          .from("feature_applications")
          .select("*, artworks(id, title)")
          .eq("artist_id", user.id)
          .eq("status", "approved");

        if (applicationsData) {
          const unpaidApps = [];
          for (const app of applicationsData) {
            const { data: featured } = await supabase
              .from("featured_artworks")
              .select("id")
              .eq("application_id", app.id)
              .single();
            
            if (!featured) {
              unpaidApps.push(app);
            }
          }
          setApprovedApplications(unpaidApps);
        }

        setStats({ artworks: artworksCount || 0, followers: followersCount || 0, views: 0, favorites: 0, following: 0, featuredViews: totalViews, featuredClicks: totalClicks });
      } else {
        const { count: favoritesCount } = await supabase
          .from("favorites")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        const { count: followingCount } = await supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", user.id);

        setStats({ artworks: 0, followers: 0, views: 0, favorites: favoritesCount || 0, following: followingCount || 0, featuredViews: 0, featuredClicks: 0 });
      }
    };

    const refreshStats = async () => {
      if (!user) return;
      
      const isArtist = profile?.user_type === "artist";
      
      if (isArtist) {
        const { count: artworksCount } = await supabase
          .from("artworks")
          .select("*", { count: "exact", head: true })
          .eq("artist_id", user.id);

        setStats(prev => ({ ...prev, artworks: artworksCount || 0 }));
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user || !profile) return null;

  const isArtist = profile.user_type === "artist";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {isArtist ? "Your Studio" : "Your Collection"}
              </h1>
              <p className="text-muted-foreground">
                {isArtist ? "Manage your artwork and connect with collectors" : "Manage your favorites and discover new artists"}
              </p>
            </div>
            {isArtist && <ArtworkUploadDialog onSuccess={() => window.location.reload()} />}
          </div>

          {/* Approval Notification */}
          {approvedApplications.length > 0 && (
            <Card className="mb-6 bg-gradient-to-r from-aurora-purple/10 to-aurora-gold/10 border-aurora-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-aurora-gold" />
                  🎉 Application Approved!
                </CardTitle>
                <CardDescription>
                  You can now boost your artwork visibility on the homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {approvedApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between bg-background/50 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold">{app.artworks?.title}</p>
                      <p className="text-sm text-muted-foreground">Ready to be featured</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setPaymentDialogOpen(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-aurora-purple to-aurora-gold text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Boost for R20
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {isArtist ? (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Artworks</CardTitle>
                    <Palette className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.artworks}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Followers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.followers}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Featured Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.featuredViews}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Featured Clicks</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.featuredClicks}</div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.favorites}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Following</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.following}</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue={isArtist ? "artworks" : "favorites"} className="w-full">
            <TabsList className="mb-4">
              {isArtist ? (
                <>
                  <TabsTrigger value="artworks">My Artworks</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  {isAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
                </>
              ) : (
                <>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </>
              )}
            </TabsList>

            {isArtist ? (
              <>
                <TabsContent value="artworks">
                  <ArtistArtworks userId={user.id} onArtworkChange={async () => {
                    if (!user) return;
                    const { count: artworksCount } = await supabase
                      .from("artworks")
                      .select("*", { count: "exact", head: true })
                      .eq("artist_id", user.id);
                    setStats(prev => ({ ...prev, artworks: artworksCount || 0 }));
                  }} />
                </TabsContent>
                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics Dashboard</CardTitle>
                      <CardDescription>Coming soon - Track your artwork performance</CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
                {isAdmin && (
                  <TabsContent value="admin">
                    <AdminFeaturesPanel />
                  </TabsContent>
                )}
              </>
            ) : (
              <>
                <TabsContent value="favorites">
                  <CollectorFavorites userId={user.id} />
                </TabsContent>
                <TabsContent value="following">
                  <FollowingList />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>

      {selectedApplication && (
        <BoostPaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          artworkId={selectedApplication.artworks?.id}
          artworkTitle={selectedApplication.artworks?.title}
          applicationId={selectedApplication.id}
        />
      )}
    </div>
  );
};

export default ArtistDashboard;