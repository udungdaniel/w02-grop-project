"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("seller"); // default role

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();
    const normalizedConfirmPassword = confirmPassword.trim();

    if (!normalizedName || !normalizedEmail || !normalizedPassword || !normalizedConfirmPassword) {
      setError("Please fill in all fields"); return;
    }

    if (normalizedPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (normalizedPassword !== normalizedConfirmPassword) { setError("Passwords do not match"); return; }

    let existingUsers = [];
    try { existingUsers = JSON.parse(localStorage.getItem("users") || "[]"); }
    catch (err) { console.error(err); setError("Something went wrong"); return; }

    if (existingUsers.some((u: any) => u.email === normalizedEmail)) {
      setError("User already exists!"); return;
    }

    const newUser = { name: normalizedName, email: normalizedEmail, password: normalizedPassword, role };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    setSuccess("Registration successful! Redirecting...");

    setTimeout(() => router.push("/login"), 1500);
    setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Create Account</h2>
        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} style={inputStyle} required/>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={inputStyle} required/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={inputStyle} required/>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={inputStyle} required/>

          <select value={role} onChange={(e)=>setRole(e.target.value)} style={inputStyle}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <button type="submit" style={buttonStyle}>Register</button>
        </form>

        <p style={{marginTop:"15px", textAlign:"center"}}>
          Already have an account? <a href="/login" style={{color:"#2c7a7b"}}>Login</a>
        </p>
      </div>
    </div>
  );
};

// Styles
const container: React.CSSProperties = { display:"flex", justifyContent:"center", alignItems:"center", height:"90vh", fontFamily:"Arial" };
const card: React.CSSProperties = { width:"350px", padding:"30px", border:"1px solid #ddd", borderRadius:"8px", boxShadow:"0 2px 10px rgba(0,0,0,0.1)", background:"#fff" };
const inputStyle: React.CSSProperties = { width:"100%", padding:"8px", marginTop:"10px", marginBottom:"10px", border:"1px solid #ccc", borderRadius:"4px" };
const buttonStyle: React.CSSProperties = { width:"100%", padding:"10px", background:"#2c7a7b", color:"white", border:"none", borderRadius:"5px", cursor:"pointer" };
const errorStyle: React.CSSProperties = { color:"red", fontSize:"14px" };
const successStyle: React.CSSProperties = { color:"green", fontSize:"14px" };

export default RegisterPage;