"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Teaser from "./Teaser";
import Page from "./Page";
import Hero from "./Hero";
import Grid from "./Grid";
import ServiceCard from "./ServiceCard";
import BeforeAfterCarousel from "./BeforeAfterCarousel";
import Testimonial from "./Testimonial";
import TrustSection from "./TrustSection";
import JobLog from "./JobLog";
import ContactSection from "./ContactSection";
import ServiceDetailPage from "./ServiceDetailPage";
import FAQAccordion from "./FAQAccordion";
import DynamicRichTextWrapper from "./DynamicRichTextWrapper";
import BadgeBar from "./BadgeBar";
import TrustBadge from "./TrustBadge";

const components = {
  // Defaults & Main Layout
  teaser: Teaser,
  page: Page,
  
  // Containers & Sections
  hero: Hero,
  Hero: Hero, 
  grid: Grid,
  trust_section: TrustSection,
  job_log: JobLog,
  before_after_carousel: BeforeAfterCarousel,
  contact_section: ContactSection,
  faq_section: FAQAccordion,
  service_detail_page: ServiceDetailPage,
  BadgeBar: BadgeBar,
  badge_bar: BadgeBar,
  trust_badge: TrustBadge,

  // Content Items
  service_card: ServiceCard,
  testimonial: Testimonial,
  Testimonial: Testimonial,
  rich_text: DynamicRichTextWrapper,
  
  // Child blocks (mapped to null)
  slide_pair: () => null,
  job_entry: () => null,
  faq_item: () => null,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
