import api from "./axiosConfig";

export const loginAdmin = (data) => api.post("/admin/login", data);
export const getAdmins = () => api.get("/admin/all");
export const createAdmin = (data) => api.post("/admin/create", data);
export const helloAdmin = () => api.get("/admin/hello");
