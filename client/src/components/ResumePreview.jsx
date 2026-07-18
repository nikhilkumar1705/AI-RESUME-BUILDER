import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const templateMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    minimalImage: MinimalImageTemplate,
};

const ResumePreview = ({ resumeData, onSave, onDownload, onShare }) => {
    const Template = templateMap[resumeData.template] || ClassicTemplate;

    const previewData = {
        ...resumeData,
        professional_summary: resumeData.summary || resumeData.professional_summary || "",
        project: resumeData.projects || resumeData.project || [],
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Resume Preview</h2>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onSave}
                        className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
                    >
                        Save
                    </button>

                    {onShare && (
                        <button
                            type="button"
                            onClick={onShare}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Share
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onDownload}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Download
                    </button>
                </div>
            </div>

            <div id="resume-preview" className="bg-white">
                <Template data={previewData} accentColor={resumeData.accent_color} />
            </div>
        </div>
    );
};

export default ResumePreview;