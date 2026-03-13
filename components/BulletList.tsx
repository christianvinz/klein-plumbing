/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";

const BulletList = ({ blok }: any) => {
  return (
    <ul {...storyblokEditable(blok)} className="list-disc list-inside space-y-3 text-gray-700 ml-4">
      {blok.items?.map((item: any, index: number) => (
        <li key={index} className="pl-2">
          <strong className="text-[#333333]">{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  );
};
export default BulletList;
