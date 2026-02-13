import Header from "@/components/layout/Header";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import { artworks } from "@/data/artworks";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="gallery-container">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground opacity-0 animate-fade-in">
              The Gallery
            </h1>
            <p className="text-muted-foreground font-sans font-light max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Each piece is accompanied by its own ambient soundscape. 
              Take your time. Listen. Look. Feel.
            </p>
          </div>

          {/* Artwork Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {artworks.map((artwork, index) => (
              <ArtworkCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="gallery-container text-center">
          <p className="text-sm text-muted-foreground font-sans font-light">
            CANVICHORDS — Where art meets atmosphere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
