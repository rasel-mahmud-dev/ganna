import axios from "axios";
export const backend = "http://localhost:1000"

const api = axios.create({
    baseURL: backend
})

export default api