import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade crafts",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
