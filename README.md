# Roots Dental Speciality Clinic Website

A modern, responsive website for Roots Dental Speciality Clinic with a modular design system and theme switching capability.

## 📁 Project Structure

```
roots_dental/
├── index.html              # Main HTML file (clean, semantic)
├── README.md              # Project documentation
├── package.json           # NPM dependencies & build scripts
├── webpack.config.js      # Webpack configuration
├── build.js               # Legacy build script (backup)
│
├── dist/                  # Production build output (generated)
│   ├── index.html
│   ├── js/bundle.js       # Bundled & minified JavaScript
│   ├── css/               # Copied CSS files
│   └── images/            # Optimized images
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
│   ├── config.js         # Site data & configuration (SINGLE SOURCE OF TRUTH)
│   ├── main.js           # Main application script (content manager)
│   ├── theme.js          # Theme switching functionality
│   ├── template.js       # Template engine for variable replacement
│   └── booking.js        # Booking form logic & API integration
│
├── server/                # Backend API (Node.js + Express)
│   ├── server.js         # Express server with Google Calendar API
│   ├── config.js         # Server configuration
│   ├── package.json      # Dependencies
│   └── service-account-key.json  # Google service account (DO NOT COMMIT)
│
└── images/               # Image assets
    ├── rootsdentalspeciality_logo.png
    ├── hero_doctor.png
    ├── mini_logo_transparent.png
    ├── facility/         # Facility carousel images
    └── services/         # Per-service gallery images
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

## 🚀 Getting Started

### Production Build

This project uses **Webpack** for modern ES6 module bundling and optimization.

**Build for production:**
```bash
npm install
npm run build
```

**Development with hot reload:**
```bash
npm run dev
```

**Watch mode:**
```bash
npm run watch
```

### Local Development

1. Clone or download the repository
2. Open a terminal in the project directory
3. Build the project:
   ```bash
   npm install
   npm run build
   ```
4. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
5. Open your browser to `http://localhost:8000`

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

#### JavaScript Structure (ES6 Modules)
- **config.js** - Centralized data configuration (phone, email, services, etc.)
- **main.js** - Main application script (populates site content from config data)
- **theme.js** - Theme switching with localStorage persistence
- **carousel.js** - Infinite carousel functionality
- **components.js** - Reusable UI components
- **template.js** - Template engine for variable replacement
- **booking.js** - Booking form logic


### Webpack Configuration
- **Single entry point**: `main.js`
- **Single output bundle**: `js/bundle.js` (27.9 KB minified)
- **Auto-injects script** with `defer` attribute
- **Proper module tree-shaking** and optimization
- **Scope hoisting**: Module concatenation for smaller size
- **Mangling enabled**: Variable/function name shortening
- **Dead code elimination**: Unused code removed
- **Console logs stripped** in production
- **Source maps** in development mode

### Build Results
```
Before: 7 separate JS files (50.4 KB)
After:  1 bundled file (27.9 KB) - 45% smaller!
```

### Data-Driven Architecture

All site content is managed through `js/config.js`:

**To change phone number:**
```javascript
// js/config.js
contact: {
  phone: {
    display: '+91 7020054267',  // Change here only!
    raw: '917020054267'
  }
}
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- **Desktop**: > 1024px (full layout)
- **Mobile**: ≤ 1024px (single column, stacked, hamburger nav)
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

## 📝 Updating Site Content

### How to Change Phone Number, Email, Address

**ALL site data is in ONE file: `js/config.js`**

```javascript
// js/config.js
const siteConfig = {
  contact: {
    phone: {
      display: '+91 7020054267',  // ← Change here!
      raw: '917020054267'
    },
    email: 'roots.dentalspecialityclinic@gmail.com',  // ← Change here!
    address: {
      full: '472, Bohora Bhavan...',  // ← Change here!
      mapUrl: 'https://maps.app.goo.gl/...'
    }
  }
}
```

**One change updates:**
- ✅ Contact section
- ✅ Footer
- ✅ WhatsApp button
- ✅ All phone/email links
- ✅ Everywhere it appears!

### How to Update Services

```javascript
// js/config.js
services: [
  {
    name: 'Your Service Name',
    description: 'Service description'
  }
  // Add more services...
]
```

### How to Change Hero Text

```javascript
// js/config.js
hero: {
  title: 'Your new title',
  subtitle: 'Your new subtitle'
}
```

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

## 📅 Appointment Booking System

This site includes a custom booking system with real-time availability checking.

### Features
- ✅ Custom form with treatment selection
- ✅ Real-time availability via Google Calendar API
- ✅ 30-minute time slots (9 AM - 6 PM)
- ✅ Automatic calendar event creation
- ✅ Double-booking prevention
- ✅ Email reminders to clinic owner

### Setup
See `BOOKING_SETUP.md` for detailed setup instructions.

**Quick Start:**
```bash
# Backend
cd server
npm install
npm start

# Frontend
python3 -m http.server 8000
```

## 👨‍💻 Development

For questions or support, contact the development team.

---

## 🚀 Deployment

### Deploy to Surge

The site is deployed using [Surge](https://surge.sh) for quick and easy hosting:

```bash
# Build the project
npm run build

# Deploy to Surge
npx surge dist rootsdental-source.surge.sh
```

**Live Site:** https://rootsdental-source.surge.sh

### Deploy to Other Platforms

The `dist/` folder contains the production-ready build. Upload its contents to:
- **cPanel**: Upload to `public_html/`
- **Netlify**: Drag & drop the `dist/` folder
- **Vercel**: Connect GitHub repo or use CLI
- **GitHub Pages**: Push `dist/` to `gh-pages` branch

---

**Built with ❤️ for Roots Dental Speciality Clinic**
