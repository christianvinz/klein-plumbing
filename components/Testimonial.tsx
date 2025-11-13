"use client";

import { storyblokEditable } from "@storyblok/react";

const Testimonial = ({ blok }: any) => {
  // --- FIX ---
  // Changed `blok.stars` to `parseInt(blok.stars, 10)`
  // This converts the string "5" into the number 5.
  const starCount = parseInt(blok.stars, 10) || 5;
  const stars = Array(starCount).fill("★");

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 flex flex-col justify-between h-full hover:shadow-xl transition-shadow"
    >
      {/* Stars */}
      <div className="text-yellow-400 text-xl mb-3 tracking-wide">
        {stars.join("")}
      </div>

      {/* Quote - with line clamping for very long quotes */}
      <p className="text-gray-700 italic text-sm md:text-base mb-4 leading-relaxed flex-grow">
        "{blok.quote}"
      </p>

      {/* Author & Google Badge */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
          {blok.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{blok.name}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Google Review</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
