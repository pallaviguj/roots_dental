/**
 * Main Application Script
 */

import { site, data } from './config.js';
import './template.js';
import { initializeCarousel } from './carousel.js';
import './components.js';
import './theme.js';
import './cookies.js';
import { getAllServices } from './sanity-client.js';

// Polyfill for requestIdleCallback
window.requestIdleCallback = window.requestIdleCallback || function (cb, options) {
    const start = Date.now();
    return setTimeout(() => {
        cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        });
    }, 1);
};

// Initialize site on DOM load
document.addEventListener('DOMContentLoaded', () => {
    populateServices();
    populateFacilityCarousel();
    populateAchievements();
    populateContact();
    initializeHeroAnimation();
    initializeScrollHeader();
    initializeSmoothScroll();

    // Defer non-critical widgets
    requestIdleCallback(() => {
        initializeReviewsWidget();
    }, { timeout: 2000 });
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

// Populate Services (Sanity first, config.js fallback)
const populateServices = async () => {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    let services = [];
    try {
        services = await getAllServices();
    } catch (error) {
        console.error('Error loading services from Sanity:', error);
    }

    if (!services.length) {
        services = data.services;
    }

    grid.innerHTML = '';
    services.forEach(service => {
        const card = createElement('a', {
            className: 'service-card',
            href: `service.html?slug=${encodeURIComponent(service.slug)}`
        });
        const h3 = createElement('h3');
        const words = String(service.name || '').trim().split(/\s+/).filter(Boolean);
        if (words.length >= 2) {
            // Keep titles on two lines so card copy aligns across the grid
            // e.g. "Root Canal Treatments" → "Root Canal" / "Treatments"
            const lastWord = words.pop();
            h3.appendChild(document.createTextNode(words.join(' ')));
            h3.appendChild(document.createElement('br'));
            h3.appendChild(document.createTextNode(lastWord));
        } else {
            h3.textContent = service.name || '';
        }
        const p = createElement('p', {}, service.description);
        card.appendChild(h3);
        card.appendChild(p);
        grid.appendChild(card);
    });
};

// Populate facility carousel
const populateFacilityCarousel = () => {
    initializeCarousel(site.facilityCarouselImages, createElement);
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
    setContact('[data-contact="phone-link"]', { href: `tel:${site.phoneRaw}` });
    setContact('[data-contact="phone-link-hero"]', { href: `tel:${site.phoneRaw}` });
    setContact('[data-contact="phone-text"]', { text: `${site.heroCallText} ${site.phoneDisplay}` });
    setContact('[data-contact="email"]', { text: site.email });
    setContact('[data-contact="email-link"]', { href: `mailto:${site.email}`, text: site.email });
    setContact('[data-contact="address"]', { html: site.addressFull });
    setContact('[data-contact="address-link"]', { href: site.mapUrl });
    setContact('[data-contact="hours"]', { html: `${site.hoursWeekdays}<br>${site.hoursWeekend}` });
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

// Initialize Hero Underline Animation on Scroll
const initializeHeroAnimation = () => {
    const heroHighlight = document.querySelector('.hero-highlight');
    const doctorQuote = document.querySelector('.doctor-quote');

    if (!heroHighlight && !doctorQuote) return;

    // Create intersection observer to trigger animation when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero')) {
                    // Hero section animation
                    if (heroHighlight) {
                        heroHighlight.classList.remove('animate');
                        void heroHighlight.offsetWidth;
                        heroHighlight.classList.add('animate');
                    }
                } else if (entry.target.classList.contains('doctor-quote')) {
                    // Doctor quote animation - reset and retrigger
                    entry.target.classList.remove('animate');
                    void entry.target.offsetWidth; // Force reflow
                    entry.target.classList.add('animate');
                }
            } else {
                // Remove animation class when out of view so it can retrigger
                if (entry.target.classList.contains('hero') && heroHighlight) {
                    heroHighlight.classList.remove('animate');
                } else if (entry.target.classList.contains('doctor-quote')) {
                    entry.target.classList.remove('animate');
                }
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px'
    });

    // Observe the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Observe the doctor quote
    if (doctorQuote) {
        observer.observe(doctorQuote);
    }
};

// Lazy load booking module when needed
let bookingModuleLoaded = false;
const loadBookingModule = async () => {
    if (!bookingModuleLoaded) {
        await import('./booking.js');
        bookingModuleLoaded = true;
    }
};

// Modal Controls
const openAppointmentModal = async () => {
    // Lazy load booking module
    await loadBookingModule();

    const modal = document.getElementById('appointmentModal');
    if (modal) modal.classList.add('active');
    
    // Prevent background scrolling
    document.body.classList.add('modal-open');

    // Close mobile menu if it's open
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('navRight');
    if (hamburger && navRight && navRight.classList.contains('active')) {
        hamburger.classList.remove('active');
        navRight.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
};

const closeAppointmentModal = () => {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.classList.remove('active');
        // Allow background scrolling again
        document.body.classList.remove('modal-open');
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

// Initialize Scroll-Based Header
const initializeScrollHeader = () => {
    const header = document.querySelector('body > header');
    if (!header) return;

    const triggerSection = document.querySelector('#services');
    // Homepage: sticky when Services enters view. Subpages (e.g. service detail): sticky after a short scroll.
    const getTriggerY = () => (triggerSection ? triggerSection.offsetTop - 50 : 80);

    let isScrolled = false;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const triggerY = getTriggerY();

        if (!isScrolled && scrollY >= triggerY) {
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (isScrolled && scrollY < triggerY - 50) {
            header.classList.remove('scrolled');
            isScrolled = false;
        }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();
};

// Initialize Smooth Scroll with Offset
const initializeSmoothScroll = () => {
    // Handle all anchor links (nav links and footer links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or modal triggers
            if (href === '#' || this.hasAttribute('onclick')) {
                return;
            }

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const header = document.querySelector('body > header');
                const headerHeight = header ? header.offsetHeight : 80;
                const offset = headerHeight + 20; // Header height + 20px extra space
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                } else {
                    window.location.hash = href;
                }
            }
        });
    });
};

// Export functions that are called from inline HTML
window.openAppointmentModal = openAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;
