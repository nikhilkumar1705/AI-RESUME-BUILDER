import { User, UploadCloud } from "lucide-react";

const PersonalnfoForm = ({
    data,
    onChange,
    removeBackground,
    setRemoveBackground,
}) => {
    const handleChange = (field, value) => {
        onChange({
            ...data,
            [field]: value,
        });
    };

    const imagePreview =
        data?.image && typeof data.image === "string"
            ? data.image
            : data?.image
                ? URL.createObjectURL(data.image)
                : null;

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">
                    Personal Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Add your basic details to get started.
                </p>
            </div>

            {/* Image Upload */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <label className="flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-green-400 hover:bg-green-50">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-center text-xs">
                            <User className="h-6 w-6" />
                            <span>Upload image</span>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>

                <div>
                    <p className="text-sm font-medium text-slate-800">Profile Photo</p>
                    <p className="mt-1 text-sm text-slate-500">
                        Upload a clear professional photo. PNG or JPG only.
                    </p>

                    {typeof data?.image === "object" && data?.image && (
                        <div className="mt-4 flex items-center gap-3">
                            <p className="text-sm text-slate-600">Remove Background</p>

                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={removeBackground}
                                    onChange={() => setRemoveBackground((prev) => !prev)}
                                />

                                <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-green-500" />

                                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Fields */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={data?.full_name || ""}
                        onChange={(e) =>
                            handleChange("full_name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Job Title
                    </label>
                    <input
                        type="text"
                        value={data?.profession || ""}
                        onChange={(e) =>
                            handleChange("profession", e.target.value)
                        }
                        placeholder="Frontend Developer"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data?.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Phone
                    </label>
                    <input
                        type="text"
                        value={data?.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        Location
                    </label>
                    <input
                        type="text"
                        value={data?.location || ""}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="Delhi, India"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">
                        LinkedIn
                    </label>
                    <input
                        type="text"
                        value={data?.linkedin || ""}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">
                        Portfolio / Website
                    </label>
                    <input
                        type="text"
                        value={data?.website || ""}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="yourportfolio.com"
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalnfoForm;