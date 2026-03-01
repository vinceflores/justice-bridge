import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JusticeBridge",
  description: "Summarize US Legal Documents",
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
        <nav className="flex justify-between items-center mx-3 p-2">
            <h1 className="lg:text-2xl font-bold">JusticeBridge</h1>
            {/* <div className="space-x-2">
                <Button> Log in </Button>
                <Button> Sign up </Button>
            </div> */}
        </nav>
        {children}
      </body>
    </html>
  );
}
