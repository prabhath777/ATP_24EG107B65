# Blog App — Full-Stack (Backend + Frontend)

A full-stack blog application with role-based access control supporting three roles: `USER`, `AUTHOR`, and `ADMIN`.

Users can read and comment on articles. Authors can create, edit, and soft-delete their articles. Admins can list and manage users. The backend provides a REST API (Node.js + Express + MongoDB) and the frontend is a Vite + React app that consumes those APIs.

**Contents**
- **Overview**: What the project does
- **Features**: Core user-facing and admin features
- **Tech stack**: Libraries and services used
- **Repository structure**: Important files and folders
- **Getting started**: How to run backend & frontend locally
- **Environment variables**: Required settings for local development
- **API overview**: Main endpoints and protection
- **Data models**: Primary schema fields
- **Notes**: Implementation details and tips

---

## Overview

This repository contains two parts:

- `BLOG-APP-BACKEND`: Express-based REST API that handles authentication, user management, article management, image uploads (Cloudinary), and role-based authorization.
- `BLOG-APP-FRONTEND`: React (Vite) single-page application that provides the UI for users, authors, and admins.

Both projects are designed to be run independently during development and communicate via REST requests. The backend stores authentication tokens in an HTTP-only cookie; the frontend uses `axios` with `withCredentials: true` to include that cookie on requests.

## Features

- Role-based authentication and authorization (`USER`, `AUTHOR`, `ADMIN`)
- User registration with profile image upload to Cloudinary
- Login/Logout with JWT stored in an HTTP-only cookie
- Authors can create, edit, and soft-delete articles
- Users can read articles and add comments
- Admins can list users by role and block/activate accounts
- Input validation and basic error handling

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB), JSON Web Tokens, Multer (in-memory), Cloudinary
- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Zustand (state)

## Repository structure (high level)

- [BLOG-APP-BACKEND](BLOG-APP-BACKEND/README.md) — backend project and API
  - [server.js](BLOG-APP-BACKEND/server.js)
  - [APIs](BLOG-APP-BACKEND/APIs) — route modules (`AdminAPI.js`, `AuthorAPI.js`, `CommonAPI.js`, `UserAPI.js`)
  - [models](BLOG-APP-BACKEND/models) — `UserModel.js`, `articleModel.js`
  - [config](BLOG-APP-BACKEND/config) — `cloudinary.js`, `multer.js`, `cloudinaryUpload.js`
  - [middlewares](BLOG-APP-BACKEND/middlewares) — `verifyToken.js`

- [BLOG-APP-FRONTEND](BLOG-APP-FRONTEND/README.md) — frontend app
  - [src/api/axiosInstance.js](BLOG-APP-FRONTEND/src/api/axiosInstance.js) — centralized axios instance with `withCredentials`
  - [src](BLOG-APP-FRONTEND/src) — React components, routes, and pages

## Getting started (local development)

Prerequisites:

- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image uploads)

1. Clone the repository and open the workspace root.

Backend

```bash
cd BLOG-APP-BACKEND
npm install
# create a .env file (see sample below)
npm start
```

Frontend

```bash
cd BLOG-APP-FRONTEND
npm install
# create a .env file (see sample below)
npm run dev
```

Open the frontend at the port Vite shows (defaults to `http://localhost:5173`). The frontend uses `VITE_API_BASE_URL` to point to the backend (default: `http://localhost:4000`).

## Environment variables

Backend example (`BLOG-APP-BACKEND/.env`):

```
PORT=4000
DB_URL=mongodb://localhost:27017/blog_app_db
SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Frontend example (`BLOG-APP-FRONTEND/.env`):

```
VITE_API_BASE_URL=http://localhost:4000
```

## API overview

All backend routes are registered under prefixes in `server.js`.

- Authentication / common routes (prefix: `/auth`)
  - `POST /auth/user` — Register a new user (multipart/form-data; field `profileImageUrl` for image)
  - `POST /auth/login` — Login with `{ email, password }` (stores JWT cookie)
  - `GET /auth/logout` — Clear auth cookie
  - `PUT /auth/password` — Change password (protected)

- User routes (prefix: `/user-api`) — protected with role `USER`
  - `GET /user-api/articles` — Get all active articles
  - `PUT /user-api/articles` — Add comment `{ articleID, comment }`

- Author routes (prefix: `/author-api`) — protected with role `AUTHOR`
  - `POST /author-api/article` — Create/article publish
  - `GET /author-api/articles` — Get author's articles
  - `PUT /author-api/articles` — Edit article
  - `PATCH /author-api/articles` — Soft-delete / toggle active

- Admin routes (prefix: `/admin-api`) — protected with role `ADMIN`
  - `GET /admin-api/users/:user` — List emails by role (`user` or `author`)
  - `PUT /admin-api/activate-user` — Activate user by email
  - `PUT /admin-api/block-user` — Block user by email

Authentication is enforced by the `verifyToken` middleware which checks the JWT from an HTTP-only cookie and the allowed role(s).

## Data models (summary)

- `UserModel` (fields): `firstName`, `lastName`, `email`, `password` (hashed), `role` (`USER|AUTHOR|ADMIN`), `profileImageUrl`, `isUserActive`
- `ArticleModel` (fields): `author` (ObjectId), `title`, `category`, `content`, `comment` (array of `{ user, comment }`), `isArticleActive`

## Notes & implementation details

- Image uploads: The backend accepts image uploads using `multer` configured to store files in memory, then streams them to Cloudinary via `cloudinary.uploader.upload_stream`.
- Sessions: JWTs are signed and returned to the client inside an HTTP-only cookie; frontend must call APIs with credentials (`axios` instance sets `withCredentials: true`).
- Soft delete: Articles are not permanently removed; `isArticleActive` toggles visibility.

## Useful links

- Backend entrypoint: [BLOG-APP-BACKEND/server.js](BLOG-APP-BACKEND/server.js)
- Auth routes and user registration: [BLOG-APP-BACKEND/APIs/CommonAPI.js](BLOG-APP-BACKEND/APIs/CommonAPI.js)
- Author routes: [BLOG-APP-BACKEND/APIs/AuthorAPI.js](BLOG-APP-BACKEND/APIs/AuthorAPI.js)
- Admin routes: [BLOG-APP-BACKEND/APIs/AdminAPI.js](BLOG-APP-BACKEND/APIs/AdminAPI.js)
- User routes: [BLOG-APP-BACKEND/APIs/UserAPI.js](BLOG-APP-BACKEND/APIs/UserAPI.js)


