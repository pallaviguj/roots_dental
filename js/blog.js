/**
 * Blog Page Logic
 * Handles blog listing page
 */

import { getAllPosts, formatDate, getImageUrl } from './sanity-client.js';
import './components.js';
import './theme.js';

// Render blog posts list
async function renderBlogPosts() {
    const postsContainer = document.getElementById('blogPostsContainer');
    
    if (!postsContainer) return;

    // Show loading state
    postsContainer.innerHTML = '<p class="loading-text">Loading blog posts...</p>';

    try {
        const posts = await getAllPosts();

        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-posts">
                    <h3>No blog posts yet</h3>
                    <p>Check back soon for dental health tips and clinic updates!</p>
                </div>
            `;
            return;
        }

        // Render posts
        postsContainer.innerHTML = posts.map(post => `
            <article class="blog-card">
                <a href="/blog/${post.slug.current}" class="blog-card-link">
                    <div class="blog-card-image">
                        <img src="${getImageUrl(post.mainImage)}" alt="${post.title}" loading="lazy">
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

    } catch (error) {
        console.error('Error rendering blog posts:', error);
        postsContainer.innerHTML = `
            <div class="error-message">
                <h3>Unable to load blog posts</h3>
                <p>Please check your connection and try again later.</p>
            </div>
        `;
    }
}

// Initialize blog page
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});
