import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Palette, Upload, Sparkles } from "lucide-react";

const categories = [
  { value: "painting", label: "Painting & Drawing", icon: "🎨" },
  { value: "sculpture", label: "Sculpture & 3D Art", icon: "🗿" },
  { value: "digital", label: "Digital Art", icon: "💻" },
  { value: "mixed_media", label: "Mixed Media", icon: "🎭" },
  { value: "jewelry", label: "Jewelry Design", icon: "💎" },
  { value: "crafts", label: "Handcrafts", icon: "✂️" },
  { value: "photography", label: "Photography", icon: "📸" },
  { value: "videos", label: "Video & Film", icon: "🎬" },
];

const ArtistOnboarding = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [artwork, setArtwork] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    story: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate("/auth");
      } else {
        setUserId(user.id);
      }
    });
  }, [navigate]);

  const progress = (step / 3) * 100;

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName, bio })
        .eq("id", userId);

      if (error) throw error;

      // Ensure artists table has a matching row (artists.id == profiles.id)
      const { error: artistErr } = await supabase.from("artists").upsert([
        {
          id: userId,
          display_name: displayName,
          bio,
        },
      ]);

      if (artistErr) {
        // non-fatal, continue
        console.warn("Unable to upsert artists row:", artistErr.message);
      }

      toast({
        title: "Profile updated!",
        description: "Your creative identity is taking shape.",
      });
      setStep(2);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!artwork.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your artwork.",
        variant: "destructive",
      });
      return;
    }
    
    if (!artwork.image) {
      toast({
        title: "Image required",
        description: "Please select an image for your artwork.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // For now, we'll use a placeholder URL
      // In production, you'd upload to storage
      const imageUrl = URL.createObjectURL(artwork.image);

      const { error } = await supabase.from("artworks").insert([{
        artist_id: userId!,
        title: artwork.title,
        description: artwork.description,
        category: artwork.category as any,
        price: artwork.price ? parseFloat(artwork.price) : null,
        story: artwork.story,
        image_url: imageUrl,
      }]);

      if (error) throw error;

      toast({
        title: "Artwork uploaded!",
        description: "Your first piece is now in your gallery.",
      });
      setStep(3);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 text-[var(--brand-pink)]" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Tell Us About Yourself</h1>
            <p className="text-muted-foreground">Every artist has a unique story to tell</p>
          </div>

          <Progress value={progress} className="h-2" />

          <form onSubmit={handleProfileSubmit} className="space-y-6 bg-card p-8 rounded-lg border-2 border-border">
            <div>
              <Label htmlFor="displayName">What should we call you?</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your artist name"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bio">Your creative journey</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a bit about your artistic practice, inspirations, or what drives your creativity..."
                rows={4}
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <Upload className="w-12 h-12 text-[var(--brand-pink)]" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Add Your First Piece</h1>
            <p className="text-muted-foreground">Like hanging a masterpiece in a sunlit gallery</p>
          </div>

          <Progress value={progress} className="h-2" />

          <form onSubmit={handleArtworkSubmit} className="space-y-6 bg-card p-8 rounded-lg border-2 border-border">
            <div>
              <Label>What category best describes your work? <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setArtwork({ ...artwork, category: cat.value })}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${
                      artwork.category === cat.value
                        ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10 shadow-lg"
                        : "border-border hover:border-[var(--brand-pink)]/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="text-sm font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="title">What's the title?</Label>
              <Input
                id="title"
                value={artwork.title}
                onChange={(e) => setArtwork({ ...artwork, title: e.target.value })}
                placeholder="Give your piece a name"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="story">What story does this piece tell?</Label>
              <Textarea
                id="story"
                value={artwork.story}
                onChange={(e) => setArtwork({ ...artwork, story: e.target.value })}
                placeholder="Share the inspiration, meaning, or journey behind this work..."
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="price">How much love went into this? (optional)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={artwork.price}
                onChange={(e) => setArtwork({ ...artwork, price: e.target.value })}
                placeholder="Price in ZAR"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="image">Upload your artwork</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setArtwork({ ...artwork, image: e.target.files?.[0] || null })}
                required
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Uploading..." : "Add to Gallery"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-16 h-16 text-[var(--brand-pink)] animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-foreground">Your Gallery is Ready!</h1>
        <p className="text-xl text-muted-foreground">
          Time to share your vision with the world
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/artist-dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Explore Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistOnboarding;