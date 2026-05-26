import Page from "@/components/Page";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import ServiceCard from "@/components/ServiceCard";
import BeforeAfterCarousel from "@/components/BeforeAfterCarousel";
import Testimonial from "@/components/Testimonial";
import TrustSection from "@/components/TrustSection";
import JobLog from "@/components/JobLog";
import ContactSection from "@/components/ContactSection";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import FAQAccordion from "@/components/FAQAccordion";
import DynamicRichTextWrapper from "@/components/DynamicRichTextWrapper";
import BadgeBar from "@/components/BadgeBar";
import TrustBadge from "@/components/TrustBadge";
import Teaser from "@/components/Teaser";

const STORYBLOK_COMPONENTS = {
  teaser: Teaser,
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
  BadgeBar: BadgeBar,
  badge_bar: BadgeBar,
  trust_badge: TrustBadge,
  slide_pair: () => null,
  job_entry: () => null,
  faq_item: () => null,
};

export default STORYBLOK_COMPONENTS;
