/**
 * Blog Post Detail Page Logic
 * Handles individual blog post display
 */

import {
    getPostBySlug,
    getRecentPosts,
    peekPostBySlug,
    peekRecentPosts,
    formatDate,
    getImageUrl
} from './sanity-client.js';
import './components.js';
import './theme.js';

function getSlugFromURL() {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        if (slug && slug !== 'blog.html' && slug !== 'blog-post.html') {
            return slug;
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

const getSiteConfig = () => window.site || { businessName: 'Roots Dental Speciality Clinic' };

function renderPortableText(blocks) {
    if (!blocks) return '';

    return blocks.map(block => {
        if (block._type === 'block') {
            const text = block.children.map(child => child.text).join('');

            switch (block.style) {
                case 'h2':
                    return `<h2>${text}</h2>`;
                case 'h3':
                    return `<h3>${text}</h3>`;
                case 'h4':
                    return `<h4>${text}</h4>`;
                case 'blockquote':
                    return `<blockquote>${text}</blockquote>`;
                default:
                    return `<p>${text}</p>`;
            }
        } else if (block._type === 'image') {
            const src = block.asset?.url
                ? `${block.asset.url}${block.asset.url.includes('?') ? '&' : '?'}w=1200&auto=format&q=75`
                : '';
            return `<img src="${src}" alt="${block.alt || ''}" loading="lazy" decoding="async" />`;
        }
        return '';
    }).join('');
}

function paintPost(postContainer, post) {
    const site = getSiteConfig();
    document.title = `${post.title} - ${site.businessName}`;

    postContainer.innerHTML = `
        <article class="blog-post container">
            <header class="post-header">
                <div class="post-back-link">
                    <a href="/blog" class="btn">← Back to Blog</a>
                </div>
                <div class="post-meta">
                    <time datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
                    ${post.categories ? `
                        <span class="post-categories">
                            ${post.categories.map(cat => `<span class="post-category">${cat.title}</span>`).join('')}
                        </span>
                    ` : ''}
                </div>
                <h1 class="post-title">${post.title}</h1>
                ${post.excerpt ? `<p class="post-excerpt">${post.excerpt}</p>` : ''}
                ${post.author ? `<p class="post-author-name">By ${post.author.name}</p>` : ''}
            </header>

            ${post.mainImage ? `
                <div class="post-featured-image">
                    <img src="${getImageUrl(post.mainImage, { width: 1200 })}" alt="${post.title}" decoding="async" fetchpriority="high">
                </div>
            ` : ''}

            <div class="post-body">
                ${post.body ? renderPortableText(post.body) : '<p>Content coming soon...</p>'}
            </div>
        </article>
    `;
}

function paintNotFound(postContainer) {
    postContainer.innerHTML = `
        <div class="error-message">
            <h2>Post not found</h2>
            <p>The blog post you're looking for doesn't exist.</p>
            <a href="/blog" class="btn">← Back to Blog</a>
        </div>
    `;
}

function paintSidebar(sidebarContainer, recentPosts) {
    if (!recentPosts.length) return;

    sidebarContainer.innerHTML = `
        <div class="sidebar-widget">
            <h3>Recent Posts</h3>
            <ul class="recent-posts-list">
                ${recentPosts.map(post => `
                    <li>
                        <a href="/blog/${post.slug.current}">
                            ${post.mainImage ? `<img src="${getImageUrl(post.mainImage, { width: 160 })}" alt="${post.title}" loading="lazy" decoding="async">` : ''}
                            <div>
                                <h4>${post.title}</h4>
                                <time>${formatDate(post.publishedAt)}</time>
                            </div>
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

async function renderBlogPost() {
    const slug = getSlugFromURL();
    const postContainer = document.querySelector('.post-content');
    const sidebarContainer = document.querySelector('.blog-sidebar');

    if (!postContainer) {
        console.error('Post container not found');
        return;
    }

    if (!slug) {
        paintNotFound(postContainer);
        return;
    }

    const cachedPost = peekPostBySlug(slug);
    const cachedRecent = peekRecentPosts();

    if (cachedPost) {
        paintPost(postContainer, cachedPost);
    } else {
        postContainer.innerHTML = '<p class="loading-text">Loading post...</p>';
    }

    if (sidebarContainer && cachedRecent?.length) {
        paintSidebar(sidebarContainer, cachedRecent);
    }

    try {
        const [post, recentPosts] = await Promise.all([
            getPostBySlug(slug, {
                onUpdate: (fresh) => {
                    if (fresh) paintPost(postContainer, fresh);
                }
            }),
            getRecentPosts({
                onUpdate: (fresh) => {
                    if (sidebarContainer && fresh?.length) paintSidebar(sidebarContainer, fresh);
                }
            })
        ]);

        if (!post) {
            if (!cachedPost) paintNotFound(postContainer);
            return;
        }

        paintPost(postContainer, post);

        if (sidebarContainer && recentPosts.length) {
            paintSidebar(sidebarContainer, recentPosts);
        }
    } catch (error) {
        console.error('Error rendering blog post:', error);
        if (!cachedPost) {
            postContainer.innerHTML = `
                <div class="error-message">
                    <h2>Unable to load post</h2>
                    <p>Please check your connection and try again later.</p>
                    <a href="/blog" class="btn">← Back to Blog</a>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPost();
});
