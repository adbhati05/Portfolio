import Headshot from "../assets/headshot.jpg";
import Resume from "../assets/Resume - Aditya Bhati.pdf";
import { useState, useEffect} from "react";

export const AboutMeSection = () => {
  // Setting up state variable for typing animation text.
  const [text, setText] = useState("");

  // State variables to maintain current position in the text. Initialized to 0 (index of first text in textOptions).
  const [textIndex, setTextIndex] = useState(0);

  // State variable to track if currently deleting text.
  const [isDeleting, setIsDeleting] = useState(false);

  // Creating a list of text options for the typing animation.
  const textOptions = [
    "Full-Stack Developer",
    "ML Engineer",
    "Passionate CSE Student"
  ];
  
  // useEffect hook to handle typing and deleting effect.
  useEffect(() => {
    // Getting the current text to type/delete based on textIndex.
    const currentText = textOptions[textIndex];
    
    
    const typingEffect = setTimeout(() => {
      // If not currently deleting, type out the text.
      if (!isDeleting) {
        // Ensuring that the text we're typing is less than the full currentText.
        // If so, leverage setText and substring to add one character at a time.
        if (text.length < currentText.length) {
          setText(currentText.substring(0, text.length + 1));
        } else {
          // Finished typing, wait for 2 seconds and change set deleting state to true to begin deletion process.
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Ensuring that deletion will continue if there's text to delete.
        // Similar to typing, but now we remove one character at a time.
        if (text.length > 0) {
          setText(currentText.substring(0, text.length - 1));
        } else {
          // Finished deleting, set deleting state to false.
          setIsDeleting(false);

          // Update textIndex to point to the next text option in a cyclic manner via modulo.
          setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
        }
      }
    }, isDeleting ? 50 : 100); // Ensuring deletion is faster than typing.

    // Cleanup function to clear timeout on component unmount.
    return () => clearTimeout(typingEffect);
  }, [text, isDeleting, textIndex]);

  return (
    // GET A PROFESSIONAL HEADSHOT ASAP
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>
        {/* Headshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <img
              src={Headshot}
              alt="Headshot"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <h3 className="text-3xl text-primary font-semibold">
              { text } <span className="animate-blink"> | </span>
            </h3>
            <p className="text-muted-foreground">
              With over 2 years of experience in web development and roughly 1
              year of experience in deep learning, I am eager to contribute my
              skills and knowledge to innovative projects and teams.
            </p>
            <p className="text-muted-foreground">
              I am currently seeking Summer and Autumn 2026 internships/co-ops
              to gain more hands-on experience and grow professionally.
            </p>

            {/* Stats */}
            <div className="flex flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col items-center text-center">
                <label className="text-primary font-bold text-2xl">11</label>
                <span className="text-muted-foreground text-md mt-1">
                  Courses Completed
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <label className="text-primary font-semibold text-2xl">5</label>
                <span className="text-muted-foreground text-md mt-1">
                  Major Projects
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <label className="text-primary font-semibold text-2xl">
                  1x
                </label>
                <span className="text-muted-foreground text-md mt-1">
                  Hackathon Finalist
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get in Touch
              </a>

              <a
                href={Resume}
                className="px-7 py-2 rounded-full border border-primary text-primary hover:bg-primary/15 transition-colors duration-300"
              >
                {" "}
                My Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
