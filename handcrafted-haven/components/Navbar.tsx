// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav>
      <h2>Handcrafted Haven</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;