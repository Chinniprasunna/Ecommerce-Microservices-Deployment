import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Customer from "./components/Customer";
import Seller from "./components/Seller";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/customer/dashboard" element={<Customer />} />
        <Route path="/seller/dashboard" element={<Seller />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
