// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function initContactButtonAnimations() {
    const contactBtn = document.querySelector('.contact-btn');
    
    if (!contactBtn) return;

    // Initial animation for the button
    gsap.from(contactBtn, {
        duration: 0.8,
        y: -20,
        opacity: 0,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: contactBtn,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    // Hover animation
    contactBtn.addEventListener('mouseenter', () => {
        gsap.timeline()
            .to(contactBtn, {
                duration: 0.3,
                scale: 1.05,
                backgroundColor: "#a71d2a",
                boxShadow: "0 8px 20px rgba(200,35,51,0.2)",
                ease: "power2.out"
            })
            .to(contactBtn, {
                duration: 0.2,
                y: -3,
                ease: "power2.out"
            }, "-=0.1");
    });

    contactBtn.addEventListener('mouseleave', () => {
        gsap.timeline()
            .to(contactBtn, {
                duration: 0.3,
                scale: 1,
                backgroundColor: "#c82333",
                boxShadow: "0 4px 12px rgba(200,35,51,0.1)",
                y: 0,
                ease: "power2.out"
            });
    });

    // Click animation
    contactBtn.addEventListener('mousedown', () => {
        gsap.to(contactBtn, {
            duration: 0.1,
            scale: 0.95,
            ease: "power2.in"
        });
    });

    contactBtn.addEventListener('mouseup', () => {
        gsap.to(contactBtn, {
            duration: 0.2,
            scale: 1.05,
            ease: "elastic.out(1, 0.5)"
        });
    });

    // Add a subtle pulse animation when the button is in view
    gsap.to(contactBtn, {
        duration: 1.5,
        boxShadow: "0 4px 20px rgba(200,35,51,0.3)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: contactBtn,
            start: "top bottom-=100",
            toggleActions: "play pause resume reverse"
        }
    });
}

// Initialize button animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for header to load since the button is in the header
    const checkHeader = setInterval(() => {
        if (document.querySelector('.contact-btn')) {
            clearInterval(checkHeader);
            initContactButtonAnimations();
        }
    }, 100);
}); 