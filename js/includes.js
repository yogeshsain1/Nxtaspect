document.addEventListener('DOMContentLoaded', function() {
    // Load header content
    const headerContent = `
        <div class="top-bar">
            <a href="tel:+1234567890"><i class="fas fa-phone"></i> Contact Sales</a>
            <a href="mailto:info@nxtaspect.com"><i class="fas fa-envelope"></i> info@nxtaspect.com</a>
        </div>

        <header>
            <div class="logo">
                <a href="index.html">
                    <img src="images/logo/logo.png" alt="NXT ASPECT" class="logo-img">
                </a>
            </div>
            <nav class="main-nav">
                <ul class="nav-list">
                    ${menuConfig.mainMenu.map(item => `
                        <li class="nav-item ${item.submenu ? 'has-submenu' : ''} ${item.title === 'Services' ? 'services-menu' : ''}">
                            <a href="${item.link || '#'}" class="nav-link">
                                <i class="${item.icon}"></i> ${item.title}
                                ${item.submenu ? '<i class="fas fa-chevron-down submenu-arrow"></i>' : ''}
                            </a>
                            ${item.submenu ? `
                                <ul class="submenu">
                                    ${item.submenu.map(subItem => `
                                        <li>
                                            <a href="${subItem.link}">
                                                <i class="${subItem.icon}"></i> ${subItem.title}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </li>
                    `).join('')}
                </ul>
            </nav>
            <div class="header-actions">
                ${menuConfig.headerActions.map(action => `
                    <a href="${action.link}" class="${action.class}">
                        <i class="${action.icon}"></i> ${action.title}
                    </a>
                `).join('')}
            </div>
            <button class="mobile-menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    `;

    // Load footer content
    const footerContent = `
        <footer>
            <p>&copy; 2025 NXT ASPECT. All rights reserved.</p>
        </footer>
    `;

    // Insert header and footer
    if (!document.querySelector('.main-nav')) {
        document.body.insertAdjacentHTML('afterbegin', headerContent);
    }
    // Add mobile menu overlay if not present
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.insertBefore(overlay, document.body.firstChild.nextSibling);
        overlay.addEventListener('click', () => {
            if (document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                document.querySelector('.main-nav').classList.remove('active');
            }
        });
    }
    if (!document.querySelector('footer')) {
        document.body.insertAdjacentHTML('beforeend', footerContent);
    }

    // Center logo on mobile
    function centerLogo() {
        if (window.innerWidth <= 768) {
            document.querySelector('.logo').style.justifyContent = 'center';
            document.querySelector('.logo').style.width = '100%';
        } else {
            document.querySelector('.logo').style.justifyContent = '';
            document.querySelector('.logo').style.width = '';
        }
    }
    window.addEventListener('resize', centerLogo);
    centerLogo();

    // Improved mobile menu logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    let isMenuOpen = false;
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isOpen;
            if (isMenuOpen) {
                mainNav.classList.add('active');
                document.body.classList.add('menu-open');
            } else {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    // Close menu on overlay tap
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            isMenuOpen = false;
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    // Prevent scroll when menu is open
    document.body.classList.remove('menu-open');
    // Submenu tap for mobile
    document.querySelectorAll('.has-submenu').forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        const arrow = item.querySelector('.submenu-arrow');
        let isOpen = false;
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                isOpen = !isOpen;
                if (isOpen) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    });

    // Initialize menu functionality
    const initMenuFunctionality = () => {
        // Submenu functionality
        const submenuItems = document.querySelectorAll('.submenu li');
        const submenuArrows = document.querySelectorAll('.submenu-arrow');

        // Rotate arrow on hover
        document.querySelectorAll('.has-submenu').forEach(item => {
            const arrow = item.querySelector('.submenu-arrow');
            const submenu = item.querySelector('.submenu');

            item.addEventListener('mouseenter', () => {
                gsap.to(arrow, {
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(arrow, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mainNav = document.querySelector('.main-nav');
        let isMenuOpen = false;

        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mainNav.classList.add('active');
                document.body.classList.add('menu-open');
                gsap.to(mobileMenuBtn, {
                    rotation: 90,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                gsap.to(mobileMenuBtn, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                isMenuOpen = false;
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                gsap.to(mobileMenuBtn, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    };

    // Initialize menu functionality
    initMenuFunctionality();

    // Add click event handling for submenu dropdowns
    document.querySelectorAll('.has-submenu').forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        const arrow = item.querySelector('.submenu-arrow');
        let isOpen = false;

        // Show submenu on hover for desktop
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', () => {
                submenu.style.opacity = '1';
                submenu.style.visibility = 'visible';
                gsap.to(arrow, {
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                submenu.style.opacity = '0';
                submenu.style.visibility = 'hidden';
                gsap.to(arrow, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }

        // Toggle submenu on click for mobile
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                isOpen = !isOpen;

                // Close all other submenus
                document.querySelectorAll('.has-submenu').forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubmenu = otherItem.querySelector('.submenu');
                        const otherArrow = otherItem.querySelector('.submenu-arrow');
                        otherSubmenu.style.opacity = '0';
                        otherSubmenu.style.visibility = 'hidden';
                        gsap.to(otherArrow, {
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });

                // Toggle current submenu
                if (isOpen) {
                    submenu.style.opacity = '1';
                    submenu.style.visibility = 'visible';
                    gsap.to(arrow, {
                        rotation: 180,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    submenu.style.opacity = '0';
                    submenu.style.visibility = 'hidden';
                    gsap.to(arrow, {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });

    // Update active state for current page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPage.includes(href)) {
            link.classList.add('active');
            gsap.to(link, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
}); 