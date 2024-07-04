import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {neobrutalism} from "@clerk/themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight:['400','500','600','700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "We2gather Events",
  description: "Event management application for WeTogether",
  icons:{
    icon: '/assets/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider appearance={{
        baseTheme: neobrutalism
      }}>
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
      </ClerkProvider>
  );
}
