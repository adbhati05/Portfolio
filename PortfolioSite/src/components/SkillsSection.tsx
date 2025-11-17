import { useState } from "react";
import cn from "../lib/utils";

// This list contains various skills I have and my proficiency levels in them.
const skills = [
  // Languages (frontend and backend).
  { name: "HTML", level: 95, category: "Language" },
  { name: "CSS", level: 95, category: "Language" },
  { name: "TypeScript", level: 90, category: "Language" },
  { name: "Java", level: 75, category: "Language" },
  { name: "Python", level: 95, category: "Language" },
  { name: "C", level: 85, category: "Language" },
  { name: "C++", level: 80, category: "Language" },
  { name: "SQL", level: 80, category: "Language" },

  // Frameworks/libraries (putting them all as frameworks for simplicity).
  { name: "React", level: 90, category: "Framework" },
  { name: "Tailwind", level: 85, category: "Framework" },
  { name: "PyTorch", level: 80, category: "Framework" },
  { name: "YOLOv8", level: 75, category: "Framework" },

  // Databases/Tools (putting them all as tools for simplicity).
  { name: "Firebase", level: 85, category: "Tool" },
  { name: "MongoDB", level: 75, category: "Tool" },
  { name: "AWS", level: 80, category: "Tool" },
  { name: "Git", level: 90, category: "Tool" },
];

const categories = ["All", "Language", "Framework", "Tool"];

export const SkillsSection = () => {
  // NOTE: CONSIDER ADDING ICONS FOR EACH SKILL LATER.
  // NOTE: ALSO CONSIDER ADDING ANIMATIONS FOR THE SKILL BARS AND HOW THE SKILLS MOVE INTO PLACE WHEN A CATEGORY BUTTON IS CLICKED).
  // State variable to track the current skill category filter that user has selected.
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtering the skills based on the activeCategory state. If "All" is selected, all skills are shown, otherwise only skills matching the selected category are displayed.
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="relative z-20 py-24 px-25 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {" "}
          Technical Skills
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
              "px-5 py-2 font rounded-full transition-colors duration-300 hover:scale-105 active:scale-95",
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
        {filteredSkills.map((skill, key) => (
          <div
            key={key}
            className="bg-card p-6 rounded-lg shadow-xs card-hover"
          >
            {/* Skill name  */}
            <div className="text-left mb-4">
              <h3 className="font-semibold font-lg">{skill.name}</h3>
            </div>

            {/* Skill level bar */}
            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease_out]"
                style={{ width: skill.level + "%" }}
              />
            </div>

            <div className="text-right mt-1">
              <span className="text-sm text-muted-foreground">
                {skill.level}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
