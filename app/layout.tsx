import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CursorProvider, Cursor, CursorTrail } from "@/components/cursor";
import AudioController from "@/components/AudioController"; // 👈 import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayaan Syed",
  description: "NEXTjs Modern Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CursorProvider>
          {/* Custom Cursor */}
          <Cursor />
          <CursorTrail />

          {/* Page Content */}
          {children}

          {/* Background Audio Controller */}
          <AudioController />
        </CursorProvider>
      </body>
    </html>
  );
}
