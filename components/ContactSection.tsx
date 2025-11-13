import { storyblokEditable } from "@storyblok/react";
import ContactForm from "./ContactForm";

const ContactSection = ({ blok }: any) => {
  return (
    <section 
      id="contact" 
      {...storyblokEditable(blok)} 
      // --- THIS IS THE FIX ---
      // Added 'scroll-mt-24' to offset for the fixed navbar
      className="py-16 bg-white scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <div>
            <h2 className="text-4xl font-black uppercase text-[#333333] mb-6 tracking-tighter">
              {blok.headline || "Ready to Schedule?"}
            </h2>
            
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {blok.text || "Whether it's a simple repair or a new build, we're here to help. Contact us today for a free estimate."}
            </p>

            {/* FINALIZED DISCLAIMER */}
            <div className="mb-8 p-4 bg-gray-50 border-l-4 border-[#CEDC00] text-sm text-gray-600">
              <p>
                <strong>Service Area Policy:</strong> Free estimates are available for local projects (Jefferson & Fort Atkinson). 
                For out-of-area jobs, a standard trip charge applies, which is <strong>credited to the completed invoice if the estimate is accepted</strong>.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#CEDC00] flex items-center justify-center rounded-full text-2xl">
                  📞
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-gray-400 tracking-wider">Phone</p>
                  <a href="tel:9207283034" className="text-2xl font-bold text-[#333333] hover:text-[#CEDC00] transition-colors">
                    920-728-3034
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#CEDC00] flex items-center justify-center rounded-full text-2xl">
                  ✉️
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-gray-400 tracking-wider">Email</p>
                  <a href="mailto:service@klein.pluming" className="text-lg font-bold text-[#333333] hover:text-[#CEDC00] transition-colors">
                    Service@klein.plumbing
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="bg-[#F2F0E9] p-8 rounded-xl shadow-lg border-t-4 border-[#CEDC00]">
             <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
