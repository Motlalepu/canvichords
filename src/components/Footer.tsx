import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background mt-32 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold uppercase tracking-wider">
              CANVICHORDS
            </h3>
            <p className="text-sm text-background/80 leading-relaxed">
              A multi-sensory art marketplace where visual, video, and audio art
              converge. Preserving wonderful moments of creativity for many
              years to come.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <nav className="space-y-2 text-sm">
              <Link
                to="/"
                className="text-background/80 hover:text-background transition-colors"
              >
                Home
              </Link>
              <Link
                to="/gallery"
                className="text-background/80 hover:text-background transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/community"
                className="text-background/80 hover:text-background transition-colors"
              >
                Community
              </Link>
              <Link
                to="/about"
                className="text-background/80 hover:text-background transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-background/80 hover:text-background transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">
              Legal
            </h4>
            <nav className="space-y-2 text-sm">
              <Link
                to="/privacy"
                className="text-background/80 hover:text-background transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-background/80 hover:text-background transition-colors"
              >
                Terms of Service
              </Link>
              <a
                href="mailto:sejosengoemotalepula@gmail.com"
                className="text-background/80 hover:text-background transition-colors block"
              >
                Report Abuse
              </a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:sejosengoemotalepula@gmail.com"
                  className="text-background/80 hover:text-background transition-colors break-all"
                >
                  sejosengoemotalepula@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-background/80">
                  Response: Within 7 business days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 py-8 space-y-4">
          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
            <p className="text-background/60">
              &copy; {currentYear} CANVICHORDS Gallery. All rights reserved.
            </p>

            {/* Version/Status */}
            <div className="flex items-center gap-4 text-background/60 text-xs">
              <span>Version 1.0 MVP</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 bg-background/60 rounded-full"></span>
                Platform Status: Live
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-background/50 leading-relaxed">
            CANVICHORDS is a digital art marketplace in its building phase. We
            are continuously enhancing our features and community experience.
            Thank you for supporting independent artists.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
