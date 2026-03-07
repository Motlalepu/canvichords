import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Palette, Eye } from "lucide-react";
import { artworks } from "@/data/artworks";
import Header from "@/components/layout/Header";

const Index = () => {
  const featuredArtwork = artworks[0];
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <div className="bg-background">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center">
        {/* Dynamic background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-gallery-cream via-background to-gallery-warm opacity-60" />
        
        {/* Animated decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gallery-gold/12 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gallery-pink/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 gallery-container text-center">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Main headline */}
            <div className="space-y-2">
              <h1 
                className="font-serif text-6xl md:text-7xl lg:text-9xl font-light tracking-widest text-foreground opacity-0 animate-fade-in leading-none"
              >
                Free Online Gallery for Artists
              </h1>
              <div className="flex items-center justify-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
                  CANVICHORDS
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
              </div>
            </div>
            
            {/* Tagline */}
            <p 
              className="text-lg md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              A platform for unknown artists to showcase art online free and gain exposure. 
              <span className="block mt-2 text-muted-foreground">Upload artwork online and connect with art lovers in a supportive community.</span>
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <Link to="/gallery">
                <Button variant="galleryPrimary" size="lg" className="gap-3 px-8">
                  Enter Gallery
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/listening-room">
                <Button variant="gallery" size="lg" className="gap-3 px-8">
                  <Music className="h-5 w-5" />
                  Listening Room
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div 
              className="flex flex-col items-center justify-center gap-6 pt-12 pb-6 text-sm text-muted-foreground opacity-0 animate-fade-in"
              style={{ animationDelay: "800ms" }}
            >
              <div className="flex items-center justify-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <span>Curated Artworks</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                <span>Ambient Soundscapes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <span>Mindful Viewing</span>
              </div>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-3 pt-8 opacity-0 animate-fade-in" style={{ animationDelay: "1000ms" }}>
                <span className="text-xs uppercase tracking-widest font-sans">Scroll to explore</span>
                <div className="flex flex-col gap-1">
                  <div className="w-px h-6 bg-gradient-to-b from-primary to-transparent animate-pulse-soft mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated scroll indicator - REMOVED - moved above */}
        
      </section>

      {/* HOW TO SHOWCASE ART ONLINE */}
      <section className="py-24 md:py-32 bg-background">
        <div className="gallery-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-foreground">
              How to Showcase Art Online
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                Wondering where unknown artists can post art? Our free art promotion website provides a dedicated space for emerging creators to share their work with a global audience. Whether you're an artist looking for exposure or someone discovering new talent, this is your destination.
              </p>
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                As a platform for African artists and creators worldwide, we focus on giving voice to underrepresented voices in the art world. Upload your artwork online today and join our community of passionate art enthusiasts.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/gallery">
                <Button variant="galleryPrimary" size="lg" className="gap-3 px-8">
                  Start Showcasing Your Art
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ARTIST PROMOTION PLATFORM */}
      <section className="py-24 md:py-32 bg-gallery-warm/20">
        <div className="gallery-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-foreground">
              Artist Promotion Platform
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                Sites that promote new artists like ours are essential for building careers in the creative field. Our share art online platform offers tools and visibility to help unknown artists gain the recognition they deserve.
              </p>
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                We believe every artist deserves a chance to shine. That's why we've created this free online gallery for artists - a space where creativity meets opportunity, and emerging talent finds its audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTWORK SECTION */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background via-gallery-warm/20 to-background">
        <div className="gallery-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div 
              className="space-y-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans font-medium">
                Featured Masterpiece
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground">
                {featuredArtwork.title}
              </h2>
              <p className="text-lg text-muted-foreground font-sans font-light">
                by <span className="text-foreground/80 font-medium">{featuredArtwork.artist}</span>
              </p>
              <p className="text-foreground/70 font-sans font-light leading-relaxed text-lg">
                {featuredArtwork.description}
              </p>
              <Link to={`/artwork/${featuredArtwork.id}`}>
                <Button variant="galleryPrimary" size="lg" className="gap-2 mt-6">
                  View Full Artwork
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Image */}
            <Link 
              to={`/artwork/${featuredArtwork.id}`}
              className="group opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <div className="relative overflow-hidden aspect-[4/3] rounded-lg border border-border/50">
                <img
                  src={featuredArtwork.image}
                  alt={`${featuredArtwork.title} - showcase art online free by ${featuredArtwork.artist} on platform for unknown artists`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 via-transparent to-transparent group-hover:from-foreground/10 transition-colors duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 bg-gallery-warm/30">
        <div className="gallery-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 
              className="font-serif text-4xl md:text-5xl font-light tracking-wide text-foreground"
            >
              Slow Design Philosophy
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                In a world of endless scrolling and fleeting attention, we believe art deserves more. 
                Piece in our collection are paired with a carefully curated soundscape, 
                creating a space for genuine connection and reflection.
              </p>
              <p className="text-lg text-foreground/70 font-sans font-light leading-relaxed">
                <span className="block text-xl text-foreground font-medium mb-4">Our Promise</span>
                No algorithms. No metrics. No pressure. Just you, the art, and the moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GALLERY PREVIEW */}
      <section className="py-24 md:py-32">
        <div className="gallery-container">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-foreground">
                Gallery Highlights
              </h2>
              <p className="text-lg text-muted-foreground font-sans font-light">
                A curated selection of contemporary works
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArtworks.map((artwork, index) => (
                <Link 
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="group opacity-0 animate-fade-in"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="relative overflow-hidden aspect-[4/3] rounded-lg border border-border/50">
                      <img
                        src={artwork.image}
                        alt={`${artwork.title} - upload artwork online by ${artwork.artist} on free online gallery for artists`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-light tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans font-light">
                        {artwork.artist}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link to="/gallery">
                <Button variant="gallery" size="lg" className="gap-3">
                  Browse Full Gallery
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY CTA SECTION */}
      <section className="py-32 md:py-40 bg-gradient-to-b from-gallery-warm/40 via-gallery-warm/20 to-background relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gallery-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="gallery-container relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-10">
            <h2 className="font-serif text-5xl md:text-6xl font-light tracking-wide text-foreground leading-tight">
              Ready to Explore?
            </h2>
            <p className="text-xl text-foreground/70 font-sans font-light">
              Take your time. There's no rush. Let each artwork speak to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link to="/gallery">
                <Button variant="galleryPrimary" size="lg" className="gap-3 px-8">
                  Enter the Gallery
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="gallery" size="lg" className="px-8">
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-border/50 bg-foreground/[0.02]">
        <div className="gallery-container">
          <div className="grid md:grid-cols-3 gap-16 mb-8">
            <div>
              <Link 
                to="/" 
                className="font-serif text-xl tracking-widest text-foreground hover:text-primary transition-colors"
              >
                CANVICHORDS
              </Link>
              <p className="text-sm text-muted-foreground font-sans font-light mt-2">
                Art and sound in harmony
              </p>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-foreground font-sans font-medium mb-4">
                Explore
              </h3>
              <nav className="flex flex-col gap-3">
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light">
                  Gallery
                </Link>
                <Link to="/listening-room" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light">
                  Listening Room
                </Link>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light">
                  About
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans font-medium mb-4">
                Philosophy
              </p>
              <p className="text-sm text-muted-foreground font-sans font-light">
                Slow, intentional design for deeper appreciation of art and sound.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-sans font-light">
              © 2026 CANVICHORDS. All artworks are copyrighted by their respective artists.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
