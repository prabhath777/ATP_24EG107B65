# Week 6 - Employee Management System

## Overview

This repository contains the work completed during Week 6 of my full stack development learning journey.

The main focus of this week was building a simple Employee Management System using React, Node.js, Express, and MongoDB while following basic backend architecture principles.

The project implements complete CRUD operations and demonstrates frontend-backend communication using REST APIs.

---

# Features

- Add Employee
- View Employees
- Update Employee Details
- Delete Employee
- REST API Integration
- MongoDB Database Connection
- Frontend and Backend Separation

---

# Technologies Used

## Frontend
- React
- Vite
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Tools
- REST Client
- VS Code

---


# Concepts Learned

---

# 1. CRUD Operations

Implemented all basic CRUD functionalities.

| Operation | Description |
|---|---|
| Create | Add new employee |
| Read | Fetch employee details |
| Update | Edit employee information |
| Delete | Remove employee data |

---

# 2. REST APIs

Built APIs to handle employee data.

### Routes Used

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/employees` | Get all employees |
| POST | `/employees` | Add employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

---

# 3. Backend Architecture

Learned how backend applications are structured.

### Backend Components

- `Apis/` → API routes
- `Modules/` → Database models
- `server.js` → Main server entry point
- `.env` → Environment variables
- `req.http` → API testing requests

### Concepts Practiced
- Modular backend structure
- Route handling
- Database integration
- API organization

---

# 4. MongoDB Integration

Connected MongoDB with Express backend using Mongoose.

### Concepts Covered
- MongoDB collections
- Schemas
- Models
- Database queries

### Example Schema

```js
const employeeSchema = new mongoose.Schema({
    name: String,
    role: String,
    salary: Number
});
```

---

# 5. Frontend Development

Built a simple React frontend for interacting with backend APIs.

### Features
- Employee form
- Dynamic data rendering
- API integration
- CRUD interaction

---

# 6. API Testing

Tested backend APIs using REST Client.

### Example Request

```http
GET http://localhost:3000/employees
```

---

# System Architecture

```text
+-------------+
|   Frontend  |
|   React UI  |
+------+------+
       |
       | API Requests
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
Controller / Logic
     ↓
MongoDB Operation
     ↓
Response Returned
     ↓
Frontend Update
```

---

# Practice Work

This week included:
- Building backend APIs
- Creating CRUD operations
- Structuring backend folders
- Connecting MongoDB
- Testing APIs
- Connecting React frontend with backend

---

# Key Takeaways

- CRUD operations are the foundation of backend systems
- APIs enable frontend-backend communication
- MongoDB stores document-based data efficiently
- Proper folder structure improves maintainability
- React can dynamically interact with backend APIs

---

# Challenges Faced

- Handling API routes correctly
- Connecting frontend with backend
- Managing MongoDB operations
- Debugging request and response issues
- Structuring backend files properly


---

## Folder structure (important files)

```
emp-app-counter/
├─ emppp-backend/
│  ├─ server.js            # Express server + MongoDB connection
│  ├─ Apis/employee.js     # Employee REST routes
│  └─ Models/Emp.js        # Mongoose model
└─ react-app-2/
   ├─ package.json
   ├─ index.html
   └─ src/
      ├─ main.jsx          # App entry
      ├─ App.jsx           # Router setup + CounterProvider wrapper
      └─ Components/
         ├─ context.jsx    # Counter Context + hook
         ├─ Header.jsx     # Navigation + global counter UI
         ├─ RootLayout.jsx # Header + <Outlet />
         ├─ Home.jsx       # Landing page (uses Counter)
         ├─ Create.jsx     # Create employee (react-hook-form)
         ├─ List.jsx       # List employees (fetch/axios)
         ├─ Employees.jsx  # Employee detail view
         ├─ EditEmp.jsx    # Edit employee (axios PUT)
         └─ Counter.jsx    # Interactive counter component
```

---

## Backend (emppp-backend)

Tech: Node.js (ES modules), Express, Mongoose, CORS.

Entrypoint: `server.js` — connects to MongoDB and mounts the employee router.

Model: `Emp` (Mongoose) fields:
- `name` (String, unique)
- `email` (String)
- `mobile` (String)
- `companyname` (String)
- timestamps enabled

API endpoints (mounted at the app root):

- POST `/emp`
  - Description: Create a new employee
  - Body: `{ name, email, mobile, companyname }`
  - Response: 201 `{ message: "New emp Created" }`

- GET `/emps`
  - Description: Return list of employees
  - Response: 200 `{ message: "employees", payload: [...] }`

- PUT `/edit/:id`
  - Description: Update employee by id
  - Body: updated fields
  - Response: 201 `{ message: "updates", payload: updated }`

- DELETE `/remove/:id`
  - Description: Delete employee by id
  - Response: 201 `{ message: "delteds", payload: deleted }`

Notes:
- The backend reads `process.env.MONGO_URI` for the MongoDB connection.
- The server listens on `process.env.PORT || 3000`.
- The API is deployed at: `https://eems-app.onrender.com` (already used by frontend).

Example `.env` (do not commit):

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/ems?retryWrites=true&w=majority
PORT=1005
```

Run backend locally:

```bash
cd emppp-backend
npm install
# create .env with MONGO_URI (and optional PORT)
npm start
```

---

## Frontend (react-app-2)

Tech: Vite, React 19, react-router-dom (v7), TailwindCSS, framer-motion, axios, react-hook-form.

Key behavior & architecture:

- Routing
  - `src/App.jsx` builds a `createBrowserRouter` router and returns it via `RouterProvider`.
  - `RootLayout` renders the `Header` and an `<Outlet />` for child routes.
  - Routes include: `/` (Home), `/create-emp`, `/list`, `/employees`, `/edit-emp`.

- Global state
  - `src/Components/context.jsx` provides `CounterProvider` and `useCounter()`.
  - `Header` consumes the counter and displays it globally.
  - `Counter.jsx` is a demo interactive component that updates the global counter.

- Data flow (employee CRUD)
  - `Create.jsx` — form powered by `react-hook-form`, POSTs to `/emp`.
  - `List.jsx` — fetches `/emps`, renders employee cards, and provides View/Edit/Delete actions.
    - View navigates to `/employees` using `navigate('/employees', { state: empObj })`.
    - Edit navigates to `/edit-emp` and passes state.
    - Delete calls DELETE `/remove/:id` and refreshes the list.
  - `EditEmp.jsx` — reads the `location.state`, pre-fills the form, and PUTs to `/edit/:id`.
  - `Employees.jsx` — reads `location.state` and shows employee details.

Styling: `src/index.css` imports Tailwind; most components use Tailwind utility classes.

Run frontend locally:

```bash
cd react-app-2
npm install
npm run dev
# open the printed Vite URL (typically http://localhost:5173)
```

Environment variable (recommended):
- The app currently uses `https://eems-app.onrender.com` as the backend base.







## Conclusion
This project demonstrates a simple full-stack employee management system with a global counter using React Context. The backend provides a REST API for employee CRUD operations, while the frontend offers a user-friendly interface to interact with the data and the counter. The code is structured for clarity and ease of understanding, making it a great starting point for learning full-stack development with React and Node.js.