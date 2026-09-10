import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  {
    name: "Classic",
    description:
      "A clean single-column layout for traditional and corporate roles.",
    tags: ["ATS-friendly", "Simple", "Professional"],
  },
  {
    name: "Modern",
    description:
      "A balanced layout with stronger hierarchy for tech and creative roles.",
    tags: ["Clean layout", "Modern", "Readable"],
  },
  {
    name: "Minimal",
    description:
      "A lightweight resume format focused entirely on content and clarity.",
    tags: ["Minimal", "Fast scan", "ATS-friendly"],
  },
];

const Template = () => {
  return (
    <section
      id="templates"
      className="border-t border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-600">
              Templates
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Start with a layout that keeps the focus on your experience.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Choose a clean resume structure, add your details, and switch
              templates without rewriting your content.
            </p>
          </div>

          <Link
            to="/login?state=register"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-600"
          >
            Create a resume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {templates.map((template, index) => (
            <div
              key={template.name}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="border-b border-slate-200 bg-white p-5">
                <div className="aspect-[3/4] rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <div className="border-b border-slate-300 pb-4">
                    <div className="h-3 w-28 rounded bg-slate-800" />
                    <div className="mt-2 h-2 w-20 rounded bg-emerald-500" />
                    <div className="mt-3 h-1.5 w-40 rounded bg-slate-200" />
                  </div>

                  <div className="mt-5">
                    <div className="h-2 w-20 rounded bg-slate-300" />
                    <div className="mt-3 space-y-2">
                      <div className="h-1.5 w-full rounded bg-slate-200" />
                      <div className="h-1.5 w-11/12 rounded bg-slate-200" />
                      <div className="h-1.5 w-9/12 rounded bg-slate-200" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="h-2 w-24 rounded bg-slate-300" />
                    <div className="mt-3 border-l-2 border-emerald-500 pl-3">
                      <div className="h-2 w-28 rounded bg-slate-700" />
                      <div className="mt-2 h-1.5 w-20 rounded bg-slate-200" />
                      <div className="mt-3 space-y-2">
                        <div className="h-1.5 w-full rounded bg-slate-200" />
                        <div className="h-1.5 w-10/12 rounded bg-slate-200" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="h-2 w-16 rounded bg-slate-300" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="h-6 w-16 rounded bg-slate-200" />
                      <div className="h-6 w-20 rounded bg-slate-200" />
                      <div className="h-6 w-14 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-950">
                    {template.name}
                  </h3>

                  <span className="text-xs font-medium text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {template.description}
                </p>

                <div className="mt-5 space-y-2">
                  {template.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <Check className="h-4 w-4 text-emerald-600" />
                      {tag}
                    </div>
                  ))}
                </div>

                <Link
                  to="/login?state=register"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-600"
                >
                  Use template
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Template;