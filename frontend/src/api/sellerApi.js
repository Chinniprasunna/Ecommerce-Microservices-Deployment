import api from "./axiosConfig";

export const registerSeller = (data) => api.post("/seller/register", data);
export const loginSeller = (data) => api.post("/seller/login", data);
export const getSellers = () => api.get("/seller/all");
export const addSeller = (data) => api.post("/seller/add", data);
export const helloSeller = () => api.get("/seller/hello");
export const addProduct = (data) => api.post("/seller/product/add", data);
export const getAllProducts = () => api.get("/seller/product/all");
export const getProductsBySeller = (sellerId) => api.get(`/seller/product/seller/${sellerId}`);
