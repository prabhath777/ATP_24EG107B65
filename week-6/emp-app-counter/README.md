# Employee Management System (emp-app-counter)

This repository contains a simple Employee Management System (EMS) with a full-stack example:

- `emppp-backend` — Node/Express API (MongoDB + Mongoose)
- `react-app-2` — Frontend (React + Vite + Tailwind)

The app demonstrates basic CRUD for employees and a small global counter using React Context.

---

## Quick Overview

- Create, list, view, edit, and delete employees.
- Backend exposes a small REST API for employees.
- Frontend is built with Vite and React Router (v7) and uses a Context for global state (counter).

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






## Where to look in code

- Frontend entry: `react-app-2/src/main.jsx`
- Router setup: `react-app-2/src/App.jsx`
- Counter context: `react-app-2/src/Components/context.jsx`
- Backend routes: `emppp-backend/Apis/employee.js`
- Backend server: `emppp-backend/server.js`


## Conclusion
This project demonstrates a simple full-stack employee management system with a global counter using React Context. The backend provides a REST API for employee CRUD operations, while the frontend offers a user-friendly interface to interact with the data and the counter. The code is structured for clarity and ease of understanding, making it a great starting point for learning full-stack development with React and Node.js.