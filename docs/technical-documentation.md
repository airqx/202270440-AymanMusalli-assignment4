# Technical Documentation - Assignment 3

## 1. Project Overview
This project is an advanced personal portfolio implementation for Assignment 3. It combines frontend interactivity, API integration, backend services, and deployment.

Primary goals achieved:
- integrate external APIs
- implement advanced JavaScript logic
- connect frontend to backend endpoints
- manage user-facing state cleanly
- provide maintainable documentation

## 2. Technology Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser APIs: Fetch, LocalStorage, IntersectionObserver

### Backend
- Node.js
- Express
- Nodemailer
- CORS
- Dotenv

### External Services
- GitHub REST API (repositories)
- Mistral AI API (assistant responses)
- Gmail SMTP (contact emails)

### Hosting
- Netlify (frontend)
- Render (backend)

## 3. Project Structure

```text
202270440-AymanMusalli-Assignment02/
|-- index.html
|-- css/styles.css
|-- js/script.js
|-- js/chat.js
|-- backend/server.js
|-- backend/package.json
|-- assets/
|-- docs/ai-usage-report.md
`-- docs/technical-documentation.md
```

## 4. Frontend Implementation

### 4.1 Theme and UI State
- Theme toggle stores and restores state through localStorage.
- Initial theme is applied in the head script to avoid flash.

### 4.2 Navigation and Interactions
- Responsive navigation with mobile menu.
- Active section highlighting on scroll.
- Smooth internal anchor scrolling.

### 4.3 Visual Effects
- Scroll reveal behavior via IntersectionObserver.
- Animated counters and skill bars when entering viewport.
- Decorative particles and pointer-based glow.

### 4.4 GitHub API Integration
- Fetches public repositories from GitHub API.
- Handles loading and failure states.
- Renders repository cards dynamically.

### 4.5 Contact Form Logic
- Multi-step validation on client side.
- Submission to backend endpoint.
- Toast-based success and error feedback.
- Loading state while request is in progress.

### 4.6 Typing Game
- 30-second timer.
- Per-character correctness display.
- Score and WPM calculation.
- Restart flow and anti-paste protection.

### 4.7 AI Assistant Frontend
- Chat widget with quick prompt buttons.
- Sends message and limited chat history to backend.
- Renders formatted responses and handles action markers.

## 5. Backend Implementation

### 5.1 Endpoints
- GET /api/health: backend status check.
- POST /api/chat: forwards prompts/history to Mistral API.
- POST /api/contact: validates payload and sends email through Nodemailer.

### 5.2 Validation and Error Handling
- Required-field checks on chat and contact endpoints.
- Email format validation.
- Minimum message length check.
- Structured JSON error responses on failure.

### 5.3 Environment Variables
Backend reads sensitive data from .env:
- GMAIL_USER
- GMAIL_APP_PASSWORD
- MISTRAL_API_KEY
- PORT

## 6. Security and Reliability Notes
- No API keys in frontend code.
- Input validation on both frontend and backend.
- CORS uses an explicit allowlist (FRONTEND_ORIGIN + localhost development origins).
- Clear error handling for external API failures.

## 7. Deployment

### Frontend (Netlify)
- Static site deployment from GitHub.

### Backend (Render)
- Node web service using backend directory.
- Environment variables configured in Render dashboard.

### Production Request Flow
User -> Netlify frontend -> Render backend -> external APIs/services

## 8. Testing Approach
- Manual browser testing for UI behavior and responsiveness.
- Endpoint testing for chat/contact success and failure paths.
- Form validation checks for invalid and empty inputs.
- API failure simulation to verify user-friendly messages.

## 9. Performance and Code Quality
- Vanilla JS avoids framework overhead.
- DOM operations are scoped and organized by feature.
- Reusable helper functions for validation and notifications.
- Readable sectioned code with comments for non-trivial logic.

## 10. Requirement Mapping

### API Integration
Implemented with GitHub repositories and proper error UI.

### Complex Logic
Implemented in contact form validation pipeline and typing game flow.

### State Management
Implemented through theme persistence and dynamic UI state transitions.

### Code Quality
Feature-oriented structure, consistent naming, and maintainable flow.

### Documentation
README, technical documentation, and AI usage report provided and aligned.

## Conclusion
The project satisfies Assignment 3 goals by combining external API integration, advanced interaction logic, backend communication, and structured documentation in a production-deployed portfolio website.
