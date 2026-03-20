import { Menu, ChevronDown, User, Award, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/canvichords-logo.png";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NotificationBell from "./NotificationBell";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data: { user } }) => {
        setUser(user);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        // Continue gracefully if Supabase is not accessible
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    // Additional logic to filter or fetch data based on the selected category can be added here
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="canvichords Gallery" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-smooth p-0 h-auto font-normal"
              >
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-2 border-border z-50">
              <DropdownMenuItem asChild>
                <a href="#painting" className="cursor-pointer">
                  Painting
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setCategoryFilter("sculpture")}>
                Sculpture
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("music")}>
                Music
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a
            href="#gallery"
            className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-smooth"
          >
            Gallery
          </a>
          {/* Purchase functionality removed - shopping cart hidden */}
          <Link
            to="/about"
            className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-smooth"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm uppercase tracking-wider hover:text-muted-foreground transition-smooth"
          >
            Contact
          </Link>

          {user && <NotificationBell />}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-2 border-border">
                <DropdownMenuItem asChild>
                  <Link to="/community" className="cursor-pointer">
                    Community
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/artist-dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/certificates"
                    className="cursor-pointer flex items-center"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    My Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                Join Us
              </Button>
            </Link>
          )}
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="md:hidden p-2 hover:bg-secondary transition-smooth">
              <Menu className="w-6 h-6" />
            </button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <div className="flex items-center justify-between w-full">
                <Link to="/" className="flex items-center">
                  <img src={logo} alt="canvichords" className="h-8 w-auto" />
                </Link>
                <DrawerClose asChild>
                  <button className="p-2">Close</button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <nav className="flex flex-col gap-4 px-4 py-2">
              <a
                href="#gallery"
                className="uppercase tracking-wider"
                onClick={() => {}}
              >
                Gallery
              </a>
              <Link to="/about" className="uppercase tracking-wider">
                About
              </Link>
              <Link to="/contact" className="uppercase tracking-wider">
                Contact
              </Link>
              {/* Purchase removed from mobile drawer */}
              {user ? (
                <>
                  <Link to="/community">Community</Link>
                  <Link to="/artist-dashboard">Dashboard</Link>
                  <button onClick={handleSignOut} className="text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="default">Join Us</Button>
                </Link>
              )}
            </nav>

            <DrawerFooter />
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navigation;
