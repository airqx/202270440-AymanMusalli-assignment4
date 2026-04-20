# Personal Portfolio Website - Assignment 3

## Live Demo
https://portifolio-ayman1069.netlify.app/

## Overview
This project is an advanced version of my portfolio website for Assignment 3. It focuses on API integration, advanced JavaScript logic, backend communication, and clean documentation.

The website presents my profile, skills, projects, and contact options with interactive frontend behavior and a deployed backend service.

## Core Features

### API Integration
- Live GitHub repositories fetched from the GitHub REST API.
- Loading and error states for API failures.
- Dynamic repository cards rendered in the UI.

### Complex Logic
- Contact form with multi-step validation:
  - native browser validation
  - custom name/email/subject/message checks
  - backend-side validation before sending email
- Code typing game with:
  - countdown timer
  - per-character correctness highlighting
  - score and WPM calculation
  - anti-paste behavior

### State Management
- Theme toggle persisted with localStorage.
- AI chat session state maintained in memory (history array).
- Dynamic UI states for loading, toasts, game, and chat panel visibility.

### UI and Interaction
- Smooth scrolling navigation.
- Active section nav highlighting.
- Scroll reveal animations.
- Animated hero counters and skill bars.
- Back-to-top button.
- Time-based greeting.
- AI assistant widget with quick prompts.

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

### Backend
- Node.js + Express
- Nodemailer
- CORS
- Dotenv

### External Services
- GitHub REST API
- Mistral AI API
- Gmail SMTP

### Deployment
- Frontend: Netlify
- Backend: Render

## Project Structure

```text
202270440-AymanMusalli-Assignment02/
|-- index.html
|-- css/
|   `-- styles.css
|-- js/
|   |-- script.js
|   `-- chat.js
|-- backend/
|   |-- server.js
|   `-- package.json
|-- assets/
|   |-- resume.pdf
|   `-- images/
|-- docs/
|   |-- ai-usage-report.md
|   `-- technical-documentation.md
`-- .gitignore
```

## Run Locally

### 1. Clone and enter the repository
```bash
git clone https://github.com/airqx/202270440-AymanMusalli-Assignment02.git
cd 202270440-AymanMusalli-Assignment02
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Create backend environment file
You can copy the template file:

```bash
# macOS / Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Then edit `.env` with your real values:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
MISTRAL_API_KEY=your-mistral-api-key
PORT=3002
```

### 4. Start backend server
```bash
npm start
```

### 5. Run frontend
Open `index.html` in the browser or use a local static server extension.

## API Endpoints

### Health
`GET /api/health`

### Chat
`POST /api/chat`

Payload:
```json
{
  "message": "Hello",
  "history": [{"role": "user", "content": "Previous message"}]
}
```

### Contact
`POST /api/contact`

Payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Message content"
}
```

## AI Usage Summary
AI tools were used for implementation support, debugging, and documentation refinement. I reviewed and modified AI suggestions before applying them. Detailed reporting is in docs/ai-usage-report.md.

## Assignment 3 Checklist
- External API integration with error handling
- Advanced logic and validation in frontend/backend
- State persistence and interactive UI behavior
- Documentation for technical details and AI usage

## Author
Ayman Musalli

- GitHub: https://github.com/airqx
- LinkedIn: https://www.linkedin.com/in/ayman-musalli-5255981b5/
