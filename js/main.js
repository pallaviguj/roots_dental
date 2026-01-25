/**
 * Main Application Script
 * Traditional approach - HTML has structure, JS populates data
 */

// Initialize site on DOM load
document.addEventListener('DOMContentLoaded', () => {
    replaceTemplatePlaceholders();
    populateNavigation();
    populateTrustIndicators();
    populateServices();
    populateAboutUsGallery();
    populateAchievements();
    populateContact();
    populateFooter();
    initializeWhatsApp();
    initializeAppointmentForm();
    initializeReviewsWidget();
});

// Helper: Create element with attributes
const createElement = (tag, attrs = {}, text = '') => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => el[key] = val);
    if (text) el.textContent = text;
    return el;
};

// Helper: Set contact attributes for multiple elements
const setContact = (selector, attrs) => {
    document.querySelectorAll(selector).forEach(el => {
        Object.entries(attrs).forEach(([key, val]) => {
            key === 'text' ? el.textContent = val :
                key === 'html' ? el.innerHTML = val :
                    el[key] = val;
        });
    });
};

// Replace template placeholders {{site.*}}
const replaceTemplatePlaceholders = () => {
    const placeholderRegex = /\{\{site\.(\w+)\}\}/g;
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToReplace = [];
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (placeholderRegex.test(node.textContent)) {
            nodesToReplace.push(node);
        }
        placeholderRegex.lastIndex = 0;
    }

    nodesToReplace.forEach(node => {
        node.textContent = node.textContent.replace(placeholderRegex, (match, key) => {
            return site[key] !== undefined ? site[key] : match;
        });
    });

    // Also replace in attributes (like alt, title, src)
    document.querySelectorAll('[alt*="{{site."], [title*="{{site."], [src*="{{site."]').forEach(el => {
        ['alt', 'title', 'src'].forEach(attr => {
            if (el.hasAttribute(attr)) {
                el.setAttribute(attr, el.getAttribute(attr).replace(placeholderRegex, (match, key) => {
                    return site[key] !== undefined ? site[key] : match;
                }));
            }
        });
    });
};

// Populate Navigation Links
const populateNavigation = () => {
    const ul = document.querySelector('.nav-links');
    if (!ul) return;
    data.navLinks.forEach(link => {
        const li = createElement('li');
        const a = createElement('a', { href: '#' + link.href }, link.text);
        li.appendChild(a);
        ul.appendChild(li);
    });
};

// Populate Trust Indicators
const populateTrustIndicators = () => {
    const container = document.getElementById('trustBadges');
    if (!container) return;
    data.trustIndicators.forEach(item => {
        const span = createElement('span', { className: 'trust-badge' });
        const strong = createElement('strong', {}, item.value);
        span.appendChild(strong);
        span.appendChild(document.createTextNode(' ' + item.label));
        container.appendChild(span);
    });
};

// Populate Services
const populateServices = () => {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    data.services.forEach(service => {
        const card = createElement('div', { className: 'service-card' });
        const h3 = createElement('h3', {}, service.name);
        const p = createElement('p', {}, service.description);
        card.appendChild(h3);
        card.appendChild(p);
        grid.appendChild(card);
    });
};

// Populate About Us Gallery
const populateAboutUsGallery = () => {
    const gallery = document.getElementById('aboutUsGallery');
    if (!gallery) return;
    site.aboutUsGalleryImages.forEach(image => {
        const figure = createElement('figure', { className: 'gallery-item' });
        const img = createElement('img', {
            className: 'gallery-image',
            src: image.src,
            alt: `${site.businessName} - ${image.alt}`
        });
        figure.appendChild(img);
        gallery.appendChild(figure);
    });
};

// Populate Achievements
const populateAchievements = () => {
    const ul = document.getElementById('achievementsList');
    if (!ul) return;
    data.achievements.forEach(item => {
        const li = createElement('li');

        if (item.event && item.award) {
            li.textContent = item.event + ' – ';
            const award = createElement('span', { className: 'achievement-award' }, item.award);
            li.appendChild(award);
            if (item.category) {
                li.appendChild(document.createTextNode(' – '));
                const category = createElement('span', { className: 'achievement-category' }, item.category);
                li.appendChild(category);
            }
        } else if (item.award && item.event) {
            const award = createElement('span', { className: 'achievement-award' }, item.award);
            li.appendChild(award);
            li.appendChild(document.createTextNode(' – ' + item.event));
        } else if (item.title) {
            const title = createElement('span', { className: 'achievement-title' }, item.title);
            li.appendChild(title);
            if (item.details) {
                li.appendChild(document.createTextNode(' – ' + item.details));
            }
        }
        ul.appendChild(li);
    });
};

