import { useEffect, useState } from "react";
import GitHub from "../projects/github.svg";
import GitHubWhite from "../projects/github_white.svg";
import Robot from "../projects/Robot.jpg";
import SpotifyLogo from "../projects/Spotify Logo.webp";
import MarketPrediction from "../projects/Market Prediction.jpg";
import FitLog from "../projects/FitLog.jpg";
import DamageDetection from "../projects/Damage Detection.webp";

// TO-DO: Add details for each project later, don't make them exposed fully upon loading the page, have a "READ MORE" button or something similar. You can deploy the site for now, and come back to this when you have an idea of how to go into more detail for each project.

// Array of project objects containing details about each project, will be used to dynamically render project information in each project card.
const projects = [
  {
    id: 1,
    name: "Self-Made Motorized Robot",
    description:
      "Motorized robot capable of autonomous navigation via light sensors and programmed functions. Can also perform tasks on an obstacle course via arms driven by servo motors.",
    details: "",
    image: Robot,
    tags: ["C++", "Electronics", "Robotics"],
    githubURL: "https://github.com/jalenfran/FEHRobot",
  },
  {
    id: 2,
    name: "Artist Search Website",
    description:
      "Flask web application that allows users to search for a specific artist's followers, top songs, genres covered, and discography.",
    details: "",
    image: SpotifyLogo,
    tags: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Spotify Web API"],
    githubURL: "https://github.com/adbhati05/Web-Apps/tree/main/ArtistSearch",
  },
  {
    id: 3,
    name: "QuantiFiAI - Quant Trading System",
    description:
      "Quantitative trading system that combines numerous ML models and statistical analysis for market regime prediction.",
    details: "",
    image: MarketPrediction,
    tags: ["Python", "PyTorch", "Sci-Kit Learn", "Pandas"],
    githubURL: "https://github.com/SadeekFarhan21/QuantifyAI",
  },
  {
    id: 4,
    name: "FitLog - Outfit Logging Web App",
    description:
      "Social media platform that allows users to post worn outfits, interact with other users/posts, and plan future outfits.",
    details: "",
    image: FitLog,
    tags: ["React", "HTML", "CSS", "TypeScript", "Firebase"],
    githubURL: "https://github.com/adbhati05/Web-Apps/tree/main/CRUDApp",
  },
  {
    id: 5,
    name: "Damage Detector",
    description:
      "Object detection model that identifies and classifies the type of damage present on vehicles from images.",
    details: "",
    image: DamageDetection,
    tags: ["Python", "PyTorch", "NumPy", "YOLOv8", "Docker", "CVAT"],
    githubURL: "",
  },
];

export const ProjectsSection = () => {
  // State to track if a project has a GitHub URL (for conditional rendering of GitHub icon).
  // It's an array of booleans corresponding to each project.
  const [hasGitHubURLArray, setHasGitHubURLArray] = useState<boolean[]>([]);

  // On component mount, check if any project has a GitHub URL.
  useEffect(() => {
    // Using .map to generate an array of booleans indicating presence of GitHub URLs for each project (ensuring it's not an empty string).
    const githubURLStatus = projects.map((project) => project.githubURL !== "");
    setHasGitHubURLArray(githubURLStatus);
  }, []);

  // Tracking if website is in dark mode or light mode by checking the document's class list for "dark" class and ensuring it's not undefined (to avoid issues during server-side rendering).
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  // This function is the same approach used in SkillsSection.tsx to track changes to the theme (dark/light mode) dynamically.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      setIsDarkMode(root.classList.contains("dark"));
    };
    sync();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          sync();
          break;
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  // This function is the same approach used in SkillsSection.tsx to set the initial isDarkMode state based on user's system preference if no theme is set in localStorage.
  useEffect(() => {
    if (localStorage.getItem("theme")) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (matches: boolean) => setIsDarkMode(matches);

    apply(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }),
    [];

  return (
    <section id="projects" className="py-24 px-6 relative z-20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        {/* Brief description of what to expect in this section. */}
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my personal projects spanning deep learning, full-stack
          web applications, and robotics. Each project highlights my passion for
          technology and problem-solving.
        </p>

        {/* Grid layout for project cards, responsive to different screen sizes. */}
        {/* Mapping through the projects array to create individual project cards. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col"
            >
              {/* Project image with hover effect for slight zoom-in. */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project content area that grows to push GitHub icon to bottom */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Project tags displayed as badges. */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm font-medium rounded-full bg-primary/35 text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project name and description. */}
                <h3 className="text-xl font-semibold mb-2 text-left"> {project.name} </h3>
                <p className="text-muted-foreground mb-4 text-left">
                  {project.description}
                </p>

                {/* Project details - currently empty, can be expanded later. */}

                {/* Spacer to push GitHub icon to bottom */}
                <div className="flex-grow"></div>

                {/* GitHub link icon, dynamically rendered based on if the project has a GitHub URL. */}
                {hasGitHubURLArray[key] && (
                  <div className="mt-4 pt-4">
                    <a
                      href={project.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/20 transition-colors duration-300 group/link"
                    >
                      <img
                        src={isDarkMode ? GitHubWhite : GitHub}
                        alt="GitHub"
                        className="h-6 w-6"
                      />
                      <span className="text-sm font-medium font-primary">
                        GitHub
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
