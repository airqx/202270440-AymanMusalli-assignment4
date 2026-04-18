# Technical Documentation – Assignment 3
Personal Portfolio Website (API Integration & Complex Logic)

---

## 1️⃣ Project Overview

This project is an enhanced version of the Assignment 2 portfolio website, extended with API integration and complex backend logic for email functionality.

The objective of this assignment was to:

- Implement API integration with external services (GitHub API)
- Add complex backend logic for email processing
- Connect frontend and backend with proper error handling
- Maintain secure API key management
- Deploy both frontend and backend to production

The final website includes live GitHub repository integration, a functional contact form with email sending capabilities, and a deployed backend service.

---

## 2️⃣ Technology Stack

### Frontend Technologies

- **HTML5** – Semantic structure and accessibility
- **CSS3** – Responsive design using Flexbox, Grid, and CSS Variables
- **Vanilla JavaScript (ES6+)** – Interactivity and API communication
- **Fetch API** – RESTful API calls to backend and external services
- **LocalStorage API** – Theme persistence
- **IntersectionObserver API** – Scroll-based animations

### Backend Technologies

- **Node.js (Express)** – REST API server
- **Nodemailer** – Email sending functionality
- **CORS** – Cross-origin resource sharing
- **Dotenv** – Environment variable management
- **REST API** – Endpoints for chat (`/api/chat`) and contact (`/api/contact`)

### External APIs

- **GitHub REST API** – Repository data fetching
- **Mistral AI API** – AI assistant responses
- **Gmail SMTP** – Email delivery service

### Hosting

- **Netlify** – Frontend deployment
- **Render** – Backend deployment

---

## 3️⃣ Architecture & File Organization

### Project Structure

```
assignment-3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   ├── chat.js
│   └── [other frontend files]
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
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
| script.js | UI logic, GitHub API integration, contact form |
| chat.js | AI assistant communication |
| server.js | Backend API endpoints, email processing |

---

## 4️⃣ Frontend Implementation

### API Integration - GitHub Repositories

The frontend fetches live repository data from GitHub's public API:

```javascript
async function initGitHubRepos() {
  const response = await fetch("https://api.github.com/users/airqx/repos?sort=stars&per_page=9");

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = await response.json();
  // Process and display repositories
}
```

**Features:**
- Real-time repository fetching
- Error handling and loading states
- Dynamic card generation
- Responsive grid layout

### Contact Form with Backend Integration

The contact form sends data to the backend for email processing:

```javascript
const response = await fetch(`${BASE_API_URL}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, subject, message })
});
```

**Features:**
- Client-side validation
- Server-side validation
- Error handling and user feedback
- Toast notifications
- Loading states

### Dynamic API URL Configuration

The frontend automatically switches between localhost and production URLs:

```javascript
const BASE_API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3002"
    : "https://[production-backend-url].onrender.com";
```

---

## 5️⃣ Backend Implementation

### Server Architecture

The backend uses Express.js with modular endpoint handling:

```javascript
const app = express();
app.use(cors());
app.use(express.json());

// API endpoints
app.post("/api/contact", contactHandler);
app.post("/api/chat", chatHandler);
```

### Email Processing Endpoint

The contact form endpoint includes comprehensive validation and email sending:

```javascript
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation logic
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Send email via Nodemailer
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail(mailOptions);
  res.json({ success: true, message: "Email sent successfully" });
});
```

### AI Chat Integration

The chat endpoint communicates with Mistral AI:

```javascript
app.post("/api/chat", async (req, res) => {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: messages,
      max_tokens: 250
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});
```

---

## 6️⃣ Security & Configuration

### Environment Variables

Sensitive data is stored in environment variables:

```bash
# .env file (not committed to git)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
MISTRAL_API_KEY=your-api-key
PORT=3002
```

### CORS Configuration

Backend allows cross-origin requests from the frontend:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-netlify-site.netlify.app"
    : "http://localhost:3000"
}));
```

### Input Validation

Both client and server-side validation prevent malicious input:

- Email format validation
- Message length limits
- Required field checks
- XSS prevention through proper encoding

---

## 7️⃣ Deployment & Production

### Backend Deployment (Render)

1. **Service Configuration:**
   - Runtime: Node.js
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables:**
   - Set all required env vars in Render dashboard
   - Never commit `.env` file to repository

### Frontend Deployment (Netlify)

1. **Site Configuration:**
   - Branch: `assignment3`
   - Build command: (leave empty for static site)
   - Publish directory: `.` (root)

2. **Domain:**
   - Custom domain or Netlify subdomain
   - Update CORS settings in backend if using custom domain

### Production Architecture

```
User → Netlify (Frontend) → Render (Backend) → External APIs
                              ↓
                        Gmail SMTP & Mistral AI
```

---

## 8️⃣ Testing & Validation

### API Testing

Backend endpoints tested with curl/Postman:

```bash
# Health check
curl http://localhost:3002/api/health

# Contact form test
curl -X POST http://localhost:3002/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### Frontend Testing

- Contact form submission
- AI chat functionality
- GitHub API integration
- Responsive design across devices
- Error handling scenarios

---

## 9️⃣ Performance & Optimization

### Frontend Optimizations

- **Lazy Loading:** GitHub repos load on page scroll
- **Debounced Inputs:** Typing game input handling
- **Efficient DOM Updates:** Minimal reflows and repaints
- **Asset Optimization:** Compressed images and minified CSS

### Backend Optimizations

- **Rate Limiting:** Prevent API abuse
- **Error Handling:** Graceful failure responses
- **Input Sanitization:** Prevent injection attacks
- **Connection Pooling:** Efficient database connections (future)

---

## 🔟 Future Enhancements

### Potential Improvements

1. **Database Integration**
   - Store contact form submissions
   - User session management
   - Analytics tracking

2. **Advanced Features**
   - File upload in contact form
   - Multi-language support
   - Advanced AI chat features

3. **Performance**
   - CDN integration
   - Service worker caching
   - Image optimization pipeline

4. **Security**
   - Rate limiting implementation
   - Input sanitization middleware
   - HTTPS enforcement

---

## 📋 Assignment 3 Requirements Fulfilled

✅ **API Integration:** GitHub repositories fetched and displayed dynamically
✅ **Complex Logic:** Email processing with validation and external service integration
✅ **Backend-Frontend Connection:** RESTful API communication with error handling
✅ **Deployment:** Both frontend and backend deployed to production
✅ **Security:** Environment variables and input validation implemented
✅ **Documentation:** Technical documentation and AI usage reporting

---

*This documentation covers the implementation of Assignment 3 requirements, focusing on API integration and complex backend logic for the personal portfolio website.*

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

This Assignment 3 project builds on Assignment 2 by introducing API integration and complex backend logic for email functionality.

The implementation demonstrates advanced web development skills including external API integration, secure backend development, production deployment, and comprehensive error handling while maintaining performance and usability standards.