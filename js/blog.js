/**
 * Blog Page Logic
 * Handles blog listing page
 */

import { getAllPosts, peekAllPosts, formatDate, getImageUrl } from './sanity-client.js';
import './components.js';
import './theme.js';

function renderPosts(postsContainer, posts) {
    postsContainer.innerHTML = posts.map(post => `
        <article class="blog-card">
            <a href="/blog/${post.slug.current}" class="blog-card-link">
                <div class="blog-card-image">
                    <img src="${getImageUrl(post.mainImage, { width: 640 })}" alt="${post.title}" loading="lazy" decoding="async">
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <time datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
                        ${post.categories ? `
                            <span class="blog-categories">
                                ${post.categories.map(cat => `<span class="blog-category">${cat.title}</span>`).join('')}
                            </span>
                        ` : ''}
                    </div>
                    <h3 class="blog-card-title">${post.title}</h3>
                    ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ''}
                    <span class="blog-read-more">Read More →</span>
                </div>
            </a>
        </article>
    `).join('');
}

function renderEmpty(postsContainer) {
    postsContainer.innerHTML = `
        <div class="no-posts">
            <h3>No blog posts yet</h3>
            <p>Check back soon for dental health tips and clinic updates!</p>
        </div>
    `;
}

function renderError(postsContainer) {
    postsContainer.innerHTML = `
        <div class="error-message">
            <h3>Unable to load blog posts</h3>
            <p>Please check your connection and try again later.</p>
        </div>
    `;
}

async function renderBlogPosts() {
    const postsContainer = document.getElementById('blogPostsContainer');
    if (!postsContainer) return;

    const cached = peekAllPosts();
    if (cached?.length) {
        renderPosts(postsContainer, cached);
    } else {
        postsContainer.innerHTML = '<p class="loading-text">Loading blog posts...</p>';
    }

    try {
        const posts = await getAllPosts({
            onUpdate: (fresh) => {
                if (fresh?.length) renderPosts(postsContainer, fresh);
                else if (!cached?.length) renderEmpty(postsContainer);
            }
        });

        if (!posts || posts.length === 0) {
            if (!cached?.length) renderEmpty(postsContainer);
            return;
        }

        renderPosts(postsContainer, posts);
    } catch (error) {
        console.error('Error rendering blog posts:', error);
        if (!cached?.length) renderError(postsContainer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});
