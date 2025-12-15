import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

interface ApplyToFeatureDialogProps {
  artworkId: string;
  artworkTitle: string;
}

const ApplyToFeatureDialog = ({ artworkId, artworkTitle }: ApplyToFeatureDialogProps) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to apply for featuring",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("feature_applications")
        .insert({
          artwork_id: artworkId,
          artist_id: user.id,
          reason: reason,
        });

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "Your application has been sent for review. You'll be notified once it's approved.",
      });

      setOpen(false);
      setReason("");
    } catch (error: any) {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-aurora-purple to-aurora-gold hover:opacity-90">
          <Sparkles className="w-4 h-4" />
          Apply to be Featured
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Apply to be Featured</DialogTitle>
          <DialogDescription>
            Submit your artwork "{artworkTitle}" to be featured on the homepage
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Why should this artwork be featured?</Label>
            <Textarea
              id="reason"
              placeholder="Tell us what makes this artwork special..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">What happens next?</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your application will be reviewed by our team</li>
              <li>• If approved, you can boost visibility for R20 (7 days)</li>
              <li>• Featured artworks appear on the homepage carousel</li>
              <li>• Track views and clicks in your dashboard</li>
            </ul>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-aurora-purple to-aurora-gold"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyToFeatureDialog;