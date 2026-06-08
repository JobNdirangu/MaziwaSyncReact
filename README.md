# MaziwaSync React Frontend

Frontend application for the Dairy Cooperative Management System built using React, Vite, Tailwind CSS, and Django REST Framework APIs.

---

# Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Context API
* Bootstrap Icons

---

# Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite / PostgreSQL

---

# Learning Objectives

By the end of this project students should understand:

* React Components
* React Router
* Context API
* JWT Authentication
* Protected Routes
* Axios
* Tailwind CSS
* CRUD Operations
* API Consumption
* Dashboard Development
* Role-Based Access Control

---

# Step 1: Create React Project

Create the project using Vite.

```bash
npm create vite@latest MaziwaSyncReact
```

Select:

```text
Framework: React
Variant: JavaScript
```

Move into the project folder:

```bash
cd MaziwaSyncReact
```

Install dependencies:

```bash
npm install
```

---

# Step 2: Install Required Packages

## React Router

Used for page navigation.

```bash
npm install react-router-dom
```

---

## Axios

Used to consume Django REST APIs.

```bash
npm install axios
```

---

## JWT Decode

Used to decode JWT tokens and check expiration.

```bash
npm install jwt-decode
```

---

## Bootstrap Icons

Used for icons only.

```bash
npm install bootstrap-icons
```

---

# Step 3: Install Tailwind CSS

Install Tailwind CSS.

```bash
npm install tailwindcss @tailwindcss/vite
```

---

# Step 4: Configure Vite

Update:

```javascript
vite.config.js
```

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

# Step 5: Configure CSS

Inside:

```css
src/index.css
```

Add:

```css
@import "tailwindcss";
```

---

# Step 6: Import Global Styles

Inside:

```javascript
src/main.jsx
```

```javascript
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
```

---

# Step 7: Create Project Structure

```text
src
│
├── api
│   └── axios.js
│
├── context
│   ├── AuthContext.jsx
│   └── ProtectedRoute.jsx
│
├── components
│
│   ├── auth
│   │   └── LoginComponent.jsx
│   │
│   ├── admin
│   │
│   ├── farmer
│   │
│   └── porter
│
├── App.jsx
└── main.jsx
```

---

# Development Flow

The project will be developed in the following order.

```text
Authentication
      ↓
Context API
      ↓
Protected Routes
      ↓
Porter Module
      ↓
Farmer Module
      ↓
Admin Module
```

---

# Module Development Order

## 1. Authentication

Build:

```text
LoginComponent.jsx
```

Learn:

* Forms
* Axios POST
* JWT Authentication
* Local Storage
* Navigation

API:

```http
POST /api/login/
```

---

## 2. Context API

Build:

```text
AuthContext.jsx
```

Responsibilities:

* Store token
* Store user
* Logout
* Check token expiration

Learn:

```text
createContext()
useState()
useEffect()
useCallback()
```

---

## 3. Protected Routes

Build:

```text
ProtectedRoute.jsx
```

Responsibilities:

* Verify login
* Verify user role
* Redirect unauthorized users

Learn:

```text
Navigate
Role-Based Access Control
```

---

# Porter Module

Build first because milk collection is the system's core business process.

---

## Lesson 1: Add Milk Collection

Component:

```text
components/porter/AddMilkCollection.jsx
```

API:

```http
POST /api/porters/milk-collections/add/
```

Students learn:

* Forms
* POST requests
* JWT Authentication

---

## Lesson 2: My Collections

Component:

```text
components/porter/MyCollections.jsx
```

API:

```http
GET /api/porters/collections/my/
```

Students learn:

* useEffect
* Axios GET
* Rendering lists

---

## Lesson 3: Porter Dashboard

Component:

```text
components/porter/PorterDashboard.jsx
```

API:

```http
GET /api/porters/dashboard/
```

Students learn:

* Dashboard Cards
* Statistics
* API Consumption

---

## Lesson 4: Notices

Component:

```text
components/porter/PorterNotices.jsx
```

API:

```http
GET /api/notices/
```

---

# Farmer Module

---

## Lesson 1: View Collections

Component:

```text
components/farmer/FarmerCollections.jsx
```

API:

```http
GET /api/farmers/collections/
```

---

## Lesson 2: Feedback CRUD

Component:

```text
components/farmer/Feedback.jsx
```

API:

```http
/api/farmers/feedback/
```

Students learn:

* Create
* Read
* Update
* Delete

---

## Lesson 3: Farmer Dashboard

Component:

```text
components/farmer/FarmerDashboard.jsx
```

API:

```http
GET /api/farmers/dashboard/
```

---

## Lesson 4: Notices

Component:

```text
components/farmer/FarmerNotices.jsx
```

API:

```http
GET /api/notices/
```

---

# Admin Module

Build last because it consumes information produced by farmers and porters.

---

## Lesson 1: Manage Farmers

```text
components/admin/Farmers.jsx
```

---

## Lesson 2: Manage Porters

```text
components/admin/Porters.jsx
```

---

## Lesson 3: Manage Collections

```text
components/admin/Collections.jsx
```

---

## Lesson 4: Manage Notices

```text
components/admin/Notices.jsx
```

---

## Lesson 5: Admin Dashboard

```text
components/admin/AdminDashboard.jsx
```

API:

```http
GET /api/admin/dashboard/
```

Students learn:

* Analytics
* Reporting
* Business Dashboards

---

# Final Learning Flow

```text
React Setup
    ↓
Tailwind CSS
    ↓
Authentication
    ↓
Context API
    ↓
Protected Routes
    ↓
Porter Module
    ↓
Farmer Module
    ↓
Admin Module
```

This sequence follows the real business workflow of the dairy cooperative and is the easiest path for students to understand and implement.
