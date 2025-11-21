import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/adminApi";
import { loginCustomer, registerCustomer } from "../api/customerApi";
import { loginSeller, registerSeller } from "../api/sellerApi";

function Login() {
  const [userType, setUserType] = useState("admin");
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      let res;
      if (userType === "admin") {
        res = await loginAdmin({ username, password });
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("userType", "admin");
          navigate("/admin/dashboard");
        } else {
          setError(res.data.message || "Login failed");
        }
      } else if (userType === "customer") {
        res = await loginCustomer({ username, password });
        if (res.data.success) {
          localStorage.setItem("customerToken", res.data.token);
          localStorage.setItem("customerId", res.data.customerId);
          localStorage.setItem("userType", "customer");
          navigate("/customer/dashboard");
        } else {
          setError(res.data.message || "Login failed");
        }
      } else if (userType === "seller") {
        res = await loginSeller({ username, password });
        if (res.data.success) {
          localStorage.setItem("sellerToken", res.data.token);
          localStorage.setItem("sellerId", res.data.sellerId);
          localStorage.setItem("userType", "seller");
          navigate("/seller/dashboard");
        } else {
          setError(res.data.message || "Login failed");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (userType === "customer") {
        await registerCustomer({ name, email, username, password });
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
      } else if (userType === "seller") {
        await registerSeller({ shopName, ownerName, email, username, password });
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setShopName("");
        setOwnerName("");
        setEmail("");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setShopName("");
    setOwnerName("");
    setUsername("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setIsLogin(true);
    resetForm();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      backgroundColor: "#f9fafb"
    }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: "1",
        backgroundColor: "#1f2937",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "48px",
        color: "#ffffff"
      }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}>
          E-Commerce Platform
        </h1>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px",
        backgroundColor: "#f9fafb"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "440px"
        }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "8px",
              textAlign: "left"
            }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p style={{
              color: "#6b7280",
              fontSize: "15px",
              textAlign: "left"
            }}>
              {isLogin 
                ? "Sign in to your account to continue" 
                : "Fill in your details to get started"}
            </p>
          </div>

          {/* User Type Selection */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "24px",
            backgroundColor: "#f3f4f6",
            padding: "6px",
            borderRadius: "8px",
            width: "100%"
          }}>
            {["admin", "customer", "seller"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleUserTypeChange(type)}
                style={{
                  padding: "10px 12px",
                  backgroundColor: userType === type ? "#ffffff" : "transparent",
                  color: userType === type ? "#111827" : "#6b7280",
                  border: userType === type ? "1px solid #e5e7eb" : "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: userType === type ? "600" : "400",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  boxShadow: userType === type ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
                  transition: "all 0.2s",
                  width: "100%"
                }}
              >
                {type === "admin" ? "Admin" : type === "customer" ? "Customer" : "Seller"}
              </button>
            ))}
          </div>

          {/* Login/Register Toggle */}
          {userType !== "admin" && (
            <div style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              backgroundColor: "#f3f4f6",
              padding: "6px",
              borderRadius: "8px",
              width: "100%"
            }}>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  backgroundColor: isLogin ? "#ffffff" : "transparent",
                  color: isLogin ? "#111827" : "#6b7280",
                  border: isLogin ? "1px solid #e5e7eb" : "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: isLogin ? "600" : "400",
                  fontSize: "14px",
                  boxShadow: isLogin ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
                  width: "100%"
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  backgroundColor: !isLogin ? "#ffffff" : "transparent",
                  color: !isLogin ? "#111827" : "#6b7280",
                  border: !isLogin ? "1px solid #e5e7eb" : "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: !isLogin ? "600" : "400",
                  fontSize: "14px",
                  boxShadow: !isLogin ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
                  width: "100%"
                }}
              >
                Sign Up
              </button>
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} style={{ width: "100%" }}>
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "0px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
              padding: "32px",
              width: "100%"
            }}>
              {!isLogin && userType === "customer" && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151"
                    }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151"
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                </>
              )}

              {!isLogin && userType === "seller" && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151"
                    }}>
                      Shop Name
                    </label>
                    <input
                      type="text"
                      placeholder="My Shop"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      required
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151"
                    }}>
                      Owner Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      required
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151"
                    }}>
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="shop@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "15px"
                      }}
                    />
                  </div>
                </>
              )}

              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151"
                }}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "15px"
                  }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151"
                }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "15px"
                  }}
                />
              </div>

              {error && (
                <div style={{
                  marginBottom: "20px",
                  padding: "12px 16px",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
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
                  borderRadius: "8px",
                  color: "#166534",
                  fontSize: "14px"
                }}>
                  {success}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
