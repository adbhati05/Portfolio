import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

// TO-DO: Consider adding a contact form that sends emails via a service like EmailJS or Formspree.

export const ContactSection = () => {
  return (
    // Contact section card with email and LinkedIn links.
    // The card is centered and styled with padding, rounded corners, and hover effects.
    // It also has its width adjust responsively based on screen size.
    <section id="contact" className="relative z-20 py-24 px-4 flex justify-center">
      <div className="bg-card py-10 px-6 rounded-xl card-hover shadow-xs w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2">
        <div className="flex-column justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">      
            Contact <span className="text-primary"> Me </span>
          </h2>

          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or
            just connecting!
          </p>

          {/* Contact links styled as buttons. */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:adbhati75@gmail.com" className="text-primary px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/20 transition-colors duration-300 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              <span className="text-primary text-md font-medium"> Send Email </span>
            </a>

            <a href="https://www.linkedin.com/in/aditya-bhati-b1425a325/" target="_blank" rel="noopener noreferrer" className="text-primary px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/20 transition-colors duration-300 flex items-center gap-2">
              <FaLinkedin className="w-6 h-6 text-primary" />
              <span className="text-primary text-md font-medium"> LinkedIn </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
