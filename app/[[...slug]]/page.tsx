import { 
  getStoryblokApi, 
  StoryblokStory,
  storyblokInit,
  apiPlugin
} from "@storyblok/react/rsc";

// Initialize Storyblok with API plugin
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
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
