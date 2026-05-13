# Week 5 - React Basics

## Overview

This repository contains the work and practice completed during Week 5 of my web development learning journey.

The main focus of this week was learning the fundamentals of React, understanding component-based architecture, working with props and state, and building small React applications.

Topics covered include:
- React fundamentals
- Component
- JSX
- Props and State
- Rendering dynamic data
- React Router
- Basic project structure

---

# Topics Learned

## 1. Introduction to React

Learned the basics of React and why it is used for building modern user interfaces.

### Concepts Covered
- What is React
- Component-based architecture
- Virtual DOM
- Reusable UI components
- Single Page Applications (SPA)

---

# 2. Setting Up a React Project

Learned how to create and run React applications.

### Tools Used
- Vite
- npm
- React

### Commands Used

```bash
npm create vite@latest
npm install
npm run dev
```

---

# 3. JSX

Learned how JSX combines HTML-like syntax with JavaScript.

### Example

```jsx
function App() {
    return (
        <h1>Hello React</h1>
    );
}
```

---

# 4. Components

Learned how React applications are built using reusable components.

### Example

```jsx
function Welcome() {
    return <h2>Welcome User</h2>;
}
```

### Concepts Practiced
- Functional components
- Component reuse
- Component structure

---

# 5. Props

Learned how to pass data between components using props.

### Example

```jsx
function User(props) {
    return <h1>{props.name}</h1>;
}
```

Usage:

```jsx
<User name="Prabhath" />
```

---

# 6. State

Learned how state allows components to manage dynamic data.

### Example

```jsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

---

# 7. Rendering Lists

Learned how to display dynamic data using `.map()`.

### Example

```jsx
const users = ["Alex", "John", "Sam"];

function App() {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index}>{user}</li>
            ))}
        </ul>
    );
}
```

---

# 8. Product Display App

Built a small React application to display products dynamically.

### Features
- Product cards
- Dynamic rendering
- Reusable components
- Props usage

### Concepts Used
- Components
- Props
- Array mapping
- JSX rendering

---

# 9. User Display App

Built another small React application to display user information.

### Features
- User cards
- Dynamic user data
- Reusable layouts

### Concepts Used
- Props
- Components
- Rendering lists
- Data handling

---

# 10. React Routing

Learned how routing works in React using React Router.

### Topics Covered
- BrowserRouter
- Routes
- Route
- Navigation between pages

### Example

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
```

---

# 11. Routing Practice Project

Built a small project to understand routing in React.

### Features
- Multiple pages
- Navigation
- Route handling
- Component rendering based on routes

---

# Practice Work

This week included practice through:
- Creating reusable components
- Rendering dynamic data
- Managing state
- Building small React applications
- Implementing routing
- Structuring React projects

---

# Key Takeaways

- React uses component-based architecture
- JSX allows combining JavaScript with UI
- Props help pass data between components
- State manages dynamic content
- Routing enables navigation in single page applications
- React improves UI organization and reusability

---

