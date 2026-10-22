import Headshot from "../assets/Headshot.jpg";
import Resume from "../assets/Resume - Aditya Bhati.pdf";
import { ArrowUpRight, FileText } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import ImageReveal from "./ImageReveal";

// Stats shown under the description. Each number counts up from 0 once scrolled into view.
const stats = [
  { value: 14, suffix: "", label: "Courses Completed" },
  { value: 5, suffix: "", label: "Major Projects" },
  { value: 1, suffix: "x", label: "Hackathon Finalist" },
];

const AboutMeSection = () => {
  return (
    // GET A PROFESSIONAL HEADSHOT ASAP
    <section id="about" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-5xl">
        <SectionHeading title="About" highlight="Me" />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Headshot: wipes into view, greyscale to fit the monochrome theme and fading to color on hover. */}
          <div className="group flex justify-center">
            <ImageReveal
              src={Headshot}
              alt="Headshot"
              className="w-full max-w-sm rounded-3xl border border-border"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center gap-6 text-left">
            <Reveal delay={0.16} className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                With over 2 years of experience in web development and roughly 1
                year of experience in deep learning, I am eager to contribute my
                skills and knowledge to innovative projects and teams.
              </p>
              <p>
                I am currently seeking full-time opportunities
                to gain more hands-on experience and grow professionally.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.24}>
              <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card/60">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1 px-2 py-4 text-center">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl font-semibold tracking-tight"
                    />
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32} className="flex flex-wrap gap-3 pt-2">
              <a href="#contact" className="mono-button group">
                Get in Touch
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a href={Resume} className="mono-button-outline" target="_blank" rel="noopener noreferrer">
                <FileText className="size-4" />
                My Resume
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
