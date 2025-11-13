import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link"; 

const ServiceCard = ({ blok }: any) => {
  const href = blok.custom_link 
    ? blok.custom_link
    : `/services/${blok.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;

  return (
    <Link 
        href={href}
        className="block w-full h-full group"
    >
      <div 
        {...storyblokEditable(blok)} 
        className="bg-white p-6 rounded-md shadow-md border border-gray-200 hover:shadow-xl transition-all h-full flex flex-col"
      >
        {/* Header: Icon and Title on the same line */}
        <div className="flex items-start gap-4 mb-3 pb-3 border-b border-[#F2F0E9]">
          
          {blok.icon?.filename && (
            <div className="relative w-10 h-10 flex-shrink-0 mt-1">
              <Image 
                src={blok.icon.filename} 
                alt={blok.title} 
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-black text-[#333333] uppercase tracking-tight leading-tight">
            {blok.title}
          </h3>
        </div>
        
        {/* --- THIS IS THE FIX for Text Overflow --- */}
        <p 
          className="text-[#555555] text-sm leading-relaxed mb-3"
          // This inline style will force the text clamp
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {blok.summary}
        </p>
        
        {/* Read More Link */}
        <span className="mt-auto block font-bold text-[#CEDC00] uppercase text-xs tracking-widest group-hover:underline">
          {blok.custom_link ? "View All Services" : "Read More"} →
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
