import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  // Setting up a state variable to keep track of the current theme.
  const [isDarkMode, setToDarkMode] = useState(false);

  // Declaring the function that'll be used to toggle the theme, main condition being if site is currently in dark mode or not.
  const toggleTheme = () => {
    if (isDarkMode) {
        // Removing the "dark" class from the root to ensure the site renders in light mode.
        document.documentElement.classList.remove("dark");
        setToDarkMode(false);
    } else {
        // Adding the "dark" class to the root to ensure the site renders in dark mode.
        document.documentElement.classList.add("dark");
        setToDarkMode(true);
    }
  };

  return (
    // Below is the button for toggling themes, it leverages isDarkMode to distinguish between the two icons and toggleTheme to switch the theme when it's clicked.
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-gray-500" />
      )}
    </button>
  );
};

export default ThemeToggle;