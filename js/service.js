/**
 * Service detail page — hydrates content from ?slug=
 */

import { site, data } from './config.js';

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

const hydrateServicePage = () => {
    const slug = getSlug();
    const service = data.services.find(s => s.slug === slug);

    if (!service) {
        window.location.replace('/#services');
        return;
    }

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
        gridEl.innerHTML = '';
        service.images.forEach((image, index) => {
            const figure = createElement('figure', {
                className: `service-grid-item service-grid-item-${index + 1}`
            });
            const img = createElement('img', {
                src: image.src,
                alt: image.alt || `${service.name} at ${site.businessName}`,
                loading: 'lazy'
            });
            figure.appendChild(img);
            gridEl.appendChild(figure);
        });
    }

    // Prefill treatment select when booking from this service
    const treatmentSelect = document.getElementById('treatment');
    if (treatmentSelect && service.slug === 'root-canal-treatments') {
        treatmentSelect.value = 'Root Canal Treatment';
    }
};

document.addEventListener('DOMContentLoaded', hydrateServicePage);
