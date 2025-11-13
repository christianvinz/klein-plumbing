import { 
  getStoryblokApi, 
  StoryblokStory 
} from "@storyblok/react/rsc";

// Tell Next.js this is a dynamic route
export const dynamic = 'force-dynamic';

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
    console.error(e);
    return <div>Page not found in Storyblok. Create a story with slug: {slugName}</div>;
  }

  return (
    <div>
      <StoryblokStory story={data.story} />
    </div>
  );
}
