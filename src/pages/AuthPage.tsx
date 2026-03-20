import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Palette, Heart } from "lucide-react";

type UserType = "artist" | "collector" | null;
type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType && authMode === "signup") {
      toast({
        title: "Please select your role",
        description: "Are you an artist or a collector?",
        variant: "destructive",
      });
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Password strength validation (min 8 chars, 1 uppercase, 1 number, 1 special char)
    const passwordStrong =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordStrong.test(password)) {
      toast({
        title: "Weak password",
        description:
          "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (authMode === "signin") {
        const { data: signInResult, error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) throw error;

        // Determine redirect destination based on profile user_type
        let destination = "/";
        try {
          const userId = signInResult?.user?.id;
          if (userId) {
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("user_type")
              .eq("id", userId)
              .maybeSingle();

            if (
              !profileError &&
              profileData &&
              (profileData as any).user_type === "artist"
            ) {
              destination = "/artist-dashboard";
            }
          }
        } catch (e: any) {
          // Non-blocking: log and continue with default destination
          // eslint-disable-next-line no-console
          console.warn("Error checking profile after sign-in:", e);
        }

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });

        navigate(destination);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              user_type: userType,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // Create profile. Some deployments may not have the `user_type` column
          // (older DB migrations). Try inserting with the column first, and
          // fall back to inserting without it if the column is missing.
          try {
            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: data.user.id,
                user_type: userType,
              });

            if (profileError) {
              // If the error indicates the column doesn't exist, try again
              // without the `user_type` field.
              const msg = String(profileError.message || profileError);
              if (
                msg.toLowerCase().includes("user_type") ||
                msg.toLowerCase().includes('column "user_type"')
              ) {
                const { error: fallbackError } = await supabase
                  .from("profiles")
                  .insert({
                    id: data.user.id,
                  } as any);
                if (fallbackError) throw fallbackError;
              } else {
                throw profileError;
              }
            }
          } catch (err: any) {
            // Surface a helpful toast but allow the flow to continue so the user
            // can complete onboarding even if the DB schema is not fully updated.
            toast({
              title: "Profile creation warning",
              description: err?.message || String(err),
              variant: "destructive",
            });
          }

          toast({
            title:
              userType === "artist"
                ? "Welcome, visionary."
                : "Hello, explorer.",
            description:
              userType === "artist"
                ? "Let's get your gallery ready."
                : "Ready to fall in love with something new?",
          });

          navigate(userType === "artist" ? "/onboarding/artist" : "/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userType && authMode === "signup") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Join Our Creative Community
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Choose your path in this artistic journey
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => setUserType("artist")}
              className="group relative overflow-hidden rounded-lg border-4 border-border bg-card p-8 text-left transition-all hover:border-[var(--brand-pink)] hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-[var(--brand-pink)]/10 transition-colors">
                  <Palette className="w-12 h-12 text-primary group-hover:text-[var(--brand-pink)] transition-colors" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  I'm an Artist
                </h2>
                <p className="text-muted-foreground">
                  Share your creations with the world. Build your gallery, tell
                  your stories, and connect with collectors who appreciate your
                  vision.
                </p>
                <div className="pt-4 text-sm text-muted-foreground">
                  ✨ Upload unlimited artwork
                  <br />
                  🎨 Create your artist profile
                  <br />
                  💰 Set your own prices
                </div>
              </div>
            </button>

            <button
              onClick={() => setUserType("collector")}
              className="group relative overflow-hidden rounded-lg border-4 border-border bg-card p-8 text-left transition-all hover:border-[var(--brand-pink)] hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-[var(--brand-pink)]/10 transition-colors">
                  <Heart className="w-12 h-12 text-primary group-hover:text-[var(--brand-pink)] transition-colors" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  I'm a Collector
                </h2>
                <p className="text-muted-foreground">
                  Discover extraordinary art and the stories behind them. Follow
                  your favorite artists and build your personal collection.
                </p>
                <div className="pt-4 text-sm text-muted-foreground">
                  💝 Save your favorites
                  <br />
                  👥 Follow talented artists
                  <br />
                  🌟 Discover new pieces daily
                </div>
              </div>
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setAuthMode("signin")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Already have an account?{" "}
              <span className="underline">Sign in</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {authMode === "signin"
              ? "Welcome Back"
              : userType === "artist"
              ? "Welcome, visionary."
              : "Hello, explorer."}
          </h1>
          <p className="text-muted-foreground">
            {authMode === "signin"
              ? "Sign in to continue your journey"
              : userType === "artist"
              ? "Let's get your gallery ready."
              : "Ready to fall in love with something new?"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait..."
              : authMode === "signin"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setAuthMode(authMode === "signin" ? "signup" : "signin");
              if (authMode === "signin") setUserType(null);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {authMode === "signin" ? (
              <>
                Don't have an account?{" "}
                <span className="underline">Sign up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="underline">Sign in</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
