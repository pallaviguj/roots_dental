# Sanity Blog Setup Guide

This guide will help you set up the Sanity CMS for your blog.

## 📋 Prerequisites

- Node.js 20+ installed (currently using 18.20.4, consider upgrading)
- A Sanity account (free tier available)

## 🚀 Quick Setup

### Step 1: Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in (use owner's email: `pallavi.gujrati@gmail.com`)
3. Click "Create new project"
4. Give it a name: "Roots Dental Blog"
5. Choose dataset: "production"
6. Note your **Project ID** (you'll need this later)

### Step 2: Set Up Sanity Studio

You have two options:

#### Option A: Use Sanity's Hosted Studio (Easiest)
1. From your Sanity project dashboard, click "Launch Studio"
2. Sanity will host the studio at: `your-project.sanity.studio`
3. This is free and requires no setup!

#### Option B: Self-Host Studio (Advanced)
```bash
# In a separate folder (not in this project)
npm create sanity@latest -- --template clean --create-project "Roots Dental Blog" --dataset production

# Follow the prompts
# Deploy the studio
npm run deploy
```

### Step 3: Configure Blog Schema

In your Sanity Studio, add this schema for blog posts:

1. Go to your studio
2. Navigate to "Schemas" or create `schemas/post.js`:

```javascript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary (150-200 characters)'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    }
  }
}
```

3. Create `schemas/author.js`:

```javascript
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4
    }
  ]
}
```

4. Create `schemas/category.js`:

```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
```

5. Create `schemas/blockContent.js`:

```javascript
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'}
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: {hotspot: true}
    }
  ]
}
```

### Step 4: Update Website Configuration

1. Open `js/sanity-client.js`
2. Replace `YOUR_PROJECT_ID` with your actual Project ID from Step 1:

```javascript
const sanityConfig = {
    projectId: 'abc123xyz', // ← Your Project ID here
    dataset: 'production',
    apiVersion: '2024-01-29',
    useCdn: true,
};
```

### Step 5: Make API Public (Required)

1. Go to your Sanity project settings: `sanity.io/manage`
2. Navigate to "API" → "CORS Origins"
3. Add your website domains:
   - `https://rootsdental-source.surge.sh`
   - `https://www.rootsdentalspeciality.com` (your production domain)
   - `http://localhost:3000` (for local development)
4. Click "Add CORS origin"

### Step 6: Create Your First Blog Post

1. Open Sanity Studio
2. Create an Author:
   - Name: "Dr. Aarti Bohora"
   - Upload a photo
   - Add bio: "Root canal specialist with 15+ years of experience"
3. Create a Category:
   - Title: "Dental Tips"
   - Slug: "dental-tips"
4. Create a Blog Post:
   - Title: "5 Tips for Healthy Teeth"
   - Generate slug from title
   - Add excerpt
   - Select author: Dr. Aarti Bohora
   - Upload a main image
   - Select category: Dental Tips
   - Set published date to today
   - Write content in the body editor
5. Click "Publish"

### Step 7: Build and Deploy

```bash
# Build the website
npm run build

# Deploy to Surge
surge dist rootsdental-source.surge.sh
```

## 🎨 Content Guidelines

### Blog Post Best Practices

1. **Titles**: Keep under 60 characters for SEO
2. **Excerpts**: 150-200 characters, engaging summary
3. **Images**: 
   - Main image: 1200x630px (optimal for social sharing)
   - In-body images: 800px wide minimum
   - Use JPG for photos, PNG for graphics
4. **Content Length**: 800-1500 words for dental topics
5. **Categories**: Use consistently (Dental Tips, Clinic Updates, Treatments, etc.)

### Suggested Blog Topics

- Root canal myths and facts
- Daily oral hygiene tips
- What to expect during your first visit
- Cosmetic dentistry options
- Emergency dental care guide
- Children's dental health
- Post-treatment care instructions
- Clinic technology updates

## 🔧 Troubleshooting

### Blog posts not showing?
1. Check Project ID in `sanity-client.js`
2. Verify CORS origins are added
3. Make sure posts are published (not drafts)
4. Check browser console for errors

### Images not loading?
- Ensure images are uploaded in Sanity Studio
- Check image field is named `mainImage` in schema
- Verify asset URLs are accessible

### Need help?
- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://slack.sanity.io/

## 📱 Owner Quick Reference

**To add a blog post:**
1. Go to your Sanity Studio URL https://roots-dental-blog.sanity.studio/
Click "Sign in with Google"
Select your email: pallavi.gujrati@gmail.com
You'll see the Sanity Studio dashboard
2. Find Your Content 📂
To Edit an Existing Post:
Click "Blog Post" in the left sidebar
You'll see a list of all your posts
Click on the post you want to edit
To Create a New Post:
Click "Blog Post" in the left sidebar
Click the "+" button (or "Create new Blog Post")
Step 3: Write & Add Images ✍️
Fill in these fields:
Title - Your blog post headline
Slug - Click "Generate" button (creates the URL)
Excerpt - Short summary (2-3 sentences)
Author - Click "Select" → Choose "Dr. Aarti Bohora"
Main Image - Click "Upload" → Choose image from computer
Categories - Click "Add item" → Select category (e.g., "Dental Tips")
Published At - Click calendar → Select today's date
Body - Write your article (works like Microsoft Word)
Use toolbar to make text bold, italic, add headings
Add links, lists, images
Step 4: Publish 🚀
3. Fill in title, excerpt, content
4. Upload image
5. Set publish date
6. Click "Publish"


**Your post will appear on the website within ~30 seconds!**

## 🎓 Training for Owner

Once set up, you can schedule a training session to:
- Show how to create/edit posts
- How to upload and manage images
- How to use the rich text editor
- How to preview posts before publishing
- How to schedule posts for future dates

## 🆓 Free Tier Limits

Sanity free tier includes:
- 3 users
- Unlimited documents
- 5GB bandwidth/month
- 10GB assets

This is more than enough for a dental clinic blog!
