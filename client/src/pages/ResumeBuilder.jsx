import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  Briefcase,
  FileText,
  GraduationCap,
  LoaderCircle,
  Paintbrush,
  Save,
  Sparkles,
  User,
} from "lucide-react";

import api from "../config/api.js";
import PersonalnfoForm from "../components/PersonalnfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ArraySection from "../components/ArraySection";
import SummaryForm from "../components/SummaryForm";
import BuilderTabs from "../components/BuilderTabs";
import BuilderNavigation from "../components/BuilderNavigation";

const emptyResume = {
  _id: "",
  title: "Untitled Resume",
  personal_info: {},
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  template: "classic",
  accent_color: "#22C55E",
  public: false,
};

const normalizeResume = (resume = {}) => ({
  ...emptyResume,
  ...resume,
  personal_info: resume.personal_info || {},
  summary:
    resume.professional_summary ||
    resume.summary ||
    "",
  experience: resume.experience || [],
  education: resume.education || [],
  projects: resume.project || resume.projects || [],
  skills: (resume.skills || []).map((skill) =>
    typeof skill === "string" ? { name: skill } : skill
  ),
});

const prepareResume = (resume) => {
  const image = resume.personal_info?.image;

  return {
    title: resume.title,
    public: resume.public,
    template: resume.template,
    accent_color: resume.accent_color,
    professional_summary: resume.summary || "",
    personal_info: {
      ...resume.personal_info,
      image: typeof image === "string" ? image : "",
    },
    experience: resume.experience || [],
    education: resume.education || [],
    project: resume.projects || [],
    skills: (resume.skills || [])
      .map((skill) =>
        typeof skill === "string" ? skill : skill.name
      )
      .filter(Boolean),
  };
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState(emptyResume);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "projects", name: "Projects", icon: FileText },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "template", name: "Template", icon: Paintbrush },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    if (!resumeId || resumeId === "new" || !token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await api.get(
        `/api/resumes/get/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const resume = normalizeResume(data.resume);

      setResumeData(resume);
      document.title = resume.title || "Resume Builder";
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Could not load resume"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateArrayField = (field, index, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [key]: value }
          : item
      ),
    }));
  };

  const addArrayItem = (field, item) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: [...prev[field], item],
    }));
  };

  const removeArrayItem = (field, index) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: prev[field].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const handleSave = async () => {
    if (!resumeId || resumeId === "new") {
      return toast.error("Resume ID not found");
    }

    try {
      setIsSaving(true);

      const formData = new FormData();
      const image = resumeData.personal_info?.image;

      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify(prepareResume(resumeData))
      );
      formData.append(
        "removeBackground",
        String(removeBackground)
      );

      if (image instanceof File) {
        formData.append("image", image);
      }

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResumeData(normalizeResume(data.resume));
      setRemoveBackground(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Could not save resume"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const fullName =
      resumeData.personal_info?.full_name ||
      resumeData.title ||
      "Resume";

    const oldTitle = document.title;
    document.title = fullName;

    window.print();

    setTimeout(() => {
      document.title = oldTitle;
    }, 500);
  };

  const handleNext = () => {
    setActiveSectionIndex((prev) =>
      Math.min(prev + 1, sections.length - 1)
    );
  };

  const handlePrevious = () => {
    setActiveSectionIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId, token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoaderCircle className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-green-600"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to dashboard
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <BuilderTabs
              sections={sections}
              activeSectionIndex={activeSectionIndex}
              setActiveSectionIndex={setActiveSectionIndex}
            />

            <div className="mt-4">
              <div className="h-1.5 w-full rounded-full bg-slate-200">
                <div
                  className="h-1.5 rounded-full bg-green-500 transition-all"
                  style={{
                    width: `${((activeSectionIndex + 1) /
                      sections.length) *
                      100
                      }%`,
                  }}
                />
              </div>
            </div>

            <BuilderNavigation
              activeSection={activeSection}
              activeSectionIndex={activeSectionIndex}
              sectionsLength={sections.length}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />

            <div className="mt-6">
              {activeSection.id === "personal" && (
                <PersonalnfoForm
                  data={resumeData.personal_info}
                  onChange={(personal_info) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info,
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === "summary" && (
                <SummaryForm
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === "education" && (
                <ArraySection
                  title="Education"
                  buttonText="Add Education"
                  items={resumeData.education}
                  fields={[
                    { key: "degree", placeholder: "Degree" },
                    {
                      key: "institution",
                      placeholder: "Institution / College",
                    },
                    {
                      key: "field",
                      placeholder: "Field of study",
                    },
                    {
                      key: "graduation",
                      placeholder: "Graduation date",
                      type: "month",
                    },
                  ]}
                  onAdd={() =>
                    addArrayItem("education", {
                      degree: "",
                      institution: "",
                      field: "",
                      graduation: "",
                    })
                  }
                  onChange={(index, key, value) =>
                    updateArrayField(
                      "education",
                      index,
                      key,
                      value
                    )
                  }
                  onRemove={(index) =>
                    removeArrayItem("education", index)
                  }
                />
              )}

              {activeSection.id === "experience" && (
                <ArraySection
                  title="Experience"
                  buttonText="Add Experience"
                  items={resumeData.experience}
                  fields={[
                    {
                      key: "position",
                      placeholder: "Job position",
                    },
                    {
                      key: "company",
                      placeholder: "Company name",
                    },
                    {
                      key: "start_date",
                      placeholder: "Start date",
                      type: "month",
                    },
                    {
                      key: "end_date",
                      placeholder: "End date",
                      type: "month",
                    },
                    {
                      key: "description",
                      placeholder:
                        "Describe your responsibilities",
                      type: "textarea",
                    },
                  ]}
                  onAdd={() =>
                    addArrayItem("experience", {
                      position: "",
                      company: "",
                      start_date: "",
                      end_date: "",
                      description: "",
                      is_current: false,
                    })
                  }
                  onChange={(index, key, value) =>
                    updateArrayField(
                      "experience",
                      index,
                      key,
                      value
                    )
                  }
                  onRemove={(index) =>
                    removeArrayItem("experience", index)
                  }
                />
              )}

              {activeSection.id === "projects" && (
                <ArraySection
                  title="Projects"
                  buttonText="Add Project"
                  items={resumeData.projects}
                  fields={[
                    {
                      key: "name",
                      placeholder: "Project name",
                    },
                    {
                      key: "type",
                      placeholder: "Project type",
                    },
                    {
                      key: "description",
                      placeholder: "Project description",
                      type: "textarea",
                    },
                  ]}
                  onAdd={() =>
                    addArrayItem("projects", {
                      name: "",
                      type: "",
                      description: "",
                    })
                  }
                  onChange={(index, key, value) =>
                    updateArrayField(
                      "projects",
                      index,
                      key,
                      value
                    )
                  }
                  onRemove={(index) =>
                    removeArrayItem("projects", index)
                  }
                />
              )}

              {activeSection.id === "skills" && (
                <ArraySection
                  title="Skills"
                  buttonText="Add Skill"
                  items={resumeData.skills}
                  fields={[
                    {
                      key: "name",
                      placeholder: "Skill name",
                    },
                  ]}
                  onAdd={() =>
                    addArrayItem("skills", { name: "" })
                  }
                  onChange={(index, key, value) =>
                    updateArrayField(
                      "skills",
                      index,
                      key,
                      value
                    )
                  }
                  onRemove={(index) =>
                    removeArrayItem("skills", index)
                  }
                />
              )}

              {activeSection.id === "template" && (
                <TemplateSelector
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
          </div>

          <ResumePreview
            resumeData={resumeData}
            onSave={handleSave}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;