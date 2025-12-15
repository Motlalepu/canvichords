import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface CertificateCardProps {
  certificate: {
    id: string;
    certificate_number: string;
    purchase_date: string;
    purchase_amount: number;
    payment_provider: string;
    artwork_id: string;
  };
  artworkTitle?: string;
  artistName?: string;
}

const CertificateCard = ({ certificate, artworkTitle, artistName }: CertificateCardProps) => {
  const handleDownload = () => {
    // TODO: Generate PDF certificate
    console.log('Download certificate:', certificate.id);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Certificate of Authenticity</h3>
          <p className="text-sm text-muted-foreground">
            {certificate.certificate_number}
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          Verified
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        {artworkTitle && (
          <div>
            <p className="text-sm text-muted-foreground">Artwork</p>
            <p className="font-medium">{artworkTitle}</p>
          </div>
        )}
        
        {artistName && (
          <div>
            <p className="text-sm text-muted-foreground">Artist</p>
            <p className="font-medium">{artistName}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground">Purchase Date</p>
          <p className="font-medium">
            {format(new Date(certificate.purchase_date), 'PPP')}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Amount Paid</p>
          <p className="font-medium">R{certificate.purchase_amount.toFixed(2)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Payment Provider</p>
          <p className="font-medium">{certificate.payment_provider}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleDownload} className="flex-1" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(`/artwork/${certificate.artwork_id}`, '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default CertificateCard;
