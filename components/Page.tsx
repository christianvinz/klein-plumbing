import { StoryblokServerComponent } from "@storyblok/react/rsc";

const Page = ({ blok }: any) => {
  // --- This new logic groups the Hero and BadgeBar ---
  const groupedBody = [];
  let i = 0;
  while (i < blok.body.length) {
    const currentBlok = blok.body[i];
    const isHero = currentBlok.component === 'hero' || currentBlok.component === 'Hero';
    
    // Look ahead to see if the next component is a BadgeBar
    const nextBlok = blok.body[i + 1];
    const isNextBadgeBar = nextBlok && (nextBlok.component === 'BadgeBar');
    
    if (isHero && isNextBadgeBar) {
      // Found the group! Combine them.
      groupedBody.push({
        _uid: currentBlok._uid + nextBlok._uid, // Create a unique key
        isGroup: true,
        bloks: [currentBlok, nextBlok]
      });
      i += 2; // Skip both components
    } else {
      // Not a group, just push the single component
      groupedBody.push({
        _uid: currentBlok._uid,
        isGroup: false,
        bloks: [currentBlok]
      });
      i += 1; // Go to the next component
    }
  }
  // --- End of new logic ---

  // Now, we render the new `groupedBody`
  return (
    <main className="px-0">
      {groupedBody.map((group: any) => {
        if (group.isGroup) {
          // --- This is our new wrapper for Hero + BadgeBar ---
          return (
            <div key={group._uid} className="bg-[#333333]">
              <StoryblokServerComponent blok={group.bloks[0]} /> {/* Renders Hero */}
              <StoryblokServerComponent blok={group.bloks[1]} /> {/* Renders BadgeBar */}
            </div>
          );
        }
        
        // This is a regular component
        const nestedBlok = group.bloks[0];
        // Check if it's a hero that *wasn't* followed by a badge bar
        const isStandaloneHero = nestedBlok.component === "hero" || nestedBlok.component === "Hero";
        
        return (
          <div 
            key={nestedBlok._uid} 
            // Add padding to everything *except* our standalone hero
            className={isStandaloneHero ? "" : "py-4 md:py-8"} 
          >
            <StoryblokServerComponent blok={nestedBlok} />
          </div>
        );
      })}
    </main>
  );
};

export default Page;
