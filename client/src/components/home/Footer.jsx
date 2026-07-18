import { Link } from "react-router-dom";
import { FileText, Sparkles } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-white px-6 pt-12 text-sm text-slate-600 md:px-16 lg:px-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 border-b border-slate-200 pb-10 sm:grid-cols-2 lg:grid-cols-3">

                {/* Brand */}
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25">
                            <FileText className="h-5 w-5 text-white" />
                            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-green-200" />
                        </div>

                        <span className="text-xl font-bold text-slate-900" >
                            Resume
                        </span>
                    </Link>

                    <p className="mt-5 max-w-sm leading-7">
                        Create professional, ATS-friendly resumes faster with AI-powered templates and smart content suggestions.
                    </p>
                </div>

                {/* Links */}
                <div className="lg:flex lg:justify-center">
                    <div>
                        <h3 className="mb-5 font-semibold text-slate-900">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <a href="#features" className="hover:text-green-600 transition">
                                Features
                            </a>

                            <a href="#templates" className="hover:text-green-600 transition">
                                Templates
                            </a>

                            <a href="#testimonials" className="hover:text-green-600 transition">
                                Testimonials
                            </a>

                            <Link to="/app?state=login" className="hover:text-green-600 transition">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-5 font-semibold text-slate-900">
                        Stay Updated
                    </h3>

                    <p className="max-w-sm leading-7">
                        Get resume tips, job search advice, and product updates in your inbox.
                    </p>

                    <div className="mt-5 flex max-w-sm rounded-xl bg-green-50 p-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <p className="py-5 text-center text-sm text-slate-500">
                © 2026 Resume. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;