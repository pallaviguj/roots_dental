/**
 * Service detail page — hydrates content from ?slug=
 * Renders local config.js by default; Sanity only when already cached.
 * Background fetch warms the cache for the next visit.
 */

import { site, data } from './config.js';
import { getServiceBySlug, peekServiceBySlug } from './sanity-client.js';

const createElement = (tag, attrs = {}, text = '') => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => {
        el[key] = val;
    });
    if (text) el.textContent = text;
    return el;
};

const getSlug = () => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('slug') || '').trim();
};

const paintService = (service) => {
    document.title = `${service.name} - ${site.businessName}`;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
        meta.content = service.intro;
    }

    const titleEl = document.getElementById('serviceTitle');
    const introEl = document.getElementById('serviceIntro');
    const gridEl = document.getElementById('serviceImageGrid');

    if (titleEl) titleEl.textContent = service.name;
    if (introEl) introEl.textContent = service.intro;

    if (gridEl && Array.isArray(service.images)) {
        const nextSignature = service.images.map((image) => image.src).join('|');
        if (gridEl.dataset.images !== nextSignature) {
            gridEl.dataset.images = nextSignature;
            gridEl.innerHTML = '';
            service.images.forEach((image, index) => {
                const figure = createElement('figure', {
                    className: `service-grid-item service-grid-item-${index + 1}`
                });
                const img = createElement('img', {
                    src: image.src,
                    alt: image.alt || `${service.name} at ${site.businessName}`,
                    loading: index < 2 ? 'eager' : 'lazy'
                });
                figure.appendChild(img);
                gridEl.appendChild(figure);
            });
        }
    }

    const treatmentSelect = document.getElementById('treatment');
    if (treatmentSelect && service.slug === 'root-canal-treatments') {
        treatmentSelect.value = 'Root Canal Treatment';
    }
};

const hydrateServicePage = async () => {
    if (!document.getElementById('serviceTitle')) return;

    const slug = getSlug();
    if (!slug) {
        window.location.replace('/#services');
        return;
    }

    const local = data.services.find((service) => service.slug === slug) || null;
    const cached = peekServiceBySlug(slug);

    // Prefer cached Sanity only when available; otherwise use local fallback
    if (cached) {
        paintService(cached);
        getServiceBySlug(slug).catch((error) => {
            console.error('Error warming service cache from Sanity:', error);
        });
        return;
    }

    if (local) {
        paintService(local);
        getServiceBySlug(slug).catch((error) => {
            console.error('Error warming service cache from Sanity:', error);
        });
        return;
    }

    // CMS-only service with no local fallback and no cache yet
    try {
        const fresh = await getServiceBySlug(slug);
        if (fresh) {
            paintService(fresh);
            return;
        }
    } catch (error) {
        console.error('Error loading service from Sanity:', error);
    }

    window.location.replace('/#services');
};

document.addEventListener('DOMContentLoaded', hydrateServicePage);
