import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface FeaturedBadgeProps {
  endDate: string;
}

const FeaturedBadge = ({ endDate }: FeaturedBadgeProps) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const end = new Date(endDate);
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, [endDate]);

  if (daysLeft <= 0) return null;

  return (
    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-aurora-purple to-aurora-gold text-white border-0 gap-1.5 px-3 py-1.5 shadow-lg animate-shimmer">
      <Sparkles className="w-3 h-3" />
      <span className="font-semibold">FEATURED</span>
      <span className="opacity-90">• {daysLeft}d left</span>
    </Badge>
  );
};

export default FeaturedBadge;