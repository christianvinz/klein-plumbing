import { 
  getStoryblokApi, 
  StoryblokStory
} from "@storyblok/react/rsc";

// Tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic';

export default async function StoryblokPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugName = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";

  console.log("Looking for story with slug:", slugName);

  const storyblokApi = getStoryblokApi();
  
  let data;
  try {
    const result = await storyblokApi.get(`cdn/stories/${slugName}`, {
      version: "published",
    });
    data = result.data;
    console.log("Story found:", data.story?.name);
    console.log("Story has content blocks:", data.story?.content?.body?.length || 0);
  } catch (e) {
    console.error("Storyblok error:", e);
    return <div>Page not found in Storyblok. Create a story with slug: {slugName}</div>;
  }

  if (!data.story?.content?.body || data.story.content.body.length === 0) {
    return <div>Story exists but has no content blocks</div>;
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
