import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <section className="px-5 py-16 bg-white">
            <div className="max-w-5xl mx-auto rounded-2xl bg-green-50 border border-green-100 px-6 py-10 text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900">
                    Create your resume in minutes
                </h2>

                <p className="mt-3 text-sm md:text-base text-slate-600">
                    Use AI to build a clean, professional, and ATS-friendly resume.
                </p>

                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        to="/app?state=register"
                        className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/app?state=login"
                        className="rounded-full border border-green-200 px-6 py-3 text-sm font-semibold text-green-700 hover:bg-green-100 transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;