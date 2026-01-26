#!/usr/bin/env node

/**
 * Production Build Script for Roots Dental Website
 * Creates optimized dist folder ready for cPanel deployment
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Configuration
const BUILD_DIR = 'dist';
const SOURCE_DIR = '.';

// ANSI colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Clean and create dist directory
function setupBuildDir() {
    log('\n🧹 Cleaning build directory...', 'blue');
    if (fs.existsSync(BUILD_DIR)) {
        fs.rmSync(BUILD_DIR, { recursive: true });
    }
    fs.mkdirSync(BUILD_DIR, { recursive: true });
    log('✓ Build directory ready', 'green');
}

// Copy directory recursively
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Minify and copy CSS files
async function buildCSS() {
    log('\n📦 Building CSS...', 'blue');
    const cssDir = path.join(SOURCE_DIR, 'css');
    const distCssDir = path.join(BUILD_DIR, 'css');
    
    fs.mkdirSync(distCssDir, { recursive: true });
    
    // Copy and minify CSS files
    const cssFiles = getAllFiles(cssDir, '.css');
    let totalOriginal = 0;
    let totalMinified = 0;

    for (const file of cssFiles) {
        const relativePath = path.relative(cssDir, file);
        const content = fs.readFileSync(file, 'utf8');
        const originalSize = Buffer.byteLength(content, 'utf8');
        
        const result = new CleanCSS({
            level: 2,
            compatibility: 'ie11'
        }).minify(content);
        
        const minifiedSize = Buffer.byteLength(result.styles, 'utf8');
        const destPath = path.join(distCssDir, relativePath);
        
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, result.styles);
        
        totalOriginal += originalSize;
        totalMinified += minifiedSize;
        
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        log(`  ✓ ${relativePath} (${formatBytes(originalSize)} → ${formatBytes(minifiedSize)}, -${savings}%)`, 'green');
    }
    
    const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    log(`  📊 Total CSS: ${formatBytes(totalOriginal)} → ${formatBytes(totalMinified)} (-${totalSavings}%)`, 'yellow');
}

// Minify and copy JS files
async function buildJS() {
    log('\n📦 Building JavaScript...', 'blue');
    const jsDir = path.join(SOURCE_DIR, 'js');
    const distJsDir = path.join(BUILD_DIR, 'js');
    
    fs.mkdirSync(distJsDir, { recursive: true });
    
    const jsFiles = getAllFiles(jsDir, '.js');
    let totalOriginal = 0;
    let totalMinified = 0;

    for (const file of jsFiles) {
        const relativePath = path.relative(jsDir, file);
        const content = fs.readFileSync(file, 'utf8');
        const originalSize = Buffer.byteLength(content, 'utf8');
        
        try {
            const result = await minify(content, {
                compress: {
                    dead_code: true,
                    drop_console: false, // Keep console for debugging if needed
                    drop_debugger: true,
                    pure_funcs: ['console.debug']
                },
                mangle: false, // Don't mangle names for better debugging
                format: {
                    comments: false
                }
            });
            
            const minifiedSize = Buffer.byteLength(result.code, 'utf8');
            const destPath = path.join(distJsDir, relativePath);
            
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.writeFileSync(destPath, result.code);
            
            totalOriginal += originalSize;
            totalMinified += minifiedSize;
            
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
            log(`  ✓ ${relativePath} (${formatBytes(originalSize)} → ${formatBytes(minifiedSize)}, -${savings}%)`, 'green');
        } catch (error) {
            log(`  ✗ Error minifying ${relativePath}: ${error.message}`, 'red');
        }
    }
    
    const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
    log(`  📊 Total JS: ${formatBytes(totalOriginal)} → ${formatBytes(totalMinified)} (-${totalSavings}%)`, 'yellow');
}

// Copy HTML files
function buildHTML() {
    log('\n📄 Copying HTML files...', 'blue');
    const htmlFiles = ['index.html', 'privacy-policy.html', 'terms-of-service.html'];
    
    htmlFiles.forEach(file => {
        const srcPath = path.join(SOURCE_DIR, file);
        const destPath = path.join(BUILD_DIR, file);
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            log(`  ✓ ${file}`, 'green');
        }
    });
}

// Copy static assets
function buildAssets() {
    log('\n🖼️  Copying images...', 'blue');
    const imagesDir = path.join(SOURCE_DIR, 'images');
    const distImagesDir = path.join(BUILD_DIR, 'images');
    
    if (fs.existsSync(imagesDir)) {
        copyDir(imagesDir, distImagesDir);
        const imageCount = getAllFiles(imagesDir).length;
        log(`  ✓ Copied ${imageCount} images`, 'green');
    }
}

// Copy SEO files
function buildSEOFiles() {
    log('\n🔍 Copying SEO files...', 'blue');
    const seoFiles = ['robots.txt', 'sitemap.xml'];
    
    seoFiles.forEach(file => {
        const srcPath = path.join(SOURCE_DIR, file);
        const destPath = path.join(BUILD_DIR, file);
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            log(`  ✓ ${file}`, 'green');
        }
    });
}

// Helper: Get all files with extension
function getAllFiles(dir, ext = null) {
    let files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            files = files.concat(getAllFiles(fullPath, ext));
        } else if (!ext || entry.name.endsWith(ext)) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Helper: Format bytes to human readable
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Main build function
async function build() {
    const startTime = Date.now();
    
    log('\n🚀 Starting production build for cPanel deployment...', 'blue');
    log('================================================\n', 'blue');
    
    try {
        setupBuildDir();
        buildHTML();
        await buildCSS();
        await buildJS();
        buildAssets();
        buildSEOFiles();
        
        const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
        
        log('\n================================================', 'blue');
        log('✅ Build completed successfully!', 'green');
        log(`⏱️  Build time: ${buildTime}s`, 'yellow');
        log(`📁 Output: ${BUILD_DIR}/`, 'yellow');
        log('\n📤 Ready for cPanel deployment!', 'green');
        log('   Upload the contents of the dist/ folder to public_html/', 'blue');
        log('================================================\n', 'blue');
        
    } catch (error) {
        log('\n❌ Build failed:', 'red');
        log(error.message, 'red');
        process.exit(1);
    }
}

// Run build
build();
