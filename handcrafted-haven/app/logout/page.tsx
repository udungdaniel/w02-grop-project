"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove saved user session
    localStorage.removeItem("user");

    // Redirect to login page
    router.push("/login");
  }, [router]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Logging out...</h1>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default LogoutPage;