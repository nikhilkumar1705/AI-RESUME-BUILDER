import { useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../config/api.js";

const SummaryForm = ({ resumeData, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    const profession = resumeData.personal_info?.profession;
    const skills = resumeData.skills || [];
    const experience = resumeData.experience || [];

    if (!profession && !skills.length && !experience.length) {
      return toast.error(
        "Add your profession, skills, or experience first"
      );
    }

    try {
      setIsGenerating(true);

      const { data } = await api.post(
        "/api/ai/generate-summary",
        {
          personal_info: resumeData.personal_info,
          skills: resumeData.skills,
          experience: resumeData.experience,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        summary: data.summary,
      }));

      toast.success("Summary generated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Professional Summary
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Write a short professional introduction.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}

          {isGenerating ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      <textarea
        value={resumeData.summary || ""}
        onChange={(event) =>
          setResumeData((prev) => ({
            ...prev,
            summary: event.target.value,
          }))
        }
        rows={7}
        placeholder="Write your professional summary..."
        className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />
    </div>
  );
};

export default SummaryForm;