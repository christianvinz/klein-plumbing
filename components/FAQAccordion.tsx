/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { storyblokEditable } from "@storyblok/react";
import React, { useState } from "react";
import Script from "next/script";
import { SITE } from "@/lib/seo-utils";

// Proper interfaces to resolve ESLint 'any' errors
interface FAQItem {
  _uid: string;
  question: string;
  answer: string;
}

interface FAQBlok {
  _uid: string;
  section_id?: string;
  headline?: string;
  items: FAQItem[];
  location_name?: string;
  [key: string]: any;
}

interface FAQAccordionProps {
  blok: FAQBlok;
}

const PlusIcon = () => <span className="text-2xl font-normal">+</span>;
const MinusIcon = () => <span className="text-2xl font-normal">−</span>;

const FAQAccordion = ({ blok }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!blok || !blok.items) return null;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: blok.items.map((item: FAQItem) => ({
      "@type": "Question",
      name: item.question || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer || "",
      },
    })),
  };

  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.section_id || "faq"}
      className="py-12 md:py-20 bg-white/10 scroll-mt-24"
    >
      <Script
        id={`faq-schema-${blok._uid}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. WIDENED CONTAINER: Changed from max-w-5xl to max-w-[1440px] to match Nav/Hero */}
      <div className="mx-auto px-6 md:px-12 max-w-[1440px]">
        {/* 2. INCREASED GAP: gap-20 pushes the CTA and FAQs away from each other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Facebook Social Proof Card (4 Columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 order-2 lg:order-1">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg
                  className="w-32 h-32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#1877F2] p-3 rounded-2xl text-white shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <h4 className="text-[#333333] font-black uppercase text-xs tracking-[0.2em] leading-tight">
                    Verified Local <br /> Service Pro
                  </h4>
                </div>

                <div className="mb-6">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className="w-5 h-5 text-[#CEDC00]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-1.54 1.118c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#333333] font-black text-xl tracking-tighter">
                    5.0 Star Rating
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">
                    Based on Facebook Reviews
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium italic">
                  &quot;Check out our daily project logs and community updates
                  for **
                  {blok.location_name || "Jefferson County"}**. We post real
                  results from real neighbors.&quot;
                </p>

                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#333333] text-white text-center py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#CEDC00] hover:text-[#333333] transition-all shadow-lg"
                >
                  See Recent Jobs →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ List (8 Columns) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="mb-10">
              <h2 className="text-3xl md:text-6xl font-black uppercase text-[#333333] tracking-tighter mb-4 leading-none">
                {blok.headline || "Common Questions"}
              </h2>
              <div className="h-2 w-24 bg-[#CEDC00]"></div>
            </div>

            <div className="border-t border-gray-200">
              {blok.items.map((item: FAQItem, index: number) => (
                <div key={item._uid} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex justify-between items-center w-full py-6 text-left font-bold text-xl text-[#333333] hover:text-[#CEDC00] transition-colors"
                  >
                    <span className="max-w-[90%]">{item.question}</span>
                    <span className="text-[#CEDC00]">
                      {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-8 text-gray-600 leading-relaxed text-lg animate-in fade-in slide-in-from-top-2 duration-300">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
