import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../lib/utils";
import { useIsDarkMode } from "../lib/hooks";

const ThemeToggle = ({ className }: { className?: string }) => {
  // The initial theme is applied by a small script in index.html before the page paints (dark unless the user picked light).
  // useIsDarkMode keeps this button in sync with the "dark" class on the root element.
  const isDarkMode = useIsDarkMode();

  // Declaring the function that'll be used to toggle the theme, main condition being if site is currently in dark mode or not.
  // The user's choice is stored in local storage so it persists across sessions.
  const toggleTheme = () => {
    const root = window.document.documentElement;
    const nextIsDark = !isDarkMode;

    root.classList.toggle("dark", nextIsDark);
    try {
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (e.g. private mode), the theme still switches for this visit.
    }
  };

  return (
    // The icon spins and swaps between a sun and a moon when the theme changes.
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative grid size-10 place-items-center rounded-full bg-neutral-200 text-foreground dark:bg-neutral-900",
        "transition-transform duration-300 hover:scale-105 active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        className
      )}
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={isDarkMode ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDarkMode ? "sun" : "moon"}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
