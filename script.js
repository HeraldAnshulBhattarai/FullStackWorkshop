// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuButton = document.getElementById('menu-button');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    // Toggle the 'open' class to show/hide menu
    navLinks.classList.toggle('open');
    
    // Update ARIA attribute for accessibility
    const isExpanded = navLinks.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded);
    
    // Change icon between hamburger and close (X)
    menuButton.innerHTML = isExpanded ? '✕' : '☰';
}

// Add click event to menu button
menuButton.addEventListener('click', toggleMenu);

// Close menu when clicking on a navigation link (mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ============================================
// FORM SUBMISSION HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

if (contactForm && messageDiv) {
    contactForm.addEventListener('submit', function(event) {
        // Prevent default form submission (page refresh)
        event.preventDefault();
        
        // Get form values
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();
        
        // Validate form fields
        if (nameInput === '' || emailInput === '' || messageInput === '') {
            // Show error message
            messageDiv.textContent = 'Please fill out all required fields.';
            messageDiv.style.background = '#ffe6e6';
            messageDiv.style.color = '#c30000';
            messageDiv.classList.add('show');
        } else {
            // Show success message
            messageDiv.textContent = 'Thank you for your message! I will be in touch shortly.';
            messageDiv.style.background = '#e6ffe6';
            messageDiv.style.color = '#008000';
            messageDiv.classList.add('show');
            
            // Reset form fields
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 5000);
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Set initial state
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            // Animate after short delay
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill items for animation
document.querySelectorAll('.project-card, .skill-item').forEach(card => {
    observer.observe(card);
});
```

---

