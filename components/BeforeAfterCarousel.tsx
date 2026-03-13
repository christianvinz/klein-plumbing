/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const BeforeAfterCarousel = ({ blok }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = blok.slides || [];

  // Extract valid slides - try multiple possible structures
  const validSlides = slides
    .map((slide: any) => {
      // Structure 1: Direct properties (homepage style)
      if (slide.before_image?.filename && slide.after_image?.filename) {
        return {
          before_image: slide.before_image,
          after_image: slide.after_image,
          label: slide.label,
        };
      }

      // Structure 2: Nested "before" and "after" properties
      if (slide.before?.filename && slide.after?.filename) {
        return {
          before_image: slide.before,
          after_image: slide.after,
          label: slide.label,
        };
      }

      // Structure 3: It's a component block - extract from nested properties
      if (slide.component === "before_after") {
        const beforeImg =
          slide.before_image ||
          slide.before ||
          slide.Before ||
          slide.Before_Image;
        const afterImg =
          slide.after_image || slide.after || slide.After || slide.After_Image;

        if (beforeImg?.filename && afterImg?.filename) {
          return {
            before_image: beforeImg,
            after_image: afterImg,
            label: slide.label || slide.Label,
          };
        }
      }

      return null;
    })
    .filter((slide: any) => slide !== null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === validSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? validSlides.length - 1 : prev - 1));
  };

  // Don't render if no valid slides
  if (validSlides.length === 0) return null;

  const currentSlide = validSlides[currentIndex];

  return (
    <section {...storyblokEditable(blok)} className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#333333] mb-4">
            {blok.headline || "TRANSFORMATIONS"}
          </h2>
          <div className="h-1 w-24 bg-[#CEDC00] mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="h-[400px] md:h-[600px] rounded-none border-4 border-[#333333] shadow-2xl overflow-hidden relative bg-gray-200">
            <ReactCompareSlider
              key={currentIndex}
              itemOne={
                <ReactCompareSliderImage
                  src={currentSlide.before_image.filename}
                  alt="Before"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={currentSlide.after_image.filename}
                  alt="After"
                />
              }
              style={{ height: "100%", width: "100%" }}
            />
            {currentSlide.label && (
              <div className="absolute bottom-0 left-0 bg-[#CEDC00] text-[#333333] px-6 py-2 font-bold uppercase tracking-wider z-10">
                {currentSlide.label}
              </div>
            )}
          </div>

          {validSlides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-[#333333] text-white w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-[#333333] text-white w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-[#CEDC00] hover:text-black transition-colors"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterCarousel;
