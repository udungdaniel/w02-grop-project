"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("seller");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();
    const normalizedConfirmPassword = confirmPassword.trim();

    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedPassword ||
      !normalizedConfirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (normalizedPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (normalizedPassword !== normalizedConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (existingUsers.some((u: any) => u.email === normalizedEmail)) {
      setError("User already exists!");
      return;
    }

    // 🔥 IMPORTANT: SINGLE SOURCE OF TRUTH ID (STRING ONLY)
    const userId = Date.now().toString();

    const newUser = {
      id: userId,
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
      role,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // ✅ LOGIN SESSION
    localStorage.setItem("user", JSON.stringify(newUser));

    // 🔥 IF SELLER → CREATE SELLER PROFILE WITH SAME ID
    if (role === "seller") {
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");

      const newSeller = {
        id: userId,
        name: normalizedName,
        bio: "New seller on Handcrafted Haven",
        image: "/default-avatar.png",
      };

      sellers.push(newSeller);
      localStorage.setItem("sellers", JSON.stringify(sellers));
    }

    setSuccess("Registration successful! Redirecting...");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Create Account</h2>

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

/* styles */
const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  fontFamily: "Arial",
};

const card: React.CSSProperties = {
  width: "350px",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fff",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  background: "#2c7a7b",
  color: "white",
  border: "none",
};

const errorStyle: React.CSSProperties = {
  color: "red",
};

const successStyle: React.CSSProperties = {
  color: "green",
};