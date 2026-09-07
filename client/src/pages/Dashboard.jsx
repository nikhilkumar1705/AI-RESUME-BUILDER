import {
  FilePenLine,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../config/api.js";
import pdfToText from "react-pdftotext";

const resumeColors = [
  {
    bg: "linear-gradient(135deg, #f3e8ff, #e9d5ff)",
    icon: "#a855f7",
    border: "#d8b4fe",
  },
  {
    bg: "linear-gradient(135deg, #fff7ed, #fed7aa)",
    icon: "#d97706",
    border: "#fdba74",
  },
  {
    bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
    icon: "#dc2626",
    border: "#fca5a5",
  },
  {
    bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    icon: "#16a34a",
    border: "#86efac",
  },
];

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const openCreateModal = () => {
    setTitle("");
    setResumeFile(null);
    setShowCreateResume(true);
  };

  const openUploadModal = () => {
    setTitle("");
    setResumeFile(null);
    setShowUploadResume(true);
  };

  const openEditModal = (resume) => {
    const resumeId = resume._id || resume.id;

    setEditResumeId(resumeId);
    setTitle(resume.title || "");
    setShowEditResume(true);
  };

  const closeCreateModal = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  const closeUploadModal = () => {
    setShowUploadResume(false);
    setTitle("");
    setResumeFile(null);
  };

  const closeEditModal = () => {
    setShowEditResume(false);
    setEditResumeId(null);
    setTitle("");
  };

  const handleEditResume = (resume) => {
    const resumeId = resume._id || resume.id;

    if (!resumeId) {
      toast.error("Resume ID not found");
      return;
    }

    navigate(`/app/builder/${resumeId}`);
  };

  const handleCreateResume = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return toast.error("Please enter a resume title");
    }

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleUploadResume = async (event) => {
    event.preventDefault();

    if (!title.trim() || !resumeFile) {
      return toast.error(
        "Please provide a title and select a resume file"
      );
    }

    try {
      setIsLoading(true);

      const resumeText = await pdfToText(resumeFile);

      if (!resumeText?.trim()) {
        throw new Error("PDF text could not be extracted");
      }

      const { data } = await api.post(
        "/api/ai/upload-resume",
        {
          title: title.trim(),
          resumeText: resumeText.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setResumeFile(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      console.log("Upload error:", error?.response?.data);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenameResume = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return toast.error("Enter resume name");
    }

    if (!editResumeId) {
      return toast.error("Resume ID not found");
    }

    try {
      const { data } = await api.put(
        "/api/resumes/update-title",
        {
          resumeId: editResumeId,
          title: title.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes((prev) =>
        prev.map((resume) =>
          (resume._id || resume.id) === editResumeId
            ? {
              ...resume,
              title: title.trim(),
              updatedAt: new Date().toISOString(),
            }
            : resume
        )
      );

      closeEditModal();
      toast.success(data.message || "Resume name updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmation) return;

    try {
      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes((prev) =>
        prev.filter(
          (resume) => (resume._id || resume.id) !== resumeId
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllResumes();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Top Action Cards */}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={openCreateModal}
            className="flex h-40 w-36 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white text-slate-700 transition hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
              <PlusIcon className="h-6 w-6" />
            </div>

            <p className="text-sm font-medium">Create Resume</p>
          </button>

          <button
            type="button"
            onClick={openUploadModal}
            className="flex h-40 w-36 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white text-slate-700 transition hover:border-purple-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-500 text-white shadow-md">
              <UploadCloudIcon className="h-6 w-6" />
            </div>

            <p className="text-sm font-medium">Upload Existing</p>
          </button>
        </div>

        <hr className="my-8 w-full border-slate-300 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {allResumes.map((resume, index) => {
            const color = resumeColors[index % resumeColors.length];
            const resumeId = resume._id || resume.id || index;

            return (
              <div
                key={resumeId}
                className="group relative flex h-48 flex-col justify-between rounded-lg border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                style={{
                  background: color.bg,
                  borderColor: color.border,
                }}
              >
                <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteResume(resumeId);
                    }}
                    className="rounded-md bg-white/60 p-1.5 text-slate-700 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openEditModal(resume);
                    }}
                    className="rounded-md bg-white/60 p-1.5 text-slate-700 hover:text-green-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleEditResume(resume)}
                  className="flex flex-1 flex-col items-center justify-center text-center"
                >
                  <FilePenLine
                    className="h-8 w-8"
                    style={{ color: color.icon }}
                  />

                  <p
                    className="mt-4 text-sm font-semibold"
                    style={{ color: color.icon }}
                  >
                    {resume.title || "Untitled Resume"}
                  </p>
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: color.icon }}
                >
                  Updated on{" "}
                  {resume.updatedAt
                    ? new Date(resume.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form
              onSubmit={handleCreateResume}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <button
                type="button"
                onClick={closeCreateModal}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <XIcon className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-semibold text-slate-900">
                Create Resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter a title for your new resume.
              </p>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                autoFocus
                required
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Create Resume
              </button>
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form
              onSubmit={handleUploadResume}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <button
                type="button"
                onClick={closeUploadModal}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <XIcon className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-semibold text-slate-900">
                Upload Resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload your existing resume and give it a title.
              </p>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                required
              />

              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-purple-400 hover:bg-purple-50">
                <UploadCloudIcon className="h-8 w-8 text-purple-500" />

                <p className="mt-2 text-sm font-medium text-slate-700">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  PDF, DOC, or DOCX
                </p>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) =>
                    setResumeFile(event.target.files?.[0] || null)
                  }
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Resume"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Rename Resume Modal */}
        {showEditResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form
              onSubmit={handleRenameResume}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
              <button
                type="button"
                onClick={closeEditModal}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <XIcon className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-semibold text-slate-900">
                Edit Resume Title
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the name of your resume.
              </p>

              <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                autoFocus
                required
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;