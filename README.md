# Roots Dental Speciality Clinic Website

A modern, responsive website for Roots Dental Speciality Clinic with a modular design system and theme switching capability.

## 📁 Project Structure

```
roots_dental/
├── index.html              # Main HTML file (clean, semantic)
├── roots_dental.html       # Original file (kept for reference)
├── README.md              # Project documentation
│
├── css/                   # Modular CSS files
│   ├── main.css          # Main CSS file (imports all others)
│   ├── variables.css     # Design tokens (colors, spacing, typography)
│   ├── global.css        # Global styles & reset
│   ├── typography.css    # Typography system
│   ├── layout.css        # Layout system (containers, grids)
│   ├── utilities.css     # Utility classes
│   ├── responsive.css    # Media queries
│   │
│   └── components/       # Component-specific styles
│       ├── buttons.css   # Button component system
│       ├── cards.css     # Card components
│       ├── header.css    # Header/navigation
│       ├── hero.css      # Hero section
│       └── sections.css  # Content sections
│
├── js/                    # JavaScript files
│   └── theme.js          # Theme switching functionality
│
└── images/               # Image assets
    ├── logo.png
    ├── hero_image.png
    ├── hero_bg.png
    ├── about_us.png
    ├── expert_bg.png
    └── gallery*.png
```

## 🎨 Design System

### Design Tokens
The design system is built on a foundation of design tokens defined in `css/variables.css`:

- **Spacing Scale**: 8px-based system (--space-1 through --space-12)
- **Typography Scale**: From xs (12px) to 6xl (60px)
- **Font Weights**: Normal, Medium, Semibold, Bold, Extrabold
- **Border Radius**: From sm (4px) to full (pill shape)
- **Shadows**: 5 levels (sm, md, lg, xl, 2xl)
- **Z-Index Scale**: Organized layers for UI elements

### Component System

#### Buttons
```html
<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>

<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Modifiers -->
<button class="btn btn-primary btn-pill">Pill Shape</button>
```

#### Cards
```html
<div class="card card-hover">
  <h3 class="card-title">Title</h3>
  <p class="card-description">Description</p>
</div>
```

### Theme System

The site supports dark and light themes:

- **Dark Theme** (default): Navy backgrounds with white text
- **Light Theme**: White/gray backgrounds with dark text
- Theme preference is saved in localStorage
- Smooth transitions between themes

Toggle theme:
```javascript
toggleTheme()
```

## 🚀 Getting Started

### Local Development

1. Clone or download the repository
2. Open a terminal in the project directory
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser to `http://localhost:8000`

### File Organization

#### CSS Architecture
The CSS follows a modular architecture:

1. **variables.css** - Design tokens (must load first)
2. **global.css** - Reset and base styles
3. **typography.css** - Typography system
4. **layout.css** - Layout utilities
5. **components/** - Component-specific styles
6. **utilities.css** - Utility classes
7. **responsive.css** - Media queries (must load last)

All CSS files are imported via `main.css` using `@import`.

#### JavaScript Structure
- **theme.js** - Theme switching with localStorage persistence
- Additional JS functionality (CMS, appointments) can be added as separate modules

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- **Desktop**: > 1024px (full layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Mobile**: < 768px (single column, stacked)
- **Small Mobile**: < 480px (optimized for tiny screens)

## 🎯 Features

- ✅ Modern, clean design inspired by industry leaders
- ✅ Fully responsive across all devices
- ✅ Dark/Light theme switching
- ✅ Modular, maintainable code structure
- ✅ Semantic HTML5
- ✅ Organized CSS with design tokens
- ✅ Trust indicators section
- ✅ Service cards with hover effects
- ✅ Smooth animations and transitions
- ✅ Accessibility-friendly

## 🔧 Customization

### Changing Colors
Edit `css/variables.css` to modify the color scheme:

```css
body.theme-dark {
  --color-primary: #1565C0;  /* Change primary color */
  --color-accent: #00b2d4;   /* Change accent color */
  /* ... */
}
```

### Adding New Components
1. Create a new CSS file in `css/components/`
2. Import it in `css/main.css`
3. Use design tokens for consistency

### Modifying Spacing
All spacing uses the design token system. Adjust the scale in `css/variables.css`:

```css
:root {
  --space-4: 1rem;  /* Modify base spacing */
}
```

## 📝 Best Practices

1. **Use Design Tokens**: Always use CSS variables for colors, spacing, and typography
2. **Component-Based**: Keep styles modular and component-focused
3. **Mobile-First**: Design for mobile, enhance for desktop
4. **Semantic HTML**: Use proper HTML5 semantic elements
5. **Accessibility**: Ensure proper contrast ratios and keyboard navigation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2026 Roots Dental Speciality Clinic. All rights reserved.

## 👨‍💻 Development

For questions or support, contact the development team.

---

**Note**: The original `roots_dental.html` file is kept for reference and includes the full CMS and appointment booking system. The new `index.html` provides a cleaner, more maintainable structure with the same visual design.
