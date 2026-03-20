import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactArtistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artistId: string;
  artistName?: string;
  artworkId?: string;
}

const ContactArtistDialog = ({
  open,
  onOpenChange,
  artistId,
  artistName,
  artworkId,
}: ContactArtistDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // try pre-filling email from auth
    const tryPrefill = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) setEmail(user.email);
        if (user?.user_metadata?.full_name)
          setName((user.user_metadata.full_name as string) || "");
      } catch (e) {
        // ignore
      }
    };
    if (open) tryPrefill();
  }, [open]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setLoading(true);

    const payload = {
      artist_id: artistId,
      artwork_id: artworkId || null,
      from_name: name,
      from_email: email,
      message,
      sent_at: new Date().toISOString(),
    };

    // Simulate sending an email / API call for now
    try {
      // In future: call Supabase function or external contact API here
      await new Promise((r) => setTimeout(r, 700));
      console.log("Simulated contact payload:", payload);

      toast({
        title: "Message sent",
        description: `Your message has been sent to ${
          artistName || "the artist"
        }. They'll respond via email if they choose to.`,
      });

      // reset form
      setName("");
      setEmail("");
      setMessage("");
      onOpenChange(false);
    } catch (err: unknown) {
      const message = (err as Error)?.message || "Unable to send message";
      toast({
        title: "Failed to send",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Contact {artistName || "Artist"}</DialogTitle>
          <DialogDescription>
            Send a private message to the artist to inquire about buying this
            artwork or requesting services.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="contact-name">Your name</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact-email">Your email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactArtistDialog;
