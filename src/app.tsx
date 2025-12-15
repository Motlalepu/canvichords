import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ArtistOnboarding from "./pages/ArtistOnboarding";
import ArtistDashboard from "./pages/ArtistDashboard";
import Community from "./pages/Community";
import MyCertificates from "./pages/MyCertificates";
import SupabaseDiag from "./pages/SupabaseDiag";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Music from "./pages/Music";
import ErrorBoundary from "@/components/ErrorBoundary";
import AdUnit from "@/components/AdUnit";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            {/* Top ad banner (AdSense will be inserted here) */}
            <div id="ad-banner-top" className="min-h-[100px]">
              <AdUnit slot="" format="horizontal" />
            </div>

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio/:artistId" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Index />} />
              <Route path="/supabase-diag" element={<SupabaseDiag />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/onboarding/artist" element={<ArtistOnboarding />} />
              <Route path="/artist-dashboard" element={<ArtistDashboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/certificates" element={<MyCertificates />} />
              <Route path="/music" element={<Music />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Sidebar ad (AdSense will be inserted here) */}
            <div id="ad-sidebar" className="hidden md:block min-h-[600px]">
              <AdUnit slot="" format="sidebar" />
            </div>

            {/* Footer ad (AdSense will be inserted here) */}
            <div id="ad-footer" className="min-h-[90px]">
              <AdUnit slot="" format="horizontal" />
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
