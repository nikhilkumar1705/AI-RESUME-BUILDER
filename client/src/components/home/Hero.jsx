import { useState } from "react";
import {
  FileText,
  Menu,
  X,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  return (
    <section className="min-h-screen bg-[#f8faf9] text-slate-900">

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <FileText className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Resume
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-950">
              Features
            </a>

            <a href="#templates" className="hover:text-slate-950">
              Templates
            </a>

            <a href="#how-it-works" className="hover:text-slate-950">
              How it works
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <Link
                to="/app"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Open dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login?state=login"
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-950"
                >
                  Sign in
                </Link>

                <Link
                  to="/login?state=register"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Build resume
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <span className="font-semibold">Resume</span>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-5 px-6 py-8">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-slate-700"
            >
              Features
            </a>

            <a
              href="#templates"
              onClick={() => setMobileOpen(false)}
              className="text-slate-700"
            >
              Templates
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-slate-700"
            >
              How it works
            </a>

            <div className="mt-2 border-t border-slate-200 pt-5">
              {isLoggedIn ? (
                <Link
                  to="/app"
                  className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Open dashboard
                </Link>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login?state=login"
                    className="block rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/login?state=register"
                    className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                  >
                    Build resume
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Resume builder with AI assistance
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Build a resume that actually reads well.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 lg:text-lg">
              Create, edit and export a clean professional resume without
              fighting with formatting. Use AI only where you need help.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={
                  isLoggedIn
                    ? "/app"
                    : "/login?state=register"
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                {isLoggedIn
                  ? "Go to dashboard"
                  : "Start building"}

                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Browse templates
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              {[
                "No design skills needed",
                "PDF export",
                "AI writing help",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-emerald-100/40 blur-2xl" />

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Resume Preview
                  </p>
                  <p className="text-xs text-slate-400">
                    Last saved a few seconds ago
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                </div>
              </div>

              <div className="grid md:grid-cols-[210px_1fr]">

                <aside className="border-r border-slate-200 bg-slate-50 p-4">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Sections
                  </p>

                  {[
                    "Personal info",
                    "Summary",
                    "Experience",
                    "Education",
                    "Skills",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`mb-1 rounded-md px-3 py-2 text-sm ${index === 1
                          ? "bg-white font-medium text-emerald-700 shadow-sm"
                          : "text-slate-500"
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </aside>

                <div className="p-6 sm:p-8">

                  <div className="border-b border-slate-200 pb-5">
                    <h3 className="text-2xl font-semibold text-slate-950">
                      Alex Johnson
                    </h3>

                    <p className="mt-1 text-sm font-medium text-emerald-600">
                      Frontend Developer
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      alex@email.com · +91 98765 43210 · Bengaluru
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Summary
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Frontend developer focused on building clean,
                      responsive interfaces with React and modern
                      JavaScript.
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Experience
                      </p>

                      <span className="text-xs text-slate-400">
                        2024 — Present
                      </span>
                    </div>

                    <div className="mt-3 border-l-2 border-emerald-500 pl-4">
                      <p className="text-sm font-semibold text-slate-900">
                        React Developer
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Acme Technologies
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Built reusable UI components and improved
                        frontend performance across multiple products.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Skills
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        "React",
                        "JavaScript",
                        "Tailwind CSS",
                        "Node.js",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="features"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-3 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              AI where it helps
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Improve summaries and experience descriptions without
              rewriting everything.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Simple editing
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Edit each section independently and preview changes in real
              time.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Ready to share
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Export a clean PDF when you are done.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;