// src/axios.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Set your base URL here
    timeout: 10000, // Optional: Set a timeout (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Set default headers
    },
});

export default apiClient;
