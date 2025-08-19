import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  TanstackProvider from "./providers/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandbox",
  description: "think outside of the box",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <header className="flex justify-center bg-blue-300">
        <nav>
          <ul className="flex mt-4 text-xl p-4">
            <li className="mr-4 font-medium"><a href="./">Home</a></li>
            <li className="mr-4 font-medium"><a href="./sample">Javagram</a></li>
            <li className="mr-4 font-medium"><a href="#">About</a></li>
            <li className="mr-4 font-medium"><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <TanstackProvider>
        {children}
      </TanstackProvider>
        
      </body>
    </html>
  );
}
