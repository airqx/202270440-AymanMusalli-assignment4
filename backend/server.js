import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const GITHUB_REPOS_URL =
  "https://api.github.com/users/airqx/repos?sort=stars&per_page=9&type=owner";
const REPO_CACHE_TTL_MS = 10 * 60 * 1000;

let repoCache = {
  data: null,
  expiresAt: 0,
};

const normalizeOrigin = (origin) =>
  typeof origin === "string" ? origin.replace(/\/$/, "") : origin;

const allowedOrigins = new Set([
  normalizeOrigin(process.env.FRONTEND_ORIGIN),
  "https://portfolio-ayman00.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin, server-to-server, and tool-based requests with no Origin header.
      // Also allow the string "null" sent by browsers for file:// pages (local dev only).
      if (!origin || origin === "null") {
        callback(null, true);
        return;
      }

      if (allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

const PORTFOLIO_CONTEXT = `
You are Ayman Musalli's AI assistant on his personal portfolio website.
You help visitors learn about Ayman.
Be friendly, professional, and helpful.

IMPORTANT RULES:
- Keep responses CONCISE but INFORMATIVE (3-5 sentences max) unless asked for details
- Be conversational and natural
- Use proper formatting with line breaks for readability
- When asked to show or navigate to a section, include the action marker:
  [SCROLL:github]
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

app.get("/api/repos", async (req, res) => {
  try {
    const now = Date.now();

    if (repoCache.data && repoCache.expiresAt > now) {
      res.json({ repos: repoCache.data, cached: true });
      return;
    }

    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Ayman-Portfolio-Backend",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_REPOS_URL, { headers });

    if (!response.ok) {
      const resetUnix = response.headers.get("x-ratelimit-reset");
      const resetAt = resetUnix
        ? new Date(Number(resetUnix) * 1000).toISOString()
        : null;

      throw new Error(
        response.status === 403
          ? `GitHub API rate limit reached${resetAt ? ` (resets at ${resetAt})` : ""}`
          : `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error("Invalid repositories payload from GitHub API");
    }

    const normalizedRepos = repos.map((repo) => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      homepage: repo.homepage,
    }));

    repoCache = {
      data: normalizedRepos,
      expiresAt: now + REPO_CACHE_TTL_MS,
    };

    res.json({ repos: normalizedRepos, cached: false });
  } catch (error) {
    console.error("GitHub repos API error:", error.message);

    if (repoCache.data) {
      res.json({
        repos: repoCache.data,
        cached: true,
        stale: true,
      });
      return;
    }

    res.status(502).json({
      error: "Failed to load repositories.",
      details: error.message,
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const trimmedHistory = Array.isArray(history)
      ? history
          .slice(-8)
          .filter(
            (item) =>
              item &&
              typeof item.role === "string" &&
              typeof item.content === "string"
          )
      : [];

    const messages = [
      { role: "system", content: PORTFOLIO_CONTEXT },
      ...trimmedHistory.map((item) => ({
        role: item.role,
        content: item.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Mistral API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error.message);
    res.status(500).json({
      error: "Failed to process request.",
      details: error.message,
    });
  }
});

// Email contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Message length validation
    if (message.trim().length < 10) {
      return res.status(400).json({
        error: "Message must be at least 10 characters long",
      });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "aymnmusalli8@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully! Ayman will get back to you soon.",
    });
  } catch (error) {
    console.error("Email error:", error.message);
    res.status(500).json({
      error: "Failed to send email. Please try again later.",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
