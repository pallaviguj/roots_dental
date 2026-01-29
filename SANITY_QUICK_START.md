# Quick Start: Sanity Studio Setup (No Local Installation)

Since Node.js 18 doesn't support the latest Sanity CLI, use Sanity's **hosted studio** instead!

## ✅ Your Configuration

- **Project ID:** `0i5dsfwt` ✓ (already configured in `js/sanity-client.js`)
- **Dataset:** `production`
- **Studio URL:** https://0i5dsfwt.sanity.studio

---

## 🚀 Step-by-Step Setup

### Step 1: Access Your Sanity Studio

1. Go to: **https://www.sanity.io/manage**
2. Log in with your account
3. Click on your project (ID: `0i5dsfwt`)
4. Click **"Studio"** in the left sidebar
5. This opens your hosted studio at: **https://0i5dsfwt.sanity.studio**

### Step 2: Configure CORS (REQUIRED!)

1. In the Sanity dashboard, go to **"Settings"** → **"API"**
2. Click **"CORS Origins"**
3. Click **"Add CORS Origin"**
4. Add these URLs (one at a time):
   - `https://rootsdental-source.surge.sh`
   - `https://www.rootsdentalspeciality.com`
   - `http://localhost:3000`
5. Check **"Allow credentials"** for each
6. Click **"Save"**

### Step 3: Add Blog Schema

**Option A: Use Sanity's Template (Easiest)**

1. In your project dashboard, go to **"Templates"** or **"Blueprints"**
2. Search for "Blog" template
3. Install it - this adds Author, Category, and Post schemas automatically

**Option B: Manual Setup via Studio**

1. Go to your studio: https://0i5dsfwt.sanity.studio
2. Click the **settings/config icon**
3. Look for **"Schema"** or **"Vision"** tool
4. You may need to deploy schema via Sanity's web interface

**Option C: Create Types Manually in Dashboard**

1. In dashboard, go to **"Schema"**
2. Click **"Add document type"**
3. Create these types:

#### Author Type:
```
Name: author
Title: Author
Fields:
  - name (string, required)
  - slug (slug from name)
  - image (image)
  - bio (text)
```

#### Category Type:
```
Name: category
Title: Category
Fields:
  - title (string, required)
  - slug (slug from title)
  - description (text)
```

#### Post Type:
```
Name: post
Title: Blog Post
Fields:
  - title (string, required)
  - slug (slug from title, required)
  - excerpt (text, 3 rows)
  - author (reference to author)
  - mainImage (image with hotspot)
  - categories (array of references to category)
  - publishedAt (datetime, required)
  - body (block content)
```

### Step 4: Create Your First Content

**Create an Author:**
1. Open Studio: https://0i5dsfwt.sanity.studio
2. Click **"Create"** → **"Author"**
3. Fill in:
   - Name: `Dr. Aarti Bohora`
   - Slug: Click "Generate" (creates `dr-aarti-bohora`)
   - Upload a photo
   - Bio: `Root canal specialist with 15+ years of experience in conservative dentistry and endodontics.`
4. Click **"Publish"**

**Create a Category:**
1. Click **"Create"** → **"Category"**
2. Fill in:
   - Title: `Dental Tips`
   - Slug: Click "Generate" (creates `dental-tips`)
   - Description: `Helpful tips for maintaining healthy teeth`
3. Click **"Publish"**

**Create Your First Blog Post:**
1. Click **"Create"** → **"Post"**
2. Fill in:
   - Title: `5 Tips for Maintaining Healthy Teeth`
   - Slug: Click "Generate"
   - Excerpt: `Discover simple daily habits that can keep your teeth strong and healthy. Learn from our expert endodontist.`
   - Author: Select `Dr. Aarti Bohora`
   - Main Image: Upload a dental-related image (teeth, smile, clinic)
   - Categories: Select `Dental Tips`
   - Published At: Click calendar, select today
   - Body: Write your content using the rich text editor
3. Click **"Publish"**

### Step 5: Test on Your Website

1. Wait 30 seconds for CDN to update
2. Visit: **https://rootsdental-source.surge.sh/blog.html**
3. Your post should appear! 🎉

---

## 📱 For the Owner

**To add blog posts (after initial setup):**

1. Go to: https://0i5dsfwt.sanity.studio
2. Log in
3. Click **"Create"** → **"Post"**
4. Write title and content (like using Microsoft Word)
5. Upload image
6. Select author and category
7. Set publish date
8. Click **"Publish"**

**Post appears on website in ~30 seconds!**

---

## 🔧 Alternative: Upgrade Node.js (Optional)

If you want to run the studio locally in the future:

```bash
# Check current version
node --version  # Currently: v18.20.4

# Upgrade using nvm (if installed)
nvm install 20
nvm use 20

# Or download from nodejs.org
# Visit: https://nodejs.org/ and download v20 LTS
```

Then you could run:
```bash
npm create sanity@latest
```

---

## 📚 Resources

- **Your Studio:** https://0i5dsfwt.sanity.studio
- **Dashboard:** https://www.sanity.io/manage
- **Documentation:** https://www.sanity.io/docs
- **Schema Guide:** https://www.sanity.io/docs/schema-types

---

## ✅ Next Steps

1. ✅ Project ID configured (`0i5dsfwt`)
2. ⏳ Add CORS origins (required!)
3. ⏳ Set up schema (author, category, post)
4. ⏳ Create first blog post
5. ⏳ Test on website

**The blog pages are already live and waiting for content!**

Visit: https://rootsdental-source.surge.sh/blog.html
