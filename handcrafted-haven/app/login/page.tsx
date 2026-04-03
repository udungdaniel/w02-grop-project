"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Example authentication (replace with real auth later)
    if (email === "user@example.com" && password === "password") {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login to Handcrafted Haven
        </h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#2c7a7b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#2c7a7b" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;