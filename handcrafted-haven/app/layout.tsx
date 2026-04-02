import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade crafts",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}