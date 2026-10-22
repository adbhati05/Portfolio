import { Mail, ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// TO-DO: Consider adding a contact form that sends emails via a service like EmailJS or Formspree.

const ContactSection = () => {
  return (
    // Contact section card with email and LinkedIn links.
    // The card is centered, has a soft spotlight glow at the top, and its width adjusts responsively based on screen size.
    <section id="contact" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-3xl">
        <SectionHeading title="Contact" highlight="Me" />

        <Reveal>
          <div className="card relative overflow-hidden px-6 py-12 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-3/4 rounded-full bg-foreground/[0.06] blur-3xl"
            />

            <p className="relative mx-auto mb-10 max-w-xl text-lg text-muted-foreground md:text-xl">
              I'm always open to discussing new opportunities, collaborations, or
              just connecting!
            </p>

            {/* Contact links styled as buttons. */}
            <div className="relative flex flex-col justify-center gap-3 sm:flex-row">
              <a href="mailto:adbhati75@gmail.com" className="mono-button group">
                <Mail className="size-4" />
                Send Email
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/aditya-bhati-b1425a325/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono-button-outline group"
              >
                <FaLinkedin className="size-4" />
                LinkedIn
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
