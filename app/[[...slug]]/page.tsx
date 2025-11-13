import { 
  getStoryblokApi, 
  StoryblokStory,
  storyblokInit,
  apiPlugin
} from "@storyblok/react/rsc";

// Import all components
import Page from "../../components/Page";
import Hero from "../../components/Hero";
import Grid from "../../components/Grid";
import ServiceCard from "../../components/ServiceCard";
import BeforeAfterCarousel from "../../components/BeforeAfterCarousel";
import Testimonial from "../../components/Testimonial";
import TrustSection from "../../components/TrustSection";
import JobLog from "../../components/JobLog";
import ContactSection from "../../components/ContactSection";
import ServiceDetailPage from "../../components/ServiceDetailPage";
import FAQAccordion from "../../components/FAQAccordion";
import DynamicRichTextWrapper from "../../components/DynamicRichTextWrapper";

// Initialize Storyblok with API plugin and components
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
    Hero: Hero,
    grid: Grid,
    service_card: ServiceCard,
    before_after_carousel: BeforeAfterCarousel,
    testimonial: Testimonial,
    Testimonial: Testimonial,
    trust_section: TrustSection,
    job_log: JobLog,
    contact_section: ContactSection,
    service_detail_page: ServiceDetailPage,
    faq_section: FAQAccordion,
    rich_text: DynamicRichTextWrapper,
    slide_pair: () => null,
    trust_badge: () => null,
    job_entry: () => null,
    faq_item: () => null,
  },
});

// Tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic';

export default async function StoryblokPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugName = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  
  let data;
  try {
    const result = await storyblokApi.get(`cdn/stories/${slugName}`, {
      version: "published",
    });
    data = result.data;
  } catch (e) {
    console.error("Storyblok error:", e);
    return <div>Page not found in Storyblok. Create a story with slug: {slugName}</div>;
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
