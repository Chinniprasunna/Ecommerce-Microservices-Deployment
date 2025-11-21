import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/sellerApi";
import { getAllOrders } from "../api/customerApi";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        getAllProducts(),
        getAllOrders()
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            color: "#ffffff",
            fontSize: "14px",
            padding: "8px 16px"
          }}
        >
          Logout
        </button>
      </header>

      {/* Stats Cards */}
      <div style={{ padding: "24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginBottom: "24px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Products</div>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#111827" }}>{products.length}</div>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Orders</div>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#111827" }}>{orders.length}</div>
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Revenue</div>
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#111827" }}>
              ${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px"
        }}>
          {/* Products Section */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "20px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                Products ({products.length})
              </h2>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {products.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
                  No products available
                </div>
              ) : (
                products.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #f3f4f6"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#111827" }}>{p.name}</h3>
                      <span style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#059669"
                      }}>
                        ${p.price?.toFixed(2)}
                      </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>{p.description}</p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#9ca3af" }}>
                      <span>Stock: {p.quantity}</span>
                      <span>Seller ID: {p.sellerId}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Orders Section */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "20px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                Orders ({orders.length})
              </h2>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {orders.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
                  No orders available
                </div>
              ) : (
                orders.map((o) => (
                  <div
                    key={o.id}
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #f3f4f6"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#111827", marginBottom: "4px" }}>
                          Order #{o.id}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#6b7280" }}>{o.productName}</p>
                      </div>
                      <span style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#059669"
                      }}>
                        ${o.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#9ca3af", marginBottom: "8px" }}>
                      <span>Qty: {o.quantity}</span>
                      <span>Customer: {o.customerId}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: o.status === "PENDING" ? "#fef3c7" : "#d1fae5",
                        color: o.status === "PENDING" ? "#92400e" : "#065f46"
                      }}>
                        {o.status}
                      </span>
                      <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {new Date(o.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
