/**
 * Theme Switching System
 * Handles dark/light theme toggle and persistence
 */

function toggleTheme() {
	const body = document.body;
	const themeIcon = document.querySelector('.theme-icon');
	const themeText = document.querySelector('.theme-text');
	
	if (body.classList.contains('theme-dark')) {
		body.classList.remove('theme-dark');
		body.classList.add('theme-light');
		themeIcon.textContent = '☀️';
		themeText.textContent = 'Light';
		localStorage.setItem('theme', 'light');
	} else {
		body.classList.remove('theme-light');
		body.classList.add('theme-dark');
		themeIcon.textContent = '🌙';
		themeText.textContent = 'Dark';
		localStorage.setItem('theme', 'dark');
	}
}

function loadThemePreference() {
	const savedTheme = localStorage.getItem('theme') || 'dark';
	const body = document.body;
	const themeIcon = document.querySelector('.theme-icon');
	const themeText = document.querySelector('.theme-text');
	
	if (savedTheme === 'light') {
		body.classList.remove('theme-dark');
		body.classList.add('theme-light');
		themeIcon.textContent = '☀️';
		themeText.textContent = 'Light';
	} else {
		body.classList.remove('theme-light');
		body.classList.add('theme-dark');
		themeIcon.textContent = '🌙';
		themeText.textContent = 'Dark';
	}
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadThemePreference);
