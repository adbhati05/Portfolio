import AbleAT from "../experience/AbleAT.jpeg";
import { CalendarDays } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// This list contains my work experiences and details about them (company, role, duration, description, and an image representing the company).
// Descriptions are written as "- point one - point two", and each "- " starts a new bullet point on the card.
const experiences = [
  {
    company: "Able Applied Technologies",
    role: "Software Engineer Intern",
    duration: "Jun 2026 - Aug 2026",
    description: "- Architected on-demand data pipelines and an internal web portal to generate real-time company performance reports. - Programmed long term stress testing LCD hardware telemetry collection, visualization, and analysis.",
    image: AbleAT,
  },
];

// Splitting a description into bullet points on every " - " (a description without dashes stays as a single point).
const toBullets = (description: string) =>
  description
    .split(/(?:^|\s)-\s/)
    .map((point) => point.trim())
    .filter(Boolean);

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-4xl">
        <SectionHeading title="Work" highlight="Experience" />

        {/* Mapping the experiences array to a vertical timeline. Each entry has a dot on the line and a card with the company logo, name, role, duration, and the description as bullet points. */}
        <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-10">
          {experiences.map((experience, key) => (
            <li key={key} className="relative">
              {/* Timeline dot */}
              <span className="absolute -left-[31px] top-8 grid size-3 place-items-center rounded-full bg-foreground ring-4 ring-background sm:-left-[47px]" />

              <Reveal delay={key * 0.08}>
                <article className="card card-hover group p-6 text-left sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <img
                      src={experience.image}
                      alt={experience.company}
                      className="size-16 shrink-0 rounded-xl border border-border object-cover grayscale transition-all duration-500 group-hover:grayscale-0 sm:size-20"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold md:text-xl">
                            {experience.company}
                          </h3>
                          <p className="text-sm text-muted-foreground md:text-base">
                            {experience.role}
                          </p>
                        </div>
                        <span className="chip w-fit">
                          <CalendarDays className="size-3.5" />
                          {experience.duration}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {toBullets(experience.description).map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2.5 h-px w-3 shrink-0 bg-foreground/50" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
