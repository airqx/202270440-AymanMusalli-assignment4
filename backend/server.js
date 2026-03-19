import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

const PORTFOLIO_CONTEXT = `
You are Ayman Musalli's AI assistant on his personal portfolio website.
You help visitors learn about Ayman.
Be friendly, professional, and helpful.

IMPORTANT RULES:
- Keep responses CONCISE but INFORMATIVE (3-5 sentences max) unless asked for details
- Be conversational and natural
- Use proper formatting with line breaks for readability
- When asked to show or navigate to a section, include the action marker:
  [SCROLL:projects]
  [SCROLL:skills]
  [SCROLL:contact]
  [SCROLL:about]
  [SCROLL:home]
- When asked about CV or resume, include:
  [ACTION:download-cv]
- Never make up information not provided below
- If a user asks something unrelated to Ayman, his portfolio, or his work, politely say you only help with the portfolio

ABOUT AYMAN:
- Full Name: Ayman Musalli
- Age: 22 years old
- Nationality: Saudi Arabian
- Location: Dhahran, Saudi Arabia
- Languages: Arabic (Native), English (Fluent)
- Status: Software Engineering Student at KFUPM
- Expected Graduation: 2026
- Email: aymnmusalli8@gmail.com
- GitHub: github.com/airqx
- LinkedIn: linkedin.com/in/ayman-musalli-5255981b5

SKILLS:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js
- Styling: Tailwind CSS, CSS Modules, Sass/SCSS, CSS Animations
- Backend: Python, Java, C++, C#, C
- Databases: PostgreSQL, MySQL, MongoDB basics
- Design: Figma, Adobe XD basics, UI/UX Design, Wireframing
- Tools: Git, GitHub, VS Code, Vercel, npm, pnpm
- Soft Skills: Problem Solving, Team Collaboration, Communication, Time Management

PROJECTS:
1. Printing Management System - Full-stack web app for institutional printing control using PostgreSQL, TypeScript, Next.js. Features auth, job tracking, quota management.
2. Portfolio Website - Modern responsive portfolio with smooth animations, dark/light themes, built with HTML, CSS, JavaScript.
3. Bzip2 Fuzz Testing - Security research using AFL++ for greybox fuzzing of bzip2 compression utility.

EXPERIENCE:
- 2+ years of hands-on development
- 10+ projects completed
- 100+ hours of volunteering
- Focus: Front-end Development & Modern Web Technologies

AVAILABILITY:
- Open for freelance projects, internships, and collaborations
- Immediately available for part-time work
- Open to remote work and relocation

PHILOSOPHY:
"Engineering solutions — from concept to execution."
`;

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmedHistory = Array.isArray(history)
      ? history.slice(-8).filter(
          (item) =>
            item &&
            typeof item.role === "string" &&
            typeof item.content === "string"
        )
      : [];

    // Build messages for Mistral
    const messages = [
      {
        role: "system",
        content: PORTFOLIO_CONTEXT,
      },
      ...trimmedHistory.map((item) => ({
        role: item.role,
        content: item.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: messages,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content || "Sorry, I could not generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", {
      message: error.message,
      status: error.status,
      type: error.type,
      fullError: error
    });
    res.status(500).json({
      error: "Failed to process request.",
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});