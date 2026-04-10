import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "40px 20px",
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      {/* Company Info */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>Handcrafted Haven</h2>
        <p style={{ margin: 0 }}>Quality handmade products from skilled artisans.</p>
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link href="/products" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>Products</Link>
        <Link href="/about" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>About</Link>
        <Link href="/contact" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>Contact</Link>
      </div>

      {/* Social Links */}
      <div style={{ marginBottom: "20px" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#fff" }}>Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#fff" }}>Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "#fff" }}>Twitter</a>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: "14px", color: "#aaa" }}>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
    </footer>
  );
};

export default Footer;