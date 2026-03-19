// ======================================================
// PORTFOLIO SCRIPT
// Main client-side interactions for the portfolio website
// ======================================================

"use strict";

/*
|--------------------------------------------------------------------------
| THEME MANAGEMENT
|--------------------------------------------------------------------------
| Handles initial theme detection and user-triggered theme switching.
| Priority:
| 1) saved theme in localStorage
| 2) system preference
*/


function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
}

/*
|--------------------------------------------------------------------------
| NAVIGATION
|--------------------------------------------------------------------------
| Handles:
| - mobile menu open/close
| - navbar scrolled state
| - active section highlight in nav
*/
function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", String(!isExpanded));
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Add "scrolled" class after slight scroll for navbar styling
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  // Update active nav link while scrolling
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
}

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPosition = window.scrollY + 120;

  let activeFound = false;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const relatedLink = document.querySelector(
      `.nav-link[href="#${section.id}"]`
    );

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));

      if (relatedLink) {
        relatedLink.classList.add("active");
        activeFound = true;
      }
    }
  });

  // Optional fallback: if no section matched, keep current state unchanged.
  if (!activeFound) {
    return;
  }
}

/*
|--------------------------------------------------------------------------
| TYPEWRITER EFFECT
|--------------------------------------------------------------------------
| Rotates through short phrases in the hero section.
| Uses a recursive setTimeout instead of setInterval so speed can change
| naturally between typing, deleting, and pause states.
*/
function initTypewriter() {
  const phrases = [
    "modern web apps.",
    "clean interfaces.",
    "responsive designs.",
    "seamless experiences.",
    "creative solutions.",
  ];

  const typewriterElement = document.getElementById("typewriterText");
  if (!typewriterElement) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex -= 1;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex += 1;
      typingSpeed = 80;
    }

    // Pause at full phrase before deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    }
    // Move to next phrase after deleting current one
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/*
|--------------------------------------------------------------------------
| TIME-BASED GREETING
|--------------------------------------------------------------------------
| Shows a different greeting message depending on local user time.
*/
function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (!greetingElement) return;

  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning! Ready to explore some projects?";
  } else if (hour < 18) {
    greeting = "Good afternoon! Thanks for stopping by.";
  } else {
    greeting = "Good evening! Glad you're here.";
  }

  greetingElement.textContent = greeting;
}

/*
|--------------------------------------------------------------------------
| HERO COUNTERS
|--------------------------------------------------------------------------
| Animates the numbers in the hero stats only once when visible.
*/
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".hero-stats");

  if (!counters.length || !statsSection) return;

  let hasStarted = false;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0", 10);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      function updateCounter() {
        current += step;

        if (current < target) {
          counter.textContent = String(Math.floor(current));
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = String(target);
        }
      }

      updateCounter();
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          animateCounters();
          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

/*
|--------------------------------------------------------------------------
| SCROLL REVEAL
|--------------------------------------------------------------------------
| Adds the "visible" class to elements when they enter the viewport.
| This keeps animation logic in CSS while JS only controls visibility state.
*/
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

