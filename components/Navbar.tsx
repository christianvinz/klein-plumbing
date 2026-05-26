"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${isScrolled || !isHome ? 'bg-[#333333]/95 shadow-lg' : 'bg-transparent'}`}>
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
              href="/services"
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
            className="lg:hidden text-white text-3xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Fixed Logic */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#333333] border-t border-white/10 p-6 lg:hidden flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4">
          {([
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Areas", href: "/service-areas" },
            { label: "Reviews", href: "/#reviews" },
            { label: "FAQ", href: "/#faq" },
            { label: "Job Log", href: "/#joblog" },
            { label: "Contact", href: "/#contact" },
          ] as { label: string; href: string }[]).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white text-lg font-bold uppercase border-b border-white/5 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-2">
            <Link
              href="/#contact"
              className="bg-[#CEDC00] text-[#333333] px-6 py-4 font-black uppercase text-center text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:9207283034"
              className="text-white text-center font-bold text-lg border border-white/20 py-3"
            >
              Call 920-728-3034
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
