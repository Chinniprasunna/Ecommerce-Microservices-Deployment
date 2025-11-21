import api from "./axiosConfig";

export const registerCustomer = (data) => api.post("/customer/register", data);
export const loginCustomer = (data) => api.post("/customer/login", data);
export const getCustomers = () => api.get("/customer/all");
export const addCustomer = (data) => api.post("/customer/add", data);
export const helloCustomer = () => api.get("/customer/hello");
export const placeOrder = (data) => api.post("/customer/order/place", data);
export const getOrdersByCustomer = (customerId) => api.get(`/customer/order/customer/${customerId}`);
export const getOrdersBySeller = (sellerId) => api.get(`/customer/order/seller/${sellerId}`);
export const getAllOrders = () => api.get("/customer/order/all");
