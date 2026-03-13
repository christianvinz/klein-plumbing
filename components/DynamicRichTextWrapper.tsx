/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import dynamic from 'next/dynamic';
import { storyblokEditable } from '@storyblok/react';

// Dynamically import the RichText component, forcing client-side rendering
// This ensures the complex rich text renderer library only runs in the browser.
const RichTextClient = dynamic(() => import('./RichText'), { 
  ssr: false, // CRITICAL: Prevents rendering on the server
  loading: () => <div className="text-gray-500 italic py-4">Loading detailed service description...</div>
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
