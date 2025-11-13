import { storyblokEditable } from "@storyblok/react";

const Hero = ({ blok }: any) => {
  return (
    <section 
      id="home"
      {...storyblokEditable(blok)} 
      // --- REMOVED z-20 and border-b ---
      className="relative h-[600px] flex items-center justify-center text-center text-white bg-[#333333]"
    >
      {/* Background Image Layer */}
      {blok.background_image?.filename && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blok.background_image.filename})` }}
        >
          {/* Dark Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/70" /> 
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 px-4 max-w-5xl mx-auto">
        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 uppercase drop-shadow-md">
          {blok.headline || "Klein Plumbing"}
        </h1>
        
        {/* Green Divider Line */}
        <div className="h-1 w-32 bg-[#CEDC00] mx-auto mb-6"></div>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl font-medium tracking-widest uppercase mb-8 drop-shadow-sm">
          {blok.subheadline || "Repairs • Remodeling • New Build"}
        </p>
        
        {/* Call Button */}
        <a 
          href="tel:9207283034"
          className="inline-block bg-[#CEDC00] text-[#333333] font-bold text-xl px-8 py-4 rounded-none hover:bg-white transition-colors uppercase tracking-wide"
        >
          Call 920-728-3034
        </a>
      </div>
    </section>
  );
};

export default Hero;
