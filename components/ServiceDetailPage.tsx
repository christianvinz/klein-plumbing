import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const ServiceDetailPage = ({ blok }: any) => {
  // Get all the nested blocks
  const contentBlocks = blok.content || blok.body || [];

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-20 mt-20">
      {/* Page Title */}
      <h1 className="text-4xl font-black uppercase text-[#333333] mb-8 border-b pb-4">
        {blok.page_title || "Service Details"}
      </h1>

      {/* Renders all the nested content blocks added in Storyblok */}
      <div className="max-w-none">
        {contentBlocks.map((nestedBlok: any) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
