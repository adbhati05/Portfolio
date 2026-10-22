import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// A number that counts up from 0 to `value` (easing out) the first time it scrolls into view.
// The text is written straight to the DOM on each frame, so counting doesn't re-render the component.
const CountUp = ({
  value,
  decimals = 0,
  duration = 1.6,
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const format = (n: number) => n.toFixed(decimals) + suffix;
    if (reduceMotion) {
      el.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, suffix, reduceMotion]);

  // tabular-nums keeps every digit the same width, so the number doesn't jitter while counting.
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {(0).toFixed(decimals) + suffix}
    </span>
  );
};

export default CountUp;
