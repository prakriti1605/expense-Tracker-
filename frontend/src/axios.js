import axios from "axios";

const BASE_URL = "https://expense-tracker-production-cc99.up.railway.app/api/v1";

const api = axios.create({baseURL:BASE_URL, timeout: 8000});
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");
    console.log(token);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
// Add these to your existing axios.js file
export const loginUser = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data; // Should return { token: "..." }
};

export const signupUser = async (userData) => {
    const res = await api.post("/auth/signup", userData);
    return res.data;
};
//expense api
export const getExpenses = async () => {
    const res = await api.get("/expense");
    return (res.data && res.data.data) || [];
};

export const createExpense = async(payload)=>{
    const res = await api.post("/expense",payload);
    return (res.data && res.data.data) || [];
}

export const updateExpense = async(id,payload)=>{
    const res = await api.put(`/expense/${id}`,payload);
    return (res.data && res.data.data) || [];
}

export const deleteExpense = async(id)=>{
    const res = await api.delete(`/expense/${id}`);
    return (res.data ) || null;
}

