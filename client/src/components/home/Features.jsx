import {
  Sparkles,
  FileText,
  ShieldCheck,
  Download,
  LayoutTemplate,
  Wand2,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Resume Writing",
    description:
      "Generate professional summaries, skills, and job descriptions with AI.",
    icon: Sparkles,
  },
  {
    title: "ATS-Friendly Templates",
    description:
      "Use clean resume templates designed to pass applicant tracking systems.",
    icon: LayoutTemplate,
  },
  {
    title: "Smart Content Suggestions",
    description:
      "Improve weak resume points with better wording and stronger keywords.",
    icon: Wand2,
  },
  {
    title: "Easy Resume Editing",
    description:
      "Edit sections, add experience, update skills, and preview instantly.",
    icon: FileText,
  },
  {
    title: "One-Click Download",
    description:
      "Download your final resume as a professional PDF in just one click.",
    icon: Download,
  },
  {
    title: "Private & Secure",
    description:
      "Your personal details and resume data stay safe and protected.",
    icon: ShieldCheck,
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white px-5 py-20">

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">

            Features
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything you need to build a better resume
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Create a clean, professional, and job-ready resume faster with AI-powered tools.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-green-100 bg-green-50 p-8 text-center md:p-10">
          <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ready to create your resume?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Start with a template, add your details, and let AI help you make it more professional.
          </p>

          <div className="mt-7">
            <Link
              to="/app?state=register"
              className="inline-flex rounded-full bg-green-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600"
            >
              Create my resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;