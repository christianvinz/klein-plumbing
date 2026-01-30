"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#333333]/95 shadow-lg py-4 transition-all duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo_white.png"
            alt="Klein Plumbing Logo"
            width={90}
            height={40}
            priority
            className="group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* ... Desktop Links and Call Button logic (keep your current implementation) ... */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Services
            </Link>
            <Link
              href="/service-areas"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Areas
            </Link>
            <Link
              href="/#reviews"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Reviews
            </Link>
            <Link
              href="/#faq"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              FAQ
            </Link>
            <Link
              href="/#joblog"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Job Log
            </Link>
            <Link
              href="/#contact"
              className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/#contact"
              className="bg-[#CEDC00] text-[#333333] px-5 py-2 font-black uppercase text-xs tracking-tighter hover:bg-white transition-all transform hover:scale-105"
            >
              Get Estimate
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white text-2xl"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ... Mobile Menu (keep your current implementation) ... */}
    </nav>
  );
};

export default Navbar;
