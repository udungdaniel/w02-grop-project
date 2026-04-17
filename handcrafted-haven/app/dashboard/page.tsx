"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");

    if (!stored) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);
    setBio(parsedUser.bio || "");
  }, [router]);

  const handleSaveBio = () => {
    if (!user) return;

    const updatedUser = { ...user, bio };

    // update loggedInUser
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // update users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setEditing(false);
  };

  if (!user) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={container}>
      <div style={card}>
        <h1>Seller Dashboard</h1>

        <p>
          Welcome, <strong>{user.name}</strong> 👋
        </p>

        <p>Email: {user.email}</p>

        {/* ✅ BIO SECTION */}
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Bio</h3>

          {editing ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={textarea}
              />

              <div style={{ marginTop: "10px" }}>
                <button onClick={handleSaveBio} style={saveBtn}>
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  style={cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{user.bio || "No bio added yet."}</p>

              <button
                onClick={() => setEditing(true)}
                style={editBtn}
              >
                ✏️ Edit Bio
              </button>
            </>
          )}
        </div>

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

// styles
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

const textarea: React.CSSProperties = {
  width: "100%",
  minHeight: "100px",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const editBtn: React.CSSProperties = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#2c7a7b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveBtn: React.CSSProperties = {
  padding: "8px 12px",
  marginRight: "10px",
  background: "#2f855a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelBtn: React.CSSProperties = {
  padding: "8px 12px",
  background: "#c53030",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};