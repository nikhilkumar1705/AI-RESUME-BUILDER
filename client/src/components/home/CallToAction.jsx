import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
                <div className="flex flex-col justify-between gap-8 rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 md:flex-row md:items-center md:px-10">
                    <div>
                        <p className="text-sm font-semibold text-emerald-600">
                            Ready when you are
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                            Build your resume without fighting the formatting.
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                            Add your details, improve the content where needed,
                            preview the result, and export a clean PDF.
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                        <Link
                            to="/login?state=register"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Start building
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            to="/login?state=login"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;