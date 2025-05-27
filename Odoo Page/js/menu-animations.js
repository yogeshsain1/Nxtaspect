// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function initMenuAnimations() {
    const menuItems = document.querySelectorAll('.nav-links li a');
    const megaMenus = document.querySelectorAll('.mega-menu');

    menuItems.forEach(item => {
        // Click animation for each menu item
        item.addEventListener('click', (e) => {
            // Prevent default only for dropdown items
            if (item.parentElement.classList.contains('dropdown')) {
                e.preventDefault();
            }

            // Create a ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'menu-ripple';
            item.appendChild(ripple);

            // Get click position
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set ripple position
            gsap.set(ripple, {
                x: x,
                y: y,
                scale: 0,
                opacity: 0.3,
                backgroundColor: '#c82333'
            });

            // Animate ripple
            gsap.timeline()
                .to(ripple, {
                    duration: 0.6,
                    scale: 20,
                    opacity: 0,
                    ease: "power2.out"
                })
                .call(() => {
                    ripple.remove();
                });

            // Animate the clicked item
            gsap.timeline()
                .to(item, {
                    duration: 0.2,
                    scale: 0.95,
                    ease: "power2.in"
                })
                .to(item, {
                    duration: 0.3,
                    scale: 1,
                    ease: "elastic.out(1, 0.5)"
                });

            // If it's a dropdown item, animate the mega menu
            if (item.parentElement.classList.contains('dropdown')) {
                const megaMenu = item.parentElement.querySelector('.mega-menu');
                const menuColumns = megaMenu.querySelectorAll('.mega-menu-column');
                const menuItems = megaMenu.querySelectorAll('li');

                // Toggle mega menu with animation
                if (!megaMenu.classList.contains('open')) {
                    // Open animation
                    gsap.timeline()
                        .set(megaMenu, {
                            display: 'flex',
                            opacity: 0,
                            y: -20
                        })
                        .to(megaMenu, {
                            duration: 0.3,
                            opacity: 1,
                            y: 0,
                            ease: "power2.out"
                        })
                        .from(menuColumns, {
                            duration: 0.4,
                            y: 20,
                            opacity: 0,
                            stagger: 0.1,
                            ease: "power2.out"
                        }, "-=0.2")
                        .from(menuItems, {
                            duration: 0.3,
                            x: -10,
                            opacity: 0,
                            stagger: 0.02,
                            ease: "power2.out"
                        }, "-=0.3");

                    megaMenu.classList.add('open');
                } else {
                    // Close animation
                    gsap.timeline()
                        .to(megaMenu, {
                            duration: 0.3,
                            opacity: 0,
                            y: -20,
                            ease: "power2.in"
                        })
                        .set(megaMenu, {
                            display: 'none'
                        });

                    megaMenu.classList.remove('open');
                }
            }
        });

        // Hover animation
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                color: '#c82333',
                borderBottomWidth: '2.5px',
                borderBottomColor: '#c82333',
                backgroundColor: 'rgba(200,35,51,0.07)',
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                color: '#222',
                borderBottomWidth: '0px',
                borderBottomColor: 'transparent',
                backgroundColor: 'transparent',
                ease: "power2.out"
            });
        });
    });

    // Add styles for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .menu-ripple {
            position: absolute;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            pointer-events: none;
            z-index: 1;
        }
        .nav-links li a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Initialize menu animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for header to load
    const checkHeader = setInterval(() => {
        if (document.querySelector('.nav-links')) {
            clearInterval(checkHeader);
            initMenuAnimations();
        }
    }, 100);
}); 