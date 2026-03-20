import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Clock, Sparkles } from "lucide-react";
import BoostPaymentDialog from "./BoostPaymentDialog";

interface Application {
  id: string;
  artist_id: string;
  artwork_id: string;
  reason: string;
  status: string;
  created_at: string;
  artworks: {
    id: string;
    title: string;
    image_url: string;
    category: string;
  };
  profiles: {
    display_name: string;
  };
}

const AdminFeaturesPanel = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    fetchApplications();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    setIsAdmin(!!data);
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("feature_applications")
        .select(`
          *,
          artworks (id, title, image_url, category)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch artist profiles separately
      const enrichedData = await Promise.all(
        (data || []).map(async (app) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("id", app.artist_id)
            .single();
          
          return {
            ...app,
            profiles: profileData,
          };
        })
      );

      setApplications(enrichedData || []);
    } catch (error: any) {
      toast({
        title: "Error loading applications",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, status: "approved" | "rejected") => {
    try {
      const application = applications.find(app => app.id === applicationId);
      if (!application) return;

      const { error } = await supabase
        .from("feature_applications")
        .update({ status })
        .eq("id", applicationId);

      if (error) throw error;

      // Create notification
      await supabase.from("notifications").insert({
        user_id: application.artist_id,
        title: status === "approved" 
          ? "🎉 Application Approved!" 
          : "Application Update",
        message: status === "approved"
          ? `Your artwork "${application.artworks.title}" has been approved for featuring! You can now boost your visibility.`
          : `Your application for "${application.artworks.title}" was not approved at this time.`,
        type: status === "approved" ? "application_approved" : "application_rejected",
        artwork_id: application.artwork_id,
        related_id: applicationId,
      });

      // Get artist email
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", application.artist_id)
        .single();

      if (profileData) {
        const { data: { user } } = await supabase.auth.admin.getUserById(application.artist_id);
        
        if (user?.email) {
          // Send email notification
          await supabase.functions.invoke("send-notification-email", {
            body: {
              to: user.email,
              artistName: application.profiles?.display_name || "Artist",
              artworkTitle: application.artworks.title,
              type: status === "approved" ? "approved" : "rejected",
            },
          });
        }
      }

      toast({
        title: `Application ${status}`,
        description: `The application has been ${status}`,
      });

      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error updating application",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Access Required</CardTitle>
          <CardDescription>You don't have permission to view this panel</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  const pendingApps = applications.filter(app => app.status === "pending");
  const approvedApps = applications.filter(app => app.status === "approved");
  const rejectedApps = applications.filter(app => app.status === "rejected");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-aurora-gold" />
        <h2 className="text-2xl font-heading">Feature Applications</h2>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingApps.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <Check className="w-4 h-4" />
            Approved ({approvedApps.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <X className="w-4 h-4" />
            Rejected ({rejectedApps.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingApps.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No pending applications
              </CardContent>
            </Card>
          ) : (
            pendingApps.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onApprove={() => handleStatusUpdate(app.id, "approved")}
                onReject={() => handleStatusUpdate(app.id, "rejected")}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedApps.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No approved applications
              </CardContent>
            </Card>
          ) : (
            approvedApps.map((app) => (
              <ApplicationCard key={app.id} application={app} showActions={false} />
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedApps.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No rejected applications
              </CardContent>
            </Card>
          ) : (
            rejectedApps.map((app) => (
              <ApplicationCard key={app.id} application={app} showActions={false} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationCard = ({
  application,
  onApprove,
  onReject,
  showActions = true,
}: {
  application: Application;
  onApprove?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <img
            src={application.artworks.image_url}
            alt={application.artworks.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{application.artworks.title}</h3>
                <p className="text-sm text-muted-foreground">
                  by {application.profiles?.display_name || "Unknown Artist"}
                </p>
              </div>
              <Badge variant={
                application.status === "approved" ? "default" :
                application.status === "rejected" ? "destructive" :
                "secondary"
              }>
                {application.status}
              </Badge>
            </div>
            <p className="text-sm">{application.reason}</p>
            <p className="text-xs text-muted-foreground">
              Applied {new Date(application.created_at).toLocaleDateString()}
            </p>
            {showActions && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={onApprove}
                  size="sm"
                  className="gap-2 bg-gradient-to-r from-aurora-purple to-aurora-gold"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
                <Button onClick={onReject} size="sm" variant="outline" className="gap-2">
                  <X className="w-4 h-4" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFeaturesPanel;