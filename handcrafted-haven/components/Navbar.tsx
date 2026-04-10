"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <nav style={navStyle}>
      <h2>Handcrafted Haven</h2>

      <ul style={menuStyle}>
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/products">Products</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <li>
              <button onClick={handleLogout} style={logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>

            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const navStyle: React.CSSProperties = {
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "Arial",
  borderBottom: "1px solid #ddd",
};

const menuStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  gap: "15px",
  padding: 0,
};

const logoutButton: React.CSSProperties = {
  background: "#e53e3e",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Navbar;