import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    // This section serves as the hero area of the portfolio site, AKA the introduction. It contains my name, an elevator pitch, a call-to-action button, and a scroll down indicator.
    // The section is centered both vertically and horizontally, with padding for spacing. The text is styled to be responsive, adjusting size based on screen width.
    // The text/button elements have fade-in animations with staggered delays to create a smooth entrance effect when the page loads.
    // It also has an id of "hero" to allow for easy navigation from other parts of the site.
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Aditya
            </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-2">
              {" "}
              Bhati
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            A passionate Computer Science & Engineering student at The Ohio
            State University with a strong interest in ML and full-stack
            development. I enjoy applying what I learn to construct scalable,
            impactful solutions— from object detection models to dynamic web
            applications.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4 transform transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;