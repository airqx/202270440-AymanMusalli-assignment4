# Technical Documentation - Assignment 4

## 1. Project Overview
This project is the final personal portfolio web application submitted for Assignment 4. It integrates frontend interactivity, external APIs, backend services, and an existing production deployment carried forward from the previous assignment.

Primary goals:
- integrate external APIs
- implement advanced application logic
- connect frontend and backend endpoints with error handling
- secure secrets using environment variables
- provide clear technical documentation

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
- Gmail SMTP (contact form email delivery)

### Hosting
- Vercel (frontend)
- Render (backend)

## 3. Architecture and File Organization

```text
202270440-AymanMusalli-assignment4/
|-- index.html
|-- css/styles.css
|-- js/script.js
|-- js/chat.js
|-- backend/server.js
|-- backend/package.json
|-- backend/.env.example
|-- assets/
|-- docs/ai-usage-report.md
|-- docs/technical-documentation.md
`-- presentation/
```

### Responsibility Split
- index.html: structure and content sections
- css/styles.css: design, layout, and responsiveness
- js/script.js: UI interactions, animations, form handling, GitHub API rendering
- js/chat.js: AI assistant frontend communication
- backend/server.js: API endpoints, validation, external service integration

## 4. Frontend Implementation

### 4.1 Theme and State
- Theme mode toggles between light and dark.
- Selected theme is persisted with localStorage.
- Initial theme is applied early to reduce first-render flashing.

### 4.2 Navigation and Interaction
- Mobile menu open/close behavior.
- Active link highlighting based on scroll position.
- Smooth scroll for internal anchors.

### 4.3 Animation and Visual Features
- Reveal-on-scroll using IntersectionObserver.
- Hero counters and skill bars trigger on visibility.
- Cursor glow and decorative particles for visual polish.

### 4.4 GitHub API Integration
- Fetches public repositories via GitHub REST API.
- Shows loading and error states.
- Generates repository cards dynamically in the DOM.

### 4.5 Contact Form Logic
- Browser validation plus custom field validation.
- Sends valid payload to backend `/api/contact`.
- Uses toast messages for success/failure feedback.
- Applies loading/disabled state during submission.

### 4.6 Typing Game Logic
- 30-second timed game flow.
- Character-by-character correctness checks.
- Score and WPM calculations.
- Restart and anti-paste behavior.

### 4.7 AI Assistant Frontend
- Chat panel UI with quick suggestion prompts.
- Sends message and short history to backend `/api/chat`.
- Handles formatted responses and action markers.

## 5. Backend Implementation

### 5.1 Endpoints
- GET `/api/health`: service health check.
- POST `/api/chat`: forwards user prompt/history to Mistral API.
- POST `/api/contact`: validates input and sends email with Nodemailer.

### 5.2 Validation and Error Handling
- Required-field validation on incoming requests.
- Email format validation and message length checks.
- Structured JSON errors for failure paths.
- Try/catch around external API and SMTP calls.

### 5.3 Environment Configuration
Required environment variables:
- GMAIL_USER
- GMAIL_APP_PASSWORD
- MISTRAL_API_KEY
- PORT
- FRONTEND_ORIGIN

## 6. Security Notes
- Secrets are stored in environment variables, not in frontend code.
- Input validation exists on both frontend and backend.
- CORS uses an explicit allowlist (configured with `FRONTEND_ORIGIN` and local development origins).
- API failures are handled gracefully with safe user-facing messages.

## 7. Deployment

### Frontend Deployment (Vercel)
- Static deployment hosted on Vercel.
- The live deployment link is reused from the existing Assignment 3 hosting setup because the application code remains the same.

### Backend Deployment (Render)
- Node.js web service configured from `backend/`.
- Environment variables configured in Render dashboard.

### Production Request Flow
User -> Vercel frontend -> Render backend -> external APIs/services

## 8. Testing Approach
- Manual UI testing for responsive layout and interaction flows.
- Endpoint testing for chat/contact success and failure scenarios.
- Validation tests for empty/invalid form inputs.
- Error-path checks for API/network failures.

## 9. Performance and Code Quality
- Vanilla JS keeps runtime overhead low.
- Feature-oriented code sections improve maintainability.
- Reusable helper functions reduce duplication.
- Unused large images and unused backend SDK dependencies were removed.

## 10. Assignment Requirement Mapping

### API Integration
Implemented with GitHub repositories and Mistral chat integration.

### Complex Logic
Implemented through form validation pipeline and typing game logic.

### State Management
Implemented through persisted theme state and dynamic UI state transitions.

### Code Quality
Consistent structure, comments for non-trivial logic, and no current editor errors.

### Documentation
README, technical documentation, and AI usage report are provided.

## Conclusion
The project meets Assignment 4 goals by combining a polished portfolio experience, advanced frontend behavior, backend processing, existing deployment infrastructure, and structured documentation in a cohesive final submission.
