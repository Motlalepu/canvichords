import { Link } from "react-router-dom";
import { Headphones } from "lucide-react";
import { Artwork } from "@/data/artworks";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  className?: string;
}

const ArtworkCard = ({ artwork, index, className }: ArtworkCardProps) => {
  const hasListeningRoom = !!artwork.musicVideo;

  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className={cn(
        "group block opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <article className="relative overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden bg-muted relative">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Listening Room indicator - direct link */}
          {hasListeningRoom && (
            <Link
              to={`/artist/${artwork.id}/listen`}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 opacity-70 hover:opacity-100 hover:bg-background hover:scale-110 transition-all duration-300 z-10"
              title="Enter Listening Room"
            >
              <Headphones className="h-4 w-4 text-foreground/70" />
            </Link>
          )}
        </div>
        
        <div className="mt-6 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
              {artwork.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-sans font-light">
            {artwork.artist}, {artwork.year}
          </p>
        </div>

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500 pointer-events-none" />
      </article>
    </Link>
  );
};

export default ArtworkCard;
