import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "../lib/utils";
import { useInFocusOnTouch } from "../lib/hooks";

const EASE = [0.65, 0, 0.35, 1] as const;

// An image that wipes into view from the bottom (via clip-path) while settling from a slight zoom, the first time it scrolls into view.
// It's greyscale to match the monochrome theme and fades to color when a parent with the "group" class is hovered,
// or (on touch devices, which can't hover) while it's scrolled to the middle of the screen.
const ImageReveal = ({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inFocus = useInFocusOnTouch(frameRef);

  const wipe: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE, delay } },
  };
  const zoom: Variants = {
    hidden: { scale: 1.08 },
    shown: { scale: 1, transition: { duration: 1.4, ease: EASE, delay } },
  };

  return (
    // The in-view trigger lives on this unclipped wrapper: a fully clipped element has no visible area, so it would never register as in view.
    // The clip and zoom below pick up the "hidden"/"shown" state from here.
    <motion.div
      ref={frameRef}
      className={cn("overflow-hidden", className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.div variants={wipe} className="h-full w-full">
        <motion.img
          src={src}
          alt={alt}
          variants={zoom}
          className={cn(
            "h-full w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0",
            inFocus && "grayscale-0",
            imgClassName
          )}
        />
      </motion.div>
    </motion.div>
  );
};

export default ImageReveal;
