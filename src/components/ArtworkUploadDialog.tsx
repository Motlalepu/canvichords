import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ArtworkUploadDialog = ({ onSuccess }: { onSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'audio/mp3'];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Invalid file type", description: "Please upload an image, video, or audio file", variant: "destructive" });
        return;
      }
      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum file size is 20MB", variant: "destructive" });
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type - only images
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({ title: "Invalid file type", description: "Please upload an image file for the cover", variant: "destructive" });
        return;
      }
      // Validate file size (max 5MB for cover)
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Maximum cover image size is 5MB", variant: "destructive" });
        return;
      }
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({ title: "Error", description: "You must be logged in", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (!uploadedFile) {
      toast({ title: "Error", description: "Please upload a file", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Upload main file to Supabase Storage
    const fileExt = uploadedFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('artworks')
      .upload(fileName, uploadedFile);

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('artworks')
      .getPublicUrl(fileName);

    // Upload cover image if provided (for music)
    let coverImageUrl = null;
    if (coverImage) {
      const coverExt = coverImage.name.split('.').pop();
      const coverFileName = `${user.id}/covers/${Date.now()}.${coverExt}`;
      
      const { error: coverError } = await supabase.storage
        .from('artworks')
        .upload(coverFileName, coverImage);

      if (coverError) {
        toast({ title: "Cover upload failed", description: coverError.message, variant: "destructive" });
        setLoading(false);
        return;
      }

      const { data: { publicUrl: coverUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(coverFileName);
      
      coverImageUrl = coverUrl;
    }

    // Get price value - optional for music
    const priceValue = formData.get("price") as string;
    const price = priceValue ? parseFloat(priceValue) : null;

    // Insert artwork record
    const { error } = await supabase.from("artworks").insert([{
      artist_id: user.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: category as any,
      price: price,
      image_url: publicUrl,
      cover_image_url: coverImageUrl,
      story: formData.get("story") as string,
    }]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Artwork added successfully" });
      setOpen(false);
      setUploadedFile(null);
      setCoverImage(null);
      setCategory("");
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Add New Artwork
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Artwork</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="digital">Digital Art</SelectItem>
                <SelectItem value="mixed_media">Mixed Media</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="crafts">Crafts</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file">Upload File (Image, Video, or Audio)</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="file" 
                name="file" 
                type="file" 
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                required 
                className="cursor-pointer"
              />
              {uploadedFile && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Upload className="w-4 h-4" />
                  {uploadedFile.name}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Max file size: 20MB. Supported: Images, Videos (MP4, WebM), Audio (MP3, WAV)</p>
          </div>
          
          {category === "music" && (
            <div>
              <Label htmlFor="coverImage">Cover Image (Required for Music)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="coverImage" 
                  name="coverImage" 
                  type="file" 
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  required 
                  className="cursor-pointer"
                />
                {coverImage && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    {coverImage.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Max file size: 5MB. This will be displayed as your music cover art.</p>
            </div>
          )}
          
          {category !== "music" && (
            <>
              <div>
                <Label htmlFor="price">Price (ZAR)</Label>
                <Input id="price" name="price" type="number" step="0.01" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="story">Story</Label>
            <Textarea id="story" name="story" rows={4} />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Artwork"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkUploadDialog;
