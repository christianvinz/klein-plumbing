# 🎯 ACTION PLAN: Change to water-heater-services

---

## What You Asked For:
✅ Change slug from `waterheater` to `water-heater-services`

---

## What I've Prepared:

### 📄 Files Ready for You:
1. **next.config.js** - Pre-configured with redirect
2. **QUICK_REFERENCE.md** - 5-minute checklist
3. **SLUG_CHANGE_GUIDE.md** - Complete instructions
4. **Footer.tsx** - (from before) Updated cities
5. **WATERHEATER_TROUBLESHOOTING.md** - (from before)

---

## 🚀 DO THIS NOW (5 minutes):

### Step 1: In Storyblok
```
1. Open your water heater story in Storyblok
2. Click "Settings" tab
3. Change Slug field to: water-heater-services
4. Click "Save"
5. Click "PUBLISH" ⚠️ CRITICAL!
```

### Step 2: Update Your Code
```
1. Replace your next.config.js with the one I provided
   (It has the redirect built in)
   
2. Commit and deploy:
   git add next.config.js
   git commit -m "Add redirect for water heater slug change"
   git push
```

### Step 3: Test
```
After deploy completes:

✅ Test new URL: yoursite.com/services/water-heater-services
✅ Test old URL: yoursite.com/services/waterheater
   (Should redirect to new URL)
```

---

## 📋 Quick Checklist

```
Storyblok:
□ Changed slug to water-heater-services
□ Saved changes
□ Published (not just saved!)

Code:
□ Replaced next.config.js
□ Committed to git
□ Pushed to production

Testing:
□ New URL works
□ Old URL redirects
□ Page content displays correctly
```

---

## 🎯 Why This Change Is Good:

**SEO Benefits:**
- Better keyword matching for "water heater services"
- More descriptive URL structure
- Matches how people actually search

**User Experience:**
- Clearer what the page is about
- Easier to remember
- More professional

**Technical:**
- Follows URL best practices
- Maintains SEO value via redirect
- Easy to rollback if needed

---

## 🔧 What the Redirect Does:

```
User visits: klein.plumbing/services/waterheater
           ↓
Automatically redirected to:
           ↓
         klein.plumbing/services/water-heater-services
```

**Why it matters:**
- Any old links still work
- No broken links
- Search engines transfer ranking to new URL
- Users don't see errors

---

## ⚡ The next.config.js Does Everything:

```javascript
// Automatic redirect (301 permanent)
'/services/waterheater' → '/services/water-heater-services'

// Plus bonus features:
✅ Storyblok image optimization
✅ ISR caching for fast page loads
✅ Proper cache headers
```

Just drop it in your project root and deploy!

---

## 🆘 If Something Goes Wrong:

**Page not found after change?**
- Wait 2 minutes for deploy/cache
- Check Storyblok page is Published
- Clear browser cache

**Redirect not working?**
- Make sure next.config.js is in project root
- Rebuild: `rm -rf .next && npm run build`
- Redeploy

**Want to undo?**
1. Change slug back to `waterheater` in Storyblok
2. Remove redirect from next.config.js
3. Redeploy

---

## 📞 You're Set!

Everything is ready. The change is:
- ✅ Low risk
- ✅ Easy to implement
- ✅ Good for SEO
- ✅ Reversible if needed

Just follow the 3 steps above and you're done!

---

**Total Time**: 5 minutes
**Files to Update**: 2 (Storyblok + next.config.js)
**Deploy Time**: ~2 minutes
**Risk Level**: Very Low

---

Generated: November 20, 2025
Klein Plumbing - klein.plumbing
