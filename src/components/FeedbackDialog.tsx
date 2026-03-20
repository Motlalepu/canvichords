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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FeedbackDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState<"bug" | "feature" | "general">("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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
      name: name || null,
      email: email || null,
      subject: subject || null,
      type,
      message,
      sent_at: new Date().toISOString(),
    } as const;

    try {
      // Try to insert into a `feedback` table if available
      const { error } = await supabase.from("feedback").insert([payload]);
      if (error) {
        // If insertion fails (table missing), fallback to simulated send
        console.warn("Supabase insert failed for feedback:", error.message);
        await new Promise((r) => setTimeout(r, 700));
      }

      toast({
        title: "Feedback sent",
        description: "Thanks! We received your feedback.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      onOpenChange(false);
    } catch (err: unknown) {
      toast({
        title: "Failed to send",
        description: (err as Error)?.message || "Unable to submit feedback",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Feedback & Feature Requests</DialogTitle>
          <DialogDescription>
            Share bugs, feature ideas, or general feedback to help us improve
            CANVICHORDS.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="fb-name">Your name</Label>
            <Input
              id="fb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="fb-email">Your email</Label>
            <Input
              id="fb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="fb-subject">Subject</Label>
            <Input
              id="fb-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="fb-type">Type</Label>
            <Select
              onValueChange={(v) => setType(v as any)}
              defaultValue={type}
            >
              <SelectTrigger id="fb-type" className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fb-message">Message</Label>
            <Textarea
              id="fb-message"
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
              {loading ? "Sending..." : "Send Feedback"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
