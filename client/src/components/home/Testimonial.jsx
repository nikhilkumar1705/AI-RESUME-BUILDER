import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Aarav Sharma",
        role: "Software Developer",
        message:
            "Resume helped me create a clean and professional resume in minutes. The AI suggestions made my content much better.",
    },
    {
        name: "Priya Mehta",
        role: "Marketing Executive",
        message:
            "The templates are simple and modern. I was able to build an ATS-friendly resume without any confusion.",
    },
    {
        name: "Rohan Verma",
        role: "Data Analyst",
        message:
            "Very easy to use. I liked the instant preview and one-click download feature. Perfect for job applications.",
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="bg-slate-50 px-5 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                        Testimonials
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        What users say about Resume
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                        Job seekers use Resume to create professional, ATS-friendly resumes faster with AI.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100"
                        >
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-green-500 text-green-500"
                                    />
                                ))}
                            </div>

                            <p className="mt-6 text-sm leading-7 text-slate-600">
                                “{testimonial.message}”
                            </p>

                            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                    {testimonial.name.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;