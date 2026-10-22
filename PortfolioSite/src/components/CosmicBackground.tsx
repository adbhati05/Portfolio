import { useState, useEffect } from "react";
import { useIsDarkMode } from "../lib/hooks";

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

const generateStars = (): Star[] => {
  // This variable determines the number of stars to generate based on the screen size (Math.floor used here to truncate the value to ensure we get a whole number of stars).
  // Fewer and smaller than before, so they stay a quiet texture behind the monochrome content.
  const numStars = Math.floor(
    (window.innerWidth * window.innerHeight) / 14000
  );

  // This loop carries out the actual star generation process.
  return Array.from({ length: numStars }, (_, i) => ({
    id: i, // Assigning a unique ID (in this case index in the array) to each star.
    size: Math.random() * 2 + 0.5, // Random star sizes between 0.5 and 2.5 pixels.
    x: Math.random() * 100, // Random x position within the entire width.
    y: Math.random() * 100, // Random y position within the entire height.
    opacity: Math.random() * 0.5 + 0.2, // Random opacity between 0.2 and 0.7 to have some stars dimmer than others.
    animationDuration: Math.random() * 4 + 2, // Random animation duration between 2s and 6s for twinkling effect.
  }));
};

const generateMeteors = (): Meteor[] => {
  // Setting the number of meteors on screen to be a fixed value of 3 (since they're more visually prominent than stars).
  return Array.from({ length: 3 }, (_, i) => {
    const durationVal = Math.random() * 3 + 7; // Random animation duration between 7s and 10s for the meteor to traverse the screen.
    const delayVal = -Math.random() * durationVal; // Negative delay to stagger the meteors' start times (ensures continuous meteor flow).

    return {
      id: i,
      size: Math.random() * 1.5 + 0.5, // Random meteor sizes between 0.5 and 2 pixels.
      x: Math.random() * 100, // Random x position within the entire width.
      y: Math.random() * 20, // Random y position within the top 20% of the screen.
      delay: delayVal,
      animationDuration: durationVal,
    };
  });
};

const CosmicBackground = () => {
  // Setting up state variables to hold the arrays of stars and meteors.
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // Stars and meteors only show in dark mode, so they're regenerated/cleared whenever the theme changes.
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    if (!isDarkMode) {
      setStars([]);
      setMeteors([]);
      return;
    }

    setStars(generateStars());
    setMeteors(generateMeteors());

    // Regenerating stars on window resize to ensure no clutter (this is done via an event listener that detects window resize events).
    // Also making sure to clean up the event listener when the component unmounts to prevent memory leaks.
    const handleResize = () => setStars(generateStars());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  // Rendering a faint grid (both themes) that fades out away from the top, then each star/meteor as a div via mapping over the arrays.
  // Each star is styled inline based on its properties to position and animate it correctly.
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
        }}
      />

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
            width: meteor.size * 60 + "px", // Multiplying the width by 60 to make the meteors have a visible trail.
            height: meteor.size + "px",
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
