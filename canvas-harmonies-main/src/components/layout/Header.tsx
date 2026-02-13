import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Gallery" },
    { path: "/listening-room", label: "Listening Room" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="gallery-container">
        <nav className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="font-serif text-xl md:text-2xl font-light tracking-widest text-foreground hover:text-primary transition-colors duration-300"
          >
            CANVICHORDS
          </Link>

          <div className="flex items-center gap-4">
            <ul className="hidden md:flex items-center gap-8 md:gap-12">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "gallery-link text-sm tracking-wider uppercase font-sans font-light",
                      location.pathname === link.path && "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "md:hidden fixed inset-x-0 top-20 z-40 bg-background/95 backdrop-blur-sm transition-transform origin-top",
          open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 scale-y-95 pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="gallery-container py-6">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-lg tracking-wider uppercase font-sans font-light",
                    location.pathname === link.path && "text-primary"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
