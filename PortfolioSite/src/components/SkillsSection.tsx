import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Layers, Hammer, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
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

// An icon for each category filter button.
const categoryIcons: Record<string, ReactNode> = {
  All: <Sparkles className="size-4" />,
  Language: <Code2 className="size-4" />,
  Framework: <Layers className="size-4" />,
  Tool: <Hammer className="size-4" />,
};

const SkillsSection = () => {
  // State variable to track the current skill category filter that user has selected.
  const [activeCategory, setActiveCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  // Filtering the skills based on the activeCategory state. If "All" is selected, all skills are shown, otherwise only skills matching the selected category are displayed.
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-5xl">
        <SectionHeading title="Technical" highlight="Skills" />

        {/* Mapping the categories array to filter buttons inside a rounded track. */}
        {/* The active button's background is a shared layout element, so it slides from one button to the next when the filter changes. */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex justify-center gap-0.5 rounded-full sm:gap-1 border border-border bg-card/60 p-1 backdrop-blur-sm">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 sm:px-4",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-active-filter"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span className="hidden sm:inline">{categoryIcons[category]}</span>
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mapping the filtered skills to individual skill cards. */}
        {/* The grid is keyed by the active category, so every filter change mounts a fresh set of cards that fade/scale in one after another. */}
        {/* Nothing has to animate out, so tapping quickly through the filters can't leave a card stuck half-faded. */}
        <Reveal>
          <div
            key={activeCategory}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : index * 0.03 }}
                className="card card-hover group flex flex-col items-center justify-center gap-3 p-5"
              >
                {/* Skill icons: the black version in light mode, the white version in dark mode. */}
                <img
                  src={skill.svgPath}
                  alt=""
                  className="size-10 opacity-80 transition-[opacity,scale] duration-300 group-hover:scale-110 group-hover:opacity-100 dark:hidden"
                />
                <img
                  src={skill.whitesvgPath}
                  alt=""
                  className="hidden size-10 opacity-80 transition-[opacity,scale] duration-300 group-hover:scale-110 group-hover:opacity-100 dark:block"
                />
                <h3 className="text-sm font-medium">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsSection;
