const menuConfig = {
    mainMenu: [
        {
            title: "Why Nxt Aspect",
            icon: "fas fa-info-circle",
            submenu: [
                { title: "Team", icon: "fas fa-users", link: "team.html" },
                { title: "Case Studies", icon: "fas fa-briefcase", link: "case-studies.html" },
                { title: "Career with US", icon: "fas fa-graduation-cap", link: "career.html" }
            ]
        },
        {
            title: "Odoo",
            icon: "fas fa-cogs",
            submenu: [
                { title: "Odoo Overview", icon: "fas fa-info-circle", link: "Odoo Page/index.html" },
                { title: "Odoo Implementation", icon: "fas fa-tools", link: "Odoo Page/implementation.html" },
                { title: "Odoo Customization", icon: "fas fa-code", link: "Odoo Page/customization.html" },
                { title: "Odoo Integration", icon: "fas fa-plug", link: "Odoo Page/integration.html" },
                { title: "Odoo Support", icon: "fas fa-headset", link: "Odoo Page/support.html" }
            ]
        },
        {
            title: "Services",
            icon: "fas fa-cogs",
            submenu: [
                { title: "AI/ML Services", icon: "fas fa-brain", link: "ai_ml.html" },
                { title: "No-code Solutions", icon: "fas fa-code", link: "no_code.html" },
                { title: "Mobility Solutions", icon: "fas fa-mobile-alt", link: "mobility.html" },
                { title: "Digital Marketing", icon: "fas fa-bullhorn", link: "digital_marketing.html" },
                { title: "Custom Development", icon: "fas fa-laptop-code", link: "custom_dev.html" },
                { title: "E-commerce Websites", icon: "fas fa-shopping-cart", link: "ecommerce.html" }
            ]
        },
        {
            title: "About Us",
            icon: "fas fa-building",
            link: "about-us.html"
        }
    ],
    headerActions: [
        {
            title: "Hiring Now",
            icon: "fas fa-user-plus",
            link: "career.html",
            class: "hiring-btn"
        },
        {
            title: "Get In Touch",
            icon: "fas fa-paper-plane",
            link: "contact.html",
            class: "contact-btn"
        }
    ]
}; 