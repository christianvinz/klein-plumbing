"use client";
import { storyblokEditable } from "@storyblok/react";
import React, { useState } from 'react';

// NOTE: Simple icons using characters instead of external libraries
const PlusIcon = () => <span className="text-2xl font-normal">+</span>;
const MinusIcon = () => <span className="text-2xl font-normal">−</span>;


const FAQAccordion = ({ blok }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      {...storyblokEditable(blok)} 
      id={blok.section_id} // <--- FIX: This is where the NAV link will point
      className="py-16 bg-white scroll-mt-24"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#333333] tracking-tighter mb-4">
            {blok.headline || "Frequently Asked Questions"}
          </h2>
          <div className="h-1 w-24 bg-[#CEDC00] mx-auto"></div>
        </div>

        {/* Accordion List */}
        <div className="border-t border-gray-200">
          {blok.items?.map((item: any, index: number) => (
            <div key={item._uid} className="border-b border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="flex justify-between items-center w-full py-4 text-left font-bold text-lg text-[#333333] hover:text-[#CEDC00] transition-colors"
              >
                {item.question}
                <span className="text-[#CEDC00]">
                  {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
              
              {/* Answer Content */}
              {openIndex === index && (
                <div className="pb-4 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
