import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="gallery-container">
          <div className="max-w-3xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-20 space-y-6">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground opacity-0 animate-fade-in">
                About Canvichords
              </h1>
              <p
                className="text-xl text-muted-foreground font-sans font-light opacity-0 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                A digital sanctuary where art and sound emerge
              </p>
            </div>

            {/* Content */}
            <div className="space-y-16">
              <section
                className="space-y-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
                  The Vision
                </h2>
                <div className="space-y-4 text-foreground/80 font-sans font-light leading-relaxed text-lg">
                  <p>
                    Canvichords was born from a simple belief: art deserves more
                    than a quick glance. In an age of infinite scrolling and
                    fleeting attention, we created a space that invites you to
                    slow down.
                  </p>
                  <p>
                    Artworks in our collection are paired with curated video and
                    that complement and enhance the visual experience. Together,
                    they create moments of genuine connection and contemplation.
                  </p>
                </div>
              </section>

              <div className="h-px bg-border" />

              <section
                className="space-y-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
                  Our Platform’s Reach & Engagement
                </h2>
                <div className="space-y-4 text-foreground/80 font-sans font-light leading-relaxed text-lg">
                  <p>
                    Aura !LLA Art Space began in November 2024, dedicated to
                    promoting independent artists and helping them gain
                    visibility. In 2025, we evolved into Canvichords, continuing
                    our mission with a renewed focus.
                  </p>
                  <p>
                    Our platform has seen steady growth and engagement. We have
                    consistently attracted a growing audience,with organic reach. This demonstrates genuine interest and
                    engagement from visitors, ensuring that your work will reach
                    attentive and interested audiences.
                  </p>
                  <img src="/src/assets/statsaias.png" alt="Platform Statistics" className="mx-auto w-64 h-48 object-contain" />
                  <p>
                    The platform operates on a modest monthly service fee of
                    R150 to R400 , allowing us to maintain and grow the space
                    while keeping it accessible to artists.
                  </p>
                  
                </div>
              </section>

              <div className="h-px bg-border" />

              <section
                className="space-y-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "500ms" }}
              >
                <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground">
                  For Artists
                </h2>
                <div className="space-y-4 text-foreground/80 font-sans font-light leading-relaxed text-lg">
                  <p>
                    Canvichords offers a unique platform for contemporary
                    artists to present their work in an immersive context. We
                    work closely with each artist to select or create
                    soundscapes that honor their vision.
                  </p>
                  <p>
                    If you're an artist interested in featuring your work, we'd
                    love to hear from you.
                  </p>
                </div>
              </section>

              <div className="h-px bg-border" />

              <section
                className="text-center space-y-8 pt-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <p className="font-serif text-xl text-foreground italic">
                  "Art is not what you see, but what you make others see."
                </p>
                <p className="text-muted-foreground font-sans text-sm">
                  — Edgar Degas
                </p>
                <Link to="/gallery" className="inline-block pt-4">
                  <Button variant="galleryPrimary" size="lg" className="gap-3">
                    Enter the Gallery
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="gallery-container text-center">
          <p className="text-sm text-muted-foreground font-sans font-light">
            CANVICHORDS — Where art meets atmosphere
          </p>
          <p>
            Interested in featuring your work?
            <br />
            Email us at{" "}
            <a href="mailto:hello@canvichords.co.za">
              hello@canvichords.co.za{" "}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
