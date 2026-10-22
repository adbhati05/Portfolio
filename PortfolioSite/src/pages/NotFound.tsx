import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, Mail } from "lucide-react";
import CosmicBackground from "../components/CosmicBackground";
import ThemeToggle from "../components/ThemeToggle";
import Reveal from "../components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

// The three digits of "404". `depth` is how strongly each one shifts with the cursor (different depths give a parallax feel).
const DIGITS = [
  { char: "4", depth: 18, muted: false },
  { char: "0", depth: -28, muted: true },
  { char: "4", depth: 12, muted: false },
];

// One digit: rises in on load, floats up and down on its own rhythm, and leans with the cursor.
const Digit = ({
  char,
  depth,
  muted,
  index,
  pointerX,
  pointerY,
}: (typeof DIGITS)[number] & {
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) => {
  const reduceMotion = useReducedMotion();
  const x = useTransform(pointerX, (v) => v * depth);
  const y = useTransform(pointerY, (v) => v * depth);
  const rotate = useTransform(pointerX, (v) => v * depth * 0.2);

  return (
    // Outer layer leans with the cursor, middle layer floats, inner layer rises in from behind a mask.
    <motion.span style={{ x, y, rotate }} className="inline-block">
      <motion.span
        className="inline-block"
        animate={reduceMotion ? undefined : { y: ["0%", "-3%", "0%", "3%", "0%"] }}
        // Each digit starts its float at a different time, so they don't move in unison.
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 + index * 0.6 }}
      >
        <span className="inline-block overflow-hidden pb-[0.05em]">
          <motion.span
            className={`inline-block ${muted ? "text-muted-foreground" : ""}`}
            initial={reduceMotion ? false : { y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: index * 0.1 }}
          >
            {char}
          </motion.span>
        </span>
      </motion.span>
    </motion.span>
  );
};

const NotFound = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  // Pointer position normalised to -1..1 across the window, smoothed with springs.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, rawX, rawY]);

  return (
    // Custom 404 page shown for any route that doesn't exist.
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 text-foreground">
      <CosmicBackground />

      <ThemeToggle className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6" />

      <main className="relative z-10 flex flex-col items-center gap-5 text-center">
        <h1 className="sr-only">Page not found</h1>

        <div
          aria-hidden
          className="flex select-none gap-[0.04em] text-[7rem] font-semibold leading-none tracking-tighter sm:text-[10rem] lg:text-[13rem]"
        >
          {DIGITS.map((digit, index) => (
            <Digit
              key={index}
              {...digit}
              index={index}
              pointerX={pointerX}
              pointerY={pointerY}
            />
          ))}
        </div>

        <Reveal onMount delay={0.3}>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Lost in space.
          </p>
        </Reveal>

        <Reveal onMount delay={0.4}>
          <p className="max-w-md text-muted-foreground sm:text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="mt-3 break-all font-mono text-xs text-muted-foreground/70">
            {pathname}
          </p>
        </Reveal>

        <Reveal onMount delay={0.5} className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Link to="/" className="mono-button group">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <a href="mailto:adbhati75@gmail.com" className="mono-button-outline">
            <Mail className="size-4" />
            Send Email
          </a>
        </Reveal>
      </main>
    </div>
  );
};

export default NotFound;
