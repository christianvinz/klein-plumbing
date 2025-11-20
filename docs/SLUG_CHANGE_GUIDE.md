# Change Slug: waterheater → water-heater-services

## 📋 Migration Checklist

### Step 1: Update in Storyblok
1. Go to Storyblok → Your waterheater story
2. Click **Settings** tab
3. Update fields:
   - **Slug**: Change to `water-heater-services`
   - **Real Path**: Should auto-update to `/services/water-heater-services`
4. Click **Save**
5. Click **Publish** (very important!)

### Step 2: Update ServiceCard Component (if needed)
Your `ServiceCard.tsx` already handles this automatically! 

If the title in Storyblok is "Water Heater Services", the slug is generated automatically:
```typescript
// This code already exists in ServiceCard.tsx
const href = blok.custom_link 
    ? blok.custom_link
    : `/services/${blok.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '')}`;
```

**Result**: "Water Heater Services" → `/services/water-heater-services` ✅

### Step 3: Check for Hardcoded Links
Search your codebase for any hardcoded references:

```bash
# Run this in your project directory
grep -r "waterheater" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js"
grep -r "/services/waterheater" --include="*.tsx" --include="*.ts"
```

If you find any, update them to `/services/water-heater-services`

### Step 4: Set Up Redirect (Important for SEO!)
If the old URL was ever live, you need a redirect to avoid broken links.

#### Option A: Next.js Redirects (Recommended)
Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  async redirects() {
    return [
      {
        source: '/services/waterheater',
        destination: '/services/water-heater-services',
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
};

module.exports = nextConfig;
```

#### Option B: Middleware Redirect
Create `middleware.ts` in your project root:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/services/waterheater') {
    return NextResponse.redirect(
      new URL('/services/water-heater-services', request.url),
      { status: 301 }
    );
  }
}

export const config = {
  matcher: '/services/:path*',
};
```

#### Option C: Vercel Redirects
If using Vercel, add to `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/services/waterheater",
      "destination": "/services/water-heater-services",
      "permanent": true
    }
  ]
}
```

### Step 5: Update Any Internal Links
Check these files for links to update:
- Navigation components
- Footer links
- Service listing pages
- Sitemap files
- Any markdown/content files

### Step 6: Deploy & Test
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
npm run start

# Test both URLs:
# ✅ http://localhost:3000/services/water-heater-services (should work)
# ✅ http://localhost:3000/services/waterheater (should redirect)
```

### Step 7: Update Sitemap (if applicable)
If you have a sitemap, update the URL:
```xml
<!-- From -->
<url>
  <loc>https://klein.plumbing/services/waterheater</loc>
</url>

<!-- To -->
<url>
  <loc>https://klein.plumbing/services/water-heater-services</loc>
</url>
```

---

## 🎯 Why This Slug Is Better

**Old**: `/services/waterheater`
- Less readable
- Not commonly searched format
- Harder to remember

**New**: `/services/water-heater-services`
- ✅ More descriptive
- ✅ Better SEO (matches how people search)
- ✅ Clearer service offering
- ✅ Follows URL best practices

---

## ⚠️ Important Notes

### Don't Lose SEO Value
If the old URL was indexed by Google:
1. Keep the redirect in place permanently
2. Submit new URL to Google Search Console
3. Update any backlinks you control

### Storyblok Content Type
Make sure the content type is still `service_detail_page` after making changes.

### Testing Checklist
- [ ] New URL works: `/services/water-heater-services`
- [ ] Old URL redirects: `/services/waterheater` → `/services/water-heater-services`
- [ ] Links in navigation work
- [ ] ServiceCard links work
- [ ] Page content displays correctly
- [ ] Mobile view works

---

## 🚀 Quick Commands

```bash
# Update Storyblok slug (done in UI)

# Search for hardcoded references
grep -r "waterheater" .

# Clear and rebuild
rm -rf .next && npm run build

# Deploy to production
git add .
git commit -m "Update water heater slug to water-heater-services"
git push

# If using Vercel, it auto-deploys
# Otherwise: npm run build && npm run start
```

---

## 🔄 Rollback Plan (If Needed)

If something breaks:
1. Go back to Storyblok → Change slug back to `waterheater`
2. Remove redirect from `next.config.js`
3. Redeploy
4. Original URL will work again

---

## 📞 Need Help?

If you run into issues:
1. Check browser console for errors
2. Check Next.js build logs
3. Verify Storyblok page is Published
4. Share any error messages

---

**Estimated Time**: 10-15 minutes
**Risk Level**: Low (easily reversible)
**Recommended**: Do this during low-traffic hours

---

Generated: November 20, 2025
Klein Plumbing - klein.plumbing
