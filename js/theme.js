/**
 * Theme Switching System
 * Handles dark/light theme toggle and persistence
 */

const toggleTheme = () => {
    const newTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
};

const applyTheme = theme => {
    const { icon, label } = theme === 'dark' ? site.themeDark : site.themeLight;
    document.body.className = `theme-${theme}`;

	const themeIcon = document.querySelector('.theme-icon');
	const themeText = document.querySelector('.theme-text');
    if (themeIcon) themeIcon.textContent = icon;
    if (themeText) themeText.textContent = label;
};

const loadThemePreference = () => applyTheme(localStorage.getItem('theme') || site.themeDefault);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadThemePreference);
