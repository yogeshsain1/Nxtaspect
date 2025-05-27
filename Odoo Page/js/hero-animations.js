// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Hero section animations
function initHeroAnimations() {
    // Get hero elements
    const companyName = document.querySelector('.company-name');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroOverlay = document.querySelector('.hero-overlay');

    // Split text for animations
    const companyNameSplit = new SplitText(companyName, { type: "chars,words" });
    const heroTitleSplit = new SplitText(heroTitle, { type: "chars,words" });
    const heroSubtitleSplit = new SplitText(heroSubtitle, { type: "chars,words" });

    // Create timeline for initial load animation
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    // Initial animation sequence
    heroTimeline
        .from(heroOverlay, {
            duration: 1.2,
            opacity: 0,
            ease: "power2.inOut"
        })
        .from(companyNameSplit.chars, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.02,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(heroTitleSplit.chars, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.02,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(heroSubtitleSplit.chars, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.01,
            ease: "back.out(1.7)"
        }, "-=0.4");

    // Cleanup function
    return () => {
        companyNameSplit.revert();
        heroTitleSplit.revert();
        heroSubtitleSplit.revert();
    };
}

// Initialize hero animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for hero section to load
    const checkHero = setInterval(() => {
        if (document.querySelector('.hero')) {
            clearInterval(checkHero);
            initHeroAnimations();
        }
    }, 100);
}); 