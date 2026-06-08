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