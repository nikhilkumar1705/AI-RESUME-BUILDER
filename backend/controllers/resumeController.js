import fs from "fs";
import imagekit from "../config/imageKit.js";
import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  try {
    const title = req.body.title?.trim() || "Untitled Resume";

    const resume = await Resume.create({
      userId: req.userId,
      title,
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.resumeId,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      userId: req.userId,
    }).select("-__v");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ resume });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      public: true,
    }).select("-__v -userId");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ resume });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { resumeId, removeBackground } = req.body;

    if (!resumeId || !req.body.resumeData) {
      return res.status(400).json({
        message: "Resume ID and resume data are required",
      });
    }

    const resumeData =
      typeof req.body.resumeData === "string"
        ? JSON.parse(req.body.resumeData)
        : req.body.resumeData;

    if (req.file) {
      const transformation =
        "w-300,h-300,fo-face,z-0.75" +
        (removeBackground === "true" ? ",e-bgremove" : "");

      const uploadedImage = await imagekit.files.upload({
        file: fs.createReadStream(req.file.path),
        fileName: req.file.originalname,
        folder: "user-resumes",
        transformation: {
          pre: transformation,
        },
      });

      resumeData.personal_info = resumeData.personal_info || {};
      resumeData.personal_info.image = uploadedImage.url;
    }

    const resume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId: req.userId,
      },
      resumeData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    if (req.file?.path) {
      fs.promises.unlink(req.file.path).catch(() => {});
    }
  }
};

export const updateResumeTitle = async (req, res) => {
  try {
    const { resumeId, title } = req.body;

    if (!resumeId || !title?.trim()) {
      return res.status(400).json({
        message: "Resume ID and title are required",
      });
    }

    const resume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId: req.userId,
      },
      {
        title: title.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({
      message: "Resume name updated successfully",
      resume,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};