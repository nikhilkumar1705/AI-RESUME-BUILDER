import { Mail, Phone, MapPin, LinkIcon } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const personal = data?.personal_info || {};

    const summary = data?.summary || data?.professional_summary || "";
    const fullName = personal.fullName || personal.full_name || "Your Name";
    const jobTitle = personal.profession || personal.jobTitle || personal.job_title || "Your Job Title";


    const formatDate = (dateStr) => {
        if (!dateStr) return "";

        const [year, month] = dateStr.split("-");

        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: accentColor }}
                >
                    {fullName}
                </h1>

                <p className="mb-3 text-sm font-medium text-gray-600">
                    {jobTitle}
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <LinkIcon className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <LinkIcon className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {summary && (
                <section className="mb-6">
                    <h2
                        className="mb-3 text-lg font-bold uppercase tracking-wide"
                        style={{ color: accentColor }}
                    >
                        Professional Summary
                    </h2>

                    <p className="text-sm leading-6 text-gray-700">
                        {summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {/* Experience */}
            {data?.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div
                                key={index}
                                className="border-l-4 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {exp.role || exp.position || "Job Role"}
                                        </h3>

                                        <p className="text-gray-700 font-medium">
                                            {exp.company || "Company"}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600 text-right">
                                        {exp.duration ||
                                            `${formatDate(exp.start_date)} - ${exp.is_current ? "Present" : formatDate(exp.end_date)
                                            }`}
                                    </p>
                                </div>

                                {exp.description && (
                                    <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="mb-4 text-xl font-semibold"
                        style={{ color: accentColor }}
                    >
                        PROJECTS
                    </h2>

                    <ul className="space-y-3">
                        {data.project.map((proj, index) => (
                            <div
                                key={index}
                                className="flex items-start justify-between border-l-3 border-gray-300 pl-6"
                            >
                                <div>
                                    <li className="font-semibold text-gray-800">
                                        {proj.name}
                                    </li>

                                    {proj.type && (
                                        <p className="text-sm font-medium text-gray-500">
                                            {proj.type}
                                        </p>
                                    )}

                                    <p className="text-gray-600">
                                        {proj.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            )}
            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>
                                        {formatDate(edu.graduation) ||
                                            formatDate(edu.graduation_date) ||
                                            edu.year ||
                                            "Year"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}


            {/* Skills */}
            {data?.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-2 flex-wrap">
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
}

export default ClassicTemplate;