/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";

const Hero = ({ blok }: any) => {
  return (
    <section
      id="home"
      {...storyblokEditable(blok)}
      /* Reduced pb-24 to pb-12 to bring the button and badges closer */
      className="relative w-full bg-[#333333] pt-12 md:pt-20 pb-12 md:pb-16 px-6 text-center text-white overflow-hidden"
    >
      {/* 1. THE IMAGE LAYER */}
      {blok.background_image?.filename && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale brightness-[0.35]"
          style={{
            backgroundImage: `url(${
              blok.background_image.filename.startsWith("http")
                ? blok.background_image.filename
                : `https:${blok.background_image.filename}`
            })`,
          }}
        />
      )}

      {/* 2. THE TINT LAYER (Outside the image div to ensure it always shows) */}
      <div className="absolute inset-0 bg-[#333333]/60 z-0" />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* HEADING - Removed 'italic' class */}
        <h1 className="font-heading text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-4 drop-shadow-2xl">
          {blok.headline || "Klein Plumbing"}
        </h1>

        <div className="h-1.5 w-24 bg-[#CEDC00] mb-6 shadow-sm"></div>

        <p className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-10 text-gray-100">
          {blok.subheadline || "Repairs • Remodeling • New Build"}
        </p>

        <a
          href="tel:9207283034"
          className="bg-[#CEDC00] text-black font-black text-xl md:text-2xl px-12 py-5 hover:bg-white transition-all transform hover:scale-105 uppercase shadow-xl"
        >
          Call 920-728-3034
        </a>
      </div>
    </section>
  );
};

export default Hero;
