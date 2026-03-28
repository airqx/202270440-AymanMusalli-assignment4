# Technical Documentation – Assignment 2  
Personal Portfolio Website (Interactive Version)

---

## 1️⃣ Project Overview

This project is an enhanced version of the Assignment 1 portfolio website, extended with additional interactivity, improved user experience, and backend integration.

The objective of this assignment was to:

- Extend the existing portfolio with interactive features  
- Improve user engagement using JavaScript  
- Implement dynamic behavior and user feedback  
- Maintain clean and structured code  
- Integrate AI-assisted features  
- Preserve responsive design and accessibility  

The final website includes dynamic UI features such as animations, a typing game, real-time feedback, and an AI-powered assistant connected to a backend service.

---

## 2️⃣ Technology Stack

### Frontend Technologies

- **HTML5** – Semantic structure and accessibility  
- **CSS3** – Responsive design using Flexbox, Grid, and CSS Variables  
- **Vanilla JavaScript (ES6+)** – Interactivity and dynamic behavior  
- **LocalStorage API** – Theme persistence  
- **IntersectionObserver API** – Scroll-based animations  

### Backend Technologies

- **Node.js (Express)** – Backend server  
- **REST API** – Chat endpoint (`/api/chat`)  
- **Environment Variables** – Secure API key management  

### External APIs

- **Mistral API** – AI assistant responses  

### Hosting

- **Netlify** – Frontend deployment  
- **Render** – Backend deployment  

---

## 3️⃣ Architecture & File Organization

### Project Structure

```
assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   └── chat.js
├── backend/
│   └── server.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

### Separation of Responsibilities

| File | Responsibility |
|------|----------------|
| index.html | Structure & layout |
| styles.css | Design & responsiveness |
| script.js | UI logic & interactions |
| chat.js | AI assistant behavior |
| server.js | Backend API & AI communication |

---

## 4️⃣ Frontend Implementation

### HTML Structure

The website uses semantic HTML elements:

```html
<nav>
<section>
<footer>
```

Each section has a unique `id` for navigation and interaction.

---

### CSS Architecture

- Uses CSS variables for consistent design  
- Supports dark/light themes via `data-theme`  
- Responsive layout using Flexbox and Grid  
- Organized into logical sections  

---

### JavaScript Features

#### Theme System
- Toggle dark/light mode  
- Stored in `localStorage`  

#### Navigation System
- Hamburger menu  
- Active link highlighting  
- Smooth scrolling  

#### Scroll Animations
- Implemented using `IntersectionObserver`  

#### Typing Game
- Timer-based  
- WPM calculation  
- Real-time feedback  

#### Toast Notifications
- Displays success/error messages  

#### Dynamic Greeting
- Changes based on time  

#### Hero Animations
- Particles and effects  

---

## 5️⃣ AI Assistant System

### Frontend (chat.js)

- Handles user input  
- Displays messages  
- Formats responses  
- Handles actions (`[SCROLL]`, `[ACTION]`)  
- Sends requests to backend  

### Backend (server.js)

- Processes messages  
- Validates input  
- Sends requests to Mistral API  
- Returns responses  

### Message Flow

1. User sends message  
2. Frontend → Backend  
3. Backend → Mistral API  
4. Response → Frontend  
5. UI updates  

---

## 6️⃣ Data Handling

- **LocalStorage** → theme persistence  
- **Chat history** → temporary in-memory storage  
- **Form validation** → client-side  

---

## 7️⃣ Error Handling & User Feedback

- Loading indicators during AI requests  
- API error handling  
- Form validation feedback  
- Disabled input during processing  

---

## 8️⃣ Performance Considerations

- No heavy frameworks  
- Efficient DOM updates  
- Lightweight structure  
- Optimized animations using `IntersectionObserver`  

---

## 9️⃣ Responsiveness

- Mobile-first design  
- Media queries  
- Flexible layouts  

---

## 🔟 Deployment

### Frontend
- Hosted on Netlify  

### Backend
- Hosted on Render  

### Architecture

```
User → Netlify → Render → Mistral API
```

---

## 1️⃣1️⃣ Security Considerations

- API key stored in environment variables  
- `.env` excluded from GitHub  
- No sensitive data exposed in frontend  

---

## Conclusion

This Assignment 2 project builds on Assignment 1 by introducing interactivity, backend integration, and AI-powered features.

The implementation demonstrates clean architecture, modular JavaScript design, effective frontend-backend communication, and responsible AI usage while maintaining performance and usability standards.