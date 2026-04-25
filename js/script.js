// ======================================================
// PORTFOLIO SCRIPT
// Main client-side interactions for the portfolio website
// ======================================================

"use strict";

const _LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", ""]);
const _isLocal =
  _LOCAL_HOSTS.has(window.location.hostname) ||
  window.location.protocol === "file:";

const BASE_API_URL =
  window.__API_BASE_URL ||
  (_isLocal
    ? "http://localhost:3002"
    : "https://two02270440-aymanmusalli-assignment03.onrender.com");

/*
|--------------------------------------------------------------------------
| THEME MANAGEMENT
|--------------------------------------------------------------------------
| Handles user-triggered theme switching.
| Initial theme loading is already handled in index.html <head>
| to prevent theme flashing on first render.
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

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", String(!isExpanded));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const handleScroll = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }

    updateActiveLink();
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPosition = window.scrollY + 120;

  let activeSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      activeSectionId = section.id;
    }
  });

  if (!activeSectionId) return;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;
    link.classList.toggle("active", isActive);
  });
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

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
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
| Handles form validation, submission to backend, and user feedback.
| Sends form data to backend email endpoint for processing.
*/
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("sendBtn");

  if (!form || !submitButton) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Browser validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    // Custom validation
    if (!name || name.length < 2) {
      showToast("Please enter a valid name", "error");
      return;
    }

    if (!email || !isValidEmail(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!subject || subject.length < 3) {
      showToast("Subject must be at least 3 characters", "error");
      return;
    }

    if (!message || message.length < 10) {
      showToast("Message must be at least 10 characters", "error");
      return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(`${BASE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      showToast(data.message || "Message sent successfully!", "success");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      showToast(
        error.message || "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

  const clonedChildren = Array.from(marqueeContent.children).map((child) =>
    child.cloneNode(true)
  );

  clonedChildren.forEach((child) => marqueeContent.appendChild(child));
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

  timerEl.textContent = String(timeLeft);
  scoreEl.textContent = "0";
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
    timerEl.textContent = String(timeLeft);
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

  finalWpm.textContent = String(wpm);
  finalSnippets.textContent = String(snippetsCompleted);
  finalPoints.textContent = String(totalScore);

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

  if (event.inputType === "insertFromPaste") {
    inputField.value = "";
    return;
  }

  const characterSpans = codeDisplay.querySelectorAll("span");
  const currentSnippet = Array.from(characterSpans)
    .map((span) => span.textContent)
    .join("");
  const typedCharacters = inputField.value.split("");

  let allCorrect = true;

  characterSpans.forEach((charSpan, index) => {
    const typedChar = typedCharacters[index];

    if (typedChar == null) {
      charSpan.className = "";
      allCorrect = false;
    } else if (typedChar === charSpan.textContent) {
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

  scoreEl.textContent = String(totalScore);
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
| AI ASSISTANT PANEL
|--------------------------------------------------------------------------
| Handles opening and closing the assistant panel.
| Message sending and backend communication are handled in chat.js.
*/
let aiChatPanel = null;
let aiToggleBtn = null;
let aiInput = null;

function initAIAssistant() {
  aiChatPanel = document.getElementById("aiChatPanel");
  aiToggleBtn = document.getElementById("aiToggleBtn");
  aiInput = document.getElementById("aiInput");

  const requiredElements = [aiChatPanel, aiToggleBtn, aiInput];
  if (requiredElements.some((element) => !element)) return;

  aiToggleBtn.addEventListener("click", toggleChatPanel);
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

/*
|--------------------------------------------------------------------------
| GITHUB REPOSITORIES API
|--------------------------------------------------------------------------
| Fetches repositories from GitHub API and displays them dynamically.
| Includes error handling and loading states.
*/
async function initGitHubRepos() {
  const container = document.getElementById("reposContainer");
  const loading = document.getElementById("reposLoading");
  const error = document.getElementById("reposError");

  if (!container || !loading || !error) return;

  try {
    // Show loading state
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    container.innerHTML = "";

    // Fetch repositories from backend proxy to avoid browser-side GitHub rate limits
    const response = await fetch(`${BASE_API_URL}/api/repos`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(
        payload.details || payload.error || `Repositories API error: ${response.status} ${response.statusText}`
      );
    }

    const repos = Array.isArray(payload.repos) ? payload.repos : [];

    if (!Array.isArray(repos) || repos.length === 0) {
      throw new Error("No repositories found");
    }

    // Hide loading state
    loading.classList.add("hidden");

    // Create repository cards
    repos.forEach((repo) => {
      const card = createRepoCard(repo);
      container.appendChild(card);
    });

    // Trigger reveal animation for new elements
    const revealElements = container.querySelectorAll(".reveal");
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } catch (err) {
    console.error("Error loading GitHub repositories:", err);

    // Show error state
    loading.classList.add("hidden");
    error.classList.remove("hidden");
    const errorMessage = document.getElementById("reposErrorMessage");
    if (errorMessage) {
      errorMessage.textContent = `Unable to load repositories: ${err.message}`;
    }
  }
}

/*
|--------------------------------------------------------------------------
| CREATE REPOSITORY CARD
|--------------------------------------------------------------------------
| Creates a DOM element for a single repository.
*/
function createRepoCard(repo) {
  const card = document.createElement("article");
  card.className = "repo-card reveal visible";

  // Build the card HTML
  card.innerHTML = `
    <div class="repo-header">
      <svg class="repo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
      <h3 class="repo-name">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${repo.name} on GitHub">
          ${repo.name.replace(/-/g, " ")}
        </a>
      </h3>
    </div>

    <p class="repo-description ${!repo.description ? "empty" : ""}">
      ${repo.description || "No description available"}
    </p>

    <div class="repo-meta">
      ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ""}
      ${repo.stargazers_count > 0 ? `<span class="repo-meta-item" title="Stars"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 20.16 24.02 12 18.77 3.84 24.02 6.23 16.01 0 10.35 8.91 10.26 12 2"/></svg>${repo.stargazers_count}</span>` : ""}
      ${repo.forks_count > 0 ? `<span class="repo-meta-item" title="Forks"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="12" y1="12" x2="12" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/><line x1="6" y1="6" x2="12" y2="12"/><line x1="12" y1="12" x2="18" y2="6"/></svg>${repo.forks_count}</span>` : ""}
    </div>

    <div class="repo-links">
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link-btn primary" aria-label="View ${repo.name} repository">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
        View Repo
      </a>
      ${repo.homepage && repo.homepage.trim() !== "" ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="repo-link-btn secondary" aria-label="Visit ${repo.name} live site"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Live</a>` : ""}
    </div>
  `;

  return card;
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
  initGitHubRepos();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (window.history.replaceState) {
    window.history.replaceState(null, "", window.location.href);
  }
});