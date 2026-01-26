# 🚀 Deployment Guide - cPanel Production

This guide explains how to build and deploy the Roots Dental website to cPanel hosting.

---

## 📋 Prerequisites

- Node.js installed (v16 or higher)
- cPanel hosting account with File Manager or FTP access
- Backend server running separately (Google Calendar API)

---

## 🔨 Building for Production

### Step 1: Install Dependencies

```bash
cd /Users/pallavi.gujrati/Projects/roots_dental
npm install
```

This installs:
- `terser` - JavaScript minifier
- `clean-css` - CSS minifier

### Step 2: Run Build Script

```bash
npm run build
```

This will:
- ✅ Create `dist/` folder
- ✅ Minify all CSS files (typically 30-40% smaller)
- ✅ Minify all JavaScript files (typically 20-30% smaller)
- ✅ Copy HTML files
- ✅ Copy images folder
- ✅ Copy SEO files (robots.txt, sitemap.xml)
- ✅ Generate deployment-ready code

**Build Output:**
```
dist/
├── index.html
├── privacy-policy.html
├── terms-of-service.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── main.css (minified)
│   ├── global.css (minified)
│   └── ... (all CSS files)
├── js/
│   ├── config.js (minified)
│   ├── main.js (minified)
│   └── ... (all JS files)
└── images/
    └── ... (all images)
```

---

## 📤 Deploying to cPanel

### Option 1: File Manager (Recommended for First Time)

1. **Login to cPanel**
   - Go to your hosting provider's cPanel
   - Navigate to **File Manager**

2. **Navigate to public_html**
   - Click on `public_html` folder
   - This is your website's root directory

3. **Clear Existing Files (if updating)**
   - Select all files in `public_html`
   - Delete them (backup first if needed!)

4. **Upload dist Folder Contents**
   - Click **Upload** button
   - Select ALL files from your local `dist/` folder
   - Wait for upload to complete
   - **IMPORTANT:** Upload the CONTENTS of dist/, not the dist folder itself

5. **Verify Structure**
   ```
   public_html/
   ├── index.html
   ├── privacy-policy.html
   ├── terms-of-service.html
   ├── robots.txt
   ├── sitemap.xml
   ├── css/ (folder)
   ├── js/ (folder)
   └── images/ (folder)
   ```

6. **Test Your Website**
   - Visit: `https://rootsdentalspeciality.com`
   - Check all pages load correctly
   - Test navigation and links
   - Test booking modal
   - Check mobile responsiveness

---

### Option 2: FTP/SFTP (Faster for Updates)

1. **Connect via FTP Client** (FileZilla, Cyberduck, etc.)
   - Host: `ftp.yourdomain.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to public_html**

3. **Upload dist/ Contents**
   - Drag and drop all files from `dist/` folder
   - Overwrite existing files

---

## 🔧 Backend Server Deployment

The booking system requires a separate Node.js server for Google Calendar integration.

### Option 1: Deploy Backend on Same cPanel (Node.js App)

1. **Setup Node.js Application** (if cPanel supports it)
   - Go to cPanel → **Setup Node.js App**
   - Create new application
   - Upload `server/` folder contents
   - Set entry point: `server.js`
   - Install dependencies
   - Start application

2. **Update config.js**
   - Update `FRONTEND_URL` to your domain
   - Add Google Calendar credentials

### Option 2: Deploy Backend on Separate Service (Recommended)

**Heroku, Railway, Render, etc.**

1. Deploy server folder to hosting service
2. Get deployed server URL (e.g., `https://your-backend.herokuapp.com`)
3. Update frontend booking.js with backend URL
4. Rebuild and redeploy frontend

---

## ⚙️ Post-Deployment Configuration

### 1. Update Domain in Files (if needed)

If deploying to a different domain, update in `js/config.js`:
```javascript
// Update domain references if needed
```

### 2. Verify SSL Certificate

- Ensure HTTPS is enabled
- Check certificate is valid
- Test all pages load over HTTPS

### 3. Test All Features

- ✅ Navigation links
- ✅ Smooth scrolling
- ✅ Hash URLs (#services, #about)
- ✅ Theme toggle (dark/light mode)
- ✅ Mobile menu
- ✅ Booking modal
- ✅ WhatsApp button
- ✅ Social media links
- ✅ Google Reviews widget
- ✅ Footer links
- ✅ Privacy/Terms pages

### 4. SEO Verification

- Submit sitemap to Google Search Console
- Test robots.txt: `yourdomain.com/robots.txt`
- Test sitemap: `yourdomain.com/sitemap.xml`
- Run Google Rich Results Test
- Check meta tags with view-source

---

## 🔄 Updating the Website

### For Content Changes

1. Edit files locally
2. Test changes at `http://localhost:8000`
3. Run `npm run build`
4. Upload new `dist/` contents to cPanel

### For Quick Fixes

- Can edit directly in cPanel File Manager
- But always update source files too!
- Rebuild to keep dist in sync

---

## 📊 Performance Tips

### Already Optimized ✅

- Minified CSS (~35% smaller)
- Minified JavaScript (~25% smaller)
- Optimized images
- Lazy loading for reviews
- Efficient animations
- Clean code structure

### Additional Optimizations (Optional)

1. **Enable Gzip Compression**
   - Add to `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
   </IfModule>
   ```

2. **Browser Caching**
   - Add to `.htaccess`:
   ```apache
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

3. **Image Optimization**
   - Use WebP format for images
   - Compress images before upload
   - Use CDN for images (optional)

---

## 🐛 Troubleshooting

### Issue: Blank Page After Deployment

**Solution:**
- Check browser console for errors
- Verify all file paths are relative
- Check File Manager that all files uploaded
- Clear browser cache

### Issue: CSS Not Loading

**Solution:**
- Check `css/` folder exists in public_html
- Verify file permissions (644 for files, 755 for folders)
- Check browser Network tab for 404 errors

### Issue: Booking Modal Not Working

**Solution:**
- Check backend server is running
- Verify CORS settings in server
- Check browser console for API errors
- Test backend URL directly

### Issue: Images Not Showing

**Solution:**
- Check `images/` folder uploaded correctly
- Verify image file names match exactly (case-sensitive)
- Check file permissions

---

## 📞 Support

For deployment issues:
1. Check browser console for errors
2. Check cPanel Error Log
3. Verify all files are uploaded
4. Test in incognito mode (clears cache)

---

## ✅ Deployment Checklist

Before going live:

- [ ] Build completes without errors
- [ ] All files uploaded to public_html
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Privacy/Terms pages accessible
- [ ] Mobile menu functions
- [ ] Theme toggle works
- [ ] Booking modal opens
- [ ] Social media links correct
- [ ] robots.txt accessible
- [ ] sitemap.xml accessible
- [ ] SSL certificate active
- [ ] Google Search Console configured
- [ ] Analytics tracking added (if needed)

---

**🎉 Your website is now live and production-ready!**
