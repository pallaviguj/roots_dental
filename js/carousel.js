/**
 * Carousel Module - Infinite Loop Image Carousel
 * Handles the facility carousel with seamless infinite scrolling
 */

const initializeCarousel = (carouselImages, createElement) => {
    const track = document.getElementById('carouselTrack');
    const indicators = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track || !indicators) return;

    let currentIndex = 0;
    let autoplayInterval;
    let isTransitioning = false;

    // Create slides with clones for seamless infinite loop
    const createSlides = () => {
        track.innerHTML = '';

        // Add all original images
        carouselImages.forEach((image, index) => {
            const slide = createElement('div', { className: 'carousel-slide' });
            const img = createElement('img', {
                src: image.src,
                alt: `${site.businessName} - ${image.alt}`,
                loading: index < 3 ? 'eager' : 'lazy'
            });
            slide.appendChild(img);
            track.appendChild(slide);
        });

        // Clone first 6 images at the end for seamless loop (ensures no white space on bigger screens)
        for (let i = 0; i < Math.min(6, carouselImages.length); i++) {
            const slide = createElement('div', { className: 'carousel-slide' });
            const img = createElement('img', {
                src: carouselImages[i].src,
                alt: `${site.businessName} - ${carouselImages[i].alt}`,
                loading: 'eager'
            });
            slide.appendChild(img);
            track.appendChild(slide);
        }
    };

    createSlides();

    // Create indicators
    carouselImages.forEach((image, index) => {
        const indicator = createElement('button', {
            className: index === 0 ? 'carousel-indicator active' : 'carousel-indicator',
            ariaLabel: `Go to slide ${index + 1}`
        });
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    const updateCarousel = (animate = true) => {
        // Get actual slide width dynamically (works for both desktop and mobile)
        const slides = track.querySelectorAll('.carousel-slide');
        if (!slides.length) return;
        
        const firstSlide = slides[0];
        const slideWidth = firstSlide.offsetWidth;
        
        // Get gap from computed style
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap) || 0;
        
        const moveAmount = slideWidth + gap;

        // Clamp currentIndex to prevent going too far (safety check)
        const maxIndex = carouselImages.length + 5; // Original + 6 clones - 1
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        track.style.transition = animate 
            ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
            : 'none';

        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

        // Update indicators
        const allIndicators = indicators.querySelectorAll('.carousel-indicator');
        const indicatorIndex = currentIndex % carouselImages.length;
        allIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === indicatorIndex);
        });

        // Arrows always enabled for infinite loop
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;

        if (!animate) void track.offsetWidth; // Force reflow
    };

    const goToSlide = (index) => {
        if (index >= 0 && index < carouselImages.length) {
            currentIndex = index;
            updateCarousel(true);
            resetAutoplay();
        }
    };

    const nextSlide = () => {
        if (isTransitioning) return;

        currentIndex++;
        updateCarousel(true);

        // Reset to beginning after showing clones
        if (currentIndex >= carouselImages.length) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateCarousel(false);
                isTransitioning = false;
            }, 600); // Match transition duration exactly
        }
    };

    const prevSlide = () => {
        if (isTransitioning) return;

        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel(true);
        } else {
            // Jump to end, then animate back
            isTransitioning = true;
            currentIndex = carouselImages.length;
            updateCarousel(false);

            setTimeout(() => {
                currentIndex--;
                updateCarousel(true);
                isTransitioning = false;
            }, 50);
        }
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 4000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    // IntersectionObserver for viewport-based autoplay
    let isInViewport = false;
    let isHovered = false;
    
    const carousel = document.getElementById('aboutUsCarousel');
    if (carousel) {
        // Observe carousel visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isInViewport = entry.isIntersecting;
                
                if (isInViewport && !isHovered) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, {
            threshold: 0.3 // Start autoplay when 30% of carousel is visible
        });
        
        observer.observe(carousel);
        
        // Pause on hover (only if in viewport)
        carousel.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoplay();
        });
        
        carousel.addEventListener('mouseleave', () => {
            isHovered = false;
            if (isInViewport) {
                startAutoplay();
            }
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
            diff > 0 ? nextSlide() : prevSlide();
            resetAutoplay();
        }
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Handle window resize to recalculate slide widths
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(false); // Update without animation on resize
        }, 100);
    });

    // Initialize
    updateCarousel();
    // Autoplay will start via IntersectionObserver when carousel enters viewport
};
