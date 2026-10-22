import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

// Shared heading used at the top of every section: a two-tone title (e.g. "About" + "Me") with a short line that draws in underneath.
const SectionHeading = ({
  title,
  highlight,
}: {
  title: string;
  highlight: string;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className="mb-12 flex flex-col items-center gap-5 text-center md:mb-16">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        {title} <span className="text-muted-foreground">{highlight}</span>
      </h2>
      <motion.span
        aria-hidden
        className="h-px w-16 origin-center bg-foreground/40"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      />
    </Reveal>
  );
};

export default SectionHeading;
