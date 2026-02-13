import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X, Headphones } from "lucide-react";
import { Artwork, getNextArtwork, getPreviousArtwork } from "@/data/artworks";
import { Button } from "@/components/ui/button";
import AudioPlayer from "@/components/audio/AudioPlayer";

interface ArtworkViewProps {
  artwork: Artwork;
}

const ArtworkView = ({ artwork }: ArtworkViewProps) => {
  const navigate = useNavigate();
  const nextArtwork = getNextArtwork(artwork.id);
  const prevArtwork = getPreviousArtwork(artwork.id);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Fixed audio player */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <AudioPlayer src={artwork.soundscape} title={artwork.title} autoPlay />
      </div>

      {/* Navigation controls */}
      <div className="fixed top-24 left-6 md:left-12 z-40">
        <Link to="/gallery">
          <Button variant="galleryGhost" size="sm" className="gap-2">
            <X className="h-4 w-4" />
            <span className="hidden md:inline">Close</span>
          </Button>
        </Link>
      </div>

      {/* Previous/Next navigation */}
      <div className="fixed top-1/2 -translate-y-1/2 left-4 md:left-8 z-40">
        <Button
          variant="galleryGhost"
          size="icon"
          onClick={() => prevArtwork && navigate(`/artwork/${prevArtwork.id}`)}
          className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 hover:bg-background/80"
          aria-label="Previous artwork"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-40">
        <Button
          variant="galleryGhost"
          size="icon"
          onClick={() => nextArtwork && navigate(`/artwork/${nextArtwork.id}`)}
          className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm border border-border/30 hover:bg-background/80"
          aria-label="Next artwork"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="gallery-container py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Artwork image */}
          <div className="opacity-0 animate-fade-in">
            <div className="relative">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </div>

          {/* Artwork details */}
          <div className="lg:sticky lg:top-32 space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="space-y-4">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground">
                {artwork.title}
              </h1>
              <p className="text-lg text-muted-foreground font-sans font-light">
                {artwork.artist}
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground font-sans">
              <p>{artwork.year}</p>
              {artwork.medium && <p>{artwork.medium}</p>}
              {artwork.dimensions && <p>{artwork.dimensions}</p>}
            </div>

            <div className="h-px bg-border" />

            <p className="text-foreground/80 font-sans font-light leading-relaxed text-lg">
              {artwork.description}
            </p>

            {artwork.artistStatement && (
              <>
                <div className="h-px bg-border" />
                <div className="space-y-3">
                  <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                    Artist Statement
                  </h2>
                  <p className="text-foreground/70 font-serif italic text-lg leading-relaxed">
                    "{artwork.artistStatement}"
                  </p>
                </div>
              </>
            )}

            {/* Listening Room Entry Point */}
            {artwork.musicVideo && (
              <>
                <div className="h-px bg-border" />
                <div className="opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <Link to={`/artist/${artwork.id}/listen`}>
                    <Button 
                      variant="gallery" 
                      size="sm" 
                      className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Headphones className="h-4 w-4" />
                      Enter Listening  Room
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for audio player */}
      <div className="h-24" />
    </div>
  );
};

export default ArtworkView;
