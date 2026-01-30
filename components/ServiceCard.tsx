/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ blok }: any) => {
  const href = blok.custom_link
    ? blok.custom_link
    : `/services/${blok.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, "")}`;

  return (
    <Link href={href} className="block w-full h-full group">
      <div
        {...storyblokEditable(blok)}
        /* GLASS CHANGES:
           1. bg-white/10 -> Lower opacity for better "glass" feel
           2. border border-white/20 -> Adds the reflective edge
           3. shadow-xl -> Adds depth
           4. transition & hover effects -> Makes it interactive
        */
        className="bg-white/10 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
      >
        {/* Header: Icon and Title */}
        <div className="flex items-start gap-4 mb-3 pb-3 border-b border-white/10">
          {blok.icon?.filename && (
            <div className="relative w-10 h-10 flex-shrink-0 mt-1">
              <Image
                src={blok.icon.filename}
                alt={blok.title}
                fill
                className="object-contain"
              />
            </div>
          )}

          <h3 className="text-lg font-black text-black uppercase tracking-tight leading-tight">
            {blok.title}
          </h3>
        </div>

        <p
          className="text-black text-sm leading-relaxed mb-3"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {blok.summary}
        </p>

        <span className="mt-auto block font-bold text-black uppercase text-[10px] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#CEDC00]">
          {blok.custom_link ? "View All Services" : "Read More"} →
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
