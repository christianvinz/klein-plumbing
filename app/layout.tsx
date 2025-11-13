import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // <--- Import the font
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <--- 1. Import Footer
// Make sure this import path is correct for your folder structure
import StoryblokProvider from "../components/StoryblokProvider"; 

// Configure the font
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"] // Load normal, bold, and black weights
});

export const metadata: Metadata = {
  title: "Klein Plumbing",
  // Updated description to match the banner
  description: "Repairs - Remodeling - New Build", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        <StoryblokProvider>
          {children}
        </StoryblokProvider>
        <Footer /> {/* <--- 2. Add Footer Here */}
      </body>
    </html>
  );
}
