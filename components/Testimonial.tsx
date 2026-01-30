"use client";

import { storyblokEditable, SbBlokData } from "@storyblok/react";

// interface to solve the 'any' and 'Index signature' errors
interface TestimonialBlok extends SbBlokData {
  stars: string | number;
  quote: string;
  name: string;
}

const Testimonial = ({ blok }: { blok: TestimonialBlok }) => {
  // Solve the unescaped entities error using &quot;
  const starCount =
    typeof blok.stars === "string" ? parseInt(blok.stars, 10) : blok.stars || 5;

  // Use a simple array to solve 'unused variables' error
  const starsArray = Array.from({ length: starCount as number });

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-white/20 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
    >
      <div className="text-[#CEDC00] text-2xl mb-4 flex gap-0.5">
        {starsArray.map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      <p className="text-[#333333] italic text-lg mb-8 leading-relaxed grow">
        &quot;{blok.quote}&quot;
      </p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
        <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center text-[#CEDC00] font-black text-xl">
          {blok.name?.charAt(0) || "K"}
        </div>
        <div>
          <p className="font-black text-[#333333] text-base leading-none mb-1">
            {blok.name}
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Verified Google Review
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
