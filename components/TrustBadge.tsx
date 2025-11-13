"use client";

import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const TrustBadge = ({ blok }: any) => {
  // 'blok' is the 'trust_badge' component from Storyblok
  // It should have an 'icon' field and a 'text' field
  return (
    <div 
      {...storyblokEditable(blok)} 
      className="flex flex-col items-center justify-center h-full w-full"
    >
      {/* Icon Container */}
      {blok.icon?.filename && (
        <div className="relative w-full h-full transition-transform duration-300 hover:scale-110">
          <Image 
            src={blok.icon.filename} 
            alt={blok.text || "Trust Badge"} 
            fill
            className="object-contain" // Renders the badge image
          />
        </div>
      )}
      
      {/* Optional: Text below badge (if you add a 'text' field) */}
      {blok.text && (
        <span className="text-white font-bold uppercase tracking-wider text-xs pt-2">
          {blok.text}
        </span>
      )}
    </div>
  );
};

export default TrustBadge;
