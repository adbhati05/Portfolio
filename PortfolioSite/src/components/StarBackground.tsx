import { useState, useEffect } from "react";

// Defining Star props: id, size, x, y, opacity, animationDuration.
interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
}

export const StarBackground = () => {
  // Setting up state variable to hold the array of stars.
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    generateStars();
  }, []);

  const generateStars = () => {
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

    // Updating the stars state with the newly generated stars.
    setStars(newStars);
  };
  // Rendering each star as a div via mapping over the stars array.
  // Each star is styled inline based on its properties to position and animate it correctly.
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
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
    </div>
  );
};

export default StarBackground;