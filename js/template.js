/**
 * Template Engine
 */

// Expose to window
window.site = site;
window.data = data;

// Get nested object value from string path
const getNestedValue = path => {
	try {
		return path.split('.').reduce((obj, key) => obj[key], window);
	} catch (e) {
		console.warn(`Template variable not found: ${path}`);
		return '';
	}
};

// Replace all {{variable}} templates in HTML
const replaceTemplates = () => {
	const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
	const nodes = [];
	
	let node;
	while (node = walker.nextNode()) {
		if (/\{\{([^}]+)\}\}/.test(node.nodeValue)) nodes.push(node);
	}
	
	nodes.forEach(node => {
		node.nodeValue = node.nodeValue.replace(/\{\{([^}]+)\}\}/g, (_, path) => getNestedValue(path.trim()));
	});
};

// Initialize templates on DOM ready (run early in event queue)
document.addEventListener('DOMContentLoaded', replaceTemplates, { once: true, capture: true });
