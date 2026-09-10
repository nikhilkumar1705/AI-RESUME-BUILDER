import {
  UserPlus,
  FileEdit,
  Sparkles,
  Download,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up and verify your email to securely access your resume workspace.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Add your details",
    description:
      "Enter your personal information, experience, education, skills, and projects.",
    icon: FileEdit,
  },
  {
    number: "03",
    title: "Improve with AI",
    description:
      "Use AI only where needed to improve summaries and job descriptions.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Export your resume",
    description:
      "Preview your final resume and download it as a clean PDF.",
    icon: Download,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-emerald-600">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            From blank page to finished resume.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A simple workflow designed to keep resume building fast and
            straightforward.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-base font-semibold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;