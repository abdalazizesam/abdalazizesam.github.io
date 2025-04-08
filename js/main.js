// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const mobileThemeIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Update icons
    const allIcons = document.querySelectorAll('.theme-toggle i');
    allIcons.forEach(icon => {
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Store preference in localStorage
    localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Set correct icon based on theme
    const allIcons = document.querySelectorAll('.theme-toggle i');
    allIcons.forEach(icon => {
        if (savedTheme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
} else {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        const allIcons = document.querySelectorAll('.theme-toggle i');
        allIcons.forEach(icon => {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
    }
}

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a menu item
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Custom cursor functionality - only run on desktop
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Check if we're on desktop before initializing cursor
function isMobileDevice() {
    return (window.innerWidth <= 992);
}

if (!isMobileDevice() && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay to outline for smoother effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 50);
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, .project, .cta-button, .social-link, .theme-toggle');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// Interaction Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observe all projects
document.querySelectorAll('.project').forEach(project => {
    observer.observe(project);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
*/
