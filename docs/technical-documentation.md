# Technical Documentation – Assignment 1  
Personal Portfolio Website

---

## 1️⃣ Project Overview

This project is a fully responsive personal portfolio website built using **HTML5, CSS3, and Vanilla JavaScript (ES6+)**.

The objective of this assignment was to demonstrate:

- Semantic HTML structure  
- Responsive layout implementation  
- JavaScript interactivity  
- Clean separation of concerns  
- Organized project structure  
- Proper technical documentation  

The website includes multiple sections (Home, About, Projects, Skills, Contact) along with dynamic UI features such as theme switching, animations, and a typing mini-game.

---

# 2️⃣ Technology Stack

## Frontend Technologies

- **HTML5** – Semantic structure and accessibility  
- **CSS3** – Responsive styling using Flexbox, Grid, and CSS Variables  
- **Vanilla JavaScript (ES6+)** – Interactive behavior and DOM manipulation  
- **LocalStorage API** – Theme persistence  
- **IntersectionObserver API** – Scroll-based animations  

## External Resources

- **Google Fonts** – Typography (Inter & JetBrains Mono)

No external CSS frameworks (Bootstrap, Tailwind) or JavaScript libraries (React, jQuery) were used.

---

# 3️⃣ Architecture & File Organization

## Project Structure

```
202270440-AymanMusalli-assignment1/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── project1.jpg
│       ├── project2.jpg
│       ├── project3.jpg
│       └── favicon.jpg
├── resume.pdf
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md
```

## Separation of Concerns

| Layer | Responsibility |
|--------|----------------|
| HTML | Structure & semantic markup |
| CSS | Layout, design, responsiveness |
| JavaScript | Interactivity & dynamic features |

Each file has a clearly defined responsibility to improve maintainability and readability.

---

# 4️⃣ HTML Structure

The HTML file follows semantic best practices.

## Main Sections

```html
<nav>        <!-- Sticky navigation -->
<section>    <!-- Hero -->
<section>    <!-- About -->
<section>    <!-- Projects -->
<section>    <!-- Skills -->
<section>    <!-- Contact -->
<footer>     <!-- Footer -->
```

## Key Implementation Decisions

- Unique `id` for each section for smooth scrolling  
- Proper heading hierarchy (`h1 → h2 → h3`)  
- Accessible navigation structure  
- Form fields using `required` attributes  
- Descriptive `alt` attributes for all images  

---

# 5️⃣ CSS Architecture

## Design System

CSS uses custom properties (variables) defined in `:root` for:

- Background colors  
- Card backgrounds  
- Text colors  
- Accent colors  
- Transition timing  
- Border radius  

Example:

```css
:root {
  --bg: #061e29;
  --bg-card: #0a2a38;
  --primary: #5f9598;
  --foreground: #f3f4f4;
}
```

This enables centralized styling and easy theme customization.

---

## Dark / Light Theme System

Theme switching is implemented using:

```css
html[data-theme="dark"] { ... }
html[data-theme="light"] { ... }
```

JavaScript dynamically updates the `data-theme` attribute on `<html>`.

Theme preference is stored in `localStorage` under the key `"theme"`.

---

## Layout Strategy

### Flexbox
- Navbar alignment  
- Button groups  
- Contact layout  

### CSS Grid
- Projects grid layout  
- Skills grid layout  

### Responsive Breakpoints

| Screen Size | Layout Behavior |
|-------------|-----------------|
| < 768px | Single column, hamburger menu |
| 768px–1024px | Two-column layout |
| > 1024px | Multi-column layout |

Mobile-first adjustments improve usability on smaller screens.

---

# 6️⃣ JavaScript Implementation

All interactivity is implemented in `js/script.js`.

---

## Theme Management

Functions used:

- `initTheme()`  
- `toggleTheme()`  

### Behavior

1. Load saved theme from `localStorage`  
2. If none exists, use system preference  
3. Apply theme via `data-theme` attribute  
4. Persist user selection  

---

## Navigation System

Features:

- Hamburger menu toggle  
- Auto-close menu when a link is clicked  
- Active link highlighting based on scroll position  
- Smooth scrolling using `scrollIntoView()`  

---

## Time-Based Greeting

A greeting message changes depending on the current time:

- Morning  
- Afternoon  
- Evening  

Enhances personalization and engagement.

---

## Animated Counters

Hero statistics animate from `0` to their target values.

Implementation:

- Uses `IntersectionObserver`  
- Runs only when section enters viewport  
- Prevents repeated animation  

---

## Scroll Reveal Animations

Elements with the `.reveal` class become visible when entering the viewport.

Implemented using:

```javascript
new IntersectionObserver(...)
```

This approach is more efficient than continuous scroll event listeners.

---

## Skill Bar Animation

Skill bars animate to a defined width when visible.

Each bar uses a `data-width` attribute to define its final percentage.

---

## Typing Challenge Mini-Game

Features:

- 30-second countdown timer  
- Real-time scoring  
- Words Per Minute (WPM) calculation  
- Paste prevention  
- Restart functionality  

This feature demonstrates advanced DOM state management and event handling.

---

## Contact Form Validation

Validation process:

1. Prevent default form submission  
2. Trim input values  
3. Validate required fields  
4. Validate email format using regex  
5. Display toast notification  
6. Reset form if successful  

Email validation regex:

```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

---

## Back-to-Top Button

- Appears after scrolling down  
- Smoothly scrolls to the top  
- Improves navigation on long pages  

---

# 7️⃣ Responsiveness

The website is tested for:

- Desktop  
- Tablet  
- Mobile  

Responsive techniques used:

- Media queries  
- Flexible layouts  
- Adaptive spacing  
- Mobile navigation toggle  

---

# 8️⃣ Accessibility Features

- Semantic HTML structure  
- Logical heading hierarchy  
- Keyboard-accessible navigation  
- Visible focus states  
- Descriptive alt text  
- Adequate color contrast in both themes  

---

# 9️⃣ Performance Considerations

Optimizations include:

- No heavy external libraries  
- Efficient use of `IntersectionObserver`  
- Minimal DOM manipulation  
- Single CSS and JS file  
- Persistent state via `localStorage`  

Result:

- Fast loading time  
- Lightweight static site  
- Reduced script overhead  

---

# 🔟 Browser Compatibility

Tested on modern browsers:

- Chrome  
- Firefox  
- Edge  
- Safari (latest versions)  

Modern features used:

- CSS Variables  
- Flexbox & Grid  
- LocalStorage  
- IntersectionObserver  

All are supported in current browsers.

---

# 1️⃣1️⃣ Deployment

This project is a static website and requires:

- No backend  
- No build tools  
- No server configuration  

Compatible with:

- Netlify  
- GitHub Pages  
- Vercel  
- Any static hosting provider  

---

# Conclusion

This portfolio website demonstrates modern front-end development practices using structured HTML, scalable CSS architecture, and modular JavaScript logic.

The implementation satisfies assignment requirements while incorporating additional interactive enhancements to improve user experience and demonstrate technical understanding.
