/**
 * Cookie Consent Management
 * Auto-accept for India, manual settings available via cookie policy page
 */

// Check if user has already consented
const hasConsented = () => {
    return localStorage.getItem('cookie_consent') !== null;
};

// Get consent preferences
const getConsent = () => {
    const consent = localStorage.getItem('cookie_consent');
    return consent ? JSON.parse(consent) : null;
};

// Save consent preferences
const saveConsent = (accepted) => {
    const consent = {
        accepted,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
};

// Show cookie banner (manually triggered from settings)
const showCookieBanner = () => {
    // Remove existing banner if any
    const existing = document.querySelector('.cookie-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <div class="cookie-banner-text">
                <p><strong>Cookie Preferences</strong></p>
                <p>Choose your cookie preferences. We use cookies to improve your experience and analyze site usage.</p>
            </div>
            <div class="cookie-banner-actions">
                <button class="btn btn-ghost btn-sm" id="cookieDecline">Decline</button>
                <button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    // Handle accept
    document.getElementById('cookieAccept').addEventListener('click', () => {
        saveConsent(true);
        banner.remove();
        loadAnalytics();
    });

    // Handle decline
    document.getElementById('cookieDecline').addEventListener('click', () => {
        saveConsent(false);
        banner.remove();
    });
};

// Load analytics if consent given
const loadAnalytics = () => {
    const consent = getConsent();
    if (consent && consent.accepted) {
        // Google Analytics loads here
        console.log('Analytics loaded (consent given)');
    }
};

// Initialize on page load - Auto-accept for India
document.addEventListener('DOMContentLoaded', () => {
    if (!hasConsented()) {
        // Auto-accept cookies (India doesn't require explicit consent)
        saveConsent(true);
    }
    loadAnalytics();
});

// Expose showCookieBanner globally for cookie settings button
window.showCookieSettings = showCookieBanner;

export { hasConsented, getConsent, saveConsent, showCookieBanner, loadAnalytics };
