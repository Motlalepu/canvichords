import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GalleryIntro from "@/components/GalleryIntro";
import FeaturedArtwork from "@/components/FeaturedArtwork";
import CinematicCarousel from "@/components/CinematicCarousel";
import Gallery from "@/components/Gallery";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash (e.g. /#gallery or /#featured-collection) scroll to it.
    const id = location.hash ? location.hash.replace("#", "") : "";

    // Compute the target id: prefer hash, otherwise map certain paths to sections.
    let targetId = id;
    if (!targetId) {
      if (location.pathname === "/gallery") targetId = "gallery";
    }

    if (targetId === "gallery" || targetId === "featured-collection") {
      // give the page a tick to render
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16 pb-32">
        <Hero />
        <CinematicCarousel />
        <GalleryIntro />
        <FeaturedArtwork />
        <Gallery />
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
};

export default Index;
