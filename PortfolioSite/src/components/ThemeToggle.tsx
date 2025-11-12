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
    // cn utility function is used here to ensure the button remains in the top-right corner of the screen and has proper styling.
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outline-hidden",
        "transform transition-transform duration-150 ease-in-out hover:scale-115 active:scale-95"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-gray-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
