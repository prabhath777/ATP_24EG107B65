#  Blog App — Full Stack MERN Platform

<div align="center">


![GitHub last commit](https://img.shields.io/github/last-commit/prabhath777/ATP_24EG107B65?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/prabhath777/ATP_24EG107B65?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge\&logo=mongodb)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge\&logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge\&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green?style=for-the-badge\&logo=node.js)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)

###  A role-based full-stack blogging platform built using the MERN stack.

🔗 **Live Demo:** [BlogappB65.vercel.app](https://BlogappB65.vercel.app)

</div>

---

# 📖 Overview

This project is a complete full-stack blogging application where users can:

* Read articles
* Publish blogs
* Comment on posts
* Manage accounts using role-based access
* Upload profile images
* Authenticate securely using JWT cookies

The application is divided into:

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Media Storage:** Cloudinary

This is not just another CRUD tutorial project.
The architecture includes authentication flow, protected routes, authorization middleware, state management, image upload handling, and scalable folder structure.

---

# ⚡ Features

## 👤 Authentication System

* Secure Login & Signup
* JWT Authentication
* HTTP-only Cookie Storage
* Protected Routes
* Role-Based Authorization

## ✍️ Author Features

* Create Articles
* Edit Articles
* Soft Delete Articles
* Manage Published Content

## 🧑‍💻 User Features

* Browse Articles
* Read Blogs
* Add Comments
* Access Responsive UI

## 🛡️ Admin Features

* Manage Users
* Block/Activate Accounts
* View Users by Roles

## ☁️ Cloud Features

* Cloudinary Image Uploads
* Persistent Media Storage
* REST API Integration

---

# 🧠 Tech Stack

| Category         | Technologies                            |
| ---------------- | --------------------------------------- |
| Frontend         | React, Vite, Tailwind CSS, React Router |
| Backend          | Node.js, Express.js                     |
| Database         | MongoDB, Mongoose                       |
| Authentication   | JWT, Cookies                            |
| File Uploads     | Multer, Cloudinary                      |
| State Management | Zustand                                 |
| API Handling     | Axios                                   |
| Deployment       | Vercel, Render                          |

---

# 🏗️ Project Structure

```bash
BLOG-APP
│
├── BLOG-APP-BACKEND
│   ├── APIs
│   ├── config
│   ├── middlewares
│   ├── models
│   ├── server.js
│   └── package.json
│
├── BLOG-APP-FRONTEND
│   ├── src
│   ├── public
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Roles in the Application

| Role   | Permissions                       |
| ------ | --------------------------------- |
| USER   | Read and comment on blogs         |
| AUTHOR | Create, edit, and manage articles |
| ADMIN  | Manage users and system access    |

---

# 🌐 Deployment

## Frontend

Deployed on **Vercel**

🔗 [https://BlogappB65.vercel.app](https://BlogappB65.vercel.app)

## Backend

Deployed on **Render**

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=4000
DB_URL=your_mongodb_url
SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:4000
```

---

# 🚀 Local Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/prabhath777/ATP_24EG107B65.git
```

---

## 2️⃣ Backend Setup

```bash
cd BLOG-APP-BACKEND
npm install
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd BLOG-APP-FRONTEND
npm install
npm run dev
```

---

# 📡 API Routes Overview

## Authentication Routes

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | `/auth/user`     | Register User   |
| POST   | `/auth/login`    | Login User      |
| GET    | `/auth/logout`   | Logout User     |
| PUT    | `/auth/password` | Change Password |

---

## User Routes

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/user-api/articles` |
| PUT    | `/user-api/articles` |

---

## Author Routes

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | `/author-api/article`  |
| GET    | `/author-api/articles` |
| PUT    | `/author-api/articles` |
| PATCH  | `/author-api/articles` |

---

## Admin Routes

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | `/admin-api/users/:user`   |
| PUT    | `/admin-api/activate-user` |
| PUT    | `/admin-api/block-user`    |

---

# 🧩 Core Backend Concepts Used

* REST API Design
* Middleware Architecture
* JWT Verification
* Cookie-Based Authentication
* Role-Based Authorization
* MVC-like Folder Structure
* MongoDB Relationships
* File Upload Handling
* Cloud Storage Integration

---

# 🎨 Frontend Concepts Used

* React Functional Components
* React Hooks
* Zustand State Management
* Protected Routing
* API Integration with Axios
* Responsive UI Design
* Component Reusability

---

# 📌 Important Notes

* Articles are **soft deleted** instead of permanently removed.
* JWT tokens are stored in **HTTP-only cookies** for security.
* Frontend requests use:

```js
withCredentials: true
```

* Image uploads are streamed to Cloudinary using Multer memory storage.

---

# 📚 Future Improvements

* Rich Text Editor
* Article Likes & Bookmarks
* Real-Time Notifications
* Markdown Support
* Search & Filtering
* Dark Mode
* AI Blog Summaries
* Admin Dashboard Analytics

---

# 🧪 Learning Outcomes

This project helped in understanding:

* Full-stack application architecture
* Authentication workflows
* Real deployment debugging
* State management patterns
* Backend route protection
* API communication
* Production environment configuration


---

# 👨‍💻 Author

### Prabhath


# 📜 License

This project is licensed under the MIT License.


