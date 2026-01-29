/**
 * Blog Post Detail Page Logic
 * Handles individual blog post display
 */

import { getPostBySlug, getRecentPosts, formatDate, getImageUrl } from './sanity-client.js';
import './components.js';
import './theme.js';

// Get slug from URL (supports both /blog/slug and ?slug=slug)
function getSlugFromURL() {
    // First try to get from path (/blog/slug-name)
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').replace(/\/$/, '');
        if (slug && slug !== 'blog.html' && slug !== 'blog-post.html') {
            return slug;
        }
    }
    
    // Fallback to query parameter (?slug=slug-name)
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

// Get site config from window (set by components.js)
const getSiteConfig = () => window.site || { businessName: 'Roots Dental Speciality Clinic' };

// Convert Sanity's Portable Text (block content) to HTML
function renderPortableText(blocks) {
    if (!blocks) return '';
    
    // Simple converter - for full features, use @portabletext/to-html
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
            return `<img src="${block.asset?.url || ''}" alt="${block.alt || ''}" />`;
        }
        return '';
    }).join('');
}

// Render blog post
async function renderBlogPost() {
    const slug = getSlugFromURL();
    
    const postContainer = document.querySelector('.post-content');
    
    // Safety check - ensure element exists
    if (!postContainer) {
        console.error('Post container not found');
        return;
    }
    
    if (!slug) {
        postContainer.innerHTML = `
            <div class="error-message">
                <h2>Post not found</h2>
                <p>The blog post you're looking for doesn't exist.</p>
                <a href="/blog" class="btn">← Back to Blog</a>
            </div>
        `;
        return;
    }
    
    // Show loading
    postContainer.innerHTML = '<p class="loading-text">Loading post...</p>';

    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            postContainer.innerHTML = `
                <div class="error-message">
                    <h2>Post not found</h2>
                    <p>The blog post you're looking for doesn't exist.</p>
                    <a href="/blog" class="btn">← Back to Blog</a>
                </div>
            `;
            return;
        }

        // Update page title
        const site = getSiteConfig();
        document.title = `${post.title} - ${site.businessName}`;

        // Render post
        postContainer.innerHTML = `
            <article class="blog-post">
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
                        <img src="${getImageUrl(post.mainImage)}" alt="${post.title}">
                    </div>
                ` : ''}

                <div class="post-body">
                    ${post.body ? renderPortableText(post.body) : '<p>Content coming soon...</p>'}
                </div>
            </article>
        `;

        // Render sidebar (recent posts)
        await renderSidebar();

    } catch (error) {
        console.error('Error rendering blog post:', error);
        postContainer.innerHTML = `
            <div class="error-message">
                <h2>Unable to load post</h2>
                <p>Please check your connection and try again later.</p>
                <a href="/blog" class="btn">← Back to Blog</a>
            </div>
        `;
    }
}

// Render sidebar with recent posts
async function renderSidebar() {
    const sidebarContainer = document.querySelector('.blog-sidebar');
    if (!sidebarContainer) return;

    try {
        const recentPosts = await getRecentPosts();
        
        if (recentPosts.length > 0) {
            sidebarContainer.innerHTML = `
                <div class="sidebar-widget">
                    <h3>Recent Posts</h3>
                    <ul class="recent-posts-list">
                        ${recentPosts.map(post => `
                            <li>
                                <a href="/blog/${post.slug.current}">
                                    ${post.mainImage ? `<img src="${getImageUrl(post.mainImage)}" alt="${post.title}">` : ''}
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
    } catch (error) {
        console.error('Error rendering sidebar:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPost();
});
