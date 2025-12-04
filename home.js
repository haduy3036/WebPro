// Counter Animation for Stats
const animateCounter = (element, target, duration = 1000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(current >= 100 ? 0 : 1);
    }, 16);
};

const statsObserverOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            const text = entry.target.textContent;
            const number = parseFloat(text);
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target, number);
        }
    });
}, statsObserverOptions);

document.querySelectorAll('.stats-number').forEach(element => {
    statsObserver.observe(element);
});

// Intersection Observer for Reveal on Scroll
const revealElements = document.querySelectorAll('.problem-card, .benefit-item, .pricing-card, .process-step, .portfolio-card, .testimonial-card, .section-title');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong vòng 24h.');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
