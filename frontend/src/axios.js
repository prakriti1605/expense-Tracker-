import axios from "axios";

const BASE_URL = "https://expense-tracker-production-cc99.up.railway.app/";

const api = axios.create({ 
    baseURL: BASE_URL, 
    timeout: 10000 
});

// Interceptor: Har request ke saath token automatically attach karega
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    // Debugging ke liye (Console mein check karein)
    console.log("Interceptor - Token found:", token ? "Yes" : "No");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Authentication functions
export const signupUser = async (userData) => {
    const res = await api.post("/auth/signup", userData);
    return res;
};

export const loginUser = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    
    // Fix: Server se aaye hue token ko yahan store karna zaroori hai
    if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
    }
    return res;
};

// Expense API functions
export const getExpenses = async () => {
    try {
        const res = await api.get("/expense");
        return (res.data && res.data.data) || [];
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
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

