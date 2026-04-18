const BASE_API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3002"
    : "https://two02270440-aymanmusalli-assignment02-2.onrender.com";

const API_URL = `${BASE_API_URL}/api/chat`;

const messagesContainer = document.getElementById("aiChatMessages");
const chatInput = document.getElementById("aiInput");
const sendButton = document.getElementById("aiSendBtn");
const chatForm = document.getElementById("aiChatForm");
const suggestionsContainer = document.getElementById("aiSuggestions");

let chatHistory = [];

function addMessage(text, sender = "bot") {
  if (!messagesContainer) return;

  const messageElement = document.createElement("div");
  messageElement.className = `ai-message ai-message-${sender}`;

  const contentElement = document.createElement("div");
  contentElement.className = "ai-message-content";
  contentElement.innerHTML = formatMessage(text);

  messageElement.appendChild(contentElement);
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatMessage(text) {
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const textWithBreaks = escapedText.replace(/\n/g, "<br>");
  const textWithBold = textWithBreaks.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  const textWithBullets = textWithBold.replace(/^- (.+)$/gm, "<li>$1</li>");

  return textWithBullets.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
}

function handleActions(text) {
  const scrollMatches = [...text.matchAll(/\[SCROLL:(.*?)\]/g)];
  const actionMatches = [...text.matchAll(/\[ACTION:(.*?)\]/g)];

  scrollMatches.forEach((match) => {
    const id = match[1]?.trim();
    const targetElement = document.getElementById(id);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  });

  actionMatches.forEach((match) => {
    const action = match[1]?.trim();

    if (action === "download-cv") {
      window.open("assets/resume.pdf", "_blank");
    }
  });

  return text
    .replace(/\[SCROLL:.*?\]/g, "")
    .replace(/\[ACTION:.*?\]/g, "")
    .trim();
}

function setLoading(isLoading) {
  if (!sendButton || !chatInput) return;

  sendButton.disabled = isLoading;
  chatInput.disabled = isLoading;
  sendButton.textContent = isLoading ? "..." : "Send";
}

async function sendMessage(customMessage = null) {
  if (!chatInput || !messagesContainer) return;

  const message = (customMessage ?? chatInput.value).trim();
  if (!message) return;

  addMessage(message, "user");
  chatHistory.push({ role: "user", content: message });
  chatInput.value = "";

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history: chatHistory,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend response error:", data);
      addMessage(data.details || data.error || "Something went wrong.", "bot");
      return;
    }

    const reply = data.reply || "Something went wrong.";
    const cleanReply = handleActions(reply);

    addMessage(cleanReply, "bot");
    chatHistory.push({ role: "assistant", content: cleanReply });
  } catch (error) {
    console.error("AI chat error:", error);
    addMessage("Sorry, I couldn’t connect right now.", "bot");
  } finally {
    setLoading(false);

    if (chatInput) {
      chatInput.focus();
    }
  }
}

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
}

if (sendButton) {
  sendButton.addEventListener("click", (event) => {
    event.preventDefault();
    sendMessage();
  });
}

if (chatInput) {
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
}

if (suggestionsContainer) {
  suggestionsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-query]");
    if (!button) return;

    const prompt = button.getAttribute("data-query");
    if (!prompt) return;

    sendMessage(prompt);
  });
}

// Expose helper functions for other scripts if needed
window.sendAIMessage = sendMessage;
window.addAIBotMessage = addMessage;