import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useSplashDone } from "../lib/splash";

// Words of the heading, each slides up from behind a mask one after another.
const HEADING = [
  { text: "Hi,", muted: true },
  { text: "I'm", muted: true },
  { text: "Aditya", muted: false },
  { text: "Bhati", muted: false },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const splashDone = useSplashDone();

  // Fade/slide entrance shared by the paragraph, button and scroll indicator; `delay` staggers them. It holds until the loading splash is gone.
  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: splashDone ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    // This section serves as the hero area of the portfolio site, AKA the introduction. It contains my name, an elevator pitch, a call-to-action button, and a scroll down indicator.
    // It also has an id of "hero" to allow for easy navigation from other parts of the site.
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Each word sits in an overflow-hidden wrapper, so it appears to rise out of an invisible line. */}
        <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          {HEADING.map((word, index) => (
            <span key={word.text} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${word.muted ? "text-muted-foreground" : ""}`}
                initial={reduceMotion ? false : { y: "110%" }}
                animate={splashDone ? { y: "0%" } : undefined}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + index * 0.1 }}
              >
                {word.text}
                {index < HEADING.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...enter(0.6)}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A passionate Computer Science & Engineering student at The Ohio
          State University with a strong interest in ML and full-stack
          development. I enjoy applying what I learn to construct scalable,
          impactful solutions; from object detection models to dynamic web
          applications.
        </motion.p>

        <motion.div {...enter(0.75)} className="mt-10 flex justify-center">
          <a href="#projects" className="mono-button group">
            View My Work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator: a mouse outline with a dot that slides down. Pinned to the bottom of the hero. */}
      <motion.a
        href="#about"
        {...enter(1)}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-xs font-medium">Scroll Down</span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="size-1 rounded-full bg-current animate-scroll-dot" />
        </span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
