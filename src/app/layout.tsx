import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  TanstackProvider from "./providers/TanstackProvider";
import { FaUser } from "react-icons/fa";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MySpace",
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

      <header className=" sticky z-50 bg-blue-300 p-4 w-100% h-20">
        <nav className="">
          
          <ul className=" text-2xl font-medium"> 
              <div className="flex font-bold text-5xl -mb-8 ml-12">
                <a href="/" ><span className=" transition-all duration-300 tracking-normal hover:tracking-[0.4em]">MySpace</span></a>
              </div>
              <div className="flex justify-end">
                <li className="mr-15 -mt-1 hover:text-white"><a href="/">Home</a></li>
                <li className="mr-15 -mt-1 hover:text-white"><a href="/rant">Rant</a></li>
                <li className="mr-15 -mt-1 hover:text-white"><a href="#">About</a></li>
                <li className="mr-15 -mt-1 hover:text-white"><a href="#">Contact</a></li>
                <li className="mr-15 text-2xl "><a href="/auth/login"><FaUser /></a></li>
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
