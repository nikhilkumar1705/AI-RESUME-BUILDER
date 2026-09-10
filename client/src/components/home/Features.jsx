import {
  Sparkles,
  FileText,
  ShieldCheck,
  Download,
  LayoutTemplate,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI writing support",
    description:
      "Improve summaries and experience descriptions when you need help with wording.",
    icon: Sparkles,
  },
  {
    title: "ATS-friendly layouts",
    description:
      "Use clean resume structures that keep content readable for recruiters and tracking systems.",
    icon: LayoutTemplate,
  },
  {
    title: "Content improvements",
    description:
      "Turn basic resume points into clearer, more professional statements.",
    icon: Wand2,
  },
  {
    title: "Simple editing",
    description:
      "Update each section independently and see changes reflected in your resume preview.",
    icon: FileText,
  },
  {
    title: "PDF export",
    description:
      "Export your completed resume as a clean PDF when you're ready to apply.",
    icon: Download,
  },
  {
    title: "Secure account",
    description:
      "Email verification and authenticated access help protect your account and resume data.",
    icon: ShieldCheck,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              Features
            </p>

            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need to build and manage your resume.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
              Keep the workflow simple: add your information, improve the
              parts that need work, preview the result, and export when
              you're done.
            </p>

            <Link
              to="/login?state=register"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-600"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid border-l border-t border-slate-200 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border-b border-r border-slate-200 p-6 sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200 pt-12">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                Ready to build your next resume?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Create an account, choose a template and start editing your
                resume in one place.
              </p>
            </div>

            <Link
              to="/login?state=register"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Create resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;