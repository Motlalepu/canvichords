import { Button } from "@/components/ui/button";
import gallery1 from "@/assets/gallery-1.jpg";
import { Link } from "react-router-dom";

const FeaturedArtwork = () => {
  return (
    <section id="featured-collection" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-muted/30 pointer-events-none"></div>
              <Link to="/#featured-collection">
                <img
                  src={gallery1}
                  alt="Featured Artwork"
                  className="relative w-full h-auto shadow-2xl cursor-pointer z-10"
                />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Featured Collection
              </p>
              <h2 className="text-gallery-heading text-5xl md:text-6xl lg:text-7xl">
                Monochrome Dreams
              </h2>
              <p className="text-gallery text-xl text-muted-foreground">
                A curated exploration of light, shadow, and form through
                contemporary monochromatic expression.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border/30">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Artist
                  </p>
                  <p className="text-gallery text-lg">Modern Vision</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Medium
                  </p>
                  <p className="text-gallery text-lg">Photography</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Year
                  </p>
                  <p className="text-gallery text-lg">2024</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Price
                  </p>
                  <p className="text-gallery text-lg font-medium">R 2,500</p>
                </div>
              </div>

              <Link to="/#featured-collection">
                <Button
                  size="lg"
                  className="w-full md:w-auto px-12 rounded-none border-2 border-foreground hover:bg-foreground hover:text-background transition-smooth"
                  variant="outline"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtwork;
