// Navbar shadow on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
    }
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mega menu open on hover (desktop) and click (mobile) for all dropdowns
function setupMegaMenuHover() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        // Desktop: open on hover
        dropdown.addEventListener('mouseenter', function() {
            dropdown.classList.add('open');
        });
        dropdown.addEventListener('mouseleave', function() {
            dropdown.classList.remove('open');
        });
        // Mobile: open/close on click
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupMegaMenuHover, 300);
}); 