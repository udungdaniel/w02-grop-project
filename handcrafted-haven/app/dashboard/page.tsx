"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");

    if (!stored) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={container}>
      <div style={card}>
        <h1>Seller Dashboard</h1>

        <p>
          Welcome, <strong>{user.name}</strong> 👋
        </p>

        <p>Email: {user.email}</p>

        <div style={buttonGroup}>
          <button
            style={button}
            onClick={() => router.push("/dashboard/products")}
          >
            Manage Products
          </button>
        </div>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "80px",
  fontFamily: "Arial",
  padding: "20px",
};

const card: React.CSSProperties = {
  width: "400px",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  background: "#fff",
  textAlign: "center",
};

const buttonGroup: React.CSSProperties = {
  marginTop: "20px",
};

const button: React.CSSProperties = {
  padding: "10px 15px",
  background: "#2c7a7b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};