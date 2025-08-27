import axios from "axios";

export const axiosAPI = axios.create({
    baseURL: process.env.API_BASE_URL || "http://127.0.0.1:8000/api",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})