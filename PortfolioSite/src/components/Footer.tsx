import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    // Footer section with copyright info and back-to-top link.
    <footer className="py-12 px-5 bg-card relative border-t border-border mt-20 pt-8 flex flex-wrap justify-between items-center">
      <p className="text-sm text-muted-foreground font-semibold"> 
        &copy; {new Date().getFullYear()} Aditya Bhati. All rights reserved.
      </p>

    <a href="#hero" className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-300"> 
      <ArrowUp />
    </a>
    </footer>
  );
};

export default Footer;
