import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8 border-t-4 border-[#CEDC00]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div>
            {/* Logo Image */}
            <div className="mb-4">
              <Image 
                src="/logo_white.png" 
                alt="Klein Plumbing Logo" 
                width={90} 
                height={40} 
              />
            </div>
            
            {/* Branding Text */}
            <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
              KLEIN PLUMBING, LLC
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin. Quality work, fair prices.
            </p>
            <div className="space-y-2">
              <a href="tel:9207283034" className="block text-xl font-bold hover:text-[#CEDC00] transition-colors">
                📞 920-728-3034
              </a>
              <a href="mailto:service@klein.plumbing" className="block text-gray-300 hover:text-[#CEDC00] transition-colors">
                ✉️ Service@klein.plumbing
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold uppercase mb-6 border-b-2 border-[#CEDC00] inline-block pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-[#CEDC00] transition-colors">Home</Link></li>
              <li><Link href="/#services" className="hover:text-[#CEDC00] transition-colors">Services</Link></li>
              <li><Link href="/#reviews" className="hover:text-[#CEDC00] transition-colors">Reviews</Link></li>
              <li><Link href="/#contact" className="hover:text-[#CEDC00] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Service Areas (SEO Gold) */}
          <div>
            <h3 className="text-xl font-bold uppercase mb-6 border-b-2 border-[#CEDC00] inline-block pb-2">
              Serving Southeast WI
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span className="bg-[#444] px-3 py-1 rounded-full">Jefferson</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Fort Atkinson</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Watertown</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Johnson Creek</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Lake Mills</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Cambridge</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Sullivan</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Helenville</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Oconomowoc</span>
              <span className="bg-[#444] px-3 py-1 rounded-full">Pewaukee</span>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Klein Plumbing LLC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
