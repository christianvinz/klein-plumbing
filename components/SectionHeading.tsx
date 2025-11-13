import { storyblokEditable } from "@storyblok/react";

const SectionHeading = ({ blok }: any) => {
  return (
    <h3 {...storyblokEditable(blok)} className="text-2xl font-bold uppercase text-[#333333] mt-8 mb-4 border-b-2 border-[#CEDC00] inline-block pb-1">
      {blok.text}
    </h3>
  );
};
export default SectionHeading;
