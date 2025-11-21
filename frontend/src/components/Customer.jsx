import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder, getOrdersByCustomer } from "../api/customerApi";
import { getAllProducts } from "../api/sellerApi";

function Customer() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      navigate("/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        getAllProducts(),
        getOrdersByCustomer(customerId)
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!selectedProduct) {
      setError("Please select a product");
      return;
    }
    if (quantity > selectedProduct.quantity) {
      setError("Quantity exceeds available stock");
      return;
    }
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    setError("");
    setSuccess("");
    setOrderLoading(true);
    try {
      await placeOrder({
        customerId: parseInt(customerId),
        productId: selectedProduct.id,
        sellerId: selectedProduct.sellerId,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
        totalAmount: selectedProduct.price * quantity
      });
      setSuccess("Order placed successfully!");
      setSelectedProduct(null);
      setQuantity(1);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
          Shopping
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </header>

      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>Loading...</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "24px"
          }}>
            {/* Products Grid */}
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                Products ({products.length})
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px"
              }}>
                {products.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6b7280", gridColumn: "1 / -1" }}>
                    No products available
                  </div>
                ) : (
                  products.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        transition: "all 0.2s",
                        cursor: "pointer",
                        border: selectedProduct?.id === p.id ? "2px solid #111827" : "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedProduct?.id !== p.id) {
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedProduct?.id !== p.id) {
                          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                        }
                      }}
                    >
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>
                        {p.name}
                      </h3>
                      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px", minHeight: "40px" }}>
                        {p.description || "No description available"}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
                          ${p.price?.toFixed(2)}
                        </span>
                        <span style={{ fontSize: "13px", color: p.quantity > 0 ? "#059669" : "#dc2626" }}>
                          {p.quantity > 0 ? `${p.quantity} in stock` : "Out of stock"}
                        </span>
                      </div>
                      {selectedProduct?.id === p.id ? (
                        <div style={{ marginTop: "16px" }}>
                          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                            <input
                              type="number"
                              min="1"
                              max={p.quantity}
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, Math.min(p.quantity, parseInt(e.target.value) || 1)))}
                              style={{ width: "80px", padding: "8px", textAlign: "center" }}
                            />
                            <button
                              onClick={handleOrder}
                              disabled={orderLoading || p.quantity === 0}
                              style={{
                                flex: 1,
                                padding: "8px",
                                backgroundColor: "#111827",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: orderLoading || p.quantity === 0 ? "not-allowed" : "pointer",
                                opacity: orderLoading || p.quantity === 0 ? 0.6 : 1
                              }}
                            >
                              {orderLoading ? "Processing..." : "Confirm Order"}
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedProduct(null);
                              setQuantity(1);
                            }}
                            style={{
                              width: "100%",
                              padding: "8px",
                              backgroundColor: "transparent",
                              color: "#6b7280",
                              border: "1px solid #d1d5db",
                              borderRadius: "6px",
                              fontSize: "14px",
                              cursor: "pointer"
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedProduct(p)}
                          disabled={p.quantity === 0}
                          style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: p.quantity === 0 ? "#e5e7eb" : "#111827",
                            color: p.quantity === 0 ? "#9ca3af" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: p.quantity === 0 ? "not-allowed" : "pointer"
                          }}
                        >
                          {p.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Orders Sidebar */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              height: "fit-content",
              position: "sticky",
              top: "24px"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                Order History
              </h2>
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                {orders.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                    No orders yet
                  </div>
                ) : (
                  orders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #f3f4f6",
                        marginBottom: "12px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                          Order #{o.id}
                        </span>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "500",
                          backgroundColor: o.status === "PENDING" ? "#fef3c7" : "#d1fae5",
                          color: o.status === "PENDING" ? "#92400e" : "#065f46"
                        }}>
                          {o.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
                        {o.productName}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280" }}>
                        <span>Qty: {o.quantity}</span>
                        <span style={{ fontWeight: "600", color: "#111827" }}>
                          ${o.totalAmount?.toFixed(2)}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
                        {new Date(o.orderDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customer;
