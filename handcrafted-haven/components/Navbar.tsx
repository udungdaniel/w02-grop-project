"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear ALL auth data (important fix)
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInSellerId");

    setUser(null);

    router.push("/");
  };

  const isActive = (path: string) =>
    pathname === path ? activeLink : undefined;

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <h2 style={{ margin: 0 }}>Handcrafted Haven</h2>

      <ul style={menuStyle}>
        <li>
          <Link href="/" style={isActive("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/products" style={isActive("/products")}>
            Products
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/dashboard" style={isActive("/dashboard")}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/seller" style={isActive("/seller")}>
                Sellers
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                style={logoutButton}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" style={isActive("/login")}>
                Login
              </Link>
            </li>

            <li>
              <Link href="/register" style={isActive("/register")}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

// styles
const navStyle: React.CSSProperties = {
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "Arial",
  borderBottom: "1px solid #ddd",
  flexWrap: "wrap",
};

const menuStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  gap: "15px",
  padding: 0,
  margin: 0,
  alignItems: "center",
};

// Active link styling
const activeLink: React.CSSProperties = {
  fontWeight: "bold",
  color: "#2c7a7b",
  textDecoration: "underline",
};

const logoutButton: React.CSSProperties = {
  background: "#e53e3e",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};