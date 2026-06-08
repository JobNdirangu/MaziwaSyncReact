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
Login.jsx
```

```jsx
import React, { useState } from "react";
import axios from "axios";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { setToken, setUser } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const data = {username,password};

        try {
            const res = await api.post("core/auth/login/", data);
            console.log("Login success:", res.data);

            // deconstruct
            const {access,refresh,username,role} = res.data;

            // Create user object
            const userData = { username, role};

            // Save to context
            setToken(access);
            setUser(userData);

            // Save to localStorage
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("user", JSON.stringify(userData));

            // ROLE-BASED REDIRECT
            if (role === "admin") {
                navigate("/admin-dashboard");
            } else if (role === "farmer") {
                navigate("/farmer-dashboard");
            } else if (role === "potter") {
                navigate("/potter-dashboard");
            } else {
                navigate("/not-authorized");
            }


        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" >
                <h1 className="text-2xl font-bold text-center mb-6 text-green-600"> Login </h1>

                {/* SUCCESS MESSAGE */}
                {success && (<div className="mb-4 text-green-600 bg-green-100 p-2 rounded text-sm text-center"> {success}</div>)}

                {/* ERROR MESSAGE */}
                {error && (<div className="mb-4 text-red-600 bg-red-100 p-2 rounded text-sm text-center"> {error} </div>)}

                <input type="text" placeholder="Username" className="input-field mb-5" required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input type="password" placeholder="Password" className="input-field mb-5" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loading}
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
```
---
###  Axios Instance
```js
import axios from "axios";

// Create a reusable Axios instance.
// This prevents us from repeating the API URL in every request.
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        // Tell the backend that we are sending JSON data.
        "Content-Type": "application/json",
    },
});

// Interceptors run before every request.
// Here we automatically attach the JWT access token
// so protected endpoints can identify the logged-in user.
api.interceptors.request.use((config) => {

    // Get the token saved after login.
    const token = localStorage.getItem("access");

    // If a token exists, add it to the Authorization header.
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Always return the config so the request can continue.
    return config;
});

export default api;
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

## 2. Context 

Build:

```text
AuthContext.jsx
```

```jsx
import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create a global authentication context
// This allows us to access user + token anywhere in the app
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // -----------------------------
    // AUTH STATE (INITIAL LOAD)
    // -----------------------------

    // Load JWT token from localStorage so login persists on refresh
    const [token, setToken] = useState(
        () => localStorage.getItem("access") || ""
    );

    // Load user data from localStorage (if available)
    // We wrap JSON.parse in try/catch to avoid app crashes on invalid data
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            return null;
        }
    });

    // -----------------------------
    // LOGOUT FUNCTION
    // -----------------------------

    // Clears all authentication data and redirects user to login page
    const logout = useCallback(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setToken("");
        setUser(null);

        navigate("/login");
    }, [navigate]);

    // -----------------------------
    // TOKEN EXPIRY CHECK
    // -----------------------------

    // Runs every time token changes
    // Decodes JWT and checks if it is expired
    useEffect(() => {
        if (!token) return;

        try {
            const decoded = jwtDecode(token);

            // JWT "exp" is in seconds → convert to milliseconds
            const isExpired = decoded.exp * 1000 < Date.now();

            // If token is expired, force logout
            if (isExpired) {
                logout();
            }
        } catch (err) {
            // If token is invalid or corrupted → logout user
            logout();
        }
    }, [token, logout]);

    // -----------------------------
    // PROVIDER VALUE (GLOBAL STATE)
    // -----------------------------

    // Everything inside "value" becomes accessible in the app
    return (
        <AuthContext.Provider
            value={{
                token,      // JWT access token
                setToken,   // update token after login/refresh
                user,       // logged-in user data
                setUser,    // update user info
                logout,     // manual logout function
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
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

```jsx
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    // Not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default ProtectedRoute;
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
