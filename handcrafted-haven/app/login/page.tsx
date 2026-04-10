"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();
    if (!normalizedEmail || !normalizedPassword) { setError("Please fill all fields"); setLoading(false); return; }

    let users: any[] = [];
    try { users = JSON.parse(localStorage.getItem("users") || "[]"); }
    catch(err) { setError("Something went wrong"); setLoading(false); return; }

    const user = users.find(u => u.email === normalizedEmail && u.password === normalizedPassword && u.role==="seller");
    if (!user) { setError("Invalid email or password"); setLoading(false); return; }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setTimeout(()=>router.push("/dashboard"), 500);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login to Handcrafted Haven</h2>
        {error && <p style={{color:"red", fontSize:"14px"}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} required/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle} required/>
          <button type="submit" style={buttonStyle}>{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p style={{marginTop:"15px", textAlign:"center"}}>Don't have an account? <a href="/register" style={{color:"#2c7a7b"}}>Register</a></p>
      </div>
    </div>
  );
};

const container: React.CSSProperties = { display:"flex", justifyContent:"center", alignItems:"center", height:"90vh", fontFamily:"Arial" };
const card: React.CSSProperties = { width:"350px", padding:"30px", border:"1px solid #ddd", borderRadius:"8px", boxShadow:"0 2px 10px rgba(0,0,0,0.1)", background:"#fff" };
const inputStyle: React.CSSProperties = { width:"100%", padding:"8px", marginTop:"10px", marginBottom:"10px", border:"1px solid #ccc", borderRadius:"4px" };
const buttonStyle: React.CSSProperties = { width:"100%", padding:"10px", background:"#2c7a7b", color:"white", border:"none", borderRadius:"5px", cursor:"pointer" };

export default LoginPage;