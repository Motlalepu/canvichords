import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Zap, Calendar, Eye, TrendingUp } from "lucide-react";

interface BoostPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artworkId: string;
  artworkTitle: string;
  applicationId: string;
}

const BoostPaymentDialog = ({
  open,
  onOpenChange,
  artworkId,
  artworkTitle,
  applicationId,
}: BoostPaymentDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    // Payments / Boosts are temporarily disabled.
    toast({
      title: "Boosts temporarily disabled",
      description:
        "Boosting is currently disabled — contact the artist directly for help or try again later.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-2">
            <Zap className="w-6 h-6 text-aurora-gold" />
            Boost Your Artwork
          </DialogTitle>
          <DialogDescription>
            Feature "{artworkTitle}" on the homepage carousel
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-gradient-to-r from-aurora-purple/10 to-aurora-gold/10 p-6 rounded-lg border border-aurora-purple/20">
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-foreground">R20</p>
              <p className="text-sm text-muted-foreground">
                7-day featured placement
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-aurora-gold" />
              What you get:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-aurora-purple/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Eye className="w-4 h-4 text-aurora-purple" />
                </div>
                <div>
                  <p className="font-medium text-sm">Premium Visibility</p>
                  <p className="text-xs text-muted-foreground">
                    Appear in the Featured Carousel on homepage
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-aurora-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-aurora-gold" />
                </div>
                <div>
                  <p className="font-medium text-sm">Featured Badge</p>
                  <p className="text-xs text-muted-foreground">
                    Stand out with a special featured indicator
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-aurora-purple/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-aurora-purple" />
                </div>
                <div>
                  <p className="font-medium text-sm">7-Day Duration</p>
                  <p className="text-xs text-muted-foreground">
                    Track views and clicks in your dashboard
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full h-12 text-lg bg-gradient-to-r from-aurora-purple to-aurora-gold hover:opacity-90"
          >
            {loading ? "Processing..." : "Boosting Disabled"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoostPaymentDialog;
