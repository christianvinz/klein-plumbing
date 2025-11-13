'use client';
import dynamic from 'next/dynamic';
import { storyblokEditable } from '@storyblok/react';

// Dynamically import the RichText component, disabling Server-Side Rendering (SSR)
// This guarantees the component only runs in the browser, solving the conflict.
const RichTextClient = dynamic(() => import('./RichText'), { 
  ssr: false,
  loading: () => <div className="text-gray-500 italic py-4">Loading content...</div>
});

const DynamicRichTextWrapper = ({ blok }: any) => {
  return (
    <div {...storyblokEditable(blok)}>
      {/* Pass the block data to the dynamically loaded component */}
      <RichTextClient blok={blok} />
    </div>
  );
};

export default DynamicRichTextWrapper;
