/**
 * Sanity Client Configuration
 * Connects to Sanity.io for blog + service content
 */

import { createClient } from '@sanity/client';

const sanityConfig = {
    projectId: '0i5dsfwt',
    dataset: 'production',
    apiVersion: '2024-01-29',
    useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const serviceFields = `
    _id,
    name,
    "slug": slug.current,
    description,
    intro,
    order,
    images[]{
        alt,
        asset->{url, metadata{dimensions}}
    }
`;

export const queries = {
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

    recentPosts: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage{
            asset->{url}
        }
    }`,

    allServices: `*[_type == "service" && !(_id in path("drafts.**"))] | order(order asc, name asc) {
        ${serviceFields}
    }`,

    serviceBySlug: (slug) => `*[_type == "service" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
        ${serviceFields}
    }`,
};

/** Normalize Sanity service docs to the site's { slug, name, description, intro, images:[{src,alt}] } shape */
export function normalizeService(doc) {
    if (!doc || !doc.slug || !doc.name) return null;

    const images = (doc.images || [])
        .map((image) => {
            const src = image?.asset?.url;
            if (!src) return null;
            return {
                src,
                alt: image.alt || doc.name,
            };
        })
        .filter(Boolean);

    return {
        slug: doc.slug,
        name: doc.name,
        description: doc.description || '',
        intro: doc.intro || '',
        images,
    };
}

export async function getAllPosts() {
    try {
        return await sanityClient.fetch(queries.allPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug) {
    try {
        return await sanityClient.fetch(queries.postBySlug(slug));
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

export async function getRecentPosts() {
    try {
        return await sanityClient.fetch(queries.recentPosts);
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        return [];
    }
}

export async function getAllServices() {
    try {
        const docs = await sanityClient.fetch(queries.allServices);
        return (docs || []).map(normalizeService).filter(Boolean);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getServiceBySlug(slug) {
    try {
        const doc = await sanityClient.fetch(queries.serviceBySlug(slug));
        return normalizeService(doc);
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getImageUrl(imageAsset) {
    if (!imageAsset || !imageAsset.asset) return '/images/placeholder-blog.png';
    return imageAsset.asset.url;
}
