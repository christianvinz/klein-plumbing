import { storyblokEditable } from "@storyblok/react/rsc";

const Teaser = ({ blok }: any) => {
  return (
    <div {...storyblokEditable(blok)} className="text-center py-20">
      <h2 className="text-4xl font-bold text-blue-600">{blok.headline}</h2>
    </div>
  );
};

export default Teaser;
