# Waterheater Page Troubleshooting Guide
## Klein Plumbing - Next.js + Storyblok Issue

---

## 🔍 Issue Summary
- **Problem**: Waterheater page shows in Storyblok but not in production
- **Components**: ServiceDetailPage.tsx is registered correctly in StoryblokProvider.tsx
- **Stack**: Next.js + Storyblok

---

## ✅ Quick Fixes to Try First

### 1. Verify Storyblok Page Status
In Storyblok Editor:
- [ ] Check if page is **Published** (not just saved as draft)
- [ ] Look for the green "Published" badge at top of editor
- [ ] If it says "Draft", click **Publish** button

### 2. Check Slug Configuration
In Storyblok:
- [ ] Go to Settings tab of the waterheater story
- [ ] Verify **Real Path** field shows: `/services/waterheater`
- [ ] Make sure **Slug** field is exactly: `waterheater` (not `water-heater` or `water_heater`)

### 3. Clear Next.js Cache & Rebuild
```bash
# In your project directory:
rm -rf .next
npm run build
npm run start

# OR if using Vercel:
# Go to Vercel dashboard > Your Project > Deployments > [latest] > ... > Redeploy
```

---

## 🛠️ Common Causes & Solutions

### Issue 1: Content Type Mismatch
**Check**: Is the content type in Storyblok set to `service_detail_page`?

**Solution**: In Storyblok story settings:
1. Go to the waterheater story
2. Check "Content type" field
3. It should be: `service_detail_page` (matches your StoryblokProvider registration)

---

### Issue 2: Missing in Dynamic Route
**Check**: Do you have a proper catch-all route?

**Create**: `app/services/[slug]/page.tsx` (App Router) OR `pages/services/[slug].tsx` (Pages Router)

```typescript
// Example for App Router: app/services/[slug]/page.tsx
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/services/${slug}`, {
    version: "published", // IMPORTANT: Use "published" in production
  });

  return (
    <div>
      <StoryblokComponent blok={data.story.content} />
    </div>
  );
}

// Generate static paths at build time
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/", {
    version: "published",
    starts_with: "services/",
  });

  return data.stories.map((story: any) => ({
    slug: story.slug,
  }));
}
```

---

### Issue 3: API Version Setting
**Problem**: Using `version: "draft"` in production

**Solution**: Update your API calls to use `"published"`:

```typescript
// ❌ WRONG for production
const { data } = await storyblokApi.get(`cdn/stories/services/${slug}`, {
  version: "draft"
});

// ✅ CORRECT for production
const { data } = await storyblokApi.get(`cdn/stories/services/${slug}`, {
  version: "published"
});
```

**OR use environment-based version:**
```typescript
const version = process.env.NODE_ENV === "production" ? "published" : "draft";

const { data } = await storyblokApi.get(`cdn/stories/services/${slug}`, {
  version: version
});
```

---

### Issue 4: ISR/Cache Not Revalidating
**Problem**: Production is serving stale cached page

**Solution A - Force Revalidation** (if you have revalidate endpoint):
```bash
# Visit this URL (replace with your domain and secret):
https://yoursite.com/api/revalidate?secret=YOUR_SECRET&path=/services/waterheater
```

**Solution B - Add ISR to Page** (App Router):
```typescript
// In your page.tsx
export const revalidate = 3600; // Revalidate every hour
```

**Solution C - Create Revalidate Webhook**:
```typescript
// pages/api/revalidate.ts OR app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  return NextResponse.json({ message: 'Missing path' }, { status: 400 });
}
```

Then set up webhook in Storyblok:
1. Settings > Webhooks > Create Webhook
2. URL: `https://yoursite.com/api/revalidate?secret=YOUR_SECRET&path=/services/waterheater`
3. Trigger: Story Published

---

### Issue 5: Missing Content in StoryblokProvider
**Check**: Is `service_detail_page` registered?

Looking at your `StoryblokProvider.tsx`:
```typescript
const components = {
  service_detail_page: ServiceDetailPage, // ✅ This IS registered correctly
  // ...
};
```

This looks good! ✅

---

## 🔬 Debugging Steps

### Step 1: Check if Page Exists in API
Test the Storyblok API directly:

```bash
# Replace YOUR_TOKEN with your Storyblok access token
curl "https://api.storyblok.com/v2/cdn/stories/services/waterheater?token=YOUR_TOKEN&version=published"
```

**Expected result**: Should return JSON with the story data
**If 404**: Page doesn't exist or slug is wrong
**If returns data**: Issue is in Next.js rendering

---

### Step 2: Test in Development Mode
```bash
npm run dev
# Visit: http://localhost:3000/services/waterheater
```

**If works in dev but not production**: Issue is with build/cache
**If doesn't work in dev**: Issue is with routing/component setup

---

### Step 3: Check Build Logs
Look for errors during build:
```bash
npm run build
```

Watch for:
- Missing environment variables
- Failed API calls
- TypeScript errors

---

### Step 4: Check Production Logs
If deployed on Vercel/Netlify, check:
- Runtime logs for errors
- Build logs for warnings
- Edge function logs

---

## 🚀 Recommended Setup

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'],
  },
  // Use ISR for Storyblok pages
  async headers() {
    return [
      {
        source: '/services/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Environment Variables
Make sure these are set in production:
```bash
NEXT_PUBLIC_STORYBLOK_TOKEN=your_token_here
REVALIDATE_SECRET=your_secret_here
```

---

## 📋 Checklist Before Deploying

- [ ] Page is Published in Storyblok (not Draft)
- [ ] Slug matches routing pattern
- [ ] Content type is `service_detail_page`
- [ ] Component is registered in StoryblokProvider
- [ ] API version is set to "published" in production
- [ ] Environment variables are set in hosting platform
- [ ] Build completes without errors
- [ ] Static paths include services folder

---

## 🆘 Still Not Working?

### Nuclear Option: Force Full Rebuild
```bash
# Clear everything
rm -rf .next
rm -rf node_modules
npm cache clean --force

# Reinstall and rebuild
npm install
npm run build
npm run start
```

### Check Network Tab
1. Open Chrome DevTools
2. Go to Network tab
3. Visit the waterheater page
4. Look for failed requests (red)
5. Check response codes and error messages

---

## 📞 Need More Help?

If none of these work, provide:
1. Your `pages/services/[slug].tsx` OR `app/services/[slug]/page.tsx` file
2. Build logs from `npm run build`
3. Production URL so I can test
4. Screenshot of Storyblok story settings

---

**Last Updated**: November 2025
**Klein Plumbing - Klein.plumbing**
