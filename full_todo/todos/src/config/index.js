import axios from "axios";

export const apiUrl = "http://localhost:8000/api/todo";

export const Axios = axios.create({
    baseURL: apiUrl,
    timeout: 1000,
});
