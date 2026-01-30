"use client";

import { useRef, useState, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const JobLog = ({ blok }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const entries = blok.entries || [];

  // This useEffect (unchanged)
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
  }, [entries]);

  // This scroll function (unchanged)
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const atEnd =
        container.scrollWidth - container.scrollLeft - container.clientWidth <
        5;
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
          container.scrollTo({
            left: container.scrollWidth,
            behavior: "smooth",
          });
        } else {
          const itemWidth = container.firstElementChild?.clientWidth || 320;
          container.scrollBy({ left: -(itemWidth + 24), behavior: "smooth" });
        }
      }
    }
  };

  // These navigation functions (unchanged)
  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % entries.length);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + entries.length) % entries.length);
  };

  // The main component JSX (unchanged)
  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.section_id}
      className="py-16 bg-transparent border-t-4 border-[#333333] scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        {/* Header (unchanged) */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-8 w-2 bg-[#CEDC00]"></div>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#333333] tracking-tighter">
            {blok.headline || "JOB LOG"}
          </h2>
        </div>

        {/* Carousel Grid (unchanged) */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 mb-8 pb-4 scroll-smooth scrollbar-hide"
          >
            {entries.map((item: any, index: number) => (
              <div
                key={item._uid}
                className="bg-white shadow-lg border border-gray-300 p-4 hover:shadow-xl transition-all group flex-shrink-0 w-80 md:w-96 cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Photo (unchanged) */}
                {item.image?.filename && (
                  <div className="relative w-full mb-3 border border-gray-100 bg-gray-100 aspect-square">
                    <Image
                      src={item.image.filename}
                      alt="Job Photo"
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                {/* Note (unchanged) */}
                {item.tech_note && (
                  <div className="font-mono text-sm text-[#333333]">
                    <p className="leading-relaxed font-medium border-t border-gray-200 pt-2">
                      <span className="text-[#CEDC00] mr-2">▶</span>
                      {item.tech_note}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Carousel Arrows (unchanged) */}
          {canScroll && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => scroll("left")}
                className="bg-[#333333] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors shadow-lg"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                className="bg-[#333333] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors shadow-lg"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- STYLED LIGHTBOX MODAL --- */}
      {/* This is the only part that has changed */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-[#F2F0E9] bg-opacity-95 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)} // Click overlay to close
        >
          {/* Close Button (Styled for light background) */}
          <button
            className="absolute top-4 right-4 text-[#333333] text-5xl font-bold z-[52] hover:opacity-70"
            onClick={() => setSelectedIndex(null)}
          >
            &times;
          </button>

          {/* Prev Button (Styled for light background) */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#333333] bg-white bg-opacity-50 p-2 md:p-4 rounded-full text-3xl md:text-5xl z-[52] hover:bg-opacity-100"
            onClick={showPrevImage}
          >
            &#8249;
          </button>

          {/* Image Container (Styled with border and shadow) */}
          <div
            className="relative w-auto h-auto max-w-full max-h-[90vh] border-4 border-[#333333] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={entries[selectedIndex].image.filename}
              alt="Enlarged job photo"
              width={1200}
              height={1200}
              className="object-contain w-auto h-auto max-w-full max-h-[90vh]"
            />
          </div>

          {/* Next Button (Styled for light background) */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#333333] bg-white bg-opacity-50 p-2 md:p-4 rounded-full text-3xl md:text-5xl z-[52] hover:bg-opacity-100"
            onClick={showNextImage}
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default JobLog;
