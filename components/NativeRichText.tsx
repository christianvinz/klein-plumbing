import { storyblokEditable } from "@storyblok/react";

const NativeRichText = ({ blok }: any) => {
  if (!blok.content || !blok.content.content) return null;

  const rawHtml = blok.content.content.map((item: any) => {
    return item.text || (item.content ? item.content.map((subitem: any) => subitem.text).join('') : '');
  }).join(' ');

  if (!rawHtml) return null;

  return (
    <div 
      {...storyblokEditable(blok)} 
      // FINAL CONTAINER: Center everything for maximum readability
      className="container mx-auto px-4 py-8 max-w-4xl" 
    >
      <div className="prose max-w-none text-gray-700 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
      </div>
    </div>
  );
};

export default NativeRichText;
