import { storyblokEditable } from "@storyblok/react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const BeforeAfter = ({ blok }: any) => {
  // Only render if both images are uploaded
  if (!blok.before_image?.filename || !blok.after_image?.filename) {
    return null;
  }

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-12 bg-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            See the Difference
          </h2>
          <p className="text-gray-600">
            Drag the slider to see our work in action.
          </p>
        </div>

        {/* The Slider Container */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={blok.before_image.filename}
                alt="Before Plumbing Repair"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={blok.after_image.filename}
                alt="After Plumbing Repair"
              />
            }
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
