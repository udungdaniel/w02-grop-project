import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handmade crafts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

      </body>
    </html>
  );
}