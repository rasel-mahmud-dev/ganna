import axios from "axios";
export const backend = "http://localhost:1000"

const token = localStorage.getItem("token") || ""

const api = axios.create({
    baseURL: backend,
    headers: {
        authorization: token
    }
})

export default api