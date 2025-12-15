import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play, Music as MusicIcon, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FeaturedBadge from "./FeaturedBadge";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  image_url: string;
  cover_image_url?: string | null;
  description: string;
  category: string;
  type: string;
  isFeatured?: boolean;
  featuredEndDate?: string;
}

const CinematicCarousel = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select(
          `
          *,
          profiles!artworks_artist_id_fkey(display_name)
        `
        )
        .order("created_at", { ascending: false })
        .limit(12);

      if (!error && data) {
        // Fetch active featured artworks
        const { data: featuredData } = await supabase
          .from("featured_artworks")
          .select("artwork_id, end_date")
          .eq("is_active", true)
          .gte("end_date", new Date().toISOString());

        const featuredMap = new Map(
          featuredData?.map((f) => [f.artwork_id, f.end_date]) || []
        );

        const formattedArtworks = data.map((artwork: any) => {
          const featuredEndDate = featuredMap.get(artwork.id);
          return {
            id: artwork.id,
            title: artwork.title,
            artist: artwork.profiles?.display_name || "Unknown Artist",
            artist_id: artwork.artist_id,
            image_url: artwork.image_url,
            cover_image_url: artwork.cover_image_url,
            description: artwork.description || "",
            category: artwork.category,
            type:
              artwork.image_url.includes("video") ||
              artwork.image_url.endsWith(".mp4") ||
              artwork.image_url.endsWith(".webm")
                ? "video"
                : artwork.image_url.endsWith(".mp3") ||
                  artwork.image_url.endsWith(".wav") ||
                  artwork.image_url.endsWith(".mpeg")
                ? "audio"
                : "image",
            isFeatured: !!featuredEndDate,
            featuredEndDate: featuredEndDate,
          };
        });

        // Sort to show featured items first
        formattedArtworks.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });

        setArtworks(formattedArtworks);
      }
      setLoading(false);
    };

    fetchArtworks();
  }, []);

  const filteredArtworks =
    activeCategory === "all"
      ? artworks
      : artworks.filter((art) => art.category === activeCategory);

  const featuredArtworks = artworks.slice(0, 3);

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground font-cinematic">
            Loading gallery...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Aurora background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(var(--aurora-purple))] rounded-full blur-[120px] animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-[hsl(var(--aurora-gold))] rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-[hsl(var(--aurora-pink))] rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-cinematic font-bold mb-6 bg-gradient-to-r from-[hsl(var(--aurora-purple))] via-[hsl(var(--aurora-pink))] to-[hsl(var(--aurora-gold))] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Discover Creations
          </h2>
          <p className="text-lg text-muted-foreground font-cinematic max-w-2xl mx-auto">
            Immerse yourself in a curated collection of visual art and sonic
            experiences
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveCategory}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-background/50 backdrop-blur-xl border border-[hsl(var(--aurora-purple))]/20">
            <TabsTrigger
              value="all"
              className="font-cinematic data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--aurora-purple))] data-[state=active]:to-[hsl(var(--aurora-pink))] data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="art"
              className="font-cinematic data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--aurora-purple))] data-[state=active]:to-[hsl(var(--aurora-pink))] data-[state=active]:text-white"
            >
              🎨 Art
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="font-cinematic data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--aurora-purple))] data-[state=active]:to-[hsl(var(--aurora-pink))] data-[state=active]:text-white"
            >
              🎵 Music
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {filteredArtworks.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-cinematic">
                  No items in this category yet
                </p>
              </div>
            ) : (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {filteredArtworks.map((artwork) => (
                    <CarouselItem
                      key={artwork.id}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]">
                        {artwork.isFeatured && artwork.featuredEndDate && (
                          <FeaturedBadge endDate={artwork.featuredEndDate} />
                        )}
                        {/* Card Background with gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

                        {/* Media Content */}
                        <div className="absolute inset-0">
                          {artwork.type === "audio" ? (
                            <>
                              {artwork.cover_image_url ? (
                                <img
                                  src={artwork.cover_image_url}
                                  alt={artwork.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--aurora-purple))] to-[hsl(var(--aurora-gold))] flex items-center justify-center">
                                  <MusicIcon className="w-32 h-32 text-white/30 animate-glow" />
                                </div>
                              )}
                            </>
                          ) : artwork.type === "video" ? (
                            <>
                              <video
                                src={artwork.image_url}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Play
                                    className="w-10 h-10 text-white ml-1"
                                    fill="white"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <img
                              src={artwork.image_url}
                              alt={artwork.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                          <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <p className="text-[hsl(var(--aurora-gold))] text-sm font-cinematic font-semibold mb-2 uppercase tracking-wider">
                              {artwork.category}
                            </p>
                            <h3 className="text-white text-3xl font-cinematic font-bold mb-2 line-clamp-2">
                              {artwork.title}
                            </h3>
                            <p className="text-white/80 font-cinematic mb-4">
                              by {artwork.artist}
                            </p>
                            <p className="text-white/60 text-sm font-cinematic mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {artwork.description ||
                                "Explore this beautiful creation"}
                            </p>
                            <Button
                              variant="outline"
                              className="border-[hsl(var(--aurora-gold))] text-[hsl(var(--aurora-gold))] hover:bg-[hsl(var(--aurora-gold))] hover:text-black font-cinematic opacity-0 group-hover:opacity-100 transition-all duration-500"
                              onClick={() =>
                                navigate(`/portfolio/${artwork.artist_id}`)
                              }
                            >
                              View Artist Portfolio
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-background/20 backdrop-blur-md border-[hsl(var(--aurora-purple))]/30 text-white hover:bg-[hsl(var(--aurora-purple))]/50" />
                <CarouselNext className="right-4 bg-background/20 backdrop-blur-md border-[hsl(var(--aurora-purple))]/30 text-white hover:bg-[hsl(var(--aurora-purple))]/50" />
              </Carousel>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        {featuredArtworks.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-cinematic font-bold mb-4 bg-gradient-to-r from-[hsl(var(--aurora-gold))] to-[hsl(var(--aurora-pink))] bg-clip-text text-transparent">
                🌟 Featured Creators
              </h3>
              <p className="text-muted-foreground font-cinematic">
                Spotlighting exceptional talent
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(var(--aurora-gold),0.3)] transition-all duration-500"
                  onClick={() => navigate(`/portfolio/${artwork.artist_id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  {artwork.type === "image" ? (
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : artwork.type === "audio" ? (
                    <>
                      {artwork.cover_image_url ? (
                        <img
                          src={artwork.cover_image_url}
                          alt={artwork.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--aurora-purple))] to-[hsl(var(--aurora-pink))] flex items-center justify-center">
                          <MusicIcon className="w-24 h-24 text-white/40" />
                        </div>
                      )}
                    </>
                  ) : (
                    <video
                      src={artwork.image_url}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h4 className="text-white text-xl font-cinematic font-semibold mb-1">
                      {artwork.title}
                    </h4>
                    <p className="text-white/70 font-cinematic text-sm">
                      {artwork.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CinematicCarousel;
