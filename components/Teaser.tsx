import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";

// Define the shape of the Teaser block to satisfy the 'no-explicit-any' rule
interface TeaserBlok extends SbBlokData {
  headline: string;
}

interface TeaserProps {
  blok: TeaserBlok;
}

const Teaser = ({ blok }: TeaserProps) => {
  return (
    <div {...storyblokEditable(blok)} className="text-center py-20">
      <h2 className="text-4xl font-bold text-[#333333]">{blok.headline}</h2>
    </div>
  );
};

export default Teaser;
