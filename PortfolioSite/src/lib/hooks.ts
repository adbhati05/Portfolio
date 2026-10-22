import { useSyncExternalStore } from "react";

// Subscribes to changes of the "dark" class on the root <html> element (which is where ThemeToggle stores the theme).
// A MutationObserver watches the class attribute, so every component using this hook re-renders when the theme flips.
const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

// Returns true when the site is in dark mode.
export const useIsDarkMode = () =>
  useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => true
  );