/*
|--------------------------------------------------------------------------
| SKILL BARS
|--------------------------------------------------------------------------
| Reads the target width from data-width and animates each bar once
| when it enters the viewport.
*/
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  if (!skillBars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute("data-width") || "0";

          bar.style.width = `${targetWidth}%`;
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

/*
|--------------------------------------------------------------------------
| HERO PARTICLES
|--------------------------------------------------------------------------
| Creates decorative particles inside the hero background.
| Purely visual; all movement is handled by CSS animations.
*/
function initParticles() {
  const particleContainer = document.getElementById("heroParticles");
  if (!particleContainer) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("div");
    const size = 2 + Math.random() * 4;

    particle.classList.add("hero-particle");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${4 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particle.style.opacity = String(0.08 + Math.random() * 0.15);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particleContainer.appendChild(particle);
  }
}

/*
|--------------------------------------------------------------------------
| CURSOR GLOW
|--------------------------------------------------------------------------
| Moves the glow element with the mouse pointer.
| Only enabled for precise pointers (mouse/trackpad), not touch devices.
*/
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;

  if (!window.matchMedia("(pointer: fine)").matches) return;

  document.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

/*
|--------------------------------------------------------------------------
| SMOOTH SCROLL
|--------------------------------------------------------------------------
| Smoothly scrolls to internal anchor targets.
| We prevent the default jump only when a valid section target exists.
*/
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/*
|--------------------------------------------------------------------------
| BACK TO TOP
|--------------------------------------------------------------------------
| Shows a floating button after the user scrolls down enough.
*/
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");
  if (!backToTopButton) return;

  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("visible", window.scrollY > 500);
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/*
|--------------------------------------------------------------------------
| TOAST NOTIFICATIONS
|--------------------------------------------------------------------------
| Reusable notification system.
| Creates a toast node, injects it into the toast container, and removes it
| after a short delay.
*/
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconMarkup =
    type === "success"
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

  toast.innerHTML = `${iconMarkup}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("removing");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

/*
|--------------------------------------------------------------------------
| CONTACT FORM
|--------------------------------------------------------------------------
| Currently front-end only.
| Prevents page refresh, validates native form fields, shows a toast, and
| resets the form. This can later be replaced with real API submission.
*/
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("sendBtn");

  if (!form || !submitButton) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;

    // Simulate successful submission for now
    showToast("Message sent successfully!", "success");
    form.reset();

    setTimeout(() => {
      submitButton.disabled = false;
    }, 1000);
  });
}

/*
|--------------------------------------------------------------------------
| MARQUEE
|--------------------------------------------------------------------------
| Duplicates marquee content once so the animation can loop seamlessly.
| Guarded by a data attribute so it only clones once.
*/
function initMarquee() {
  const marqueeContent = document.querySelector(".marquee-content");
  if (!marqueeContent) return;

  if (marqueeContent.dataset.cloned === "true") return;

  marqueeContent.innerHTML += marqueeContent.innerHTML;
  marqueeContent.dataset.cloned = "true";
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - STATE
|--------------------------------------------------------------------------
| Game snippets + runtime state.
| Kept together so all game values are easy to find and maintain.
*/
const codeSnippets = [
  "print('Hello World')",
  "result = math.sqrt(16)",
  "<h1>KFUPM SWE Student</h1>",
  "print(60 + 7)",
];

let timeLeft = 30;
let totalScore = 0;
let snippetsCompleted = 0;
let totalCharsCorrect = 0;
let timerId = null;

// Cached game elements
let startBtn = null;
let playAgainBtn = null;
let startScreen = null;
let gameArea = null;
let resultMessage = null;
let inputField = null;
let codeDisplay = null;
let progressBar = null;
let timerEl = null;
let scoreEl = null;
let finalWpm = null;
let finalSnippets = null;
let finalPoints = null;

/*
|--------------------------------------------------------------------------
| TYPING GAME - INIT
|--------------------------------------------------------------------------
| Finds all required elements and wires event listeners once.
*/
function initTypingGame() {
  startBtn = document.getElementById("startGameBtn");
  playAgainBtn = document.getElementById("playAgainBtn");
  startScreen = document.getElementById("startScreen");
  gameArea = document.getElementById("gameActiveArea");
  resultMessage = document.getElementById("resultMessage");
  inputField = document.getElementById("typingInput");
  codeDisplay = document.getElementById("codeDisplay");
  progressBar = document.getElementById("progressBar");
  timerEl = document.getElementById("timer");
  scoreEl = document.getElementById("score");
  finalWpm = document.getElementById("finalWpm");
  finalSnippets = document.getElementById("finalSnippets");
  finalPoints = document.getElementById("finalPoints");

  const requiredElements = [
    startBtn,
    playAgainBtn,
    startScreen,
    gameArea,
    resultMessage,
    inputField,
    codeDisplay,
    progressBar,
    timerEl,
    scoreEl,
    finalWpm,
    finalSnippets,
    finalPoints,
  ];

  if (requiredElements.some((element) => !element)) return;

  startBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", startGame);

  // Prevent pasting so the game remains an actual typing challenge
  inputField.addEventListener("paste", (event) => {
    event.preventDefault();
    inputField.value = "";
    inputField.placeholder = "Bro... Enough cheating! Just type it out.";

    setTimeout(() => {
      if (!inputField.disabled) {
        inputField.placeholder = "Start typing...";
      }
    }, 2000);
  });

  inputField.addEventListener("input", handleTypingInput);
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - START
|--------------------------------------------------------------------------
| Resets the game state and starts a fresh round.
*/
function startGame() {
  if (
    !startScreen ||
    !resultMessage ||
    !gameArea ||
    !inputField ||
    !progressBar ||
    !timerEl ||
    !scoreEl
  ) {
    return;
  }

  startScreen.classList.add("hidden");
  resultMessage.classList.add("hidden");
  gameArea.classList.remove("hidden");

  timeLeft = 30;
  totalScore = 0;
  snippetsCompleted = 0;
  totalCharsCorrect = 0;

  timerEl.innerText = String(timeLeft);
  scoreEl.innerText = "0";
  progressBar.style.width = "0%";

  inputField.disabled = false;
  inputField.placeholder = "Start typing...";
  inputField.value = "";
  inputField.focus();

  loadNewSnippet();
  startTimer();
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - LOAD SNIPPET
|--------------------------------------------------------------------------
| Randomly selects a code snippet and renders each character as its own span.
| This allows per-character correctness highlighting.
*/
function loadNewSnippet() {
  if (!codeDisplay || !inputField) return;

  const randomSnippet =
    codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

  codeDisplay.innerHTML = randomSnippet
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  // Reset any styles left over from the special animation snippet
  codeDisplay.style.transition = "";
  codeDisplay.style.transform = "";
  codeDisplay.style.color = "";

  inputField.value = "";
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - TIMER
|--------------------------------------------------------------------------
| Updates time + progress bar every second and ends the game at zero.
*/
function startTimer() {
  if (!timerEl || !progressBar) return;

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    timeLeft -= 1;
    timerEl.innerText = String(timeLeft);
    progressBar.style.width = `${((30 - timeLeft) / 30) * 100}%`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - END
|--------------------------------------------------------------------------
| Stops the timer and shows final results.
| WPM formula here assumes a 30-second game (0.5 minutes).
*/
function endGame() {
  if (
    !inputField ||
    !gameArea ||
    !resultMessage ||
    !finalWpm ||
    !finalSnippets ||
    !finalPoints
  ) {
    return;
  }

  clearInterval(timerId);
  timerId = null;

  inputField.disabled = true;
  gameArea.classList.add("hidden");

  const wpm = Math.max(0, Math.round((totalCharsCorrect / 5) / 0.5));

  finalWpm.innerText = String(wpm);
  finalSnippets.innerText = String(snippetsCompleted);
  finalPoints.innerText = String(totalScore);

  resultMessage.classList.remove("hidden");
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - INPUT HANDLER
|--------------------------------------------------------------------------
| Compares typed characters against the current snippet and marks each span as:
| - correct
| - incorrect
| - empty
|
| When the whole line is typed correctly, the snippet is completed.
*/
function handleTypingInput(event) {
  if (!inputField || !codeDisplay || !scoreEl) return;

  // Extra safety against paste injection
  if (event.inputType === "insertFromPaste") {
    inputField.value = "";
    return;
  }

  const characterSpans = codeDisplay.querySelectorAll("span");
  const currentSnippet = Array.from(characterSpans)
    .map((span) => span.innerText)
    .join("");
  const typedCharacters = inputField.value.split("");

  let allCorrect = true;

  characterSpans.forEach((charSpan, index) => {
    const typedChar = typedCharacters[index];

    if (typedChar == null) {
      charSpan.className = "";
      allCorrect = false;
    } else if (typedChar === charSpan.innerText) {
      charSpan.className = "correct";
    } else {
      charSpan.className = "incorrect";
      allCorrect = false;
    }
  });

  if (allCorrect && typedCharacters.length === characterSpans.length) {
    if (currentSnippet === "print(60 + 7)") {
      handleFunnyAnimation();
    } else {
      processSnippetCompletion();
    }
  }
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - PROCESS COMPLETION
|--------------------------------------------------------------------------
| Updates score and progress after a successful snippet.
*/
function processSnippetCompletion() {
  if (!codeDisplay || !scoreEl) return;

  const characterSpans = codeDisplay.querySelectorAll("span");

  snippetsCompleted += 1;
  totalCharsCorrect += characterSpans.length;

  const pointsThisRound = 50 + characterSpans.length * 5;
  totalScore += pointsThisRound;

  scoreEl.innerText = String(totalScore);
  loadNewSnippet();
}

/*
|--------------------------------------------------------------------------
| TYPING GAME - SPECIAL ANIMATION
|--------------------------------------------------------------------------
| Small fun easter egg for the "print(60 + 7)" snippet.
| Temporarily disables input, animates the code display, then resumes.
*/
function handleFunnyAnimation() {
  if (!inputField || !codeDisplay) return;

  inputField.disabled = true;

  codeDisplay.style.transition = "transform 0.3s ease, color 0.3s ease";
  codeDisplay.style.transform = "scale(1.2)";
  codeDisplay.style.color = "var(--accent)";

  setTimeout(() => {
    codeDisplay.innerHTML = "<span class='correct'>67! 🚀</span>";
    codeDisplay.style.transform = "scale(1.5) rotate(5deg)";

    setTimeout(() => {
      codeDisplay.style.transform = "scale(1) rotate(0deg)";
      inputField.disabled = false;
      inputField.focus();
      processSnippetCompletion();
    }, 1000);
  }, 400);
}

/*
|--------------------------------------------------------------------------
| AI ASSISTANT
|--------------------------------------------------------------------------
| Interactive AI chatbot with text capabilities.
| Uses knowledge about Ayman to answer visitor questions.
*/

// Portfolio knowledge base for the AI assistant - Comprehensive information about Ayman
const portfolioKnowledge = {
  // Personal Information
  personal: {
    fullName: "Ayman Musalli",
    firstName: "Ayman",
    lastName: "Musalli",
    nickname: "airqx",
    title: "Software Engineering Student",
    age: 22,
    birthYear: 2004,
    nationality: "Saudi Arabian",
    languages: ["Arabic (Native)", "English (Fluent)"],
    location: {
      city: "Dhahran",
      country: "Saudi Arabia",
      timezone: "AST (GMT+3)",
      openToRemote: true,
      willingToRelocate: true
    }
  },

  // Contact & Social
  contact: {
    email: "aymnmusalli8@gmail.com",
    github: "https://github.com/airqx",
    githubUsername: "airqx",
    linkedin: "https://www.linkedin.com/in/ayman-musalli-5255981b5/",
    portfolio: "https://portfolio-landing-page1.vercel.app/",
    cvPath: "assets/resume.pdf",
    preferredContact: "email"
  },

  // Education
  education: {
    current: {
      institution: "King Fahd University of Petroleum and Minerals (KFUPM)",
      degree: "Bachelor of Science",
      major: "Software Engineering",
      status: "Currently Enrolled",
      expectedGraduation: "2026",
      location: "Dhahran, Saudi Arabia"
    },
    achievements: [
      "Strong academic performance in programming courses",
      "Active participant in university coding events",
      "Self-taught in modern web development frameworks"
    ],
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Systems",
      "Software Engineering Principles",
      "Web Development",
      "Computer Networks",
      "Operating Systems",
      "Software Testing & Quality Assurance"
    ]
  },

  // Experience
  experience: {
    years: "2+",
    yearsNumeric: 2,
    projectsCompleted: 10,
    volunteeringHours: 100,
    focus: "Front-end Development & Modern Web Technologies",
    workStyle: "Collaborative, organized, and detail-oriented",
    interests: [
      "Building user-focused digital experiences",
      "Learning new technologies and frameworks",
      "Open source contributions",
      "UI/UX design principles"
    ]
  },

  // Technical Skills - Detailed
  skills: {
    frontend: {
      languages: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
      frameworks: ["React", "Next.js"],
      styling: ["Tailwind CSS", "CSS Modules", "Sass/SCSS", "CSS Animations"],
      concepts: ["Responsive Design", "Mobile-First Development", "SPA/SSR", "Progressive Enhancement"]
    },
    backend: {
      languages: ["Python", "Java", "C++", "C#", "C"],
      databases: ["PostgreSQL", "MySQL", "MongoDB basics"],
      concepts: ["REST APIs", "Server-Side Rendering", "Database Design"]
    },
    design: {
      tools: ["Figma", "Adobe XD basics"],
      skills: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Typography", "Color Theory"]
    },
    devTools: {
      versionControl: ["Git", "GitHub"],
      editors: ["VS Code", "IntelliJ IDEA"],
      deployment: ["Vercel", "Netlify", "GitHub Pages"],
      packageManagers: ["npm", "pnpm"],
      testing: ["Jest basics", "AFL++ (Fuzzing)"]
    },
    softSkills: [
      "Problem Solving",
      "Critical Thinking",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Continuous Learning",
      "Attention to Detail",
      "Adaptability"
    ],
    currentlyLearning: ["Advanced React Patterns", "System Design", "Cloud Services (AWS basics)"]
  },

  // Projects - Detailed
  projects: [
    {
      name: "Printing Management System",
      description: "A comprehensive web-based platform designed to control, monitor, and secure institutional printing. Features user authentication, print job tracking, quota management, and administrative dashboard.",
      longDescription: "This full-stack application helps institutions manage their printing resources efficiently. It includes features like user authentication, print job submission and tracking, quota management for users, cost calculation, and a comprehensive admin dashboard for monitoring usage patterns.",
      tech: ["PostgreSQL", "TypeScript", "Next.js", "Tailwind CSS"],
      role: "Full-Stack Developer",
      challenges: "Implementing real-time print job tracking and designing an intuitive quota management system",
      link: "https://github.com/airqx/Printing-Management-System.git",
      type: "Full-Stack Web Application",
      status: "Completed"
    },
    {
      name: "Portfolio Website",
      description: "A modern, responsive portfolio featuring smooth animations, parallax scrolling, and interactive elements. Built with pure HTML, CSS, and JavaScript.",
      longDescription: "This portfolio website showcases my work and skills with a focus on user experience. Features include a typing animation, smooth scroll effects, particle backgrounds, dark/light theme toggle, and a fully responsive design that works on all devices.",
      tech: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "Figma"],
      role: "Designer & Developer",
      challenges: "Creating smooth animations that perform well across all devices and browsers",
      link: "https://portfolio-landing-page1.vercel.app/",
      type: "Frontend Portfolio",
      status: "Live"
    },
    {
      name: "Bzip2 Fuzz Testing",
      description: "A security research project involving greybox fuzzing and coverage analysis of the bzip2 compression utility using AFL++.",
      longDescription: "This project focused on software security testing through fuzzing. I used AFL++ to perform greybox fuzzing on the bzip2 compression tool, analyzing code coverage and identifying potential vulnerabilities. The project involved understanding control flow graphs and mutation-based testing strategies.",
      tech: ["C", "AFL++", "Control Flow Graphs", "Security Testing"],
      role: "Security Researcher",
      challenges: "Understanding fuzzing techniques and analyzing coverage metrics effectively",
      link: "https://github.com/airqx/Bzip2-Fuzz-Testing.git",
      type: "Security Research",
      status: "Completed"
    }
  ],

  // About & Philosophy
  about: {
    summary: "A passionate software engineering student driven by building clean, user-focused digital experiences and continuously improving technical craft.",
    extended: "With a strong interest in front-end development and modern web technologies, I focus on writing clear, maintainable code and designing interfaces that feel intuitive and purposeful. I believe in the power of clean code, thoughtful design, and continuous learning.",
    philosophy: "Engineering solutions — from concept to execution.",
    values: ["Quality over quantity", "User-centered design", "Continuous improvement", "Collaboration"],
    highlights: ["Clean, Semantic Code", "Responsive Design", "Performance Focused", "Accessibility First"],
    hobbies: ["Coding side projects", "Learning new technologies", "Reading tech blogs", "Open source exploration"]
  },

  // Availability & Work
  availability: {
    status: "Open for opportunities",
    types: ["Freelance projects", "Internships", "Part-time roles", "Collaborations", "Open source contributions"],
    preferredRoles: ["Frontend Developer", "Full-Stack Developer", "UI Developer", "Web Developer"],
    startDate: "Immediately available for freelance/part-time",
    timezone: "AST (GMT+3) - flexible with remote work"
  },

  // Fun Facts & Personality
  funFacts: [
    "I debug with console.log more than I'd like to admit",
    "My favorite editor theme changes every month",
    "I believe good documentation is an art form",
    "Coffee fuels my code",
    "I'm always excited to learn new frameworks"
  ],

  // FAQ - Common questions with direct answers
  faq: {
    "what makes you different": "I combine technical skills with a strong eye for design, ensuring that the code I write not only works well but also creates beautiful, intuitive user experiences.",
    "why should we hire you": "I bring a combination of technical proficiency, design sensibility, and a genuine passion for learning. I'm adaptable, detail-oriented, and committed to delivering high-quality work.",
    "what's your biggest strength": "My ability to quickly learn new technologies and my attention to detail when it comes to both code quality and user experience.",
    "what's your weakness": "I sometimes spend too much time perfecting details, but I've learned to balance perfectionism with practical deadlines.",
    "where do you see yourself": "Growing as a full-stack developer while contributing to meaningful projects that make a positive impact on users."
  }
};

// AI response generator - Advanced contextual responses
function generateAIResponse(query) {
  const q = query.toLowerCase().trim();
  const pk = portfolioKnowledge;
  
  // Helper function to check for keywords
  const matches = (...keywords) => keywords.some(kw => q.includes(kw));
  
  // ===== PERSONAL INFORMATION =====
  
  // Full name / Who is Ayman
  if (matches("full name", "your name", "what's your name", "what is your name", "who are you", "who is ayman")) {
    return `My name is **${pk.personal.fullName}**. I'm a ${pk.personal.age}-year-old ${pk.personal.title} from ${pk.personal.location.city}, ${pk.personal.location.country}. Nice to meet you!`;
  }
  
  // Age questions
  if (matches("how old", "age", "birthday", "birth", "born")) {
    return `Ayman is **${pk.personal.age} years old**, born in ${pk.personal.birthYear}. He's currently pursuing his Software Engineering degree at KFUPM.`;
  }
  
  // Nationality / Origin
  if (matches("nationality", "where from", "origin", "citizen")) {
    return `Ayman is **${pk.personal.nationality}**. He speaks ${pk.personal.languages.join(" and ")}.`;
  }
  
  // Languages spoken
  if (matches("speak", "language") && !matches("programming", "coding")) {
    return `Ayman speaks **${pk.personal.languages.join(" and ")}**. He's comfortable communicating in both languages professionally.`;
  }
  
  // ===== CV / RESUME =====
  
  if (matches("cv", "resume", "download", "pdf")) {
    return `You can **download Ayman's CV/Resume** by clicking the link below:\n\n**[Download CV](${pk.contact.cvPath})**\n\nThe CV includes his full education, experience, skills, and projects. Feel free to reach out at ${pk.contact.email} if you have any questions!`;
  }
  
  // ===== CONTACT INFORMATION =====
  
  if (matches("email", "mail", "e-mail")) {
    return `Ayman's email is **${pk.contact.email}**. Feel free to reach out for any inquiries, collaborations, or opportunities!`;
  }
  
  if (matches("github", "git hub", "code", "repository", "repo")) {
    return `You can find Ayman's code and projects on GitHub:\n\n**GitHub:** [github.com/${pk.contact.githubUsername}](${pk.contact.github})\n\nHe regularly pushes projects and contributions there!`;
  }
  
  if (matches("linkedin", "linked in")) {
    return `Connect with Ayman on LinkedIn:\n\n**LinkedIn:** [${pk.contact.linkedin}](${pk.contact.linkedin})\n\nFeel free to send a connection request!`;
  }
  
  if (matches("contact", "reach", "get in touch", "connect", "social")) {
    return `Here's how you can reach Ayman:\n\n**Email:** ${pk.contact.email}\n**GitHub:** github.com/${pk.contact.githubUsername}\n**LinkedIn:** linkedin.com/in/ayman-musalli-5255981b5\n\n**Preferred:** ${pk.contact.preferredContact}\n\nHe's very responsive and always happy to chat about opportunities or collaborations!`;
  }
  
  // ===== EDUCATION =====
  
  if (matches("education", "study", "school", "university", "degree", "kfupm", "college", "major", "graduate", "graduation")) {
    const edu = pk.education.current;
    return `**Education:**\n\n**${edu.institution}** (${edu.location})\n- Degree: ${edu.degree} in ${edu.major}\n- Status: ${edu.status}\n- Expected Graduation: ${edu.expectedGraduation}\n\n**Relevant Coursework:**\n${pk.education.relevantCoursework.slice(0, 5).map(c => `- ${c}`).join("\n")}\n\nAyman is passionate about learning both in and outside the classroom!`;
  }
  
  // Courses
  if (matches("course", "class", "subject", "learn in school")) {
    return `**Relevant Coursework at KFUPM:**\n\n${pk.education.relevantCoursework.map(c => `- ${c}`).join("\n")}\n\nThese courses have given Ayman a strong foundation in both theoretical and practical software development.`;
  }
  
  // ===== SKILLS =====
  
  // Frontend specific
  if (matches("frontend", "front-end", "front end", "html", "css", "react", "next")) {
    const fe = pk.skills.frontend;
    return `**Frontend Skills:**\n\n**Languages:** ${fe.languages.join(", ")}\n**Frameworks:** ${fe.frameworks.join(", ")}\n**Styling:** ${fe.styling.join(", ")}\n**Concepts:** ${fe.concepts.join(", ")}\n\nFrontend development is Ayman's primary focus and strongest area!`;
  }
  
  // Backend specific
  if (matches("backend", "back-end", "back end", "server", "database", "sql", "api")) {
    const be = pk.skills.backend;
    return `**Backend Skills:**\n\n**Languages:** ${be.languages.join(", ")}\n**Databases:** ${be.databases.join(", ")}\n**Concepts:** ${be.concepts.join(", ")}\n\nWhile frontend is his main focus, Ayman has solid backend knowledge for full-stack development.`;
  }
  
  // Design skills
  if (matches("design", "figma", "ui", "ux", "user interface", "user experience")) {
    const des = pk.skills.design;
    return `**Design Skills:**\n\n**Tools:** ${des.tools.join(", ")}\n**Skills:** ${des.skills.join(", ")}\n\nAyman believes good development goes hand-in-hand with good design. He creates interfaces that are both functional and beautiful.`;
  }
  
  // Tools & DevOps
  if (matches("tool", "devops", "git", "deploy", "vercel", "vs code", "editor")) {
    const tools = pk.skills.devTools;
    return `**Development Tools:**\n\n**Version Control:** ${tools.versionControl.join(", ")}\n**Editors:** ${tools.editors.join(", ")}\n**Deployment:** ${tools.deployment.join(", ")}\n**Package Managers:** ${tools.packageManagers.join(", ")}\n**Testing:** ${tools.testing.join(", ")}`;
  }
  
  // Programming languages
  if (matches("programming language", "coding language", "what language", "python", "java", "c++")) {
    return `**Programming Languages:**\n\n**Web:** ${pk.skills.frontend.languages.join(", ")}\n**General Purpose:** ${pk.skills.backend.languages.join(", ")}\n\nAyman is most proficient in JavaScript/TypeScript for web development, but has experience with various languages for different use cases.`;
  }
  
  // Soft skills
  if (matches("soft skill", "interpersonal", "teamwork", "communication", "personality")) {
    return `**Soft Skills:**\n\n${pk.skills.softSkills.map(s => `- ${s}`).join("\n")}\n\nAyman values collaboration and believes great software is built by great teams working together.`;
  }
  
  // General skills question
  if (matches("skill", "tech", "know", "stack", "capable", "ability", "abilities", "expertise")) {
    return `**Ayman's Technical Skills:**\n\n**Frontend:** ${pk.skills.frontend.frameworks.join(", ")}, ${pk.skills.frontend.languages.join(", ")}\n**Backend:** ${pk.skills.backend.languages.slice(0, 3).join(", ")}\n**Design:** ${pk.skills.design.tools.join(", ")}\n**Tools:** ${pk.skills.devTools.versionControl.join(", ")}, ${pk.skills.devTools.deployment.join(", ")}\n\n**Currently Learning:** ${pk.skills.currentlyLearning.join(", ")}\n\nHis strongest area is frontend development with React and Next.js!`;
  }
  
  // What are you learning
  if (matches("learning", "studying now", "improving", "working on")) {
    return `**Currently Learning:**\n\n${pk.skills.currentlyLearning.map(s => `- ${s}`).join("\n")}\n\nAyman is always expanding his skill set and staying current with industry trends!`;
  }
  
  // ===== PROJECTS =====
  
  // Specific project questions
  if (matches("printing", "print management", "print system")) {
    const proj = pk.projects[0];
    return `**${proj.name}**\n\n${proj.longDescription}\n\n**Tech Stack:** ${proj.tech.join(", ")}\n**Role:** ${proj.role}\n**Status:** ${proj.status}\n\n**View Project:** [GitHub](${proj.link})`;
  }
  
  if (matches("portfolio", "this website", "this site")) {
    const proj = pk.projects[1];
    return `**${proj.name}**\n\n${proj.longDescription}\n\n**Tech Stack:** ${proj.tech.join(", ")}\n**Role:** ${proj.role}\n**Status:** ${proj.status}\n\n**View Live:** [${proj.link}](${proj.link})`;
  }
  
  if (matches("fuzz", "bzip", "security", "testing")) {
    const proj = pk.projects[2];
    return `**${proj.name}**\n\n${proj.longDescription}\n\n**Tech Stack:** ${proj.tech.join(", ")}\n**Role:** ${proj.role}\n**Status:** ${proj.status}\n\n**View Project:** [GitHub](${proj.link})`;
  }
  
  // General projects question
  if (matches("project", "work", "built", "created", "made", "portfolio work", "show me")) {
    let response = `**Ayman's Projects (${pk.projects.length} Featured):**\n\n`;
    pk.projects.forEach((proj, i) => {
      response += `**${i + 1}. ${proj.name}** (${proj.type})\n${proj.description}\nTech: ${proj.tech.join(", ")}\n\n`;
    });
    response += `Check out the Projects section above for live demos and source code!`;
    return response;
  }
  
  // How many projects
  if (matches("how many project", "number of project", "project count")) {
    return `Ayman has completed **${pk.experience.projectsCompleted}+ projects** so far, with ${pk.projects.length} featured projects showcased on this portfolio. He's always working on something new!`;
  }
  
  // ===== EXPERIENCE =====
  
  if (matches("experience", "years", "background", "history", "how long")) {
    return `**Experience:**\n\n- **${pk.experience.years} years** of hands-on development experience\n- **${pk.experience.projectsCompleted}+ projects** completed\n- **${pk.experience.volunteeringHours}+ hours** of volunteering\n\n**Focus:** ${pk.experience.focus}\n**Work Style:** ${pk.experience.workStyle}\n\nAyman combines academic learning with practical project experience to continuously grow as a developer.`;
  }
  
  // Volunteering
  if (matches("volunteer", "community", "giving back")) {
    return `Ayman has contributed **${pk.experience.volunteeringHours}+ hours** of volunteering! He believes in giving back to the community and helping others learn and grow.`;
  }
  
  // ===== AVAILABILITY & HIRING =====
  
  if (matches("available", "hire", "hiring", "job", "work with", "freelance", "intern", "position", "opportunity", "open to")) {
    const av = pk.availability;
    return `**Availability:**\n\n**Status:** ${av.status}\n\n**Open to:**\n${av.types.map(t => `- ${t}`).join("\n")}\n\n**Preferred Roles:** ${av.preferredRoles.join(", ")}\n**Start:** ${av.startDate}\n**Timezone:** ${av.timezone}\n\nFeel free to reach out at **${pk.contact.email}** to discuss opportunities!`;
  }
  
  // ===== LOCATION & REMOTE =====
  
  if (matches("location", "where", "based", "live", "city", "country", "timezone", "remote")) {
    const loc = pk.personal.location;
    return `**Location:**\n\n**City:** ${loc.city}\n**Country:** ${loc.country}\n**Timezone:** ${loc.timezone}\n\n**Remote Work:** ${loc.openToRemote ? "Yes, open to remote opportunities!" : "Prefers on-site"}\n**Relocation:** ${loc.willingToRelocate ? "Open to relocation for the right opportunity" : "Not currently"}`;
  }
  
  // ===== ABOUT & PHILOSOPHY =====
  
  if (matches("about", "introduce", "yourself", "tell me about")) {
    return `${pk.about.extended}\n\n**Philosophy:** "${pk.about.philosophy}"\n\n**Key Strengths:**\n${pk.about.highlights.map(h => `- ${h}`).join("\n")}\n\n**Values:** ${pk.about.values.join(", ")}`;
  }
  
  // Philosophy / Motto
  if (matches("philosophy", "motto", "believe", "value", "principle")) {
    return `**Ayman's Philosophy:**\n\n"${pk.about.philosophy}"\n\n**Core Values:**\n${pk.about.values.map(v => `- ${v}`).join("\n")}\n\nThese principles guide his approach to every project and collaboration.`;
  }
  
  // Strengths / Highlights
  if (matches("strength", "best at", "highlight", "stand out", "unique", "different")) {
    return `**What Makes Ayman Stand Out:**\n\n${pk.about.highlights.map(h => `- ${h}`).join("\n")}\n\n${pk.faq["what makes you different"]}`;
  }
  
  // ===== FUN & PERSONALITY =====
  
  if (matches("fun fact", "interesting", "hobby", "hobbies", "free time", "outside work")) {
    return `**Fun Facts About Ayman:**\n\n${pk.funFacts.map(f => `- ${f}`).join("\n")}\n\n**Hobbies:**\n${pk.about.hobbies.map(h => `- ${h}`).join("\n")}`;
  }
  
  // ===== FAQ QUESTIONS =====
  
  if (matches("why should", "why hire", "why choose")) {
    return pk.faq["why should we hire you"];
  }
  
  if (matches("weakness", "improve", "working on yourself")) {
    return pk.faq["what's your weakness"];
  }
  
  if (matches("future", "goal", "where do you see", "5 years", "aspiration")) {
    return pk.faq["where do you see yourself"] + `\n\nAyman is excited about the future of web development and AI, and wants to be at the forefront of building innovative solutions.`;
  }
  
  // ===== GREETINGS =====
  
  if (matches("hello", "hi", "hey", "good morning", "good afternoon", "good evening") || q === "yo" || q === "sup") {
    const greetings = [
      `Hello! I'm Ayman's AI assistant. I know everything about him - his skills, projects, education, and more. What would you like to know?`,
      `Hey there! Welcome to Ayman's portfolio. Feel free to ask me anything - from his technical skills to his contact info, or even fun facts about him!`,
      `Hi! Great to have you here. I can tell you about Ayman's ${pk.experience.projectsCompleted}+ projects, his education at KFUPM, or help you get in touch with him. What interests you?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Thanks
  if (matches("thank", "thanks", "appreciate", "helpful")) {
    return "You're very welcome! If you have any more questions about Ayman, want to download his CV, or need his contact info, just ask. Have a great day!";
  }
  
  // Goodbye
  if (matches("bye", "goodbye", "see you", "take care", "later")) {
    return "Goodbye! Thanks for visiting Ayman's portfolio. Feel free to reach out at " + pk.contact.email + " if you'd like to connect. Take care!";
  }
  
  // Compliments
  if (matches("nice", "cool", "awesome", "great portfolio", "impressive", "love it", "well done")) {
    return "Thank you so much! Ayman put a lot of effort into building this portfolio. If you'd like to work with him or discuss a project, feel free to reach out at " + pk.contact.email + "!";
  }
  
  // ===== DEFAULT RESPONSE =====
  
  return `I'd be happy to help! Here's what I can tell you about Ayman:\n\n- **Personal Info** - name, age, nationality, languages\n- **Skills** - frontend, backend, design, tools\n- **Projects** - detailed info on ${pk.projects.length} featured projects\n- **Education** - KFUPM, courses, achievements\n- **Experience** - ${pk.experience.years} years, ${pk.experience.projectsCompleted}+ projects\n- **Contact** - email, GitHub, LinkedIn\n- **CV/Resume** - download his latest CV\n- **Availability** - hiring status, work preferences\n\nJust ask me anything!`;
}

// AI Assistant state
let aiChatPanel = null;
let aiToggleBtn = null;
let aiInput = null;

let conversationMode = false; // Continuous conversation mode

function initAIAssistant() {
  aiChatPanel = document.getElementById("aiChatPanel");
  aiToggleBtn = document.getElementById("aiToggleBtn");
  aiInput = document.getElementById("aiInput");

  const aiConversationToggle = document.getElementById("aiConversationToggle");

  const requiredElements = [
    aiChatPanel,
    aiToggleBtn,
    aiInput,
  ];

  if (requiredElements.some((el) => !el)) return;

  // Toggle chat panel
  aiToggleBtn.addEventListener("click", toggleChatPanel);

  // Conversation mode toggle - continuous conversation
  if (aiConversationToggle) {
    aiConversationToggle.addEventListener("click", () => {
      conversationMode = !conversationMode;
      aiConversationToggle.classList.toggle("active", conversationMode);

      if (conversationMode) {
        addAIBotNotice(
          "Conversation mode on! I'll keep the conversation going."
        );
      } else {
        addAIBotNotice("Conversation mode off.");
      }
    });
  }
}

function toggleChatPanel() {
  const isOpen = aiChatPanel.classList.contains("active");

  aiChatPanel.classList.toggle("active");
  aiToggleBtn.classList.toggle("active");
  aiToggleBtn.setAttribute("aria-expanded", String(!isOpen));
  aiChatPanel.setAttribute("aria-hidden", String(isOpen));

  if (!isOpen) {
    setTimeout(() => aiInput.focus(), 300);
  }
}

// Helper: send message through the new backend chat.js
function sendAIMessageFromText(message) {
  if (typeof window.sendAIMessage === "function") {
    window.sendAIMessage(message, true);
  }
}

// Helper: show bot notices through the new chat.js
function addAIBotNotice(message) {
  if (typeof window.addAIBotMessage === "function") {
    window.addAIBotMessage(message);
  }
}

/*
|--------------------------------------------------------------------------
| APP INITIALIZATION
|--------------------------------------------------------------------------
| Runs all feature initializers after DOM is fully loaded.
*/
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTypewriter();
  updateGreeting();
  initCounters();
  initScrollReveal();
  initSkillBars();
  initParticles();
  initCursorGlow();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
  initMarquee();
  initTypingGame();
  initAIAssistant();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Prevent accidental form resubmission prompt on refresh/navigation in some cases
  if (window.history.replaceState) {
    window.history.replaceState(null, "", window.location.href);
  }
});