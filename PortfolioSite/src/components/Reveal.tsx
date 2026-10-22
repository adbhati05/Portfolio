import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fades and slides its children up into place. By default it plays once when scrolled into view,
// pass `onMount` to play immediately instead. `delay` (in seconds) is used to stagger groups of elements.
const Reveal = ({
  children,
  delay = 0,
  onMount = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  onMount?: boolean;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      {...(onMount
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
