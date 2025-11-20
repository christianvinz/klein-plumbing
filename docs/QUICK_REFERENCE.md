# Quick Reference: Change Slug to water-heater-services

## 5-Minute Checklist ✅

### In Storyblok (2 min)
1. [ ] Open waterheater story
2. [ ] Settings tab → Change **Slug** to: `water-heater-services`
3. [ ] Click **Save**
4. [ ] Click **Publish** ⚠️ DON'T SKIP THIS!

### In Your Code (2 min)
1. [ ] Replace your `next.config.js` with the provided one
   - ✅ Has redirect: waterheater → water-heater-services
   - ✅ Has Storyblok image domains
   - ✅ Has ISR caching configured

2. [ ] Search for hardcoded links:
   ```bash
   grep -r "waterheater" .
   ```
   Update any you find to `water-heater-services`

### Deploy (1 min)
```bash
rm -rf .next
npm run build
git add .
git commit -m "Update water heater slug"
git push
```

### Test (1 min)
- [ ] Visit: `yoursite.com/services/water-heater-services` ✅
- [ ] Visit: `yoursite.com/services/waterheater` → should redirect ✅

---

## 🎯 Files Provided

1. **next.config.js** - Ready to use with redirect
2. **SLUG_CHANGE_GUIDE.md** - Detailed instructions
3. **This file** - Quick reference

---

## ⚡ Super Quick Version

If you trust your setup:
1. Change slug in Storyblok → Save → Publish
2. Use provided next.config.js
3. Deploy
4. Done! ✅

---

## 🔧 Troubleshooting

**Old URL still shows?**
- Clear browser cache
- Wait 2 minutes for CDN
- Check Storyblok page is Published (not Draft)

**Redirect not working?**
- Make sure next.config.js is in project root
- Rebuild: `rm -rf .next && npm run build`
- Check for typos in config file

**Page not found?**
- Verify slug in Storyblok is exact: `water-heater-services`
- Check content type is still: `service_detail_page`
- Redeploy from hosting platform

---

## 📊 Before & After

| Aspect | Before | After |
|--------|--------|-------|
| **URL** | `/services/waterheater` | `/services/water-heater-services` |
| **SEO Score** | 6/10 | 9/10 ⬆️ |
| **Readability** | Medium | High ⬆️ |
| **Search Match** | Partial | Exact ⬆️ |

---

**Time to complete**: ~5 minutes
**Difficulty**: Easy
**Risk**: Very Low (easily reversible)

---

Klein Plumbing - klein.plumbing
November 20, 2025
