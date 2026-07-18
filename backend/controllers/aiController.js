import Resume from "../models/Resume.js";
import fs from "fs";
import ai from "../config/ai.js";


// ----------------------------controller for enhancing a resume professional summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1–2 sentences, highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and only return the text—no options or anything else." },
                {
                    role: 'user',
                    content: userContent,
                },
            ]
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({ enhanceContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// -----------------------------------------controller for enhancing a resume job desccription
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only 1–2 sentences, highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly, and only return the text—no options or anything else." },
                {
                    role: 'user',
                    content: userContent,
                },
            ]
        })
        const enhanceContent = response.choices[0].message.content;
        return res.status(200).json({ enhanceContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// -------------------------------------------------------conroller for uploading resume to the database
export const uploadResume = async (req, res) => {
  try {
    const { title, resumeText } = req.body;

    if (!title?.trim() || !resumeText?.trim())
      return res.status(400).json({
        message: "Title and resume text are required",
      });

    const response = await ai.models.generateContent({
      model: process.env.OPENAI_MODEL || "gemini-flash-latest",
      contents: `Extract this resume and return ONLY valid JSON in exactly this structure:

{
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "image": ""
  },
  "professional_summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": []
}

Do not change the field names.
Do not add markdown or explanations.

Resume:
${resumeText}`,
    });

    const text = response.text.replace(/```json|```/g, "").trim();
    const resumeData = JSON.parse(text);

    console.log("PERSONAL INFO FROM AI:", resumeData.personal_info);

    const resume = await Resume.create({
      userId: req.userId,
      title: title.trim(),
      personal_info: resumeData.personal_info,
      professional_summary: resumeData.professional_summary || "",
      skills: resumeData.skills || [],
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      project: resumeData.projects || resumeData.project || [],
    });

    res.status(201).json({
      success: true,
      resumeId: resume._id,
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    res.status(500).json({
      message: error.message || "Failed to process resume",
    });
  }
};


export const generateSummary = async (req, res) => {
  try {
    const {
      personal_info = {},
      skills = [],
      experience = [],
    } = req.body;

    const profession =
      personal_info.profession ||
      personal_info.jobTitle ||
      "Professional";

    const skillNames = skills
      .map((skill) =>
        typeof skill === "string" ? skill : skill.name
      )
      .filter(Boolean)
      .join(", ");

    const experienceText = experience
      .map(
        (item) =>
          `${item.position || item.role || ""} at ${
            item.company || ""
          }: ${item.description || ""}`
      )
      .join("\n");

    const response = await ai.models.generateContent({
      model:
        process.env.OPENAI_MODEL ||
        "gemini-flash-latest",
      contents: `Write a professional resume summary using only this information.

Profession: ${profession}
Skills: ${skillNames || "Not provided"}
Experience:
${experienceText || "Not provided"}

Rules:
- 3 to 4 concise sentences
- ATS-friendly
- no heading
- no markdown
- do not invent information
- return only the summary`,
    });

    const summary = response.text?.trim();

    if (!summary) {
      return res.status(400).json({
        message: "AI could not generate summary",
      });
    }

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};