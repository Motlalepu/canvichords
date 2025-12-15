import heroArtwork from "@/assets/hero-artwork.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // ✅ Now Hero can navigate5
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Large Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
        <img
          src={heroArtwork}
          alt="Gallery hero artwork"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-serif text-sm uppercase tracking-[0.3em] font-light">
                  CANVICHORDS Gallery
                </h2>

                <p className="text-base leading-relaxed text-white/80 max-w-md">
                  A multi-sensory art marketplace where visual, video, and audio
                  art come together. An unforgettable experience that preserves
                  wonderful moments of creativity for many years.
                </p>
              </div>

              <h1 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight pt-4">
                delicate
                <br />
                <span className="italic font-light">artistry</span>
              </h1>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="px-8 py-6 text-base rounded-full bg-white text-black hover:bg-white/90 transition-smooth"
                onClick={() => navigate("/music")}
              >
                Discover
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="px-8 py-6 text-base rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-smooth"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Right Content - Featured Artworks */}
          <div className="flex flex-col gap-4 items-end justify-center">
            {/* Featured Card */}
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm">
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/#featured-collection")}
                  className="w-full h-48 p-0 m-0 rounded-lg overflow-hidden"
                >
                  <img
                    src={gallery1}
                    alt="Featured artwork"
                    className="w-full h-48 object-cover rounded-lg cursor-pointer"
                  />
                </button>
                <div className="text-white space-y-2">
                  <p className="text-sm uppercase tracking-widest text-white/60">
                    Featured Collection
                  </p>
                  <h3 className="text-lg font-light">
                    Plunge into the world of exquisite artistry
                  </h3>
                  <Button
                    size="sm"
                    className="rounded-full bg-white text-black hover:bg-white/90 mt-2"
                    onClick={() => navigate("/#featured-collection")}
                  >
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-white/20">
                <button
                  onClick={() => navigate("/gallery#gallery")}
                  className="w-full h-full p-0 m-0"
                >
                  <img
                    src={gallery2}
                    alt="Gallery artwork"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                </button>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-white/20">
                <button
                  onClick={() => navigate("/gallery#gallery")}
                  className="w-full h-full p-0 m-0"
                >
                  <img
                    src={gallery3}
                    alt="Gallery artwork"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Discover
        </span>
        <div className="w-px h-16 bg-white/30"></div>
      </div>
    </section>
  );
};

export default Hero;
