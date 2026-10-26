import { useRef } from "react";
import { cn } from "../lib/utils";
import { useInFocusOnTouch } from "../lib/hooks";

// A greyscale image that turns to color when its parent (with the "group" class) is hovered on desktop,
// or when it's scrolled to the middle of the screen on touch devices.
const FocusColorImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const inFocus = useInFocusOnTouch(ref);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(
        "grayscale transition-[filter] duration-700 group-hover:grayscale-0",
        inFocus && "grayscale-0",
        className
      )}
    />
  );
};

export default FocusColorImage;
