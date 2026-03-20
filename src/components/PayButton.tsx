import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PayButtonProps {
  amount: number;
  email: string;
  onSuccess: (paymentReference: string) => void;
  onClose: () => void;
}

const PayButton = ({ amount, email }: PayButtonProps) => {
  const { toast } = useToast();

  const handleDisabled = () => {
    toast({
      title: "Purchasing temporarily disabled",
      description:
        "Purchasing temporarily disabled — support us by viewing ads or contacting artists directly.",
    });
  };

  return (
    <Button
      onClick={handleDisabled}
      size="lg"
      className="w-full text-brutalist text-lg"
    >
      PURCHASING DISABLED
    </Button>
  );
};

export default PayButton;
