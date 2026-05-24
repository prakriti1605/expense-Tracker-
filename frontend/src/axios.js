import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

const api = axios.create({baseURL:BASE_URL, timeout: 8000});
// api.interceptors.request.use((config) => {

//     const token = localStorage.getItem("token");

//     if(token){
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

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

