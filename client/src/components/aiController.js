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
      .map((item) => {
        const position =
          item.position || item.role || "";

        return `${position} at ${item.company || ""}: ${
          item.description || ""
        }`;
      })
      .filter(Boolean)
      .join("\n");

    const response = await ai.models.generateContent({
      model:
        process.env.OPENAI_MODEL ||
        "gemini-flash-latest",
      contents: `Write a professional resume summary using only the information below.

Profession: ${profession}
Skills: ${skillNames || "Not provided"}
Experience:
${experienceText || "Not provided"}

Rules:
- Write 3 to 4 concise sentences
- Make it professional and ATS-friendly
- Do not use headings or bullet points
- Do not use markdown
- Do not invent qualifications, numbers, or experience
- Return only the summary`,
    });

    const summary = response.text?.trim();

    if (!summary) {
      return res.status(400).json({
        message: "AI could not generate the summary",
      });
    }

    return res.status(200).json({ summary });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};