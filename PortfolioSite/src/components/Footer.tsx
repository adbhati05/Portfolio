import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    // Footer section with copyright info and a back-to-top link.
    <footer className="relative z-20 mt-12 border-t border-border">
      <div className="container flex items-center justify-between gap-4 py-8">
        <p className="text-sm font-medium text-muted-foreground">
          &copy; {new Date().getFullYear()} Aditya Bhati. All rights reserved.
        </p>

        <a
          href="#hero"
          aria-label="Back to top"
          className="group grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
