/**
 * Sanity Client Configuration
 * Connects to Sanity.io for blog + service content
 *
 * Caching: memory + localStorage with stale-while-revalidate.
 * Fresh hits resolve instantly; stale hits return cache and refresh in background.
 */

import { createClient } from '@sanity/client';

const sanityConfig = {
    projectId: '0i5dsfwt',
    dataset: 'production',
    apiVersion: '2024-01-29',
    useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const CACHE_PREFIX = 'rd-sanity:v1:';
const DEFAULT_TTL_MS = 30 * 60 * 1000; // 30 minutes
const memoryCache = new Map();
const inflight = new Map();

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

    postBySlug: (slug) => `*[_type == "post" && slug.current == $slug][0] {
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

    serviceBySlug: (slug) => `*[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        ${serviceFields}
    }`,
};

function cacheKey(key) {
    return `${CACHE_PREFIX}${key}`;
}

function readEntry(key) {
    if (memoryCache.has(key)) {
        return memoryCache.get(key);
    }

    try {
        const raw = localStorage.getItem(cacheKey(key));
        if (!raw) return null;
        const entry = JSON.parse(raw);
        if (!entry || typeof entry.expiresAt !== 'number') return null;
        memoryCache.set(key, entry);
        return entry;
    } catch {
        return null;
    }
}

function writeEntry(key, data, ttlMs = DEFAULT_TTL_MS) {
    const entry = {
        data,
        cachedAt: Date.now(),
        expiresAt: Date.now() + ttlMs,
    };
    memoryCache.set(key, entry);
    try {
        localStorage.setItem(cacheKey(key), JSON.stringify(entry));
    } catch {
        // Quota / private mode — memory cache still helps within the session
    }
    return entry;
}

/** Sync peek for instant first paint (may be stale). */
export function peekCache(key) {
    const entry = readEntry(key);
    return entry ? entry.data : null;
}

function isFresh(entry) {
    return entry && entry.expiresAt > Date.now();
}

async function revalidate(key, fetcher, ttlMs, onUpdate) {
    if (inflight.has(key)) return inflight.get(key);

    const promise = (async () => {
        try {
            const data = await fetcher();
            writeEntry(key, data, ttlMs);
            if (typeof onUpdate === 'function') {
                onUpdate(data);
            }
            return data;
        } finally {
            inflight.delete(key);
        }
    })();

    inflight.set(key, promise);
    return promise;
}

/**
 * Stale-while-revalidate fetch.
 * - Fresh cache: return immediately (optional quiet background refresh skipped)
 * - Stale cache: return immediately, refresh in background, call onUpdate when done
 * - Miss: await network
 */
async function cachedFetch(key, fetcher, { ttlMs = DEFAULT_TTL_MS, onUpdate } = {}) {
    const entry = readEntry(key);

    if (entry && isFresh(entry)) {
        return entry.data;
    }

    if (entry) {
        revalidate(key, fetcher, ttlMs, onUpdate).catch((error) => {
            console.error(`Background refresh failed for ${key}:`, error);
        });
        return entry.data;
    }

    try {
        const data = await revalidate(key, fetcher, ttlMs, onUpdate);
        return data;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return null;
    }
}

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

export function peekAllPosts() {
    return peekCache('allPosts');
}

export function peekPostBySlug(slug) {
    if (!slug) return null;
    return peekCache(`post:${slug}`);
}

export function peekRecentPosts() {
    return peekCache('recentPosts');
}

export function peekAllServices() {
    return peekCache('allServices');
}

export function peekServiceBySlug(slug) {
    if (!slug) return null;
    const all = peekAllServices();
    if (Array.isArray(all)) {
        const hit = all.find((service) => service.slug === slug);
        if (hit) return hit;
    }
    return peekCache(`service:${slug}`);
}

export async function getAllPosts({ onUpdate } = {}) {
    const data = await cachedFetch(
        'allPosts',
        () => sanityClient.fetch(queries.allPosts),
        { onUpdate }
    );
    return data || [];
}

export async function getPostBySlug(slug, { onUpdate } = {}) {
    if (!slug) return null;
    return cachedFetch(
        `post:${slug}`,
        () => sanityClient.fetch(queries.postBySlug(slug), { slug }),
        { onUpdate }
    );
}

export async function getRecentPosts({ onUpdate } = {}) {
    const data = await cachedFetch(
        'recentPosts',
        () => sanityClient.fetch(queries.recentPosts),
        { onUpdate }
    );
    return data || [];
}

export async function getAllServices({ onUpdate } = {}) {
    const data = await cachedFetch(
        'allServices',
        async () => {
            const docs = await sanityClient.fetch(queries.allServices);
            return (docs || []).map(normalizeService).filter(Boolean);
        },
        { onUpdate }
    );
    return data || [];
}

export async function getServiceBySlug(slug, { onUpdate } = {}) {
    if (!slug) return null;

    // Prefer the all-services cache when present (avoids a second network trip)
    const listEntry = readEntry('allServices');
    if (listEntry && Array.isArray(listEntry.data)) {
        const hit = listEntry.data.find((service) => service.slug === slug);
        if (hit) {
            if (!isFresh(listEntry)) {
                revalidate(
                    'allServices',
                    async () => {
                        const docs = await sanityClient.fetch(queries.allServices);
                        return (docs || []).map(normalizeService).filter(Boolean);
                    },
                    DEFAULT_TTL_MS,
                    (services) => {
                        const updated = (services || []).find((service) => service.slug === slug) || null;
                        if (updated) writeEntry(`service:${slug}`, updated);
                        if (typeof onUpdate === 'function') onUpdate(updated);
                    }
                ).catch((error) => {
                    console.error('Background service list refresh failed:', error);
                });
            }
            return hit;
        }
    }

    return cachedFetch(
        `service:${slug}`,
        async () => {
            const doc = await sanityClient.fetch(queries.serviceBySlug(slug), { slug });
            return normalizeService(doc);
        },
        { onUpdate }
    );
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/** Sanity image CDN URL with optional width for faster delivery */
export function getImageUrl(imageAsset, { width } = {}) {
    if (!imageAsset || !imageAsset.asset) return '/images/placeholder-blog.png';
    let url = imageAsset.asset.url;
    if (width && typeof url === 'string' && url.includes('cdn.sanity.io')) {
        const sep = url.includes('?') ? '&' : '?';
        url = `${url}${sep}w=${width}&auto=format&q=75`;
    }
    return url;
}
