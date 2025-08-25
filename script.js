// Global variables
let isMenuOpen = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeScrollEffects();
    initializeParticles();
    initializeCVDownload();
});

//form handle
    // Form submission handler for Formspree
    const form = document.getElementById("contactForm");
    const successAlert = document.getElementById("successAlert");
    const errorAlert = document.getElementById("errorAlert");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop normal form behavior

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    successAlert.style.display = "block";
                    errorAlert.style.display = "none";
                    form.reset();
                } else {
                    successAlert.style.display = "none";
                    errorAlert.style.display = "block";
                }
            }).catch(() => {
                successAlert.style.display = "none";
                errorAlert.style.display = "block";
            });
        });
    }

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(111, 44, 235, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active section highlighting
    highlightActiveSection();
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(10, 10, 15, 0.98)';
        navMenu.style.padding = '2rem';
        navMenu.style.backdropFilter = 'blur(20px)';
        navMenu.style.border = '1px solid rgba(111, 44, 235, 0.3)';
        navMenu.style.borderTop = 'none';
        navMenu.style.borderRadius = '0 0 15px 15px';
        
        hamburger.classList.add('active');
        hamburger.style.transform = 'rotate(90deg)';
    } else {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    }
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            if (sectionTop <= 300 && sectionTop + sectionHeight > 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animations and effects
function initializeAnimations() {
    // Typing animation for hero text
    const heroGreeting = document.querySelector('.greeting-text');
    if (heroGreeting) {
        typeWriter(heroGreeting, 'Hello, I\'m', 100);
    }

    // Counter animation for stats
    animateCounters();

    // Parallax effect for floating orbs
    initializeParallax();

    // Intersection Observer for fade-in animations
    initializeIntersectionObserver();
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing animation after a small delay
    setTimeout(type, 1000);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/\d/g, '');
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, 20);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function initializeParallax() {
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        floatingOrbs.forEach((orb, index) => {
            const speed = parallaxSpeed * (index + 1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        'section, .skill-card, .project-card, .cosmic-card, .contact-item'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Particle system for enhanced visual effects
function initializeParticles() {
    createFloatingParticles();
    createMouseFollowEffect();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    // Create random floating particles
    for (let i = 0; i < 200; i++) {
        createParticle(particleContainer,i);
    }
}

function createParticle(container, i = 0) {
  // تأكد إن الحاوية قابلة للتموضع النسبي
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 3 + 1;
  const { clientWidth: w, clientHeight: h } = container;
  const x = Math.random() * w;
  const y = Math.random() * h;
  const duration = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.5 + 0.2;

  // تدوير ألوان بالتساوي
  const palette = ['var(--text-primary)', 'var(--primary-blue)', 'var(--accent)','var(--neon-red)','var(--neon-orange)'];
  const color = palette[i % 5];

  // ستايل سريع ونضيف
  Object.assign(particle.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    background: color,
    borderRadius: '50%',
    left: `${x}px`,
    top: `${y}px`,
    opacity: `${opacity}`,
    boxShadow: `0 0 6px ${color}`,
    animation: `float-particle ${duration}s infinite linear`
  });

  container.appendChild(particle);

  // remove + recreate
  setTimeout(() => {
    if (particle.parentNode) particle.remove();
    createParticle(container, i + 1);
  }, duration * 1000);
}


function createMouseFollowEffect() {
    // Only create cursor effect on desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(111, 44, 235, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
        });

        // Enhanced cursor effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(3)';
                cursor.style.background = 'radial-gradient(circle, rgba(111, 44, 235, 0.1), transparent)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(111, 44, 235, 0.3), transparent)';
            });
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.borderColor = 'var(--primary-blue)';
                this.parentElement.style.boxShadow = '0 0 15px rgba(111, 44, 235, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                this.parentElement.style.boxShadow = 'none';
            });
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission (replace with your actual form handling logic)
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--primary-blue)'};
        color: var(--text-primary);
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 500;
        border-left: 4px solid ${type === 'success' ? '#16a34a' : 'var(--neon-cyan)'};
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll effects and smooth scrolling
function initializeScrollEffects() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll-based animations
    initializeScrollAnimations();
    
    // Progress bar for scroll
    createScrollProgressBar();
}

function initializeScrollAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    const animateOnScroll = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    [...skillCards, ...projectCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        scrollObserver.observe(card);
    });
}

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--accent-purple), var(--neon-cyan));
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--primary-blue);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// CV Download functionality - FIXED VERSION
function initializeCVDownload() {
    const downloadCVBtns = document.querySelectorAll('#downloadCV, .cv-download');
    
    downloadCVBtns.forEach(btn => {
        // Remove any existing event listeners to prevent duplicates
        btn.removeEventListener('click', handleCVDownload);
        
        // Add single event listener
        btn.addEventListener('click', handleCVDownload);
    });
}

function handleCVDownload(e) {
    e.preventDefault();
    downloadCV();
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'files/GamalHatabaCV.pdf'; 
    link.download = 'GamalHatabaCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show notification
    showNotification('📄 CV downloaded successfully!', 'success');
}



// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-blue) !important;
        text-shadow: 0 0 10px var(--primary-blue);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .cursor-glow {
            display: none !important;
        }
        
        .nav-menu {
            gap: 1rem;
        }
        
        .nav-link {
            padding: 0.75rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-link:last-child {
            border-bottom: none;
        }
    }
    
    .skill-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--gradient-primary);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .skill-card:hover::before {
        opacity: 0.1;
    }
    
    .project-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--gradient-primary);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: inherit;
        z-index: -1;
    }
    
    .project-card:hover::after {
        opacity: 0.05;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimizations
window.addEventListener('load', () => {
    // Preload important resources
    const importantImages = [
        'photos/profile.jpg'
    ];
    
    importantImages.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    // Initialize lazy loading for images if needed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate positions and animations on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Recreate mouse follow effect if screen size changes
    const existingCursor = document.querySelector('.cursor-glow');
    if (existingCursor) {
        existingCursor.remove();
        createMouseFollowEffect();
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
    }
    
    // Add keyboard navigation for skill cards
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        // Handle focus styles for better accessibility
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-blue)';
                element.style.outlineOffset = '2px';
            });
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
    }
    
});

// Console message for developers
console.log(`
🚀 Welcome to Gamalaldin's Portfolio!
=====================================
Built with modern web technologies:
- Vanilla JavaScript ES6+
- CSS3 with CSS Custom Properties
- HTML5 Semantic Structure
- Font Awesome Icons
- Google Fonts Integration

Features:
✅ Fully Responsive Design
✅ Smooth Animations & Transitions
✅ Interactive Particle System
✅ Progressive Enhancement
✅ Accessibility Support
✅ Performance Optimized
✅ Cross-browser Compatible

Contact: gamal.dev@email.com
Portfolio: Enhanced Mobile-First Design
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeAnimations,
        initializeContactForm,
        toggleMobileMenu,
        downloadCV,
        showNotification
    };
}