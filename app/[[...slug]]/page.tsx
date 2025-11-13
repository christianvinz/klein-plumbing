import { 
  getStoryblokApi, 
  StoryblokStory, 
  storyblokInit, 
  apiPlugin 
} from "@storyblok/react/rsc";
import Teaser from "../../components/Teaser";
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
import DynamicRichTextWrapper from "../../components/DynamicRichTextWrapper"; // <--- NEW WRAPPER
import BadgeBar from "../../components/BadgeBar";
import TrustBadge from "../../components/TrustBadge";

// Initialize Storyblok on the Server
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    // Defaults & Main Layout
    teaser: Teaser,
    page: Page,

    // Custom Components
    hero: Hero,
    Hero: Hero,
    grid: Grid,
    trust_section: TrustSection,
    job_log: JobLog,
    before_after_carousel: BeforeAfterCarousel,
    contact_section: ContactSection,
    service_detail_page: ServiceDetailPage,
    faq_section: FAQAccordion,
    BadgeBar: BadgeBar,

    // Content Items
    service_card: ServiceCard,
    testimonial: Testimonial,
    rich_text: DynamicRichTextWrapper, // <--- MAPPED TO THE DYNAMIC WRAPPER

    // Child blocks
    slide_pair: () => null,
    trust_badge: TrustBadge,
    job_entry: () => null,
    faq_item: () => null,
  },
});

export default async function StoryblokPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugName = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  
  let data;
  try {
    const result = await storyblokApi.get(`cdn/stories/${slugName}`, {
      version: "draft",
    });
    data = result.data;
  } catch (e) {
    return <div>Page not found in Storyblok. Create a story with slug: {slugName}</div>;
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
