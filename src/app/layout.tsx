import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmaSpider · Sistema CRUD",
  description: "Gestión avanzada de inventario farmacéutico con Next.js y Node.js",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="h-full bg-gradient-to-br from-blue-100 via-red-100 to-purple-50">
      <head>
        <meta name="theme-color" content="#e11d48" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`
          min-h-screen
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-gradient-to-br from-blue-100 via-red-100 to-purple-50
          text-blue-950
          selection:bg-red-300 selection:text-blue-900
          flex flex-col
        `}
      >
        <Navbar />
        {/* Spiderverse Vibes */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-7%] left-[-7%] w-[330px] h-[330px] bg-gradient-to-br from-blue-500 via-fuchsia-400 to-yellow-200 opacity-30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-[65%] w-[180px] h-[180px] bg-gradient-to-br from-red-400 via-yellow-100 to-blue-200 opacity-20 rounded-full blur-2xl" />
          <div className="absolute bottom-[-9%] right-[-9%] w-[270px] h-[270px] bg-gradient-to-tr from-violet-300 via-amber-100 to-pink-200 opacity-20 rounded-full blur-2xl" />
        </div>
        <main className="relative z-10 flex-1 px-2 sm:px-6 py-6 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}