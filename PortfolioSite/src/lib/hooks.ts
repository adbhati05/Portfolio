import { useSyncExternalStore, type RefObject } from "react";
import { useInView } from "motion/react";

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


// True on devices that can't hover (phones/tablets), where hover-only effects never trigger.
const subscribeToHoverSupport = (onChange: () => void) => {
  const mediaQuery = window.matchMedia("(hover: none)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

const useIsTouchOnly = () =>
  useSyncExternalStore(
    subscribeToHoverSupport,
    () => window.matchMedia("(hover: none)").matches,
    () => false
  );

// On touch devices, returns true while the element overlaps the middle band of the screen (the middle 30% of the viewport's height).
// Used to show images in color as they're scrolled to on mobile, the same way hovering does on desktop. Always false on devices that can hover.
export const useInFocusOnTouch = (ref: RefObject<Element | null>) => {
  const isTouchOnly = useIsTouchOnly();
  const isCentered = useInView(ref, { margin: "-35% 0px -35% 0px" });
  return isTouchOnly && isCentered;
};
