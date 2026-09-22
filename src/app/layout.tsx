import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJ Axiom | Professional DJ & Music Producer",
  description:
    "Book DJ Axiom for your next event — weddings, clubs, corporate events, and private parties. Explore mixes, gear, and live sets.",
  keywords: ["DJ", "DJ Axiom", "book a DJ", "wedding DJ", "club DJ", "event DJ", "music producer"],
  openGraph: {
    title: "DJ Axiom | Professional DJ & Music Producer",
    description: "Book DJ Axiom for your next event.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-dark-950 text-slate-100`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(11, 22, 40, 0.95)",
              border: "1px solid rgba(6, 214, 245, 0.3)",
              color: "#e2e8f0",
            },
          }}
        />
      </body>
    </html>
  );
}
