// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function initERPCardsAnimations() {
    const cardsSection = document.querySelector('.erp-industries');
    const cardsHeading = document.querySelector('.erp-heading');
    const cardsSubheading = document.querySelector('.erp-subheading');
    const cards = document.querySelectorAll('.erp-card');
    const cardImages = document.querySelectorAll('.erp-card img');
    const cardContents = document.querySelectorAll('.erp-card-content');
    const cardTitles = document.querySelectorAll('.erp-card-title');
    const cardDescs = document.querySelectorAll('.erp-card-desc');
    const cardLinks = document.querySelectorAll('.erp-card-link');

    // Split text for heading and subheading
    const headingSplit = new SplitText(cardsHeading, { type: "words,chars" });
    const subheadingSplit = new SplitText(cardsSubheading, { type: "words" });

    // Initial heading animation
    const headingTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: cardsHeading,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    headingTimeline
        .from(headingSplit.words, {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: {
                amount: 0.5,
                from: "start"
            },
            ease: "power3.out"
        })
        .from(headingSplit.chars, {
            duration: 0.8,
            opacity: 0,
            scale: 0.8,
            stagger: {
                amount: 0.3,
                from: "random"
            },
            ease: "back.out(1.2)"
        }, "-=0.5");

    // Subheading animation
    gsap.from(subheadingSplit.words, {
        scrollTrigger: {
            trigger: cardsSubheading,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: {
            amount: 0.4,
            from: "start"
        },
        ease: "power2.out"
    });

    // Cards container animation
    gsap.from('.erp-cards', {
        scrollTrigger: {
            trigger: '.erp-cards',
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power2.out"
    });

    // Individual cards animation
    cards.forEach((card, index) => {
        const image = card.querySelector('img');
        const content = card.querySelector('.erp-card-content');
        const title = card.querySelector('.erp-card-title');
        const desc = card.querySelector('.erp-card-desc');
        const link = card.querySelector('.erp-card-link');

        // Set initial states
        gsap.set(image, { scale: 1.2, opacity: 0 });
        gsap.set(content, { y: 30, opacity: 0 });
        gsap.set(title, { y: 20, opacity: 0 });
        gsap.set(desc, { y: 20, opacity: 0 });
        gsap.set(link, { y: 10, opacity: 0 });

        // Create timeline for each card
        const cardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });

        // Animate card elements
        cardTimeline
            .to(image, {
                duration: 1,
                scale: 1,
                opacity: 1,
                ease: "power2.out"
            })
            .to(content, {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "power2.out"
            }, "-=0.6")
            .to(title, {
                duration: 0.6,
                y: 0,
                opacity: 1,
                ease: "power2.out"
            }, "-=0.4")
            .to(desc, {
                duration: 0.6,
                y: 0,
                opacity: 1,
                ease: "power2.out"
            }, "-=0.4")
            .to(link, {
                duration: 0.4,
                y: 0,
                opacity: 1,
                ease: "power2.out"
            }, "-=0.2");

        // Hover animations
        card.addEventListener('mouseenter', () => {
            gsap.timeline()
                .to(card, {
                    duration: 0.4,
                    scale: 1.02,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                    ease: "power2.out"
                })
                .to(image, {
                    duration: 0.4,
                    scale: 1.1,
                    ease: "power2.out"
                }, "-=0.4")
                .to(title, {
                    duration: 0.3,
                    color: "#c82333",
                    ease: "power2.out"
                }, "-=0.4")
                .to(link, {
                    duration: 0.3,
                    x: 10,
                    ease: "power2.out"
                }, "-=0.3");
        });

        card.addEventListener('mouseleave', () => {
            gsap.timeline()
                .to(card, {
                    duration: 0.4,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    ease: "power2.out"
                })
                .to(image, {
                    duration: 0.4,
                    scale: 1,
                    ease: "power2.out"
                }, "-=0.4")
                .to(title, {
                    duration: 0.3,
                    color: "#222",
                    ease: "power2.out"
                }, "-=0.4")
                .to(link, {
                    duration: 0.3,
                    x: 0,
                    ease: "power2.out"
                }, "-=0.3");
        });

        // Click animation for links
        link.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.timeline()
                .to(link, {
                    duration: 0.2,
                    scale: 0.95,
                    ease: "power2.in"
                })
                .to(link, {
                    duration: 0.4,
                    scale: 1,
                    color: "#c82333",
                    ease: "elastic.out(1, 0.5)"
                });
        });
    });

    // Button animation
    const button = document.querySelector('.erp-btn');
    if (button) {
        gsap.from(button, {
            scrollTrigger: {
                trigger: button,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        });

        // Button hover effect
        button.addEventListener('mouseenter', () => {
            gsap.timeline()
                .to(button, {
                    duration: 0.3,
                    scale: 1.05,
                    backgroundColor: "#c82333",
                    ease: "power2.out"
                })
                .to(button, {
                    duration: 0.2,
                    boxShadow: "0 5px 15px rgba(200, 35, 51, 0.3)",
                    ease: "power2.out"
                }, "-=0.3");
        });

        button.addEventListener('mouseleave', () => {
            gsap.timeline()
                .to(button, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: "#222",
                    ease: "power2.out"
                })
                .to(button, {
                    duration: 0.2,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    ease: "power2.out"
                }, "-=0.3");
        });
    }

    // Cleanup function
    return () => {
        headingSplit.revert();
        subheadingSplit.revert();
    };
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const checkCards = setInterval(() => {
        if (document.querySelector('.erp-industries')) {
            clearInterval(checkCards);
            initERPCardsAnimations();
        }
    }, 100);
}); 