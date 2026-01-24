/**
 * Main Application Script
 * Minimal DOM manipulation - only for dynamic lists/arrays
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

// Helper: Populate list with HTML template
const populateList = (selector, items, template) => {
	const container = document.querySelector(selector) || document.getElementById(selector);
	if (!container) return;
	container.innerHTML = items.map(template).join('');
};

// Helper: Set attributes for multiple elements
const setMultiple = (selector, attrs) => {
	document.querySelectorAll(selector).forEach(el => {
		Object.entries(attrs).forEach(([key, val]) => {
			key === 'text' ? el.textContent = val : 
			key === 'html' ? el.innerHTML = val : 
			el[key] = val;
		});
	});
};

// Populate Navigation Links
const populateNavigation = () => populateList('.nav-links', data.navLinks, 
	link => `<li><a href="#${link.href}">${link.text}</a></li>`
);

// Populate Trust Indicators
const populateTrustIndicators = () => populateList('trustBadges', data.trustIndicators,
	ind => `<span class="trust-badge"><strong>${ind.value}</strong> ${ind.label}</span>`
);

// Populate Services
const populateServices = () => populateList('servicesGrid', data.services,
	s => `<div class="service-card"><h3>${s.name}</h3><p>${s.description}</p></div>`
);

// Populate Achievements
function populateAchievements() {
	const templates = {
		eventAward: a => `${a.event} – <span class="achievement-award">${a.award}</span>${a.category ? ` – <span class="achievement-category">${a.category}</span>` : ''}`,
		awardEvent: a => `<span class="achievement-award">${a.award}</span> – ${a.event}`,
		titleDetails: a => `<span class="achievement-title">${a.title}</span>${a.details ? ` – ${a.details}` : ''}`,
	};
	
	populateList('achievementsList', data.achievements, a => {
		const html = a.event && a.award ? templates.eventAward(a) :
					 a.award && a.event ? templates.awardEvent(a) :
					 a.title ? templates.titleDetails(a) : '';
		return `<li>${html}</li>`;
	});
}

// Populate Contact Information
const populateContact = () => {
	setMultiple('[data-contact="phone"]', { text: site.phoneDisplay });
	setMultiple('[data-contact="phone-link"]', { href: `tel:${site.phoneRaw}`, text: site.phoneDisplay });
	setMultiple('[data-contact="email"]', { text: site.email });
	setMultiple('[data-contact="email-link"]', { href: `mailto:${site.email}`, text: site.email });
	setMultiple('[data-contact="address"]', { html: site.addressFull });
	setMultiple('[data-contact="address-link"]', { href: site.mapUrl });
	setMultiple('[data-contact="hours"]', { html: `${site.hoursWeekdays}<br>${site.hoursWeekend}` });
};

// Populate Footer
function populateFooter() {
	setMultiple('#footerDescription', { text: site.footerDescription });
	setMultiple('#copyright', { 
		html: `© ${site.copyrightYear} ${site.businessName}. All rights reserved. | <a href="#" class="footer-link">Privacy Policy</a> | <a href="#" class="footer-link">Terms of Service</a>`
	});
	
	populateList('footerQuickLinks', data.footerQuickLinks, link =>
		`<li class="footer-list-item"><a href="#${link.href}" class="footer-link" ${link.onclick ? `onclick="${link.onclick}"` : ''}>${link.text}</a></li>`
	);
}

// Initialize WhatsApp Button
const initializeWhatsApp = () => {
	const btn = document.getElementById('whatsappBtn');
	if (btn) {
		btn.href = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(site.whatsappMessage + ' at ' + site.businessName)}`;
		btn.setAttribute('data-tooltip', 'Chat with us on WhatsApp');
	}
};

// Appointment Booking
const openAppointmentBooking = e => {
	e.preventDefault();
	window.open(`https://wa.me/${site.phoneRaw}?text=${encodeURIComponent('I would like to book an appointment at ' + site.businessName + '.')}`, '_blank');
};

// CMS Placeholder
const openCMS = () => alert('CMS system - Full implementation coming soon');
