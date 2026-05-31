import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter to export a CSS variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Taskforge",
  description: "Modern task management platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add the font variable to the html tag
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="bg-background text-foreground font-sans min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
