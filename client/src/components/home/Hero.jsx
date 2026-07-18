import { useState } from "react";
import {
  FileText,
  Sparkles,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get authentication token from Redux
  const token = useSelector((state) => state.auth.token);

  const isLoggedIn = Boolean(token);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25">
            <FileText className="h-5 w-5 text-white" />

            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-green-200" />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Resume
          </span>
        </Link>

        {/* Desktop center links */}
        {/* <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a
            href="#features"
            className="transition hover:text-green-600"
          >
            Features
          </a>

          <a
            href="#testimonials"
            className="transition hover:text-green-600"
          >
            Testimonials
          </a>

          <a
            href="#pricing"
            className="transition hover:text-green-600"
          >
            Pricing
          </a>
        </div> */}

        {/* Desktop authentication buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Link
              to="/app"
              className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login?state=login"
                className="rounded-full px-4 py-2.5 text-sm text-slate-600 transition hover:text-green-600"
              >
                Login
              </Link>

              <Link
                to="/login?state=register"
                className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-500/25 transition hover:bg-green-600"
              >
                Create Resume
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-800 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex h-full flex-col items-center justify-center gap-6 text-lg text-slate-800">
            <button
              type="button"
              onClick={closeMobileMenu}
              className="absolute right-5 top-5 rounded-lg bg-slate-100 p-2"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>

            {/* <a
              onClick={closeMobileMenu}
              href="#features"
              className="transition hover:text-green-600"
            >
              Features
            </a>

            <a
              onClick={closeMobileMenu}
              href="#Testimonials"
              className="transition hover:text-green-600"
            >
              Testimonials
            </a>

            <a
              onClick={closeMobileMenu}
              href="#pricing"
              className="transition hover:text-green-600"
            >
              Pricing
            </a> */}

            {isLoggedIn ? (
              <Link
                onClick={closeMobileMenu}
                to="/app"
                className="rounded-full bg-green-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  onClick={closeMobileMenu}
                  to="/login?state=login"
                  className="text-green-600"
                >
                  Login
                </Link>

                <Link
                  onClick={closeMobileMenu}
                  to="/login?state=register"
                  className="rounded-full bg-green-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-600"
                >
                  Create Resume
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero content */}
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-20 text-center md:pt-28">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-xs font-medium text-green-700">
          <Sparkles className="h-4 w-4 text-green-600" />
          AI-powered resume builder
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-7xl">
          Build a job-winning resume with AI
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 md:text-lg">
          Create professional, ATS-friendly resumes in minutes. Choose a
          template, add your details, and let AI improve your content.
        </p>

        {/* Main buttons */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to={
              isLoggedIn
                ? "/app"
                : "/login?state=register"
            }
            className="rounded-full bg-green-500 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-green-500/25 transition hover:bg-green-600"
          >
            {isLoggedIn
              ? "Go to Dashboard"
              : "Create my resume"}
          </Link>

          <a
            href="#templates"
            className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-green-50 hover:text-green-700"
          >
            View templates
          </a>
        </div>

        {/* Benefits */}
        <div className="mt-10 grid gap-3 text-left text-sm text-slate-600 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            AI content suggestions
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Quick PDF export
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            ATS-friendly
          </div>
        </div>

        {/* Resume preview card */}
        <div className="mt-14 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-green-100">
          <div className="grid gap-4 md:grid-cols-[1fr_300px]">
            {/* Resume mockup */}
            <div className="rounded-2xl bg-white p-6 text-left text-slate-900">
              <div className="border-b border-slate-200 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-green-600">
                      Alex Johnson
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      Frontend Developer
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      alex@email.com · +91 98765 43210 · LinkedIn · Portfolio
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    ATS Ready
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                  Professional Summary
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  AI-optimized summary with clear keywords, strong achievements,
                  and professional wording for job applications.
                </p>
              </div>

              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                  Experience
                </h4>

                <div className="mt-3 border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-slate-900">
                    React Developer
                  </p>

                  <p className="text-sm text-slate-600">
                    Tech Company · Jan 2024 - Present
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Built responsive web apps, improved UI performance, and
                    created reusable components.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "Tailwind",
                  "Node.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Side benefits */}
            <div className="rounded-2xl bg-green-50 p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold text-green-700">
                  AI Resume Builder
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Build faster. Apply smarter.
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Smart Suggestions
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Improve summary, skills, and experience with AI.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Multiple Templates
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Choose classic, modern, minimal, and image templates.
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    PDF Download
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Download your final resume and share it easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;