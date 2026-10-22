import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const RADIUS = 46;

// Full-screen loading page: my logo inside a ring that draws itself as loading progresses, with the percentage underneath.
// When `progress` is left out it acts as a plain indeterminate loader (a spinning arc), used while a page's code is still downloading.
const Loading = ({ progress }: { progress?: number }) => {
  const reduceMotion = useReducedMotion();
  const hasProgress = progress !== undefined;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background px-4"
    >
      <div role="status" aria-label="Loading" className="relative grid size-28 place-items-center">
        {/* Without a percentage the whole ring spins. */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 -rotate-90"
          aria-hidden
          animate={!hasProgress && !reduceMotion ? { rotate: 360 } : undefined}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        >
          {/* Faint full ring as the track. */}
          <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="1" className="stroke-border" />

          {hasProgress ? (
            // Arc that grows with the percentage.
            <motion.circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-foreground"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          ) : (
            // A quarter arc that travels around the track as the ring spins.
            <motion.circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-foreground"
              style={{ pathLength: 0.25 }}
            />
          )}
        </motion.svg>

        {/* Logo (from /public): scales in, then breathes gently while waiting. The black version shows in light mode, the white one in dark mode. */}
        <motion.div
          className="relative size-20"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          {/* Nudged right by 5%: the triangle's visual weight sits left of its geometric center, so this makes it look centered in the ring. */}
          <motion.div
            className="size-full translate-x-[5%]"
            animate={reduceMotion ? undefined : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >
            <img src="/AB_Icon.svg" alt="" className="size-full dark:hidden" />
            <img src="/AB_Icon_white.svg" alt="" className="hidden size-full dark:block" />
          </motion.div>
        </motion.div>
      </div>

      {/* Percentage (tabular figures so the width doesn't jump as digits change). */}
      <p className="h-4 font-mono text-xs tracking-[0.25em] text-muted-foreground tabular-nums">
        {hasProgress ? `${progress}%` : "LOADING"}
      </p>
    </motion.div>
  );
};

export default Loading;