// Populate Contact Information
const populateContact = () => {
    setContact('[data-contact="phone"]', { text: site.phoneDisplay });
    setContact('[data-contact="phone-link"]', { href: `tel:${site.phoneRaw}`, text: site.phoneDisplay });
    setContact('[data-contact="email"]', { text: site.email });
    setContact('[data-contact="email-link"]', { href: `mailto:${site.email}`, text: site.email });
    setContact('[data-contact="address"]', { html: site.addressFull });
    setContact('[data-contact="address-link"]', { href: site.mapUrl });
    setContact('[data-contact="hours"]', { html: `${site.hoursWeekdays}<br>${site.hoursWeekend}` });
};

// Populate Footer
const populateFooter = () => {
    const copyright = document.getElementById('copyright');
    if (copyright) {
        copyright.textContent = `${site.copyrightYear} ${site.businessName}. ${site.copyrightText} | `;
        const privacy = createElement('a', { href: '#', className: 'footer-link' }, site.linkPrivacyPolicy);
        copyright.appendChild(privacy);
        copyright.appendChild(document.createTextNode(' | '));
        const terms = createElement('a', { href: '#', className: 'footer-link' }, site.linkTermsOfService);
        copyright.appendChild(terms);
    }

    const ul = document.getElementById('footerQuickLinks');
    if (ul) {
        data.footerQuickLinks.forEach(link => {
            const li = createElement('li', { className: 'footer-list-item' });
            const href = link.href === '#' ? '#' : '#' + link.href;
            const a = createElement('a', { href, className: 'footer-link' }, link.text);
            if (link.onclick) a.setAttribute('onclick', link.onclick);
            li.appendChild(a);
            ul.appendChild(li);
        });
    }
};

// Initialize Google Calendar Scheduling iframe
const initializeAppointmentForm = () => {
    const iframe = document.getElementById('googleCalendarScheduling');
    if (iframe && site.googleCalendarSchedulingUrl) {
        iframe.src = site.googleCalendarSchedulingUrl;
    }
};

// Initialize WhatsApp Button
const initializeWhatsApp = () => {
    const btn = document.getElementById('whatsappBtn');
    if (btn) {
        btn.href = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(site.whatsappMessage + ' at ' + site.businessName)}`;
        btn.setAttribute('data-tooltip', site.whatsappTooltip);
    }
};

// Initialize Reviews Widget (Elfsight)
const initializeReviewsWidget = () => {
    const container = document.getElementById('reviewsWidgetContainer');
    if (!container || !site.elfsightWidgetId) return;

    // Load Elfsight script
    const script = createElement('script', {
        src: 'https://static.elfsight.com/platform/platform.js',
        defer: true
    });
    script.setAttribute('data-use-service-core', '');
    document.head.appendChild(script);

    // Create widget div with dynamic ID from config
    const widgetDiv = createElement('div', {
        className: `elfsight-app-${site.elfsightWidgetId}`
    });
    widgetDiv.setAttribute('data-elfsight-app-lazy', '');
    container.appendChild(widgetDiv);
};

// Modal Controls
const openAppointmentModal = () => {
    const modal = document.getElementById('appointmentModal');
    if (modal) modal.classList.add('active');
};

const closeAppointmentModal = () => {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.remove('active');
        // Reset form if it exists
        const form = document.getElementById('bookingForm');
        if (form) form.reset();
        // Clear time slots
        const slots = document.getElementById('timeSlots');
        if (slots) slots.innerHTML = '<p class="helper-text">Please select a date to see available time slots</p>';
        // Disable submit button
        const submitBtn = document.getElementById('bookingSubmitBtn');
        if (submitBtn) submitBtn.disabled = true;
    }
};

// Close modal on outside click and Escape key
window.onclick = e => {
    const modal = document.getElementById('appointmentModal');
    if (e.target === modal) closeAppointmentModal();
};

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAppointmentModal();
});

// CMS Placeholder
const openCMS = () => alert(site.cmsPlaceholder);

// Mobile Menu Toggle
const toggleMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('navRight');

    hamburger.classList.toggle('active');
    navRight.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};

// Close mobile menu when clicking on a nav link or backdrop
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.getElementById('hamburger');
            const navRight = document.getElementById('navRight');
            if (navRight.classList.contains('active')) {
                hamburger.classList.remove('active');
                navRight.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside (on backdrop)
    document.body.addEventListener('click', (e) => {
        const navRight = document.getElementById('navRight');
        const hamburger = document.getElementById('hamburger');
        if (navRight && navRight.classList.contains('active') &&
            !navRight.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navRight.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});
