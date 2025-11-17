import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

// Setting up an array that holds the navigation bar's items and their corresponding hrefs.
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Courses", href: "#courses" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  // State variable to track if the user has scrolled down the page (used for styling the navbar on scroll).
  const [isScrolled, setIsScrolled] = useState(false);

  // State variable to track if the mobile menu is open or closed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This useEffect hook adds an event listener to track scroll position and update isScrolled state accordingly.
  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled more than 10 pixels down, set isScrolled to true, else set it to false.
      setIsScrolled(window.scrollY > 10);
    };

    // Adding the scroll event listener when the component mounts and removing it when the component unmounts to prevent memory leaks.
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This function disables background scrolling when the mobile menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      // Lock background scrolling when menu is open.
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when menu is closed.
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow when component unmounts.
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // This function ensures that when the window is resized to a width >= 768px (desktop view), the mobile menu is closed and scrolling is restored.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
      }
    };

    // Adding resize event listener and then cleaning it up on unmount.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    // When menu opens, refresh theme state in children
    window.dispatchEvent(new Event("storage"));
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-xs" : "py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10 transform transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95">
            <span className="text-glow text-foreground"> Aditya Bhati's </span>{" "}
            Portfolio
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
            >
              {item.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-[1000]"
        >
          {isMenuOpen ? (
            <X
              size={24}
              className="transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
            />
          ) : (
            <Menu
              size={24}
              className="transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
            />
          )}
        </button>

        {/* Mobile Menu Overlay - Essentially, when opened, the menu overlays all of the content (via z-index being set to 999) and occupies the entire viewport. */}
        {/* Also, background scrolling is disabled when the menu is open to prevent scrolling of the underlying content. */}
        <div
          className={cn(
            "fixed top-0 left-0 w-full h-screen bg-background z-[999] flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col justify-center items-center space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-5">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
