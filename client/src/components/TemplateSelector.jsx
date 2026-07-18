const templates = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
    { id: "minimalImage", name: "Minimal Image" },
];

const TemplateSelector = ({ resumeData, setResumeData }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-900">
                Choose Template
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                Select a resume design.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        type="button"
                        onClick={() =>
                            setResumeData((prev) => ({
                                ...prev,
                                template: template.id,
                            }))
                        }
                        className={`rounded-xl border px-4 py-4 text-sm font-medium transition ${resumeData.template === template.id
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {template.name}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <label className="text-sm font-medium text-slate-700">
                    Accent Color
                </label>

                <input
                    type="color"
                    value={resumeData.accent_color || "#22C55E"}
                    onChange={(e) =>
                        setResumeData((prev) => ({
                            ...prev,
                            accent_color: e.target.value,
                        }))
                    }
                    className="mt-2 h-12 w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
                />
            </div>
        </div>
    );
};

export default TemplateSelector;