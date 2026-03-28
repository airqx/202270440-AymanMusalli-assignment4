const API_URL = "https://two02270440-aymanmusalli-assignment02.onrender.com/api/chat";

const messagesContainer = document.getElementById("aiChatMessages");
const input = document.getElementById("aiInput");
const sendBtn = document.getElementById("aiSendBtn");
const chatForm = document.getElementById("aiChatForm");
const suggestionsContainer = document.getElementById("aiSuggestions");

let chatHistory = [];

function addMessage(text, sender = "bot") {
  if (!messagesContainer) return;

  const msg = document.createElement("div");
  msg.className = `ai-message ai-message-${sender}`;

  const content = document.createElement("div");
  content.className = "ai-message-content";

  // Handle basic formatting
  const formattedText = formatMessage(text);
  content.innerHTML = formattedText;

  msg.appendChild(content);
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatMessage(text) {
  // Escape HTML first
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // Handle line breaks
  const withBreaks = escaped.replace(/\n/g, '<br>');

  // Handle bold text **text**
  const withBold = withBreaks.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle bullet points
  const withBullets = withBold.replace(/^- (.+)$/gm, '<li>$1</li>');
  const withList = withBullets.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  return withList;
}

function handleActions(text) {
  const scrollMatches = [...text.matchAll(/\[SCROLL:(.*?)\]/g)];
  const actionMatches = [...text.matchAll(/\[ACTION:(.*?)\]/g)];

  scrollMatches.forEach((match) => {
    const id = match[1]?.trim();
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  if (!sendBtn || !input) return;

  sendBtn.disabled = isLoading;
  input.disabled = isLoading;

  if (isLoading) {
    sendBtn.textContent = "...";
  } else {
    sendBtn.textContent = "Send";
  }
}

async function sendMessage(customMessage = null) {
  if (!input || !messagesContainer) return;

  const message = (customMessage ?? input.value).trim();
  if (!message) return;

  addMessage(message, "user");
  chatHistory.push({ role: "user", content: message });

  if (!customMessage) {
    input.value = "";
  } else {
    input.value = "";
  }

  setLoading(true);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history: chatHistory,
      }),
    });

    const data = await res.json();

if (!res.ok) {
  console.error("Backend response error:", data);
  addMessage(data.details || data.error || "Something went wrong.", "bot");
  return;
}

let reply = data.reply || "Something went wrong.";
    const cleanReply = handleActions(reply);

    addMessage(cleanReply, "bot");
    chatHistory.push({ role: "assistant", content: cleanReply });
  } catch (error) {
    console.error("AI chat error:", error);
    addMessage("Sorry, I couldn’t connect right now.", "bot");
  } finally {
    setLoading(false);
    input.focus();
  }
}

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });
}

if (sendBtn) {
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });
}

if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

if (suggestionsContainer) {
  suggestionsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-query]");
    if (!btn) return;

    const prompt = btn.getAttribute("data-query");
    if (!prompt) return;

    sendMessage(prompt);
  });
}
// expose functions for script.js
window.sendAIMessage = sendMessage;
window.addAIBotMessage = addMessage;