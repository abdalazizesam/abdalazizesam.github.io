// Function to throttle scroll events for performance
let ticking = false; // Flag to prevent multiple requestAnimationFrame calls

function updateScrollEffects() {
    // Update navbar class based on scroll position
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for floating elements in the hero section
    const scrolled = window.pageYOffset;
    const parallax1 = document.querySelector('.floating-element-1');
    const parallax2 = document.querySelector('.floating-element-2');
    
    if (parallax1) {
        parallax1.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (parallax2) {
        parallax2.style.transform = `translateY(${scrolled * -0.3}px)`;
    }
    
    ticking = false; // Reset flag
}

function requestTick() {
    // Request a new animation frame only if one is not already scheduled
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Listen for scroll events and throttle them
window.addEventListener('scroll', requestTick);

// Smooth scrolling for navigation links and the logo-link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor link behavior
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0; // Get navbar height, default to 0 if not found
            
            // Calculate the position to scroll to, accounting for the fixed navbar
            // We want the target to appear just below the navbar.
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });

            // Close mobile menu if open after clicking a link
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scroll
            }
        }
    });
});

// Intersection Observer for scroll animations (fade-in effect)
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Reduce trigger area by 50px from bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
        } else {
            // Optional: remove 'visible' class when element scrolls out of view
            // entry.target.classList.remove('visible'); 
        }
    });
}, observerOptions);

// Observe all elements with the 'fade-in' class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Intersection Observer for staggered reveal animations (skill and project cards)
const revealElements = document.querySelectorAll('.skill-card, .project-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered delay for each element
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 120); // Slightly increased delay for more noticeable stagger
            revealObserver.unobserve(entry.target); // Stop observing once animated
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Set initial styles for elements to be revealed
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)'; // Deeper initial translateY
    el.style.transition = 'all 0.8s ease'; // Slower transition for a smoother reveal
    revealObserver.observe(el);
});

// Project modal functionality
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

// Project data including image URLs - UPDATED WITH demoType
const projectData = {
    "codehex": {
        title: "CodeHex",
        description: "CODEHEX is a competitive programming platform built with Angular that hosts coding contests and challenges. It features timed competitions, a problem archive, real-time submission evaluation, and user profiles with rankings. Designed for programmers to test and improve their skills in a structured, competitive environment.",
        imageUrl: "pics/project1.jpg", 
        technologies: ["Angular CLI", "Firebase Auth", "TypeScript", "HTML", "CSS"],
        features: [
            "Competitive programming contests",
            "Problem archive with various difficulty levels",
            "Real-time submission evaluation and feedback",
            "User profiles with performance tracking and rankings",
            "Secure user authentication",
            "Responsive design for optimal experience on all devices",
            "Detailed documentation for users and developers"
        ],
        github: "https://github.com/abdalazizesam/CodeHex",
        demo: "https://abdalazizesam.github.io/src/doc_codehex.pdf", // This is documentation
        demoType: "Documentation" // New property for custom text
    },
    "codesynth": {
        title: "CodeSynth",
        description: "CodeSynth is a real-time collaborative code editor with AI-powered code review capabilities. This application allows multiple developers to work on the same codebase simultaneously, with intelligent suggestions and best practice recommendations provided by integrated AI tools.",
        imageUrl: "pics/project2.jpg", 
        technologies: ["React", "Socket.IO", "Node.js", "MongoDB"],
        features: [
            "Real-time collaborative editing",
            "AI-powered code review and suggestions",
            "Syntax highlighting for multiple languages",
            "Integrated chat for team communication",
            "Version control integration",
            "Secure room creation and joining",
            "Scalable backend for multiple users"
        ],
        github: "https://github.com/abdalazizesam/CodeSynth",
        demo: null, // Set to null as there's no actual live demo or separate documentation
        demoType: null // No specific demo type needed if demo is null
    },
    "reeldeal": {
        title: "ReelDeal",
        description: "ReelDeal is a modern Flutter app that makes choosing what to watch effortless. By combining your mood, genre preferences, and viewing history, it delivers personalized movie and TV recommendations. Beyond discovery, it also helps you organize and manage your entertainment library with ease.",
        imageUrl: "pics/project3.jpg", 
        technologies: ["Flutter", "Dart", "TMDB API"],
        features: [
            "Personalized movie and TV recommendations",
            "Mood and genre-based filtering",
            "Watchlist and favorite management",
            "Detailed movie/TV show information (synopsis, cast, ratings)",
            "Intuitive user interface",
            "Cross-platform compatibility (Android/iOS)",
            "Offline viewing capabilities (if content is downloaded)"
        ],
        github: "https://github.com/abdalazizesam/RealDeal",
        demo: "https://github.com/abdalazizesam/RealDeal/releases/download/v2.0.0/ReelDealv2.0.0.apk",
        demoType: "Download Link (Android)" // New property for custom text
    }
};

