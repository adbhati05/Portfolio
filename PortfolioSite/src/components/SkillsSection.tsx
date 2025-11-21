import { useState, useEffect } from "react";
import cn from "../lib/utils";
import aws from "../skills/aws.svg";
import C from "../skills/C.svg";
import Cpp from "../skills/C++.svg";
import css from "../skills/css.svg";
import docker from "../skills/docker.svg";
import firebase from "../skills/firebase.svg";
import git from "../skills/git.svg";
import html from "../skills/html.svg";
import java from "../skills/java.svg";
import mongodb from "../skills/mongodb.svg";
import opencv from "../skills/opencv.svg";
import python from "../skills/python.svg";
import pytorch from "../skills/pytorch.svg";
import react from "../skills/react.svg";
import sql from "../skills/sql.svg";
import tailwind from "../skills/tailwind.svg";
import ts from "../skills/ts.svg";
import ultralytics from "../skills/ultralytics.svg";
import aws_white from "../skills/aws_white.svg";
import C_white from "../skills/C_white.svg";
import Cpp_white from "../skills/C++_white.svg";
import css_white from "../skills/css_white.svg";
import docker_white from "../skills/docker_white.svg";
import firebase_white from "../skills/firebase_white.svg";
import git_white from "../skills/git_white.svg";
import html_white from "../skills/html_white.svg";
import java_white from "../skills/java_white.svg";
import mongodb_white from "../skills/mongodb_white.svg";
import opencv_white from "../skills/opencv_white.svg";
import python_white from "../skills/python_white.svg";
import pytorch_white from "../skills/pytorch_white.svg";
import react_white from "../skills/react_white.svg";
import sql_white from "../skills/sql_white.svg";
import tailwind_white from "../skills/tailwind_white.svg";
import ts_white from "../skills/ts_white.svg";
import ultralytics_white from "../skills/ultralytics_white.svg";

// TO-DO: Consider adding animations for each skill moving into place when a category button is clicked (do this via keyframes/animation declarations in index.css).

// This list contains various skills I have and my proficiency levels in them.
const skills = [
  // Languages (frontend and backend).
  {
    name: "HTML",
    category: "Language",
    svgPath: html,
    whitesvgPath: html_white,
  },
  { name: "CSS", 
    category: "Language", 
    svgPath: css, 
    whitesvgPath: css_white 
  },
  {
    name: "TypeScript",
    category: "Language",
    svgPath: ts,
    whitesvgPath: ts_white,
  },
  {
    name: "Java",
    category: "Language",
    svgPath: java,
    whitesvgPath: java_white,
  },
  {
    name: "Python",
    category: "Language",
    svgPath: python,
    whitesvgPath: python_white,
  },
  { 
    name: "C", 
    category: "Language", 
    svgPath: C, 
    whitesvgPath: C_white 
  },
  { 
    name: "C++", 
    category: "Language", 
    svgPath: Cpp, 
    whitesvgPath: Cpp_white 
  },
  { 
    name: "SQL",
    category: "Language", 
    svgPath: sql, 
    whitesvgPath: sql_white },

  // Frameworks/libraries (putting them all as frameworks for simplicity).
  {
    name: "React",
    category: "Framework",
    svgPath: react,
    whitesvgPath: react_white,
  },
  {
    name: "Tailwind",
    category: "Framework",
    svgPath: tailwind,
    whitesvgPath: tailwind_white,
  },
  {
    name: "PyTorch",
    category: "Framework",
    svgPath: pytorch,
    whitesvgPath: pytorch_white,
  },
  {
    name: "YOLOv8",
    category: "Framework",
    svgPath: ultralytics,
    whitesvgPath: ultralytics_white,
  },

  // Databases/Tools (putting them all as tools for simplicity).
  {
    name: "Firebase",
    category: "Tool",
    svgPath: firebase,
    whitesvgPath: firebase_white,
  },
  {
    name: "MongoDB",
    category: "Tool",
    svgPath: mongodb,
    whitesvgPath: mongodb_white,
  },
  { 
    name: "AWS", 
    category: "Tool", 
    svgPath: aws, 
    whitesvgPath: aws_white 
  },
  { 
    name: "Git", 
    category: "Tool", 
    svgPath: git, 
    whitesvgPath: git_white 
  },
  {
    name: "Docker",
    category: "Tool",
    svgPath: docker,
    whitesvgPath: docker_white,
  },
  {
    name: "OpenCV",
    category: "Tool",
    svgPath: opencv,
    whitesvgPath: opencv_white,
  },
];

const categories = ["All", "Language", "Framework", "Tool"];

export const SkillsSection = () => {
  // State variable to track the current skill category filter that user has selected.
  const [activeCategory, setActiveCategory] = useState("All");

  // Tracking if website is in dark mode or light mode by checking the document's class list for "dark" class and ensuring it's not undefined (to avoid issues during server-side rendering).
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  // This useEffect hook sets up a MutationObserver to monitor changes to the document's class list. This is a similar approach to the one used in CosmicBackground.tsx to track theme changes.
  useEffect(() => {
    // Setting up sync function to update isDarkMode state based on presence of "dark" class.
    const root = document.documentElement;
    const sync = () => {
      setIsDarkMode(root.classList.contains("dark"));
    };
    sync();

    // Setting up a MutationObserver to track changes to the class attribute of the document's root element (if user changes themes) and calling sync() appropriately.
    // The theme is located in the root element's class list, it's either "dark" or null (light mode).
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          sync();
          break;
        }
      }
    });

    // Start observing the root element for attribute changes.
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Cleanup function to disconnect the observer when component unmounts.
    return () => {
      observer.disconnect();
    };
  }, []);

  // This useEffect hook sets the initial isDarkMode state based on the user's system preference if no theme is set in localStorage.
  // It handles cases like the user rendering the website for the first time (no theme set in localStorage) and renders the icons according to their system preference.
  useEffect(() => {
    // If a theme is already set in localStorage, do not override it with system preference.
    if (localStorage.getItem("theme")) return;

    // Setting up a media query to detect if the user prefers dark mode.
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Function that sets the isDarkMode state based on whether the media query matches.
    const apply = (matches: boolean) => setIsDarkMode(matches);

    // Initial check to set the isDarkMode state based on current system preference.
    apply(mediaQuery.matches);

    // Creating the event listener that will listen for changes in the media query (i.e., if the user changes their system color scheme preference) and update the isDarkMode state accordingly.
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Cleanup function to remove the event listener when component unmounts.
    return () => mediaQuery.removeEventListener("change", handler);
  }), [];

  // Filtering the skills based on the activeCategory state. If "All" is selected, all skills are shown, otherwise only skills matching the selected category are displayed.
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative z-20 py-24 px-30 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {" "}
          Technical <span className="text-primary"> Skills </span>
        </h2>
      </div>

      {/* Mapping the categories array (as well as their keys) to individual category filter buttons. */}
      {/* When a button is clicked, it updates the activeCategory state to filter the displayed skills accordingly (and also updates the button's styling). */}
      <div className="relative z-20 flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category, key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "cosmic-button font-normal",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/5 text-foreground hover:bg-foreground/10"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Mapping the skills array (as well as their keys) to individual skill cards. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="bg-card p-6 rounded-lg shadow-xs card-hover"
          >
            {/* Skill names and icons (both dark and light mode).  */}
            <div className="justify-center items-center flex flex-col">
              <img
                src={isDarkMode ? skill.whitesvgPath : skill.svgPath}
                alt={skill.name}
                className="w-12 h-12 mb-2"
              />
              <h3 className="text-primary font-semibold font-lg">
                {skill.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;