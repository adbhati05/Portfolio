import OSU from "../assets/OSU.png";
import { GraduationCap } from "lucide-react";

// TO-DO: Style university card better (specifically TOSU text and specialization text).

// Array of course objects containing details about each course taken.
const course = [
  {
    name: "CSE 2221 - Software 1",
    topic: "Object Oriented Programming",
    status: "Completed",
  },
  {
    name: "CSE 2231 - Software 2",
    topic: "Design-by-Contract Programming",
    status: "Completed",
  },
  {
    name: "CSE 2321 - Foundations 1",
    topic: "Discrete Structures",
    status: "Completed",
  },
  {
    name: "CSE 2421 - Systems 1",
    topic: "Computer Architecture",
    status: "Completed",
  },
  {
    name: "CSE 2331 - Foundations 2",
    topic: "Data Structures & Algorithms",
    status: "Completed",
  },
  {
    name: "CSE 2431 - Systems 2",
    topic: "Operating Systems",
    status: "Completed",
  },
  {
    name: "CSE 3901 - Project: Web Apps",
    topic: "Full-Stack Development",
    status: "Completed",
  },
  {
    name: "CSE 3521 - Intro to AI",
    topic: "Artificial Intelligence",
    status: "Completed",
  },
  {
    name: "CSE 3341 - Programming Languages",
    topic: "Interpreters & Compilers",
    status: "In-Progress",
  },
  {
    name: "CSE 3241 - Database Systems",
    topic: "Database Design & SQL",
    status: "In-Progress",
  },
  {
    name: "CSE 3461 - Computer Networking",
    topic: "Networking & IoT",
    status: "In-Progress",
  },
  {
    name: "CSE 3231 - SWE Techniques",
    topic: "Industry Software Practices",
    status: "Enrolled",
  },
  {
    name: "CSE 5523 - Machine Learning",
    topic: "ML Concepts",
    status: "Enrolled",
  },
];

export const EducationSection = () => {
  return (
    <section
      id="education"
      className="relative z-20 py-24 px-8 flex justify-center"
    >
      <div className="flex flex-col mx-auto max-w-5xl justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Academic <span className="text-primary"> Record </span>
        </h2>

        {/* University card with degree, specialization, expected graduation date, and GPA. */}
        <div className="bg-card py-10 px-6 rounded-xl card-hover shadow-xs">
          <div className="flex flex-col lg:flex-row gap-4 justify-start items-center mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <p className="text-xl lg:text-2xl text-primary font-semibold">
              {" "}
              Bachelor of Science - Computer Science & Engineering{" "}
            </p>
            <p className="ml-4 px-6 py-2 rounded-full border border-primary text-primary bg-primary/20">
              Expected Dec 2026
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex flex-row gap-3 justify-start items-center">
              {" "}
              <div className="rounded-md border border-primary p-2 w-fit flex-shrink-0">
                <img
                  src={OSU}
                  alt="OSU Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                {" "}
                <p className="text-md sm:text-2xl font-semibold mb-2">
                  {" "}
                  The Ohio State University{" "}
                </p>
                <p className="text-sm lg:text-md font-semibold text-primary">
                  Specialization: Artificial Intelligence
                </p>
              </div>
            </div>

            <p className="rounded-md bg-primary/20 px-4 py-2 border border-primary text-primary whitespace-nowrap">
              GPA: 3.37
            </p>
          </div>
        </div>

        {/* Dynamically rendering courses in a grid layout, number of columns responsive to different screen sizes. */}
        <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5">
          {course.map((course, key) => (
            <div
              key={key}
              className="mt-6 p-4 border border-primary rounded-lg bg-card card-hover shadow-xs"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start md:items-center">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-left">
                    {course.name}
                  </h3>
                  <p className="text-sm text-primary text-left">
                    {course.topic}
                  </p>
                </div>

                {/* Status badge with color coding depending of if the course is completed, in progress, or enrolled. */}
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    course.status === "Completed"
                      ? "bg-green-500/20 text-green-500"
                      : course.status === "In-Progress"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-purple-500/20 text-purple-500"
                  }`}
                >
                  {course.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
