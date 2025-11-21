import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getProductsBySeller } from "../api/sellerApi";
import { getOrdersBySeller } from "../api/customerApi";

function Seller() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) {
      navigate("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        getProductsBySeller(sellerId),
        getOrdersBySeller(sellerId)
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await addProduct({
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        sellerId: parseInt(sellerId)
      });
      setSuccess("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("sellerId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

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
          Seller Dashboard
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

      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
            <div style={{ fontSize: "32px", fontWeight: "600", color: "#059669" }}>
              ${totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: "20px",
            padding: "12px 16px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            color: "#991b1b",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{
            marginBottom: "20px",
            padding: "12px 16px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            color: "#166534",
            fontSize: "14px"
          }}>
            {success}
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          backgroundColor: "#ffffff",
          padding: "4px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          width: "fit-content"
        }}>
          <button
            onClick={() => setActiveTab("products")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "products" ? "#3b82f6" : "transparent",
              color: activeTab === "products" ? "#ffffff" : "#6b7280",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: activeTab === "products" ? "600" : "400",
              fontSize: "14px"
            }}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "orders" ? "#3b82f6" : "transparent",
              color: activeTab === "orders" ? "#ffffff" : "#6b7280",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: activeTab === "orders" ? "600" : "400",
              fontSize: "14px"
            }}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            gap: "24px"
          }}>
            {/* Add Product Form */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              padding: "24px",
              height: "fit-content",
              position: "sticky",
              top: "24px"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                Add New Product
              </h2>
              <form onSubmit={handleAddProduct}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                    Description
                  </label>
                  <textarea
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: "500", color: "#374151" }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "500",
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>

            {/* Products List */}
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                My Products ({products.length})
              </h2>
              {products.length === 0 ? (
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  padding: "60px",
                  textAlign: "center",
                  color: "#6b7280"
                }}>
                  <p style={{ fontSize: "16px", marginBottom: "8px" }}>No products yet</p>
                  <p style={{ fontSize: "14px" }}>Add your first product using the form on the left</p>
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px"
                }}>
                  {products.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        transition: "all 0.2s"
                      }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>
                        {p.name}
                      </h3>
                      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px", minHeight: "60px" }}>
                        {p.description || "No description"}
                      </p>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "16px",
                        borderTop: "1px solid #f3f4f6"
                      }}>
                        <div>
                          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Price</div>
                          <div style={{ fontSize: "20px", fontWeight: "600", color: "#059669" }}>
                            ${p.price?.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Stock</div>
                          <div style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            color: p.quantity > 0 ? "#059669" : "#dc2626"
                          }}>
                            {p.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
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
                <div style={{ padding: "60px", textAlign: "center", color: "#6b7280" }}>
                  <p style={{ fontSize: "16px", marginBottom: "8px" }}>No orders yet</p>
                  <p style={{ fontSize: "14px" }}>Orders for your products will appear here</p>
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
                      <span>Customer ID: {o.customerId}</span>
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
        )}
      </div>
    </div>
  );
}

export default Seller;
