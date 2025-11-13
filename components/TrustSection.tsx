import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";

const TrustSection = ({ blok }: any) => {
  return (
    <section 
      {...storyblokEditable(blok)} 
      className="bg-[#333333] py-12 border-t-4 border-[#CEDC00]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-center">
          {blok.badges?.map((nestedBlok: any) => (
            <div key={nestedBlok._uid} className="flex flex-col items-center gap-3 group">
              {/* Icon Container - INCREASED SIZE to w-24 h-24 */}
              {nestedBlok.icon?.filename && (
                <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src={nestedBlok.icon.filename} 
                    alt={nestedBlok.text} 
                    fill
                    className="object-contain" // REMOVED 'invert' so colors show correctly
                  />
                </div>
              )}
              
              {/* Text */}
              <span className="text-white font-bold uppercase tracking-wider text-sm md:text-base">
                {nestedBlok.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
