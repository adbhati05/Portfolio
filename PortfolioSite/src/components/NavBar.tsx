import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  House,
  User,
  Briefcase,
  Lightbulb,
  FolderGit2,
  GraduationCap,
  Mail,
} from "lucide-react";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useSplashDone } from "../lib/splash";

// Setting up an array that holds the navigation bar's items, their corresponding section ids, and an icon for each.
const navItems = [
  { name: "Home", id: "hero", icon: House },
  { name: "About", id: "about", icon: User },
  { name: "Experience", id: "experience", icon: Briefcase },
  { name: "Skills", id: "skills", icon: Lightbulb },
  { name: "Projects", id: "projects", icon: FolderGit2 },
  { name: "Education", id: "education", icon: GraduationCap },
  { name: "Contact", id: "contact", icon: Mail },
];

// How far below the top of the viewport a section has to reach before it counts as the "current" section.
const SPY_OFFSET = 140;

const NavBar = () => {
  // State variable to track if the user has scrolled down the page (used to give the floating bar a shadow).
  const [isScrolled, setIsScrolled] = useState(false);

  // Index of the section currently on screen, which gets the sliding highlight.
  const [activeIndex, setActiveIndex] = useState(0);

  // While the page smooth-scrolls after a click, the scroll spy is paused so the highlight doesn't slide through every section in between.
  const scrollLock = useRef(false);
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const splashDone = useSplashDone();
  const reduceMotion = useReducedMotion();

  // This useEffect hook tracks the scroll position to (1) toggle the shadow and (2) work out which section is currently in view.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (scrollLock.current) return;

      // If we've hit the bottom of the page, the last section is active even if it's too short to reach the offset.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) {
        setActiveIndex(navItems.length - 1);
        return;
      }

      // Otherwise, the active section is the last one whose top has scrolled past the offset line.
      let current = 0;
      navItems.forEach((item, index) => {
        const top = document.getElementById(item.id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= SPY_OFFSET) current = index;
      });
      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(scrollLockTimer.current);
    };
  }, []);

  // Clicking an item highlights it right away and pauses the scroll spy until the smooth scroll has (mostly) finished.
  const handleSelect = (index: number) => {
    setActiveIndex(index);
    scrollLock.current = true;
    clearTimeout(scrollLockTimer.current);
    scrollLockTimer.current = setTimeout(() => {
      scrollLock.current = false;
    }, 900);
  };

  return (
    // The navbar floats at the top-center of the screen as a rounded pill: section links (icons, plus labels on large screens) and the theme toggle.
    // It drops in from above once the loading splash is gone.
    <motion.header
      initial={reduceMotion ? false : { y: -80, opacity: 0 }}
      animate={splashDone ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5"
    >
      <nav
        aria-label="Sections"
        className={cn(
          "pointer-events-auto flex items-center gap-0.5 rounded-full border border-border bg-background/70 p-1 backdrop-blur-xl transition-shadow duration-300 sm:gap-1",
          isScrolled && "shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)]"
        )}
      >
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleSelect(index)}
              aria-current={isActive ? "location" : undefined}
              title={item.name}
              aria-label={item.name}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium transition-colors duration-300 min-[360px]:px-2.5 sm:px-3 lg:px-4",
                isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* The highlight is one shared layout element, so it slides from the old item to the new one. */}
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {/* Icons and labels sit above the sliding highlight (z-10), so it never covers one as it passes by. */}
              <Icon className="relative z-10 size-4 shrink-0" />
              {/* Labels only show on large screens, smaller screens get an icon-only bar that still fits on narrow phones. */}
              <span className="relative z-10 hidden lg:inline">{item.name}</span>
            </a>
          );
        })}

        <span aria-hidden className="mx-0.5 h-5 w-px bg-border min-[360px]:mx-1" />
        <ThemeToggle className="size-8 bg-transparent hover:bg-muted dark:bg-transparent min-[360px]:size-9" />
      </nav>
    </motion.header>
  );
};

export default NavBar;
