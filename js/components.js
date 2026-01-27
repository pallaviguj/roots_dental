/**
 * Reusable Page Components
 * Header and Footer components for consistent UI across all pages
 */

import { site } from './config.js';

// Render Header Component
function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <nav class="container">
            <div class="logo">
                <a href="/">
                    <img src="images/rootsdentalspeciality_logo.png" alt="${site.businessName} Logo" />
                </a>
            </div>
            <button class="hamburger" id="hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <svg class="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="nav-right" id="navRight">
                <ul class="nav-links">
                    <li><a href="/#services">Services</a></li>
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#facility">Facility</a></li>
                    <li><a href="/#reviews">Reviews</a></li>
                    <li><a href="/#expert">Expert</a></li>
                    <li><a href="/#contact">Contact</a></li>
                </ul>
                <a href="/#book" class="btn btn-primary btn-sm nav-cta-btn">
                    Book Appointment
                </a>
            </div>
            <button class="btn btn-ghost btn-sm admin-btn" onclick="openCMS()">Admin</button>
        </nav>
    `;
}

// Mobile Menu Toggle Function
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('navRight');

    if (hamburger && navRight) {
        hamburger.classList.toggle('active');
        navRight.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

// CMS Placeholder Function
function openCMS() {
    console.log('CMS feature coming soon');
}

// Render Footer Component
function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div>
                    <a href="/" style="display: inline-block;">
                        <img src="images/rootsdentalspeciality_logo.png" alt="${site.businessName} Logo" class="footer-logo" />
                    </a>
                    <div class="footer-social">
                        <a href="https://linkedin.com/in/dr-aarti-bohora-59b51b68/" class="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <rect width="24" height="24" rx="3" fill="#0A66C2"/>
                                <path fill="#fff" d="M3.545 9h3.636v12H3.545zM5.364 3.545a2.109 2.109 0 1 1 0 4.218 2.109 2.109 0 0 1 0-4.218zM9.818 9h3.488v1.636h.05c.486-.923 1.674-1.896 3.444-1.896 3.682 0 4.364 2.423 4.364 5.576V21h-3.636v-5.727c0-1.364-.027-3.118-1.9-3.118-1.9 0-2.19 1.482-2.19 3.018V21H9.818z"/>
                            </svg>
                        </a>
                        <a href="https://facebook.com/draartibohora/" class="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#1877F2" d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com/rootsdentalspecialityclinic" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <img src="images/instagram_logo.png" alt="Instagram" />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="footer-heading">Quick Links</h3>
                    <ul class="footer-list">
                        <li class="footer-list-item"><a href="/#home" class="footer-link">Home</a></li>
                        <li class="footer-list-item"><a href="/#services" class="footer-link">Our Services</a></li>
                        <li class="footer-list-item"><a href="/#about" class="footer-link">About Us</a></li>
                        <li class="footer-list-item"><a href="/#reviews" class="footer-link">Reviews</a></li>
                        <li class="footer-list-item"><a href="/#expert" class="footer-link">Meet our Expert</a></li>
                        <li class="footer-list-item"><a href="/#contact" class="footer-link">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="footer-heading">${site.footerContactHeading}</h3>
                    <div class="footer-contact">
                        <p><strong>${site.labelPhone}</strong> <a href="tel:${site.phoneRaw}" class="footer-link">${site.phoneDisplay}</a></p>
                        <p><strong>${site.labelEmail}</strong> <a href="mailto:${site.email}" class="footer-link">${site.email}</a></p>
                        <p><strong>${site.labelAddress}</strong> <a href="${site.mapUrl}" target="_blank" class="footer-link">${site.addressFull}</a></p>
                        <p><strong>${site.labelHours}</strong><br />${site.hoursWeekdays}<br>${site.hoursWeekend}</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p id="footerLinks" class="footer-legal-links">
                    <!-- Populated below -->
                </p>
                <p id="copyright" class="footer-copyright">
                    <!-- Populated below -->
                </p>
            </div>
        </div>
    `;

    // Populate footer legal links (Privacy, Terms & Cookies)
    const footerLinks = document.getElementById('footerLinks');
    if (footerLinks) {
        const privacy = document.createElement('a');
        privacy.href = 'privacy-policy.html';
        privacy.className = 'footer-link';
        privacy.textContent = site.linkPrivacyPolicy;
        footerLinks.appendChild(privacy);
        
        footerLinks.appendChild(document.createTextNode(' | '));
        
        const terms = document.createElement('a');
        terms.href = 'terms-of-service.html';
        terms.className = 'footer-link';
        terms.textContent = site.linkTermsOfService;
        footerLinks.appendChild(terms);
        
        footerLinks.appendChild(document.createTextNode(' | '));
        
        const cookies = document.createElement('a');
        cookies.href = 'cookie-policy.html';
        cookies.className = 'footer-link';
        cookies.textContent = 'Cookie Policy';
        footerLinks.appendChild(cookies);
    }

    // Populate copyright text (below links)
    const copyright = document.getElementById('copyright');
    if (copyright) {
        copyright.textContent = `${site.copyrightYear} ${site.businessName}. ${site.copyrightText}`;
    }
}

// Render WhatsApp Button
function renderWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn && site.phoneRaw) {
        whatsappBtn.href = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(site.whatsappMessage + ' at ' + site.businessName)}`;
    }
}

// Render Contact Box for Policy Pages
function renderContactBox() {
    const contactBox = document.getElementById('contactBox');
    if (!contactBox) return;

    contactBox.innerHTML = `
        <p style="margin-bottom: 0.5rem;"><strong>${site.businessName}</strong></p>
        <p style="margin-bottom: 0.5rem;">Website: <a href="${site.websiteUrl || 'http://www.rootsdentalspeciality.com/'}" target="_blank" class="footer-link">${site.websiteName || 'www.rootsdentalspeciality.com'}</a></p>
        <p style="margin-bottom: 0.5rem;">Email: <a href="mailto:${site.email}" class="footer-link">${site.email}</a></p>
        <p style="margin-bottom: 0.5rem;">Phone: <a href="tel:${site.phoneRaw}" class="footer-link">${site.phoneDisplay}</a></p>
        <p style="margin-bottom: 0;">Address: ${site.addressFull}</p>
    `;
}

// Close mobile menu when clicking on nav links
function initializeMobileMenuClose() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.getElementById('hamburger');
            const navRight = document.getElementById('navRight');
            if (navRight && navRight.classList.contains('active')) {
                hamburger.classList.remove('active');
                navRight.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside
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
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    renderWhatsAppButton();
    renderContactBox();
    initializeMobileMenuClose();
});

// Export functions that are called from inline HTML
export { toggleMobileMenu, openCMS };

// Also expose to window for inline onclick handlers
window.toggleMobileMenu = toggleMobileMenu;
window.openCMS = openCMS;
