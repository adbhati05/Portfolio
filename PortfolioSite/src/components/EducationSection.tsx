import OSU from "../assets/OSU.png";
import { Check, CalendarClock, CircleDashed } from "lucide-react";
import { cn } from "../lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

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
    status: "Completed",
  },
  {
    name: "CSE 3241 - Database Systems",
    topic: "Database Design & SQL",
    status: "Completed",
  },
  {
    name: "CSE 3461 - Computer Networking",
    topic: "Networking & IoT",
    status: "Completed",
  },
  {
    name: "CSE 3231 - SWE Techniques",
    topic: "Software Industry Practices",
    status: "Completed",
  },
  {
    name: "CSE 3244 - Cloud Data Management",
    topic: "Data Engineering",
    status: "Completed",
  },
  {
    name: "CSE 5523 - Machine Learning",
    topic: "ML Concepts",
    status: "Completed",
  },
  {
    name: "CSE 5524 - Computer Vision",
    topic: "CV & CNN Concepts",
    status: "In-Progress",
  },
  {
    name: "CSE 5525 - Speech & Lang Proc",
    topic: "NLP Concepts",
    status: "In-Progress",
  },
  {
    name: "CSE 5914 - AI Capstone",
    topic: "Knowledge Systems",
    status: "In-Progress",
  }
];

const EducationSection = () => {
  return (
    <section id="education" className="relative z-20 px-4 py-24 md:py-32">
      <div className="container max-w-5xl">
        <SectionHeading title="Academic" highlight="Record" />

        {/* University card with degree, specialization, expected graduation date, and GPA. */}
        <Reveal>
          <div className="card p-6 text-left sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="group shrink-0 rounded-2xl border border-border bg-background p-3">
                  <img
                    src={OSU}
                    alt="OSU Logo"
                    className="size-12 grayscale transition-all duration-500 group-hover:grayscale-0 sm:size-16"
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold sm:text-2xl">
                    The Ohio State University
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Bachelor of Science - Computer Science & Engineering
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground sm:text-sm">
                    Specialization: Artificial Intelligence
                  </p>
                </div>
              </div>

              <div className="flex flex-row flex-wrap gap-3 md:flex-col md:items-end">
                <span className="chip text-sm">
                  <CalendarClock className="size-3.5" />
                  Expected Dec 2026
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                  GPA:
                  {/* The GPA counts up from 0 once the card scrolls into view. */}
                  <CountUp value={3.43} decimals={2} />
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Dynamically rendering courses in a grid layout, number of columns responsive to different screen sizes. */}
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {course.map((course, key) => (
            <Reveal key={course.name} delay={(key % 2) * 0.08}>
              <div className="card card-hover flex items-center justify-between gap-4 px-5 py-4 text-left">
                <div className="min-w-0">
                  <h3 className="font-medium">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.topic}</p>
                </div>

                {/* Status badge: a check for completed courses, a slowly turning dashed ring for in-progress ones, and a pulsing dot for anything else (e.g. enrolled). */}
                <span
                  className={cn(
                    "chip shrink-0",
                    course.status !== "Completed" && "border-foreground/40 bg-transparent text-foreground"
                  )}
                >
                  {course.status === "Completed" ? (
                    <Check className="size-3.5" />
                  ) : course.status === "In-Progress" ? (
                    <CircleDashed className="size-3.5 animate-[spin_6s_linear_infinite] motion-reduce:animate-none" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-foreground animate-pulse-subtle" />
                  )}
                  {course.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
