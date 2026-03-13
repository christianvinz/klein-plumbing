// components/Page.tsx
import { StoryblokServerComponent } from "@storyblok/react/rsc";

/**
 * Minimal, safe Storyblok block shape.
 * We only type what this component actually uses.
 */
type StoryblokBlock = {
  _uid: string;
  component: string;
};

/**
 * Page-level blok passed from Storyblok
 */
type PageBlok = {
  body?: StoryblokBlock[];
};

type PageProps = {
  blok: PageBlok;
};

type GroupedBlock = {
  _uid: string;
  isGroup: boolean;
  blocks: StoryblokBlock[];
};

const Page = ({ blok }: PageProps) => {
  const body: StoryblokBlock[] = Array.isArray(blok.body) ? blok.body : [];

  const groupedBody: GroupedBlock[] = [];
  let i = 0;

  while (i < body.length) {
    const currentBlock = body[i];
    const nextBlock = body[i + 1];

    const isHero =
      currentBlock.component === "hero" || currentBlock.component === "Hero";

    const isNextBadgeBar = nextBlock?.component === "BadgeBar";

    if (isHero && isNextBadgeBar) {
      groupedBody.push({
        _uid: `${currentBlock._uid}-${nextBlock._uid}`,
        isGroup: true,
        blocks: [currentBlock, nextBlock],
      });
      i += 2;
      continue;
    }

    groupedBody.push({
      _uid: currentBlock._uid,
      isGroup: false,
      blocks: [currentBlock],
    });
    i += 1;
  }

  return (
    <main className="px-0">
      {groupedBody.map((group) => {
        if (group.isGroup) {
          const [heroBlock, badgeBlock] = group.blocks;

          return (
            <section key={group._uid} className="relative bg-[#333333] overflow-hidden -mt-[var(--nav-h)] md:-mt-[var(--nav-h-md)] pt-[var(--nav-h)] md:pt-[var(--nav-h-md)]">
              {/* Background Image Layer */}
              <div
                className="absolute -inset-4 z-0 bg-no-repeat scale-110 -rotate-2"
                style={{
                  backgroundImage: `url(/kleinplumbing.jpeg)`,
                  backgroundSize: '1920px auto',
                  backgroundPosition: '30% 20%',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-black/85 backdrop-blur-[0.75px]" />
              </div>
              <div className="relative z-10">
                <StoryblokServerComponent blok={heroBlock} />
                <StoryblokServerComponent blok={badgeBlock} />
              </div>
            </section>
          );
        }

        const block = group.blocks[0];
        const isStandaloneHero =
          block.component === "hero" || block.component === "Hero";

        return (
          <section
            key={block._uid}
            className={isStandaloneHero ? "" : "py-2 md:py-4"}
          >
            <StoryblokServerComponent blok={block} />
          </section>
        );
      })}
    </main>
  );
};

export default Page;
