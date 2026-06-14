# Emergency Blood Locator - Frontend PRD

## Project Goal

Build a simple emergency blood locator platform where:

- Users can view blood centers and blood stock without logging in.
- Users must register/login only when creating a blood request.
- Organizations can register/login and manage blood inventory.
- Organizations can view and process blood requests.
- Users can track their request status.

---

# User Roles

## Public Visitor

### Can

- View blood centers
- View blood stock
- Search/filter stock
- View center information

### Cannot

- Create blood requests
- Access dashboards

---

## User

### Can

- Register/Login
- Create blood requests
- Track own requests
- View request status

---

## Organization

### Can

- Register/Login
- Manage blood stock
- View blood requests
- Accept requests
- Complete requests
- Update organization profile

---

# Application Flow

```text
Landing Page
     |
     |
     +------ View Blood Centers
     |
     +------ View Blood Stock
     |
     +------ Login / Register
                 |
        -------------------
        |                 |
      User            Organization
        |                 |
        |                 |
 User Dashboard     Organization Dashboard
```

---

# Pages

---

# 1. Landing Page

## Purpose

Public entry point of the application.

---

## Hero Section

### Heading

```text
Find Blood Fast.
Locate nearby blood centers and available blood stock instantly.
```

### CTA Buttons

```text
View Blood Stock
Login
Register
```

---

## Blood Stock Section

Display available blood stock from all organizations.

### Card Information

```text
Organization Name
District
Available Blood Groups
```

### Example

```text
Apollo Blood Bank

A+ : 20
A- : 5
B+ : 15
O+ : 30
```

---

## Search & Filter Section

### Filters

```text
District
Blood Group
```

### Example

```text
District Dropdown

Blood Group Dropdown
```

---

## Blood Centers Section

Display all registered blood centers.

### Card Information

```text
Organization Name
Address
Phone
District
Blood Stock Summary
```

---

## Call To Action Section

### Text

```text
Need Blood Urgently?

Create a blood request and let blood centers respond.
```

### Button

```text
Request Blood
```

### Action

```text
If not logged in:
Redirect to Login Page
```

---

# 2. Login Page

## Layout

Two tabs:

```text
User Login
Organization Login
```

---

## User Login

### Fields

```text
Phone Number
Password
```

### Button

```text
Login
```

### Link

```text
Register as User
```

---

## Organization Login

### Fields

```text
Email
Password
```

### Button

```text
Login
```

### Link

```text
Register Organization
```

---

# 3. User Registration Page

## Fields

```text
Name
Phone Number
Password
Age
Blood Group
Address
District
State
Pincode
```

### Button

```text
Register
```

---

# 4. Organization Registration Page

## Fields

```text
Organization Name
Email
Password

Phone Number

POC Name
POC Phone Number

Organization Type

Address
District
State
Pincode
```

### Organization Types

```text
Hospital
Blood Bank
NGO
Trust
```

### Button

```text
Register Organization
```

---

# 5. User Dashboard

## Route

```text
/dashboard
```

---

## Dashboard Overview

### Stats Cards

```text
Total Requests
Pending Requests
Accepted Requests
Completed Requests
```

---

## Create Blood Request

### Form Fields

```text
Patient Name
Blood Group
Units Required
Hospital Name
Contact Number
Urgency Level
Address
District
State
```

### Urgency Levels

```text
Low
Medium
High
Critical
```

### Button

```text
Submit Request
```

### API

```http
POST /api/requests
```

---

## My Requests Section

### Table Columns

```text
Patient Name
Blood Group
Units Required
Status
Created Date
```

### Status Badges

```text
Pending
Accepted
Completed
Cancelled
```

### API

```http
GET /api/requests/my
```

---

# 6. Organization Dashboard

## Route

```text
/org-dashboard
```

---

## Sidebar Navigation

```text
Dashboard
Inventory
Requests
Profile
Logout
```

---

# Dashboard Overview

### Stats Cards

```text
Pending Requests
Accepted Requests
Completed Requests
```

---

# Inventory Management

## Purpose

Manage blood stock.

### Blood Groups

```text
A+
A-
B+
B-
AB+
AB-
O+
O-
```

### UI

Number input for each blood group.

### Button

```text
Update Inventory
```

### APIs

```http
GET /api/org/profile

PUT /api/org/stock
```

---

# Request Management

## Purpose

View and process blood requests.

### API

```http
GET /api/requests
```

---

## Request Table

### Columns

```text
Patient Name
Blood Group
Units Required
District
Urgency
Status
```

### Actions

```text
Accept Request
Complete Request
```

---

## Accept Request API

```http
PATCH /api/requests/:id/accept
```

---

## Complete Request API

```http
PATCH /api/requests/:id/complete
```

---

# Organization Profile

## Information

```text
Organization Name
Email
Phone
POC Name
POC Phone
Organization Type
Address
District
State
Pincode
```

---

## Edit Profile

### API

```http
PUT /api/org/profile
```

---

# Backend APIs Used

## Authentication

```http
POST /api/auth/register-user
POST /api/auth/login-user

POST /api/auth/register-org
POST /api/auth/login-org

POST /api/auth/logout

GET /api/auth/me
```

---

## User APIs

```http
GET /api/users/profile

PUT /api/users/profile
```

---

## Organization APIs

```http
GET /api/org/profile

PUT /api/org/profile

GET /api/org/stock

PUT /api/org/stock
```

---

## Blood Request APIs

```http
POST /api/requests

GET /api/requests/my

GET /api/requests

PATCH /api/requests/:id/accept

PATCH /api/requests/:id/complete

PATCH /api/requests/:id/cancel
```

---

# Frontend Structure

```text
src/

├── pages/
│
├── LandingPage.jsx
├── LoginPage.jsx
├── RegisterUser.jsx
├── RegisterOrg.jsx
├── UserDashboard.jsx
├── OrgDashboard.jsx
│
├── components/
│
├── Navbar.jsx
├── StockCard.jsx
├── CenterCard.jsx
├── RequestCard.jsx
│
├── services/
│
├── authApi.js
├── requestApi.js
├── orgApi.js
│
├── routes/
│
└── AppRoutes.jsx
```

---

# Tech Stack

```text
React
React Router
Axios
Tailwind CSS
```

---

# MVP Demo Flow

```text
Visitor Opens Website
        ↓
Views Blood Centers & Blood Stock
        ↓
Registers as User
        ↓
Creates Blood Request
        ↓
Organization Registers/Login
        ↓
Updates Blood Inventory
        ↓
Views Blood Requests
        ↓
Accepts Request
        ↓
Completes Request
        ↓
User Sees Updated Status
```

---

# Out of Scope (Version 1)

```text
Blood Donation Camps
Admin Dashboard
Donation Tracking
Notifications
Maps Integration
Real-time Chat
Payment Integration
```

Focus on completing the end-to-end request workflow before adding any additional features.