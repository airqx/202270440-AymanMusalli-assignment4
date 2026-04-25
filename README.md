# Personal Portfolio Website - Assignment 3

## Live Demo

[](https://portfolio-ayman00.vercel.app/)
## Overview
This project is an enhanced portfolio website for Assignment 3, focused on API integration, advanced frontend logic, backend communication, and production deployment.

The website presents profile information, skills, repositories, and contact channels with interactive UI behavior and robust error handling.

## Features

### API Integration
- Live GitHub repositories fetched from the GitHub REST API.
- Loading and failure states for repository requests.
- Dynamic repository cards rendered in the projects section.

### Complex Logic
- Contact form with multi-step validation:
  - browser-native validation
  - custom field checks
  - backend-side validation before email delivery
- Typing game with:
  - countdown timer
  - per-character correctness highlighting
  - score and WPM results
  - anti-paste handling

### State Management
- Theme toggle persisted with localStorage.
- AI chat history handled as session state in frontend memory.
- UI state handling for loading, toasts, game panels, and chat panel visibility.

### UI and Interaction
- Smooth scrolling navigation and active section highlighting.
- Scroll reveal animations.
- Hero counters and skill bar animations.
- Back-to-top button.
- Time-based greeting.
- AI assistant widget with quick prompts.

## Technology Stack

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
|   |-- package.json
|   `-- .env.example
|-- assets/
|   |-- resume.pdf
|   `-- images/
|-- docs/
|   |-- ai-usage-report.md
|   `-- technical-documentation.md
`-- .gitignore
```

## Run Locally

### 1. Clone repository
```bash
git clone https://github.com/airqx/202270440-AymanMusalli-Assignment03.git
cd 202270440-AymanMusalli-Assignment02
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Create environment file
```bash
# macOS/Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Update `backend/.env` values:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
MISTRAL_API_KEY=your-mistral-api-key
PORT=3002
FRONTEND_ORIGIN=https://portifolio-ayman1069.netlify.app
```

### 4. Start backend
```bash
npm start
```

### 5. Run frontend
Open `index.html` directly in a browser or run with a static local server.

## API Endpoints

### Health
`GET /api/health`

### Chat
`POST /api/chat`

```json
{
  "message": "Hello",
  "history": [{"role": "user", "content": "Previous message"}]
}
```

### Contact
`POST /api/contact`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Message content"
}
```

## AI Usage
AI tools were used for implementation support, debugging, and documentation refinement. AI output was reviewed, tested, and modified before use.

See detailed report in `docs/ai-usage-report.md`.

## Author
Ayman Musalli

- GitHub: https://github.com/airqx
- LinkedIn: https://www.linkedin.com/in/ayman-musalli-5255981b5/
