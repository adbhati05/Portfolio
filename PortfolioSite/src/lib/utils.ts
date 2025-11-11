import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This utility function allows me to combine class names and conditionally apply them.
// Essentially, if I want to reuse a component but change some of its styling properties (not all), instead of creating a whole new class in the CSS file, I can just pass in the new class names as arguments to this function along with the original class names.
// The clsx library helps to conditionally join class names together, while tailwind-merge ensures that conflicting Tailwind CSS classes are merged correctly.
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export default cn;