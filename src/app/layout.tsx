import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Scholar | Next-Gen Learning Dashboard",
  description: "A futuristic, hardware-accelerated learning environment with real-time course analytics, student streak tracking, and interactive bento widgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative font-inter">
        {/* Ambient background layers */}
        <div className="grain-overlay" />
        <div className="mesh-gradient-bg" />
        
        {/* Content wrapper */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
