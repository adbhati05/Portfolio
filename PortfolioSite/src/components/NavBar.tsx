import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

// Setting up an array that holds the navigation bar's items and their corresponding hrefs.
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  // State variable to track if the user has scrolled down the page (used for styling the navbar on scroll).
  const [isScrolled, setIsScrolled] = useState(false);

  // State variable to track if the mobile menu is open or closed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo (to be determined) / Brand Name (in this case my name and Portfolio). Also serves as a link to the top of the page (hero section). */}
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          {" "}
          {/* Having my name have primary color styling and 'Portfolio' have foreground color styling for aesthetics. */}
          <span className="relative z-10 transform transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95">
            <span className="text-glow text-foreground"> Aditya Bhati's </span>{" "}
            Portfolio
          </span>
        </a>

        {/* Desktop Nav -  stays hidden when screen size is medium or less, horizontally laid out */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Nav - opened/closed via menu button, stays hidden when screen size is medium or less, vertically laid out */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {" "}
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;