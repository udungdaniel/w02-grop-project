import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade crafts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
