import { Mail, Phone, MapPin, LinkIcon } from "lucide-react";

const ClassicTemplate = ({ data, accentColor = "#22C55E" }) => {
    const personal = data?.personal_info || {};
    const projects = data?.projects || data?.project || [];
    const summary = data?.summary || data?.professional_summary || "";

    return (
        <div className="mx-auto max-w-4xl bg-white p-8 text-gray-800">
            {/* Header */}
            <header
                className="mb-8 border-b-2 pb-6 text-center"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="mb-2 text-3xl font-bold"
                    style={{ color: accentColor }}
                >
                    {personal.fullName || personal.full_name || "Your Name"}
                </h1>

                <p className="mb-3 text-sm font-medium text-gray-600">
                    {personal.jobTitle || personal.job_title || "Your Job Title"}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {personal.email && (
                        <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {personal.email}
                        </span>
                    )}

                    {personal.phone && (
                        <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {personal.phone}
                        </span>
                    )}

                    {personal.location && (
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {personal.location}
                        </span>
                    )}

                    {personal.linkedin && (
                        <span className="flex items-center gap-1 break-all">
                            <LinkIcon className="h-4 w-4" />
                            {personal.linkedin}
                        </span>
                    )}

                    {personal.website && (
                        <span className="flex items-center gap-1 break-all">
                            <LinkIcon className="h-4 w-4" />
                            {personal.website}
                        </span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <Section title="Professional Summary" accentColor={accentColor}>
                    <p className="text-sm leading-6 text-gray-700">{summary}</p>
                </Section>
            )}

            {/* Experience */}
            {data?.experience?.length > 0 && (
                <Section title="Professional Experience" accentColor={accentColor}>
                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div
                                key={index}
                                className="border-l-4 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {exp.role || exp.position || "Job Role"}
                                </h3>

                                <p className="text-sm font-medium text-gray-700">
                                    {exp.company || "Company"}{" "}
                                    {exp.duration && `• ${exp.duration}`}
                                </p>

                                {exp.description && (
                                    <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-600">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <Section title="Projects" accentColor={accentColor}>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="border-l-4 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {project.name || "Project Name"}
                                </h3>

                                {project.description && (
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        {project.description}
                                    </p>
                                )}

                                {project.link && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        {project.link}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Education */}
            {data?.education?.length > 0 && (
                <Section title="Education" accentColor={accentColor}>
                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-gray-900">
                                    {edu.degree || "Degree"}
                                </h3>

                                <p className="text-sm text-gray-700">
                                    {edu.institution || "Institution"}{" "}
                                    {edu.year && `• ${edu.year}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Skills */}
            {/* Skills */}
            {data?.skills?.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="mb-4 text-xl font-semibold"
                        style={{ color: accentColor }}
                    >
                        CORE SKILLS
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => {
                            const skillText =
                                typeof skill === "string" ? skill : skill?.name || "";

                            if (!skillText) return null;

                            return (
                                <span
                                    key={index}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                >
                                    {skillText}
                                </span>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

const Section = ({ title, accentColor, children }) => {
    return (
        <section className="mb-6">
            <h2
                className="mb-3 text-lg font-bold uppercase tracking-wide"
                style={{ color: accentColor }}
            >
                {title}
            </h2>

            {children}
        </section>
    );
};

export default ClassicTemplate;