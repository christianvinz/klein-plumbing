"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import STORYBLOK_COMPONENTS from "@/lib/storyblok-components";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: STORYBLOK_COMPONENTS,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
