# Google Reviews Widget Setup Guide

This guide will help you integrate Google Reviews into your Roots Dental website using easy widget solutions.

## 🎯 Quick Start - Choose Your Option

You have **2 easy options** to display Google Reviews on your website. No coding required!

---

## ✨ Option 1: Elfsight Widget (Recommended)

**Best for:** Beautiful, customizable reviews with advanced features

### Features:
- ✅ Auto-syncs with Google Reviews
- ✅ Beautiful, professional design
- ✅ Fully customizable colors & layout
- ✅ Mobile responsive
- ✅ Filter reviews by rating
- ✅ Show/hide reviewer photos
- 💰 **Free plan available** (with small "Powered by Elfsight" badge)
- 💰 **Paid plans from $5/month** (remove branding, more features)

### Setup Steps:

1. **Go to Elfsight:**
   - Visit: https://elfsight.com/google-reviews-widget/
   - Click "Get Started" or "Add to Website"

2. **Sign Up:**
   - Create a free account (email + password)
   - Or sign in with Google

3. **Connect Your Google Business:**
   - Search for: "Roots Dental Speciality Clinic Nashik"
   - Select your business from the list
   - Authorize the connection

4. **Customize Your Widget:**
   - Choose layout (Grid, List, Slider, etc.)
   - Select number of reviews to display
   - Customize colors to match your site (use your teal/dark theme)
   - Preview in real-time

5. **Get Your Widget ID:**
   - Click "Add to Website"
   - You'll see code like: `<div class="elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"></div>`
   - Copy the part after `elfsight-app-` (your widget ID)

6. **Add to Your Website (Easy Configuration):**
   - Open `/Users/pallavi.gujrati/Projects/roots_dental/js/config.js`
   - Find the line: `elfsightWidgetId: '952e9a06-e58c-4631-9306-d3393f926a09'`
   - Replace the widget ID with your new one
   - Save the file - that's it!

**Example:**
```javascript
// In config.js
const site = {
    // ... other config ...
    
    // Reviews Widget
    elfsightWidgetId: 'a1b2c3d4-5678-90ef-ghij-klmnopqrstuv', // Your new widget ID
    
    // ... rest of config ...
};
```

**Current Widget ID:** `952e9a06-e58c-4631-9306-d3393f926a09`

✅ **The widget loads automatically!** No need to edit HTML - JavaScript handles it dynamically.

---

## 🆓 Option 2: Google's Free Embedded Map & Reviews

**Best for:** 100% free, official Google solution (but less customizable)

### Features:
- ✅ Completely free
- ✅ Official Google widget
- ✅ Shows map + reviews
- ✅ Always up-to-date
- ❌ Limited styling options
- ❌ Shows full map (not just reviews)

### Setup Steps:

1. **Find Your Business on Google Maps:**
   - Go to: https://www.google.com/maps
   - Search for: "Roots Dental Speciality Clinic Nashik" or "472, Bohora Bhavan, Raviwar Peth, Nashik"
   - Click on your business listing

2. **Get Embed Code:**
   - Click the **"Share"** button
   - Click **"Embed a map"** tab
   - Select size (Medium or Large recommended)
   - Click **"Copy HTML"**

3. **Add to Your Website:**
   - Open `/Users/pallavi.gujrati/Projects/roots_dental/index.html`
   - Find the `<!-- OPTION 2: Google's Free Embedded Reviews -->` section (around line 128)
   - Replace the entire `<iframe>` tag with your copied code
   - Uncomment the section (remove `<!--` and `-->`)
   - Delete or comment out the placeholder section at the bottom

**Example of what you'll get:**
```html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!..." 
    width="100%" 
    height="450" 
    style="border:0; border-radius: var(--radius-lg);" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

---

## 📋 Step-by-Step Implementation (After Choosing)

### Once you have your widget code:

1. **For Elfsight Widget (Recommended):**
   ```bash
   # Navigate to your project
   cd /Users/pallavi.gujrati/Projects/roots_dental
   
   # Open js/config.js in your editor
   ```
   
   - Find: `elfsightWidgetId: '952e9a06-e58c-4631-9306-d3393f926a09'`
   - Replace with your widget ID
   - Save - done! ✅

2. **For Google Embed (Alternative):**
   - Open `index.html`
   - Find `id="reviewsWidgetContainer"`
   - Replace the container contents with your Google Maps embed iframe
   - Save the file

3. **Test Your Changes:**
   ```bash
   # If using VS Code or similar
   # Right-click index.html > Open with Live Server
   # Or simply open the file in your browser
   ```

---

## 🎨 Customization Tips

### For Elfsight:
- Match your website colors in the Elfsight dashboard
- Use **Dark theme** to match your site
- Set primary color to: `#00BFA5` (your teal)
- Choose "Grid" or "List" layout for best appearance

### For Google Embed:
- The CSS is already optimized with:
  - Rounded corners (`border-radius`)
  - Responsive width (100%)
  - Box shadow for depth
  - Dark theme compatible

---

## 🔄 Updating Reviews

### Elfsight:
- Reviews auto-update every 24 hours
- Manual refresh available in dashboard
- Force refresh: Delete widget and re-add with same settings

### Google Embed:
- Updates automatically when users view the page
- Google caches reviews, so new reviews may take 1-2 hours to appear

---

## ❓ Troubleshooting

### "Widget not showing"
1. Check if you uncommented the code correctly
2. Verify your Widget ID has no extra spaces
3. Make sure you removed the placeholder section
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### "Wrong business showing in Elfsight"
1. Delete the widget in Elfsight dashboard
2. Re-create and search more specifically: "Roots Dental Speciality Clinic 472 Bohora Bhavan Nashik"

### "Google Embed shows map instead of reviews"
- This is normal - Google's embed shows both map AND reviews
- Users can click "View larger map" to see more reviews
- For reviews-only display, use Elfsight instead

---

## 💡 Recommendations

### **Go with Elfsight if:**
- You want beautiful, customizable reviews
- You're okay with $5/month for premium features
- You want to show ONLY reviews (no map)
- You want to filter by star rating

### **Go with Google Embed if:**
- You want a 100% free solution
- You're okay showing map + reviews together
- You don't need heavy customization

---

## 📞 Need Help?

If you run into issues:
1. Check the browser console (F12) for errors
2. Verify your Google Business Profile is claimed and has reviews
3. Make sure your business is public and visible on Google Maps

---

## ✅ Final Checklist

- [ ] Choose Elfsight or Google Embed
- [ ] Sign up / Get embed code
- [ ] Copy Widget ID or iframe code
- [ ] Edit index.html (uncomment your chosen option)
- [ ] Remove placeholder section
- [ ] Save file
- [ ] Test in browser
- [ ] Clear cache if needed
- [ ] Check on mobile too!

---

**Your reviews section is now ready! 🎉**

Once configured, your Google Reviews will automatically display on your website and update regularly.
