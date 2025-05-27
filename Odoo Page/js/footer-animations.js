// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function initFooterAnimations() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Batch DOM queries for better performance
    const elements = {
        columns: footer.querySelectorAll('.footer-column'),
        links: footer.querySelectorAll('.footer-links a'),
        socialIcons: footer.querySelectorAll('.social-icons a'),
        copyright: footer.querySelector('.copyright'),
        logo: footer.querySelector('.footer-logo'),
        contact: footer.querySelector('.footer-contact')
    };

    // Optimize initial states
    gsap.set([elements.columns, elements.contact, elements.copyright], { 
        opacity: 0,
        yPercent: 10
    });
    gsap.set(elements.links, { 
        opacity: 0,
        yPercent: 5
    });
    gsap.set(elements.socialIcons, { 
        scale: 0.9,
        opacity: 0
    });
    gsap.set(elements.logo, { 
        scale: 0.95,
        opacity: 0
    });

    // Create a single timeline for better performance
    const footerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
            preventOverlaps: true
        },
        defaults: {
            duration: 0.6,
            ease: "power2.out"
        }
    });

    // Batch animations
    footerTimeline
        .to(elements.logo, {
            scale: 1,
            opacity: 1
        })
        .to(elements.columns, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1
        }, "-=0.3")
        .to([elements.links, elements.contact, elements.copyright], {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05
        }, "-=0.4")
        .to(elements.socialIcons, {
            scale: 1,
            opacity: 1,
            stagger: 0.05
        }, "-=0.3");

    // Optimize hover effects using CSS
    const style = document.createElement('style');
    style.textContent = `
        .footer-link {
            transition: transform 0.3s ease-out, color 0.3s ease-out;
        }
        .footer-link:hover {
            transform: translateX(5px);
            color: #c82333;
        }
        .social-icon {
            transition: transform 0.3s ease-out;
        }
        .social-icon:hover {
            transform: translateY(-3px) scale(1.1);
        }
        .footer-logo {
            transition: transform 0.3s ease-out, filter 0.3s ease-out;
        }
        .footer-logo:hover {
            transform: scale(1.03);
            filter: brightness(1.1);
        }
        .footer-gradient {
            background: linear-gradient(135deg, 
                rgba(15, 32, 39, 0.95), 
                rgba(32, 58, 67, 0.95), 
                rgba(44, 83, 100, 0.95)
            );
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);

    // Add classes to elements
    elements.links.forEach(link => link.classList.add('footer-link'));
    elements.socialIcons.forEach(icon => icon.classList.add('social-icon'));
    if (elements.logo) elements.logo.classList.add('footer-logo');
    footer.classList.add('footer-gradient');

    // Simple click animation for social icons
    elements.socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(icon, {
                scale: 0.9,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });

    // Cleanup function
    return () => {
        elements.socialIcons.forEach(icon => {
            icon.classList.remove('social-icon');
            icon.replaceWith(icon.cloneNode(true));
        });
        elements.links.forEach(link => link.classList.remove('footer-link'));
        if (elements.logo) elements.logo.classList.remove('footer-logo');
        footer.classList.remove('footer-gradient');
    };
}

// Use Intersection Observer for better performance
let footerAnimationInitialized = false;

function initializeFooterAnimations() {
    if (footerAnimationInitialized) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initFooterAnimations();
                footerAnimationInitialized = true;
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    const footer = document.querySelector('footer');
    if (footer) {
        observer.observe(footer);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeFooterAnimations); 