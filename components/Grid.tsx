"use client";

import { useRef, useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

// This is the old, simple Grid.tsx, with ONLY the testimonial carousel
const Grid = ({ blok }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  // Check for testimonials
  const hasTestimonials = blok.columns?.some((col: any) => 
    col.component === "testimonial" || col.component === "Testimonial"
  );
  
  const allItems = blok.columns || [];

  // Carousel scrolling logic (unchanged)
  useEffect(() => {
    if (!hasTestimonials) return; 
    
    const checkScrollable = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        setCanScroll(isScrollable);
      }
    };
    const timer = setTimeout(checkScrollable, 100);
    window.addEventListener("resize", checkScrollable);
    return () => {
      window.removeEventListener("resize", checkScrollable);
      clearTimeout(timer);
    };
  }, [allItems, hasTestimonials]);

  // Looping scroll function (unchanged)
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const atEnd = container.scrollWidth - container.scrollLeft - container.clientWidth < 5;
      const atStart = container.scrollLeft < 5;
      if (direction === "right") {
        if (atEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const itemWidth = container.firstElementChild?.clientWidth || 320;
          container.scrollBy({ left: itemWidth + 24, behavior: "smooth" });
        }
      } else {
        if (atStart) {
          container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
        } else {
          const itemWidth = container.firstElementChild?.clientWidth || 320;
          container.scrollBy({ left: -(itemWidth + 24), behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div 
      {...storyblokEditable(blok)} 
      id={blok.section_id}
      className="container mx-auto px-4 py-12 scroll-mt-24"
    >
      {/* 1. Testimonial Carousel (unchanged) */}
      {hasTestimonials ? (
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 mb-8 pb-4 scroll-smooth scrollbar-hide"
          >
            {allItems?.map((nestedBlok: any) => (
              <div key={nestedBlok._uid} className="flex-shrink-0 w-80 md:w-96">
                <StoryblokComponent blok={nestedBlok} />
              </div>
            ))}
          </div>
          {canScroll && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => scroll("left")} className="bg-[#333333] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors shadow-lg">←</button>
              <button onClick={() => scroll("right")} className="bg-[#333333] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors shadow-lg">→</button>
            </div>
          )}
        </div>
      ) : (

      // --- 2. THIS IS THE FIX for Service Card Layout ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.columns?.map((nestedBlok: any) => (
            <div key={nestedBlok._uid}>
              <StoryblokComponent blok={nestedBlok} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;
