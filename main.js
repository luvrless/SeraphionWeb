// Download Panel Logic
const downloadTrigger = document.getElementById('download-trigger');
const downloadModal = document.getElementById('download-modal');
const closeModal = document.getElementById('close-modal');
const finalDownload = document.getElementById('final-download');

if (downloadTrigger && downloadModal) {
    downloadTrigger.addEventListener('click', () => {
        downloadModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeHandler() {
    downloadModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeModal) {
    closeModal.addEventListener('click', closeHandler);
}

if (downloadModal) {
    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) closeHandler();
    });
}

if (finalDownload) {
    finalDownload.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'https://www.dropbox.com/scl/fi/8snhhynwg8pi1lvbqtvts/SeraphionV2.zip?rlkey=fc5mdbniyswsbv5h7ex0fcqtv&st=zl1lcpln&dl=1';
        link.click();
        
        // Brief delay before closing to show interaction
        setTimeout(closeHandler, 300);
    });
}

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.padding = '6px 20px';
        nav.style.maxWidth = '900px';
    } else {
        nav.style.padding = '8px 30px';
        nav.style.maxWidth = '1100px';
    }
});

const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', x + '%');
    document.documentElement.style.setProperty('--mouse-y', y + '%');
});

const tiltTarget = document.getElementById('tilt-target');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let slideInterval;

function startImageTimer() {
    stopTimers();
    if (!slides[currentSlide].querySelector('video')) {
        slideInterval = setTimeout(() => updateSlides(currentSlide + 1), 6000);
    }
}

function stopTimers() {
    if (slideInterval) clearTimeout(slideInterval);
}

function updateSlides(index) {
    stopTimers();
    slides.forEach(slide => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    const currentVideo = slides[currentSlide].querySelector('video');
    if (currentVideo) {
        currentVideo.play();
    } else {
        startImageTimer();
    }
}

slides.forEach((slide, i) => {
    const video = slide.querySelector('video');
    if (video) {
        video.loop = false;
        video.onended = () => updateSlides(currentSlide + 1);
    }
});

if (prevBtn) prevBtn.addEventListener('click', () => updateSlides(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => updateSlides(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => updateSlides(i)));

startImageTimer();

if (tiltTarget) {
    const frame = tiltTarget.querySelector('.preview-frame');
    tiltTarget.addEventListener('mousemove', (e) => {
        const rect = tiltTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 40; 
        const rotateY = (x - centerX) / 40;
        frame.style.transform = `rotateX(${8 + rotateX}deg) rotateY(${rotateY}deg)`;
    });
    tiltTarget.addEventListener('mouseleave', () => {
        frame.style.transform = 'rotateX(8deg) rotateY(0deg)';
    });
}

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-in, .animate-scroll').forEach(el => observer.observe(el));

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});
