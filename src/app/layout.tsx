import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "DJ NevaMisaBeat | Professional DJ & Music Producer",
  description:
    "Book DJ NevaMisaBeat for your next event — weddings, clubs, corporate events, and private parties. Explore mixes, gear, and live sets.",
  keywords: ["DJ", "DJ NevaMisaBeat", "book a DJ", "wedding DJ", "club DJ", "event DJ", "music producer"],
  openGraph: {
    title: "DJ NevaMisaBeat | Professional DJ & Music Producer",
    description: "Book DJ NevaMisaBeat for your next event.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
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
              border: "1px solid rgba(201, 168, 76, 0.3)",
              color: "#e2e8f0",
            },
          }}
        />
      </body>
    </html>
  );
}
