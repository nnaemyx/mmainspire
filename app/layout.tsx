import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MmaInspire — Luxury Nigerian Fashion",
  description:
    "Premium bespoke fashion house based in Onitsha, Anambra State. Specializing in Traditional Wear, Asoebi and Wedding Gowns.",
  keywords: ["Nigerian fashion", "traditional wear", "asoebi", "wedding gowns", "bespoke fashion", "Onitsha"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
