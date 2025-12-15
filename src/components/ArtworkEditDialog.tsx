import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ArtCategory = Database['public']['Enums']['art_category'];

interface Artwork {
  id: string;
  title: string;
  image_url: string;
  cover_image_url?: string | null;
  price: number | null;
  category: ArtCategory;
  description?: string;
  story?: string;
}

interface ArtworkEditDialogProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const ArtworkEditDialog = ({ artwork, open, onOpenChange, onSuccess }: ArtworkEditDialogProps) => {
  const [title, setTitle] = useState(artwork?.title || "");
  const [description, setDescription] = useState(artwork?.description || "");
  const [story, setStory] = useState(artwork?.story || "");
  const [price, setPrice] = useState(artwork?.price?.toString() || "");
  const [category, setCategory] = useState<ArtCategory>(artwork?.category || "painting");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (artwork) {
      setTitle(artwork.title);
      setDescription(artwork.description || "");
      setStory(artwork.story || "");
      setPrice(artwork.price?.toString() || "");
      setCategory(artwork.category);
    }
  }, [artwork]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artwork) return;

    setLoading(true);
    const { error } = await supabase
      .from("artworks")
      .update({
        title,
        description: description || null,
        story: story || null,
        price: price ? parseFloat(price) : null,
        category,
        updated_at: new Date().toISOString(),
      })
      .eq("id", artwork.id);

    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Artwork updated successfully" });
      onOpenChange(false);
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Artwork</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ArtCategory)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="digital">Digital Art</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="mixed_media">Mixed Media</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="crafts">Crafts</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your artwork"
            />
          </div>

          <div>
            <Label htmlFor="story">Story</Label>
            <Textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell the story behind your artwork"
              className="min-h-[100px]"
            />
          </div>

          {category !== "music" && (
            <div>
              <Label htmlFor="price">Price (R)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Leave empty if not for sale"
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkEditDialog;
