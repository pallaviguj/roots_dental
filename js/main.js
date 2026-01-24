/**
 * Main Application Script
 * Traditional approach - HTML has structure, JS populates data
 */

// Initialize site on DOM load
document.addEventListener('DOMContentLoaded', () => {
	populateNavigation();
	populateTrustIndicators();
	populateServices();
	populateAchievements();
	populateContact();
	populateFooter();
	initializeWhatsApp();
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
    setContact('#footerDescription', { text: site.footerDescription });

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
            const a = createElement('a', { href: '#' + link.href, className: 'footer-link' }, link.text);
            if (link.onclick) a.setAttribute('onclick', link.onclick);
            li.appendChild(a);
            ul.appendChild(li);
        });
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

// Appointment Booking
const openAppointmentBooking = e => {
	e.preventDefault();
    window.open(`https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(site.appointmentMessage + ' ' + site.businessName + '.')}`, '_blank');
};

// CMS Placeholder
const openCMS = () => alert(site.cmsPlaceholder);
