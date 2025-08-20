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

      <header className=" bg-blue-300 p-4 w-100% h-auto">
        <nav className="">
          
          <ul className=" text-2xl font-medium">
              <div className="flex font-bold text-5xl -mb-8 ml-10">
                <a href="./" >MySpace</a>
              </div>
              <div className="flex justify-end">
                <li className="mr-10  "><a href="./">Home</a></li>
                <li className="mr-10  "><a href="./sample">Nextgram</a></li>
                <li className="mr-10 "><a href="#">About</a></li>
                <li className="mr-10 "><a href="#">Contact</a></li>
              </div>
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
