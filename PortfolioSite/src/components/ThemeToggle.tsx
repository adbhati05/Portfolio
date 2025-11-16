import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  // Setting up a state variable to keep track of the current theme.
  const [isDarkMode, setToDarkMode] = useState(false);

  // This useEffect hook handles the logic for ensuring the user's chosen theme persists across sessions.
  // It checks local storage for a stored theme preference when the component mounts and applies that theme accordingly.
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setToDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setToDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Declaring the function that'll be used to toggle the theme, main condition being if site is currently in dark mode or not.
  const toggleTheme = () => {
    if (isDarkMode) {
      // Removing the "dark" class from the root to ensure the site renders in light mode.
      // Storing the user's theme preference in local storage to ensure it persists across sessions (theme doesn't change when page is re-rendered).
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setToDarkMode(false);
    } else {
      // Adding the "dark" class to the root to ensure the site renders in dark mode.
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setToDarkMode(true);
    }
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
