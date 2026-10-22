import { ArrowUpRight, Globe } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import GitHub from "../projects/github.svg";
import GitHubWhite from "../projects/github_white.svg";
import Robot from "../projects/Robot.jpg";
import SpotifyLogo from "../projects/Spotify Logo.webp";
import MarketPrediction from "../projects/Market Prediction.jpg";
import FitLog from "../projects/FitLog.jpg";
import DamageDetector from "../projects/DamageDetector.png";
import Gallery from "../projects/Gallery.jpg";

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
    image: DamageDetector,
    tags: ["Python", "PyTorch", "YOLOv8", "FastAPI", "React", "Docker", "GCP"],
    githubURL: "https://github.com/adbhati05/AI-Experiments/tree/main/DamageDetector",
    url: "https://damagedetector.adityabdev.com"
  },
  {
    id: 6,
    name: "Igneous Rock Gallery",
    description: "Front-end web application that displays images of igneous rocks alongside facts about them. This was a side quest for my geology course!",
    details: "",
    image: Gallery,
    tags: ["Next.js", "Tailwind", "TypeScript", "React"],
    githubURL: "https://github.com/adbhati05/Web-Apps/tree/main/igneous-rocks",
    url: "https://gallery.adityabdev.com"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-6xl">
        <SectionHeading title="Featured" highlight="Projects" />

        {/* Grid layout for project cards, responsive to different screen sizes. */}
        {/* Mapping through the projects array to create individual project cards. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, key) => (
            <Reveal key={project.id} delay={(key % 3) * 0.1} className="h-full">
              <article className="card card-hover group flex h-full flex-col overflow-hidden text-left">
                {/* Project image: wipes into view, greyscale to match the monochrome theme, fading to color and zooming slightly on hover. */}
                <div className="overflow-hidden border-b border-border">
                  <ImageReveal
                    src={project.image}
                    alt={project.name}
                    delay={(key % 3) * 0.1 + 0.15}
                    className="aspect-[3/2]"
                    imgClassName="transition-[filter,scale] duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Project content area that grows to push GitHub link to bottom */}
                <div className="flex flex-grow flex-col p-6">
                  {/* Project name and description. */}
                  <h3 className="mb-2 text-lg font-semibold">{project.name}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Project tags displayed as badges. */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip font-mono text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project details - currently empty, can be expanded later. */}

                  {/* Spacer to push the links to the bottom */}
                  <div className="flex-grow" />

                  {/* Project links: "Live Site" (solid) if the project has a url, and GitHub (outlined, black icon in light mode, white icon in dark mode) if it has a GitHub URL. */}
                  <div className="flex gap-2">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-button group/link flex-1 gap-1.5 whitespace-nowrap px-3 py-2 sm:flex-none sm:gap-2 sm:px-4"
                      >
                        <Globe className="size-4" />
                        Live Site
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    )}

                    {project.githubURL !== "" && (
                      <a
                        href={project.githubURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-button-outline group/link flex-1 gap-1.5 whitespace-nowrap px-3 py-2 sm:flex-none sm:gap-2 sm:px-4"
                      >
                        <img src={GitHub} alt="" className="size-4 dark:hidden" />
                        <img src={GitHubWhite} alt="" className="hidden size-4 dark:block" />
                        GitHub
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
