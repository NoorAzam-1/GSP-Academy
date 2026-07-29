import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "GSP Academy - Leads Management System",
  description: "Manage leads, payments, and staff for GSP Academy & Entrance",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
