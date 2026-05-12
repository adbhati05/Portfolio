import AbleAT from "../experience/AbleAT.jpeg";

// This list contains my work experiences and details about them (company, role, duration, description, and an image representing the company).
const experiences = [
  {
    company: "Able Applied Technologies",
    role: "Software Engineer Intern",
    duration: "Jun 2026 - Aug 2026",
    description: "Incoming Summer 2026",
    image: AbleAT,
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative z-20 py-24 w-4/5 lg:w-2/3 mx-auto"
    >
      <div className="container mx-auto max-w-5xl justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Work <span className="text-primary"> Experience </span>
        </h2>
      </div>

      {/* Mapping the experiences array (as well as their keys) to individual experience cards. Each card displays the company logo, name, role, duration, and a brief description of the experience. */}
      <div className="w-full">
        <div className="bg-card py-10 px-6 rounded-xl shadow-xs card-hover w-full">
          {experiences.map((experience, key) => (
            <div
              key={key}
              className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4"
            >
              <div className="flex flex-row gap-6 justify-start items-center">
                <img
                  src={experience.image}
                  alt={experience.company}
                  className="w-32 h-32 object-cover rounded-md border border-primary"
                />
                <div className="flex flex-col justify-center items-start">
                  <p className="text-left text-md lg:text-xl font-semibold mb-2">
                    {experience.company}
                  </p>
                  <p className="text-left text-sm lg:text-md font-semibold text-primary mb-4">
                    {experience.role}
                  </p>
                  <p className="text-left text-muted-foreground">
                    {experience.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-3 justify-start items-center">
                <p className="rounded-full bg-primary/20 px-4 py-2 border border-primary text-primary whitespace-nowrap">
                  {experience.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
