// components/ServiceDetailPage.tsx
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

/**
 * Minimal Storyblok block shape.
 * Only includes fields this component actually uses.
 */
type StoryblokBlock = {
  _uid: string;
  component: string;
  [key: string]: unknown;
};

type ServiceDetailBlok = {
  _uid: string;
  component: string;
  page_title?: string;
  content?: StoryblokBlock[];
  body?: StoryblokBlock[];
};

type Props = {
  blok: ServiceDetailBlok;
};

const ServiceDetailPage = ({ blok }: Props) => {
  const contentBlocks: StoryblokBlock[] = Array.isArray(blok.content)
    ? blok.content
    : Array.isArray(blok.body)
      ? blok.body
      : [];

  return (
    <div
      {...storyblokEditable(blok)}
      className="container mx-auto px-4 py-20 mt-20"
    >
      <h1 className="text-4xl font-black uppercase text-[#333333] mb-8 border-b pb-4">
        {blok.page_title && blok.page_title.trim()
          ? blok.page_title
          : "Service Details"}
      </h1>

      <div className="max-w-none">
        {contentBlocks.map((nestedBlock) => (
          <StoryblokComponent key={nestedBlock._uid} blok={nestedBlock} />
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
