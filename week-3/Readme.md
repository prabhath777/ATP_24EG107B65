# Week 3 - Backend Basics with MongoDB

## Overview

This repository contains the work and practice completed during Week 3 of my backend development learning journey.

The main focus of this week was understanding how backend systems work, learning MongoDB basics, creating APIs, handling routes, and testing endpoints using REST Client.

Topics covered include:
- Backend fundamental
- Server setup
- Routing
- APIs
- MongoDB basics
- CRUD operations
- REST Client testing
- Request and response handling

---

# Topics Learned

## 1. Introduction to Backend Development

Learned the role of backend systems in web applications.

### Concepts Covered
- Client-server architecture
- How frontend communicates with backend
- APIs and endpoints
- Request-response cycle
- JSON data handling

---

# 2. Setting Up a Basic Server

Created a basic backend server using Node.js and Express.

### Concepts Practiced
- Installing dependencies
- Creating a server
- Running backend applications
- Listening on ports

### Example

```js
const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---

# 3. Routing

Learned how routes handle different requests.

### HTTP Methods Learned
- GET
- POST
- PUT
- DELETE

### Example Route

```js
app.get("/", (req, res) => {
    res.send("Hello World");
});
```

---

# 4. APIs

Learned how APIs are used to send and receive data between client and server.

### Concepts Covered
- API endpoints
- JSON responses
- Request handling
- Sending data through APIs

### Example API

```js
app.get("/users", (req, res) => {
    res.json({
        name: "Prabhath",
        role: "Student"
    });
});
```

---

# 5. MongoDB Basics

Learned the fundamentals of MongoDB and NoSQL databases.

### Topics Covered
- What is MongoDB
- Collections and documents
- NoSQL database structure
- Connecting MongoDB to backend applications

---

# 6. Connecting MongoDB

Practiced connecting MongoDB with backend applications.

### Example

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testDB")
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));
```

---

# 7. Creating Schemas and Models

Learned how to structure data using schemas and models.

### Example

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model("User", userSchema);
```

---

# 8. CRUD Operations

Practiced basic database operations.

### Operations Learned
- Create
- Read
- Update
- Delete

### Example

```js
const user = new User({
    name: "Prabhath",
    age: 19
});

user.save();
```

---

# 9. Middleware Basics

Learned how middleware works in Express.

### Topics Covered
- Request processing
- `express.json()`
- Handling incoming JSON data

### Example

```js
app.use(express.json());
```

---

# 10. Testing APIs using REST Client

Learned how to test APIs using REST Client inside VS Code.

### Concepts Practiced
- Sending GET requests
- Sending POST requests
- Testing endpoints
- Checking JSON responses

### Example Request

```http
GET http://localhost:3000/users
```

### POST Request Example

```http
POST http://localhost:3000/users
Content-Type: application/json

{
    "name": "Prabhath",
    "age": 19
}
```

---

# Practice Work

This week included practice through:
- Creating backend servers
- Building API routes
- Connecting MongoDB databases
- Testing APIs using REST Client
- Performing CRUD operations

---

# Key Takeaways

- Backend handles application logic and data
- APIs allow communication between frontend and backend
- MongoDB stores data using collections and documents
- Express simplifies backend routing
- REST Client helps test APIs efficiently
- CRUD operations are the foundation of database interaction

---

# Tools and Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST Client
- VS Code

