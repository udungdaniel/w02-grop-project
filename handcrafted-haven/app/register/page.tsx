"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    // Simulate registration success
    setError("");
    setSuccess("Account created successfully!");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create an Account
        </h2>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        {success && <p style={{ color: "green", fontSize: "14px" }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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

          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
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

          <div style={{ marginBottom: "20px" }}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#2c7a7b" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;