# 🚀 Portfolio Deployment Checklist

This checklist covers everything you need to do before deploying your portfolio website to production.

## ✅ COMPLETED (Ready for Deployment)

### 1. Security Fixes
- ✅ `.env.local` is already in `.gitignore` (line 29)
- ✅ Removed debug `console.log` statements from production code
- ✅ Removed hardcoded email fallbacks in API route
- ⚠️ **CRITICAL:** You still need to revoke and replace your exposed Resend API key

### 2. Public Assets Structure
- ✅ Created complete public folder structure with README instructions
- ✅ Created resume folder with instructions

### 3. Fixed Issues
- ✅ Fixed placeholder GitHub username (@yourusername → @JohnMarkCapones)
- ✅ Implemented "Download All" button for system-info page
- ✅ Implemented resume download feature in Command Palette (Ctrl/Cmd+K)

### 4. New Features
- ✅ Installed JSZip for ZIP file generation
- ✅ Created download utility functions (`lib/utils/download.ts`)
- ✅ ZIP download creates archive of all resume files

---

## ⚠️ ACTION REQUIRED (Before Deployment)

### 🔴 CRITICAL - Do Immediately

#### 1. Revoke Exposed API Key
Your Resend API key was exposed in `.env.local`. You MUST:
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Delete/revoke the exposed key (the one that was in .env.local)
3. Generate a new API key
4. Update your `.env.local` with the new key
5. Never commit `.env.local` to git

#### 2. Add Required Public Assets

##### Favicons & Icons (Root `/public` folder):
Place these files in `/public/`:
- **favicon.ico** - Main favicon (32×32 or 16×16 pixels)
- **icon.svg** - SVG icon for modern browsers
- **apple-touch-icon.png** - Apple touch icon (180×180 pixels)
- **og-image.png** - Social media preview image (1200×630 pixels)

**How to create these:**
- Use [Favicon Generator](https://realfavicongenerator.net/) for favicon files
- For OG image: Create a 1200×630px image with your name and title
- Example tools: Canva, Figma, or Photoshop

##### Project Images:
Place project screenshots in their respective folders:

**Campus Connect** (`/public/projects/campus-connect/`):
- `dashboard.png`
- `quiz-system.png`
- `student-management.png`
- `mobile-app.png`

**Xiraya** (`/public/projects/xiraya/`):
- `homepage.png`
- `product-catalog.png`
- `admin-dashboard.png`

**Pharmacy** (`/public/projects/pharmacy/`):
- `pos-system.png`
- `dashboard.png`
- `inventory.png`

**Media Platform** (`/public/projects/media-platform/`):
- `architecture.png`
- `dashboard.png`

**Image specs:** 1920×1080 pixels, PNG or JPEG, <500KB each

#### 3. Add Your Resume PDF
Place your resume PDF file in:
```
/public/resume/John-Mark-Capones-Resume.pdf
```
The filename can be anything, but update it in the code if different from above.

---

## 🟡 RECOMMENDED (For Best Results)

### 1. Environment Variables for Production
Create `.env.production` with:
```env
RESEND_API_KEY=your_new_resend_api_key
RESEND_FROM_EMAIL=your_verified_email@domain.com
RESEND_TO_EMAIL=jcapones93@gmail.com
NEXT_PUBLIC_SITE_URL=https://capdev.tech
```

### 2. Verify Git History
Check if `.env.local` was ever committed:
```bash
git log --all --full-history --oneline -- .env.local
```

If it shows results, consider using BFG Repo-Cleaner to remove it from history.

### 3. Test Contact Form
Before deploying:
1. Start dev server: `npm run dev`
2. Go to `/contact`
3. Submit a test message
4. Verify email is received

### 4. Test Download Features
1. Go to `/system-info`
2. Click "Download All" - should download ZIP file
3. Press `Ctrl+K` (or `Cmd+K` on Mac)
4. Type "download" and select "Download Resume"
5. Verify PDF downloads correctly

---

## 📋 Pre-Deployment Commands

Run these commands before deploying:

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Build (test production build)
npm run build

# 4. Test production build locally
npm run start
```

All commands should complete without errors.

---

## 🌐 Deployment Steps

### For Vercel:
1. Push your changes to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`
4. Deploy!

### For Other Platforms:
1. Ensure Node.js 18+ is available
2. Set environment variables
3. Run `npm run build`
4. Run `npm run start`

---

## 📝 Quick Reference

### What You Need to Prepare:

1. **Images to Create/Find:**
   - [ ] Favicon (32×32)
   - [ ] OG Image (1200×630)
   - [ ] Apple Touch Icon (180×180)
   - [ ] 11 Project Screenshots

2. **Files to Add:**
   - [ ] Resume PDF
   - [ ] All images listed above

3. **Accounts/Services to Check:**
   - [ ] Revoke old Resend API key
   - [ ] Generate new Resend API key
   - [ ] Verify email domain in Resend (optional but recommended)

---

## 🎉 After Deployment

### Test These Features:
- [ ] All pages load correctly
- [ ] Contact form sends emails
- [ ] Project images display properly
- [ ] Download resume works (Ctrl/Cmd+K)
- [ ] Download all files works (System Info page)
- [ ] Social media preview looks good (share on Twitter/LinkedIn)
- [ ] Mobile responsive design works

### Monitor:
- Check Vercel/hosting logs for errors
- Test contact form rate limiting
- Monitor Resend email delivery

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Check server logs in Vercel dashboard
3. Verify all environment variables are set
4. Ensure all required files are in `/public`
5. make sure to chat the developer

---

## 🔗 Useful Links

- [Resend Dashboard](https://resend.com/dashboard)
- [Favicon Generator](https://realfavicongenerator.net/)
- [OG Image Guide](https://www.opengraph.xyz/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**Last Updated:** 2026-02-13
**Status:** Ready for deployment after adding public assets and revoking API key
