# Employee Management System

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer--Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Render](https://img.shields.io/badge/Deployment-Render-46E3B7?logo=render&logoColor=black)](https://render.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

# Employee Management System

A full-stack Employee Management System built using **React, Node.js, Express, and MongoDB**.

This project was developed as part of my full-stack development learning journey to practice:

- CRUD operations
- REST API development
- MongoDB integration
- Frontend-backend communication
- React routing and state management
- Backend architecture and folder structuring

---

# Live Demo

## Frontend
https://empappb65.vercel.app/

## Backend API
https://eems-app.onrender.com

---

# Features

- Add Employees
- View Employee List
- Update Employee Details
- Delete Employees
- REST API Integration
- MongoDB Database Connectivity
- React Context API Usage
- Dynamic Routing with React Router
- Responsive UI using TailwindCSS

---

# Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- TailwindCSS
- Framer Motion
- Axios
- React Hook Form

## Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

## Database

- MongoDB

## Tools

- VS Code
- REST Client
- Git & GitHub
- Render
- Vercel

---

# Project Structure

```bash
emp-app-counter/
├── emppp-backend/
│   ├── server.js
│   ├── Apis/
│   │   └── employee.js
│   ├── Models/
│   │   └── Emp.js
│   └── .env
│
└── react-app-2/
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── Components/
            ├── context.jsx
            ├── Header.jsx
            ├── RootLayout.jsx
            ├── Home.jsx
            ├── Create.jsx
            ├── List.jsx
            ├── Employees.jsx
            ├── EditEmp.jsx
            └── Counter.jsx
```

---

# Backend Architecture

The backend follows a modular structure for better maintainability and scalability.

## Backend Components

| Folder/File | Purpose |
|---|---|
| `Apis/` | API route handlers |
| `Models/` | Mongoose database models |
| `server.js` | Main server entry point |
| `.env` | Environment variables |
| `req.http` | API testing requests |

---

# REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/emps` | Fetch all employees |
| POST | `/emp` | Create new employee |
| PUT | `/edit/:id` | Update employee |
| DELETE | `/remove/:id` | Delete employee |

---

# MongoDB Schema

```js
const employeeSchema = new mongoose.Schema(
{
    name: {
        type: String,
        unique: true
    },
    email: String,
    mobile: String,
    companyname: String
},
{
    timestamps: true
});
```

---

# Frontend Architecture

The frontend is built using React with routing and shared global state using Context API.

## Main Components

| Component | Purpose |
|---|---|
| `Header.jsx` | Navigation and global counter display |
| `Home.jsx` | Landing page |
| `Create.jsx` | Create employee form |
| `List.jsx` | Display all employees |
| `Employees.jsx` | Employee detail page |
| `EditEmp.jsx` | Update employee form |
| `Counter.jsx` | Global counter demo component |
| `context.jsx` | Context API provider and hooks |

---

# CRUD Operations

| Operation | Description |
|---|---|
| Create | Add new employee |
| Read | Fetch employee data |
| Update | Modify employee information |
| Delete | Remove employee from database |

---

# Request Flow

```text
User Action
     ↓
React Frontend
     ↓
API Request
     ↓
Express Route
     ↓
MongoDB Query
     ↓
Response Returned
     ↓
Frontend Re-render
```

---

# System Architecture

```text
+-------------+
|   Frontend  |
|   React UI  |
+------+------+
       |
       | HTTP Requests
       v
+------+------+
| Express API |
|   Backend   |
+------+------+
       |
       | Database Queries
       v
+------+------+
|   MongoDB   |
|  Database   |
+-------------+
```

---

# Running the Project Locally

## Clone Repository

```bash
git clone <your-repo-link>
cd emp-app-counter
```

---

# Backend Setup

```bash
cd emppp-backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection
PORT=1005
```

Run backend server:

```bash
npm start
```

---

# Frontend Setup

```bash
cd react-app-2
npm install
npm run dev
```

---

# Concepts Practiced

- REST APIs
- CRUD Operations
- MongoDB Integration
- React Routing
- React Context API
- Backend Folder Structuring
- API Testing
- Frontend-Backend Communication
- State Management
- Dynamic Rendering

---

# Challenges Faced

- Handling API requests correctly
- Managing frontend-backend integration
- Debugging MongoDB connection issues
- Passing route state between pages
- Structuring backend logic cleanly

---

# Key Takeaways

- CRUD operations form the foundation of backend systems
- REST APIs connect frontend and backend applications
- MongoDB works efficiently for document-based storage
- React Context helps manage shared state globally
- Proper project structure improves scalability and readability

---

# Conclusion

This project demonstrates a complete full-stack Employee Management System with employee CRUD functionality and React Context integration.

The backend exposes REST APIs using Express and MongoDB, while the frontend provides an interactive React-based user interface for managing employee records.

This project strengthened my understanding of:
- Full-stack architecture
- API development
- Database integration
- React application structure
- State management and routing
