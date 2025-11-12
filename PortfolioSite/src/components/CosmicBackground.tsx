import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";

// Defining Star props: id, size, x, y, opacity, animationDuration.
interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
}

// Defining Meteor props: id, size, x, y, delay, animationDuration.
interface Meteor {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
}

export const CosmicBackground = () => {
  // Setting up state variables to hold the arrays of stars and meteors.
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // Setting up a reference to hold the MutationObserver instance.
  const observerRef = useRef<MutationObserver | null>(null);

  // Function to check if the current theme is dark mode (returns boolean).
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  // useEffect hook to generate stars and meteors when the component mounts.
  useEffect(() => {
    // If already in dark mode when component mounts, generate stars and meteors.
    if (isDarkMode()) {
      generateStars();
      generateMeteors();
    }

    // Setting up a MutationObserver to have the cosmic background be generated or cleared based on theme changes.
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (isDarkMode()) {
        generateStars();
        generateMeteors();
      } else {
        setStars([]);
        setMeteors([]);
      }
    });

    // Configuring the observer to ONLY watch the class attribute on the root element to detect theme changes.
    observer.observe(root, { 
      attributes: true, 
      attributeFilter: ["class"]
    });
    observerRef.current = observer;

    // Regenerating stars on window resize to ensure no clutter (this is done via an event listener that detects window resize events).
    // Also making sure to clean up the event listener when the component unmounts to prevent memory leaks.
    const handleResize = () => {
      // Only regenerate if in dark mode.
      if (isDarkMode()) {
        generateStars();
        generateMeteors();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      // Disconnecting the MutationObserver when the component unmounts to prevent memory leaks.
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const generateStars = () => {
    // If not in dark mode, do not generate stars.
    if (!isDarkMode()) return;

    // This variable determines the number of stars to generate based on the screen size (Math.floor used here to truncate the value to ensure we get a whole number of stars).
    const numStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    // This array will be populated with randomly generated stars in the loop below.
    const newStars: Star[] = [];

    // This loop carries out the actual star generation process.
    for (let i = 0; i < numStars; i++) {
      newStars.push({
        id: i, // Assigning a unique ID (in this case index in newStars) to each star.
        size: Math.random() * 3 + 1, // Randomly star sizes between 1 and 4 pixels.
        x: Math.random() * 100, // Random x position within the entire width.
        y: Math.random() * 100, // Random y position within the entire height.
        opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1 to have some stars dimmer than others.
        animationDuration: Math.random() * 4 + 2, // Random animation duration between 2s and 6s for twinkling effect.
      });
    }

    // Updating the stars state with the newly generated stars array.
    setStars(newStars);
  };

  const generateMeteors = () => {
    // If not in dark mode, do not generate meteors.
    if (!isDarkMode()) return;

    // Setting the number of meteors on screen to be a fixed value of 4 (since they're more visually prominent than stars).
    const numMeteors = 4;

    // This array will be populated with randomly generated meteors in the loop below.
    const newMeteors: Meteor[] = [];

    for (let i = 0; i < numMeteors; i++) {
      const durationVal = Math.random() * 3 + 6; // Random animation duration between 6s and 9s for the meteor to traverse the screen.
      const delayVal = -Math.random() * durationVal; // Negative delay to stagger the meteors' start times (ensures continuous meteor flow).

      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1, // Randomly meteor sizes between 1 and 3 pixels.
        x: Math.random() * 100, // Random x position within the entire width.
        y: Math.random() * 20, // Random y position within the top 20% of the screen.
        delay: delayVal,
        animationDuration: durationVal,
      });
    }

    // Updating the meteors state with the newly generated meteors array.
    setMeteors(newMeteors);
  };

  // Rendering each star as a div via mapping over the stars array (doing the same for meteors).
  // Each star is styled inline based on its properties to position and animate it correctly.
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          // Applying the star class and subtle pulse animation declared in index.css.
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          // Applying the meteor class and animation declared in index.css.
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px", // Multiplying the width by 50 to make the meteors have a visible trail.
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};

export default CosmicBackground;