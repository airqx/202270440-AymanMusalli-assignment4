# Personal Portfolio Website – Assignment 3

## 🌐 Live Demo
🔗 (https://portifolio-ayman1069.netlify.app/)

---

## 📌 Overview

This project is an enhanced version of the Assignment 2 portfolio website, extended with API integration and complex backend logic for email functionality.

It showcases my projects, skills, and contact information while demonstrating advanced web development capabilities including live API integration and production deployment.

The goal of this assignment was to demonstrate:
- **API Integration** with external services (GitHub API)
- **Complex Backend Logic** for email processing and validation
- **Production Deployment** of both frontend and backend
- **Secure API Key Management** and environment configuration
- **Full-Stack Development** with proper error handling
- **Comprehensive Technical Documentation**

---

## 🚀 Features

### 🧩 Sections Included
- Home (Hero Section)
- About
- Projects (GitHub API Integration)
- Skills
- Contact (Email Backend)
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

### 🤖 AI Assistant (Enhanced)

- Chat-based assistant integrated into the portfolio
- Answers questions about my skills, projects, and experience
- Supports smart actions:
  - Scroll to sections → [SCROLL:section]
  - Download CV → [ACTION:download-cv]
- Maintains short chat history for better responses
- Displays formatted responses (lists, bold text, etc.)

### 📧 Contact Form (Backend Integration)

- **Real email sending** via Gmail SMTP
- Server-side validation and security
- Comprehensive error handling
- Loading states and user feedback
- Toast success/error messages
- Form reset after successful submission

### 🔗 GitHub API Integration (NEW)

- **Live repository fetching** from GitHub API
- Dynamic project cards generation
- Real-time repository statistics
- Error handling and loading states
- Responsive grid layout
- Links to live demos and source code

---

## 🛠️ Technologies Used

### Frontend
- HTML5 – Semantic structure
- CSS3 – Custom variables, Flexbox, Grid, animations
- JavaScript (Vanilla JS) – DOM manipulation, events, localStorage, IntersectionObserver, Fetch API

### Backend
- Node.js (Express) – REST API server
- Nodemailer – Email sending functionality
- CORS – Cross-origin resource sharing
- Dotenv – Environment variable management

### External APIs
- **GitHub REST API** – Repository data fetching
- **Mistral AI API** – AI assistant responses
- **Gmail SMTP** – Email delivery service

### Deployment
- **Netlify** – Frontend hosting
- **Render** – Backend hosting

---

## 📂 Project Structure

```
assignment-3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   └── chat.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (not committed)
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## 📥 How to Clone and Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/airqx/202270440-AymanMusalli-Assignment02.git
cd 202270440-AymanMusalli-Assignment02
```

### 2️⃣ Set up the backend
```bash
cd backend
npm install
# Create .env file with your API keys
cp .env.example .env
# Edit .env with your credentials
```

### 3️⃣ Run the backend
```bash
npm start
# Server runs on http://localhost:3002
```

### 4️⃣ Run the frontend
Open `index.html` directly in your browser or use Live Server

---

## 🔧 Environment Setup

Create a `.env` file in the `backend/` folder:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
MISTRAL_API_KEY=your-mistral-api-key
PORT=3002
```

**Note:** Never commit the `.env` file to GitHub!

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

### Frontend Features
- Theme toggle (persistent using localStorage)
- Dynamic greeting based on time
- Animated counters with IntersectionObserver
- Scroll reveal animations
- Active navigation tracking
- Typing mini-game with anti-cheat protection
- Contact form with backend integration
- Back-to-top button
- AI assistant interaction
- GitHub API integration with error handling

### Backend Features
- REST API endpoints (`/api/chat`, `/api/contact`)
- Email sending via Gmail SMTP
- Input validation and sanitization
- Error handling and logging
- CORS configuration
- Environment variable management

---

## 🔌 API Endpoints

### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "message": "Hello",
  "history": [{"role": "user", "content": "Previous message"}]
}
```

### Contact Endpoint
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Message content..."
}
```

---

## 🔒 Security Features

- API keys stored in environment variables
- Input validation on both client and server
- CORS protection
- Email format validation
- Message length limits
- .env file excluded from version control
- No sensitive data exposed in frontend

---

## ⚡ Performance Optimizations

- Lightweight vanilla JavaScript (no frameworks)
- Efficient DOM updates with minimal reflows
- IntersectionObserver for scroll-based animations
- Lazy loading for GitHub repositories
- Limited chat history for faster AI responses
- Compressed assets and optimized images

---

## 🚀 Deployment

### Frontend (Netlify)
- Static site deployment
- Automatic builds from GitHub
- Custom domain support
- CDN distribution

### Backend (Render)
- Node.js web service
- Environment variable configuration
- Automatic scaling
- Free tier available

### Production Architecture
```
User → Netlify (Frontend) → Render (Backend) → External APIs
                              ↓
                        Gmail SMTP & Mistral AI
```

---

## 🤖 AI Usage

AI tools were used extensively in Assignment 3 for:

- **API Integration:** GitHub repository fetching implementation
- **Email Functionality:** Nodemailer setup and validation logic
- **Deployment:** Render/Netlify configuration guidance
- **Security:** Input validation and environment variable management
- **Documentation:** Technical writing and code examples

All AI-generated suggestions were:
- Carefully reviewed and tested
- Adapted to match existing codebase
- Verified for security and performance
- Documented in the AI usage report

Full explanation available in: `docs/ai-usage-report.md`

---

## 📊 Assignment 3 Requirements Met

✅ **API Integration:** Live GitHub repository data fetching and display
✅ **Complex Logic:** Email contact form with backend validation and SMTP
✅ **Production Deployment:** Full-stack application deployed to cloud services
✅ **Security:** Environment variables, input validation, CORS protection
✅ **Documentation:** Comprehensive technical and AI usage documentation
✅ **Error Handling:** Robust error management across frontend and backend

---

## 👤 Author

Ayman Musalli
Software Engineering Student
Dhahran, Saudi Arabia

GitHub: https://github.com/airqx
LinkedIn: https://www.linkedin.com/in/ayman-musalli-5255981b5/

---

© 2026 Ayman Musalli. All rights reserved.

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
