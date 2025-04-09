// Main JavaScript for Abdalaziz Esam's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Add necessary CSS for animations and effects
    addAnimationStyles();
    
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initCustomCursor();
    initScrollReveal();
    initTypingEffect();
    initProjectHoverEffects();
    initSmoothScroll();
    initParticlesBackground();
});

// Add required CSS styles programmatically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation classes for scroll reveal */
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Custom cursor expand effect */
        .cursor-dot.expand {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.5;
        }
        
        .cursor-outline.expand {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: rgba(56, 189, 248, 0.1);
        }
        
        [data-theme="light"] .cursor-outline.expand {
            background-color: rgba(2, 132, 199, 0.1);
        }
        
        /* Typing cursor effect */
        .typing-cursor {
            display: inline-block;
            width: 3px;
            height: 24px;
            background-color: var(--accent);
            margin-left: 5px;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* Particles canvas */
        #particles-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }
        
        /* Project hover transition */
        .project {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(style);
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeToggle, currentTheme);
    updateThemeIcon(mobileThemeToggle, currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(themeToggle, newTheme);
        updateThemeIcon(mobileThemeToggle, newTheme);
        
        // Update particles color if particles exist
        const particles = window.pJSDom;
        if (particles && particles.length > 0) {
            const particlesColor = newTheme === 'dark' ? '#38bdf8' : '#0284c7';
            particles[0].pJS.particles.color.value = particlesColor;
            particles[0].pJS.particles.line_linked.color = particlesColor;
            particles[0].pJS.fn.particlesRefresh();
        }
    }
    
    function updateThemeIcon(element, theme) {
        if (!element) return;
        const icon = element.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Event listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Custom Cursor Functionality
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline && window.innerWidth > 992) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Delayed movement for outline
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 80);
        });
        
        // Add hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, .project, .social-link');
        clickables.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorDot.classList.add('expand');
                cursorOutline.classList.add('expand');
            });
            
            element.addEventListener('mouseleave', function() {
                cursorDot.classList.remove('expand');
                cursorOutline.classList.remove('expand');
            });
        });
        
        // Show cursor when it enters the window
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = 1;
            cursorOutline.style.opacity = 1;
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = 0;
            cursorOutline.style.opacity = 0;
        });
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const elements = document.querySelectorAll('h1, h2, .project, .social-links a, .cta-button');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });
}

// Typing Animation for Hero Section
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        // Create a container for the text and cursor
        const container = document.createElement('span');
        container.className = 'typing-container';
        
        // Create spans for the text and cursor
        const textSpan = document.createElement('span');
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        
        // Append elements to DOM
        container.appendChild(textSpan);
        container.appendChild(cursor);
        subtitle.appendChild(container);
        
        let charIndex = 0;
        function typeText() {
            if (charIndex < originalText.length) {
                textSpan.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 30);
            }
        }
        
        // Start typing effect after a slight delay
        setTimeout(typeText, 1000);
    }
}

// Projects Hover Effects
function initProjectHoverEffects() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            // Only add tilt effect on desktop
            if (window.innerWidth > 992) {
                project.addEventListener('mousemove', handleMouseMove);
            }
        });
        
        project.addEventListener('mouseleave', function() {
            project.removeEventListener('mousemove', handleMouseMove);
            // Reset the transform when mouse leaves
            project.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    function handleMouseMove(e) {
        const project = this;
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 16;
        const centerY = rect.height / 16;
        
        const rotateX = (y - centerY) / 360;
        const rotateY = (centerX - x) / 360;
        
        project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// Smooth Scrolling for Navigation
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Create interactive particles background
function initParticlesBackground() {
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        // Load particles.js script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
        script.onload = setupParticles;
        document.head.appendChild(script);
    } else {
        setupParticles();
    }
    
    function setupParticles() {
        // Create a canvas for particles
        const header = document.querySelector('header');
        if (header) {
            const canvas = document.createElement('div');
            canvas.id = 'particles-canvas';
            header.insertBefore(canvas, header.firstChild);
            
            // Get theme for appropriate color
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const particlesColor = currentTheme === 'dark' ? '#38bdf8' : '#0284c7';
            
            // Initialize particles
            particlesJS('particles-canvas', {
                "particles": {
                    "number": {
                        "value": 30,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": particlesColor
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": particlesColor,
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.6
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
}
