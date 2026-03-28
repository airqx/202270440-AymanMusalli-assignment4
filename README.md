# Personal Portfolio Website – Assignment 2

## 🌐 Live Demo
🔗 [https://portfolio-ayman0969.netlify.app/](https://portifolio-ayman1069.netlify.app/)

---

## 📌 Overview

This project is an enhanced version of the Assignment 1 portfolio website, extended with interactive features, improved user experience, and backend integration.

It showcases my projects, skills, and contact information while introducing an AI-powered assistant and more advanced UI interactions.

The goal of this assignment was to demonstrate:
- Interactive JavaScript features  
- Improved UI/UX behavior  
- Frontend-backend integration  
- Clean and maintainable code  
- Organized project structure  
- Proper technical and AI documentation  

---

## 🚀 Features

### 🧩 Sections Included
- Home (Hero Section)
- About
- Projects
- Skills
- Contact
- Footer

### 🎨 UI / UX Features
- Dark / Light theme toggle (saved using localStorage)
- Smooth scrolling navigation
- Active navbar link highlighting
- Scroll reveal animations
- Animated hero statistics counters
- Animated skill progress bars
- Back-to-top button
- Cursor glow effect (desktop only)
- Time-based greeting message
- Toast notification system

### 🎮 Interactive Features

#### Code Typing Challenge
- 30-second typing game  
- Real-time score tracking  
- Words per minute (WPM) calculation  
- Anti-paste protection  
- Restart functionality  

### 🤖 AI Assistant (NEW)

- Chat-based assistant integrated into the portfolio  
- Answers questions about my skills, projects, and experience  
- Supports smart actions:
  - Scroll to sections → [SCROLL:section]
  - Download CV → [ACTION:download-cv]
- Maintains short chat history for better responses  
- Displays formatted responses (lists, bold text, etc.)

### 📩 Contact Form
- Front-end validation  
- Toast success message  
- Form reset after submission  

---

## 🛠️ Technologies Used

### Frontend
- HTML5 – Semantic structure  
- CSS3 – Custom variables, Flexbox, Grid, animations  
- JavaScript (Vanilla JS) – DOM manipulation, events, localStorage, IntersectionObserver  

### Backend
- Node.js (Express) – API server  
- REST API – Chat endpoint  

### External API
- Mistral API – AI assistant responses  

### Deployment
- Netlify – Frontend hosting  
- Render – Backend hosting  

---

## 📂 Project Structure

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

---

## 📥 How to Clone and Run Locally

### 1️⃣ Clone the repository
git clone https://github.com/airqx/202270440-AymanMusalli-Assignment2.git

### 2️⃣ Navigate into the project folder
cd 202270440-AymanMusalli-assignment2

### 3️⃣ Run the frontend
Open index.html directly in your browser  
OR use Live Server (recommended)

### 4️⃣ Run the backend
cd backend  
npm install  
node server.js  

---

## 📱 Responsiveness

The website is fully responsive and optimized for multiple screen sizes:

- Desktop  
- Tablet  
- Mobile  

### Implementation Details

- Flexible layout using Flexbox  
- Responsive breakpoints using media queries  
- Adaptive spacing and typography  
- Mobile navigation with hamburger menu  

---

## 🧠 JavaScript Functionalities Implemented

- Theme toggle (persistent using localStorage)  
- Dynamic greeting  
- Animated counters  
- Scroll reveal animations  
- Active navigation tracking  
- Typing mini-game  
- Contact form validation  
- Back-to-top button  
- AI assistant interaction  

---

## 🔌 Backend & API

- Express server handles /api/chat requests  
- Validates input and manages chat history  
- Sends requests to Mistral API  
- Returns formatted responses to frontend  

---

## 🔒 Security

- API key stored in environment variables  
- .env file excluded from GitHub  
- No sensitive data exposed in frontend  

---

## ⚡ Performance

- Lightweight (no frameworks used)  
- Efficient DOM updates  
- IntersectionObserver for animations  
- Limited chat history for faster responses  

---

## 🤖 AI Usage

AI tools were used responsibly during development for:

- Debugging JavaScript logic  
- Improving code structure and quality  
- Assisting with backend integration  
- Supporting deployment setup  
- Enhancing documentation  

All AI-generated suggestions were:
- Carefully reviewed  
- Tested in the browser  
- Modified to match assignment requirements  

Full explanation available in: docs/ai-usage-report.md  

---



## 👤 Author

Ayman Musalli  
Software Engineering Student  
Dhahran, Saudi Arabia  

GitHub: https://github.com/airqx  
LinkedIn: https://www.linkedin.com/in/ayman-musalli-5255981b5/

---

© 2026 Ayman Musalli. All rights reserved.
