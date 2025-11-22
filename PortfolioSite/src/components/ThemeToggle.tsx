import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  // Setting up a state variable to keep track of the current theme.
  const [isDarkMode, setToDarkMode] = useState(false);

  // This useEffect hook handles the logic for ensuring the user's chosen theme persists across sessions.
  // It also sets up an event listener for a custom "theme-change" event to sync the theme state across different components.
  useEffect(() => {
    // Accessing the root HTML element and checking local storage for theme preference.
    // If the stored theme is "dark" or if no theme is stored but the user's system preference is dark mode, apply dark mode.
    const root = window.document.documentElement;
    if (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setToDarkMode(true);
    };

    // This function checks the current theme and updates the isDarkMode state accordingly, it will be used to sync the theme across components.
    const syncTheme = () => {
      const isDark = root.classList.contains("dark");
      setToDarkMode(isDark);
    };

    // Creating a custom "theme-change" event listener by leveraging syncTheme above (also ensuring clean up is performed below).
    window.addEventListener("theme-change", syncTheme);

    return () => {
      window.removeEventListener("theme-change", syncTheme);
    };
  }, []);

  // Declaring the function that'll be used to toggle the theme, main condition being if site is currently in dark mode or not.
  const toggleTheme = () => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      // Removing the "dark" class from the root to ensure the site renders in light mode.
      // Storing the user's theme preference in local storage to ensure it persists across sessions (theme doesn't change when page is re-rendered).
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setToDarkMode(false);
    } else {
      // Adding the "dark" class to the root to ensure the site renders in dark mode.
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setToDarkMode(true);
    }

    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    // Below is the button for toggling themes, it leverages isDarkMode to distinguish between the two icons and toggleTheme to switch the theme when it's clicked.
    // cn utility function is used here to ensure the button has proper styling and integrates with the NavBar.
    <button
      onClick={toggleTheme}
      className={cn(
        // Layout and styling for the button.
        "p-2 rounded-full transition-colors duration-300",
        // Make the button a group so child icons can use group-hover/group-active.
        "group",
        // Keyboard focus styling.
        "focus:outline-none"
      )}
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300 transform transition-transform duration-150 ease-in-out group-hover:scale-110 group-active:scale-95" />
      ) : (
        <Moon className="h-6 w-6 text-gray-500 transform transition-transform duration-150 ease-in-out group-hover:scale-110 group-active:scale-95" />
      )}
    </button>
  );
};

export default ThemeToggle;
