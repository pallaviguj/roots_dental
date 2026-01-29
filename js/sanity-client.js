/**
 * Sanity Client Configuration
 * Connects to Sanity.io for blog content
 */

import { createClient } from '@sanity/client';

// Sanity project configuration
// TODO: Replace these with your actual Sanity project details after setup
const sanityConfig = {
    projectId: '0i5dsfwt', // Get this from sanity.io/manage
    dataset: 'production',
    apiVersion: '2024-01-29',
    useCdn: true, // Use CDN for faster response (set to false for preview mode)
};

// Create Sanity client
export const sanityClient = createClient(sanityConfig);

// GROQ queries for blog posts
export const queries = {
    // Get all published posts (sorted by date, newest first)
    allPosts: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{name, image},
        mainImage{
            asset->{url, metadata{dimensions}}
        },
        categories[]->{title, slug}
    }`,

    // Get single post by slug
    postBySlug: (slug) => `*[_type == "post" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        body,
        author->{name, image, bio},
        mainImage{
            asset->{url, metadata{dimensions}}
        },
        categories[]->{title, slug}
    }`,

    // Get recent posts (limit 5)
    recentPosts: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage{
            asset->{url}
        }
    }`,
};

// Fetch all blog posts
export async function getAllPosts() {
    try {
        const posts = await sanityClient.fetch(queries.allPosts);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// Fetch single post by slug
export async function getPostBySlug(slug) {
    try {
        const post = await sanityClient.fetch(queries.postBySlug(slug));
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

// Fetch recent posts for sidebar
export async function getRecentPosts() {
    try {
        const posts = await sanityClient.fetch(queries.recentPosts);
        return posts;
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        return [];
    }
}

// Format date helper
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Get image URL helper
export function getImageUrl(imageAsset) {
    if (!imageAsset || !imageAsset.asset) return '/images/placeholder-blog.png';
    return imageAsset.asset.url;
}