// Handle clicks on project cards to open the modal
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent modal from opening if a link within the card is clicked
        if (e.target.closest('.project-link')) {
            return;
        }
        
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});

// Function to populate and display the project modal
function showProjectModal(project) {
    let demoLinkHtml = '';
    if (project.demo) {
        let linkText = project.demoType || "Live Demo"; // Use demoType or default to "Live Demo"
        demoLinkHtml = `
            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: var(--form-input-bg); color: var(--text-color); text-decoration: none; border-radius: 10px; font-weight: 600; border: 1px solid var(--form-input-border); transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
                <i class="fas fa-external-link-alt"></i>
                ${linkText}
            </a>`;
    }
    
    // Construct modal content dynamically
    const content = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <img src="${project.imageUrl}" alt="${project.title} Preview" style="width: 100%; max-width: 500px; height: auto; border-radius: 15px; margin-bottom: 1.5rem; border: 1px solid var(--card-border);">
            <h2 style="font-size: clamp(1.8rem, 4vw, 2.2rem); margin-bottom: 1rem; background: linear-gradient(135deg, var(--text-color) 0%, var(--primary-gradient-end) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${project.title}</h2>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-gradient-end); margin-bottom: 1rem; font-size: clamp(1.1rem, 2.5vw, 1.35rem);">About This Project</h3>
            <p style="color: var(--secondary-text-color); line-height: 1.6; margin-bottom: 1.5rem; font-size: clamp(0.95rem, 2vw, 1.05rem);">${project.description}</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-gradient-end); margin-bottom: 1rem; font-size: clamp(1.1rem, 2.5vw, 1.35rem);">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem;">
                ${project.technologies.map(tech => `
                    <span style="background: var(--tech-tag-bg); color: var(--primary-gradient-end); padding: 0.5rem 1rem; border-radius: 20px; font-size: clamp(0.8rem, 1.8vw, 0.9rem); font-weight: 500; border: 1px solid var(--tech-tag-border);">${tech}</span>
                `).join('')}
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary-gradient-end); margin-bottom: 1rem; font-size: clamp(1.1rem, 2.5vw, 1.35rem);">Key Features</h3>
            <ul style="color: var(--secondary-text-color); line-height: 1.8; margin-left: 1.5rem; list-style-type: '🚀 '; font-size: clamp(0.95rem, 2vw, 1.05rem);">
                ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
            </ul>
        </div>

        <div style="display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; background: linear-gradient(45deg, var(--primary-gradient-start), var(--primary-gradient-end)); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);">
                <i class="fab fa-github"></i>
                View on GitHub
            </a>
            ${demoLinkHtml} </div>
    `;
    
    modalContent.innerHTML = content; // Set modal content
    projectModal.classList.add('active'); // Show modal
    document.body.style.overflow = 'hidden'; // Prevent scrolling of background content
}

// Function to close the project modal - REVISED FOR DEBUGGING
function closeModal() {
    console.log('Closing modal initiated.'); // Diagnostic log
    const projectModal = document.getElementById('projectModal'); // Re-get reference for robustness
    if (projectModal && projectModal.classList.contains('active')) { // Only try to close if it's open
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Modal active class removed:', !projectModal.classList.contains('active')); // Diagnostic log
    } else {
        console.log('Modal not active or projectModal element not found.'); // Diagnostic log
    }
}

// Event listeners for closing the modal
// Check if elements exist before adding listeners to avoid errors
if (modalClose) {
    modalClose.addEventListener('click', () => {
        console.log('Close button clicked.'); // Diagnostic log
        closeModal();
    });
} else {
    console.warn('modalClose element not found.'); // Warn if button is missing
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        console.log('Modal background clicked. Target:', e.target); // Diagnostic log
        if (e.target === projectModal) { // Only close if clicking directly on the overlay
            closeModal();
        }
    });
} else {
    console.warn('projectModal element not found.'); // Warn if modal is missing
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
        console.log('Escape key pressed while modal is active.'); // Diagnostic log
        closeModal();
    }
});


// Contact form handling (actual submission via Formspree)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => { // Made function async
    e.preventDefault(); // Prevent actual form submission (we'll use fetch)

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7'; // Visual feedback for disabled state
    submitBtn.style.cursor = 'not-allowed';

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json' // Important for Formspree to return JSON
            }
        });

        if (response.ok) {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)'; // Green for success
            contactForm.reset(); // Clear form fields
        } else {
            // Handle errors from Formspree or network issues
            const data = await response.json();
            if (data.errors) {
                alert('Error sending message: ' + data.errors.map(error => error.message).join(', '));
            } else {
                alert('Oops! There was a problem sending your message.');
            }
            submitBtn.textContent = 'Failed';
            submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)'; // Red for error
        }
    } catch (error) {
        console.error('Network or submission error:', error);
        alert('A network error occurred. Please try again later.');
        submitBtn.textContent = 'Failed';
        submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)'; // Red for error
    } finally {
        // Reset button after a short delay regardless of success or failure
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            // Restore original gradient using CSS variable for current theme
            submitBtn.style.background = `linear-gradient(45deg, var(--primary-gradient-start), var(--primary-gradient-end))`;
        }, 3000);
    }
});

// Typing effect for the hero subtitle
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    // Clear initial content and set opacity to 1 so text can appear
    element.innerHTML = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i); // Add one character at a time
            i++;
            setTimeout(type, speed); // Schedule next character
        } else {
            // When typing is complete, remove the blinking caret
            if (callback) callback();
        }
    }
    type(); // Start the typing animation
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.typing-text');
    const originalText = heroSubtitle.textContent; // Store original text
    
    // Immediately set originalText to empty so it doesn't flash
    heroSubtitle.textContent = ''; 

    // Delay before starting typing animation
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 50, () => { // Faster speed: 50ms per character
            // Callback to remove the blinking cursor after typing is done
            heroSubtitle.classList.add('typing-completed');
        });
    }, 500); // Initial delay
});

// CTA button click ripple effect
document.querySelector('.cta-button').addEventListener('click', function(e) {
    // Create ripple span element
    let ripple = document.createElement('span');
    let rect = this.getBoundingClientRect(); // Get button position and size
    let size = Math.max(rect.width, rect.height); // Determine ripple size
    // Calculate click position relative to the button
    let x = e.clientX - rect.left - size / 2;
    let y = e.clientY - rect.top - size / 2;
    
    // Apply dynamic styles for the ripple effect
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none; /* Make ripple non-interactive */
    `;
    
    this.appendChild(ripple); // Add ripple to the button
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Define ripple animation keyframes if not already defined in CSS
// (This is a fallback, ideally should be in styles.css)
if (!document.querySelector('style[data-ripple-keyframes]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple-keyframes', 'true');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}


// Mobile menu toggle functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Toggle 'active' class on nav-links for slide-in effect
        mobileMenuBtn.classList.toggle('active'); // Toggle 'active' on button for X animation
        // Disable body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Dark Mode / Light Mode Toggle
const themeToggleDesktop = document.getElementById('themeToggleDesktop');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const body = document.body;

// Function to apply theme based on preference
function applyTheme(isLightMode) {
    if (isLightMode) {
        body.classList.add('light-mode');
        themeToggleDesktop.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        themeToggleMobile.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        themeToggleDesktop.classList.add('sun');
        themeToggleMobile.classList.add('sun');

    } else {
        body.classList.remove('light-mode');
        themeToggleDesktop.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        themeToggleMobile.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        themeToggleDesktop.classList.remove('sun');
        themeToggleMobile.classList.remove('sun');
    }
}

// Check for saved theme preference on load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        applyTheme(true);
    } else {
        applyTheme(false); // Default to dark mode
    }
});

// Event listeners for theme toggles
if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', () => {
        const isLightMode = body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
        applyTheme(isLightMode);
    });
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
        const isLightMode = body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
        applyTheme(isLightMode);
    });
}