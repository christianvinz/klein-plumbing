"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll to apply solid background color and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#333333] shadow-lg py-4" : "bg-[#333333] md:bg-[#333333] py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo Area - Goes to homepage */}
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

        {/* --- This section is new/re-organized --- */}
        {/* Right-side container for links, button, and toggle */}
        <div className="flex items-center gap-6">

          {/* Desktop Links */}
          {/* UPDATED: Changed 'md:flex' to 'lg:flex' */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              Home
            </Link>
            <Link href="/#services" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              Services
            </Link>
            <Link href="/#reviews" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              Reviews
            </Link>
            <Link href="/#faq" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              FAQ
            </Link>
            <Link href="/#joblog" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              Job Log
            </Link>        
            <Link href="/#contact" className="text-white hover:text-[#CEDC00] font-medium uppercase text-sm tracking-wide">
              Contact
            </Link>
          </div>
          
          {/* Call Button */}
          {/* UPDATED: Pulled out of links div, changed to 'md:block' */}
          <a
            href="tel:9207283034"
            className="hidden md:block bg-[#CEDC00] text-[#333333] px-6 py-2 font-bold uppercase text-sm tracking-wider hover:bg-white transition-colors"
          >
            920-728-3034
          </a>

          {/* Mobile Menu Toggle and Dropdown */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            // UPDATED: Changed 'md:hidden' to 'lg:hidden'
            className="lg:hidden text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        // UPDATED: Changed 'md:hidden' to 'lg:hidden'
        <div className="absolute top-full left-0 w-full bg-[#333333] border-t border-gray-700 p-6 lg:hidden flex flex-col gap-6 shadow-2xl">
          <Link href="/" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/#services" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            Services
          </Link>
          <Link href="/#reviews" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            Reviews
          </Link>
          <Link href="/#faq" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            FAQ
          </Link>
          <Link href="/#joblog" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            Job Log
          </Link>
          <Link href="/#contact" className="text-white text-lg font-bold uppercase" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <a
            href="tel:9207283034"
            className="bg-[#CEDC00] text-[#333333] px-6 py-3 font-bold uppercase text-center tracking-wider"
          >
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
