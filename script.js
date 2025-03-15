document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const updateCounter = (counter, speed, isINRCounter) => {
        const target = +counter.getAttribute('data-target');
        let count = +counter.innerText || 0;
        let increment = target / speed;

        if (increment < 1) increment = 1; // Ensure at least 1 increment
        if (isINRCounter) increment *= 2; // Increase speed for INR counter

        const animate = () => {
            if (count < target) {
                count += increment;
                if (count > target) count = target; // Prevent overshooting
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(animate);
            } else {
                counter.innerText = target;
            }
        };

        animate();
    };

    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const speed = window.innerWidth < 768 ? 200 : +counter.getAttribute('data-speed'); // Adjust for mobile
                const isINRCounter = counter.getAttribute('data-target') == 500;
                updateCounter(counter, speed, isINRCounter);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
});

// Footer Visibility on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.copyright');
    if (!footer) return;

    const updateFooterVisibility = () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight;
        const distanceFromBottom = bodyHeight - (scrollPosition + viewportHeight);
        const shouldShow = distanceFromBottom < footer.offsetHeight + 20;

        footer.style.opacity = shouldShow ? '1' : '0';
        footer.style.transition = 'opacity 0.3s ease-in-out';
    };

    window.addEventListener('scroll', updateFooterVisibility);
    updateFooterVisibility(); // Run on page load
});

// Scroll Progress Bar
document.addEventListener('DOMContentLoaded', () => {
    const timelineBar = document.querySelector('.timeline-bar');
    if (!timelineBar) return;

    const updateProgressBar = () => {
        const scrollPosition = window.scrollY;
        const bodyHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        const progress = (scrollPosition / (bodyHeight - viewportHeight)) * 100;

        timelineBar.style.width = `${progress}%`;
        timelineBar.style.transition = 'width 0.2s ease-out';
    };

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initialize on load
});
