"use client";

import { useRef, useState, useEffect } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const BadgeBar = ({ blok }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [canScroll, setCanScroll] = useState(false);
  const allItems = blok.columns || [];

  useEffect(() => {
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
  }, [allItems]);

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
          const itemWidth = container.firstElementChild?.clientWidth || 128;
          const gapWidth = 32; 
          container.scrollBy({ left: itemWidth + gapWidth, behavior: "smooth" });
        }
      } else {
        if (atStart) {
          container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
        } else {
          const itemWidth = container.firstElementChild?.clientWidth || 128;
          const gapWidth = 32;
          container.scrollBy({ left: -(itemWidth + gapWidth), behavior: "smooth" });
        }
      }
    }
  };
  
  // --- THIS IS THE FIX ---
  // Conditionally set the 'justify' class
  const scrollContainerClasses = [
    "flex",
    "overflow-x-auto",
    "gap-8",
    "md:gap-12",
    "items-center",
    "scroll-smooth",
    "scrollbar-hide",
    "py-4",
    canScroll ? "justify-start" : "justify-center" // Center if not scrollable
  ].join(" ");

  return (
    <div 
      {...storyblokEditable(blok)} 
      className="py-4" // This is inside the dark wrapper from Page.tsx
      id={blok.section_id}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className={scrollContainerClasses} // Use our new conditional classes
          >
            {blok.columns?.map((nestedBlok: any) => (
              <div key={nestedBlok._uid} className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
                <StoryblokComponent blok={nestedBlok} /> 
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          {canScroll && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => scroll("left")}
                className="bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-white/30 transition-colors"
                aria-label="Previous badges"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                className="bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-white/30 transition-colors"
                aria-label="Next badges"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeBar;
