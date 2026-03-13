/* eslint-disable @typescript-eslint/no-explicit-any */
import { storyblokEditable } from "@storyblok/react";
import { render, NODE_TABLE } from "storyblok-rich-text-react-renderer";

const RichText = ({ blok }: any) => {
  // Check if content exists
  if (!blok.content) return null;

  // Custom options to wrap table rows in tbody
  const options = {
    nodeResolvers: {
      [NODE_TABLE]: (children: React.ReactNode) => (
        <table className="w-full my-6 border-collapse border border-gray-300">
          <tbody>{children}</tbody>
        </table>
      ),
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Headings - All levels now very visible */
        .richtext-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .richtext-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .richtext-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .richtext-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .richtext-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .richtext-content h6 {
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        
        /* Paragraphs */
        .richtext-content p {
          margin-bottom: 1rem;
          line-height: 1.75;
          color: #374151;
          font-size: 1rem;
        }
        
        /* Lists */
        .richtext-content ul,
        .richtext-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .richtext-content li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        
        /* Strong/Bold */
        .richtext-content strong {
          font-weight: 700;
          color: #111827;
        }
        
        /* Em/Italic */
        .richtext-content em {
          font-style: italic;
        }
        
        /* Tables */
        .richtext-content table {
          width: 100%;
          margin: 1.5rem 0;
          border-collapse: collapse;
          border: 2px solid #d1d5db;
        }
        
        .richtext-content th,
        .richtext-content td {
          padding: 0.75rem 1rem;
          text-align: left;
          border: 1px solid #d1d5db;
        }
        
        .richtext-content th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #111827;
        }
        
        .richtext-content td {
          background-color: #ffffff;
          color: #374151;
        }
        
        .richtext-content tbody tr:hover {
          background-color: #f9fafb;
        }
      `}} />
      <div 
        {...storyblokEditable(blok)} 
        className="richtext-content max-w-none py-4"
      >
        {render(blok.content, options)}
      </div>
    </>
  );
};

export default RichText;
