document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
        const top = window.scrollY + 140;
        if (section.offsetTop <= top && section.offsetTop + section.offsetHeight > top) {
            current = `#${section.getAttribute('id')}`;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current);
    });
};

const progressBar = document.querySelector('.scroll-progress');
const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const ratio = scrollable > 0 ? scrolled / scrollable : 0;
    if (progressBar) {
        progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
    }
};

window.addEventListener('scroll', () => {
    updateActiveLink();
    updateProgress();
});

updateActiveLink();
updateProgress();

const customCursor = document.querySelector('.custom-cursor');
if (customCursor) {
    const handleMouseMove = event => {
        customCursor.style.left = `${event.clientX}px`;
        customCursor.style.top = `${event.clientY}px`;
        customCursor.classList.remove('is-hidden');
    };

    const hoverTargets = document.querySelectorAll(
        'a, button, .btn, .project-card, .experience-card, .skill-category, .project-link-btn, .contact-link, .skill-tag'
    );

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => customCursor.classList.add('is-hover'));
        target.addEventListener('mouseleave', () => customCursor.classList.remove('is-hover'));
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', () => customCursor.classList.add('is-hidden'));
    window.addEventListener('mouseenter', () => customCursor.classList.remove('is-hidden'));

    document.addEventListener('mousedown', () => {
        document.documentElement.classList.add('force-hide-cursor');
    });

    document.addEventListener('mouseup', () => {
        document.documentElement.classList.remove('force-hide-cursor');
    });

    document.addEventListener('dragstart', event => {
        event.preventDefault();
    });
}

