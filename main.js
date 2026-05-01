// ─── INIT ─────────────────────────────────────────────
function initAll() {
    initScrollProgress();
    initStickyHeader();
    initParticles();
    initTypewriter();
    initReveal();
    initCounters();
    initTiltCards();
    initGiftBox();
    initForms();
    initHamburger();
    initMagneticButtons();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}


// ─── SCROLL PROGRESS ──────────────────────────────────
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    });
}

// ─── STICKY HEADER ────────────────────────────────────
function initStickyHeader() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ─── GRAIN CANVAS ─────────────────────────────────────
function initGrainCanvas() {
    const canvas = document.getElementById('grain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const draw = () => {
        const img = ctx.createImageData(w, h);
        for (let i = 0; i < img.data.length; i += 4) {
            const v = Math.random() * 255;
            img.data[i] = img.data[i+1] = img.data[i+2] = v;
            img.data[i+3] = 255;
        }
        ctx.putImageData(img, 0, 0);
        requestAnimationFrame(draw);
    };
    draw();
}

// ─── FLOATING PARTICLES ───────────────────────────────
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:absolute; border-radius:50%;
            width:${Math.random()*6+2}px; height:${Math.random()*6+2}px;
            background:rgba(${Math.random()>0.5?'46,125,50':'245,197,24'},${Math.random()*0.5+0.1});
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation:float ${Math.random()*6+4}s ease-in-out ${Math.random()*4}s infinite alternate;
        `;
        container.appendChild(p);
    }
}

// ─── TYPEWRITER ───────────────────────────────────────
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = ['One Grain at a Time.', 'For Every Family.', 'For a Healthier India.'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
        const word = words[wi];
        el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
        if (!deleting && ci > word.length) { setTimeout(() => { deleting = true; }, 1800); }
        else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
        setTimeout(type, deleting ? 60 : 110);
    };
    setTimeout(type, 1200);
}

// ─── SCROLL REVEAL ────────────────────────────────────
function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); } });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
}

// ─── COUNTER ANIMATION ────────────────────────────────
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.dataset.target;
            let current = 0;
            const step = target / 60;
            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current);
                if (current < target) requestAnimationFrame(tick);
            };
            tick();
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
}

// ─── 3D TILT CARDS ────────────────────────────────────
function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ─── GIFT BOX ─────────────────────────────────────────
function initGiftBox() {
    const box = document.getElementById('snack-gift');
    const msg = document.getElementById('gift-msg');
    if (!box || !msg) return;
    let opened = false;
    box.addEventListener('click', () => {
        opened = !opened;
        box.classList.toggle('open', opened);
        msg.classList.toggle('visible', opened);
        if (opened) spawnConfetti();
    });
}

function spawnConfetti() {
    const container = document.getElementById('gift-particles');
    if (!container) return;
    const colors = ['#f5c518','#2e7d32','#ff6b6b','#74c0fc','#ffffff'];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        const color = colors[Math.floor(Math.random()*colors.length)];
        p.style.cssText = `
            position:absolute; width:8px; height:8px;
            background:${color}; border-radius:${Math.random()>0.5?'50%':'2px'};
            left:50%; top:50%;
            animation:confettiFly 1.2s ease-out ${Math.random()*0.4}s forwards;
            --tx:${(Math.random()-0.5)*300}px; --ty:${-(Math.random()*300+100)}px;
        `;
        container.appendChild(p);
        setTimeout(() => p.remove(), 1600);
    }
}

// Add confetti keyframe dynamically
const style = document.createElement('style');
style.textContent = `@keyframes confettiFly { to { transform:translate(var(--tx), var(--ty)) rotate(720deg); opacity:0; } }`;
document.head.appendChild(style);

// ─── FORMS ────────────────────────────────────────────
function initForms() {
    const teaserForm = document.getElementById('teaser-form');
    if (teaserForm) {
        teaserForm.addEventListener('submit', e => {
            e.preventDefault();
            document.getElementById('teaser-success').classList.add('show');
            teaserForm.reset();
        });
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            document.getElementById('form-success').classList.add('show');
            contactForm.reset();
        });
    }
}

// ─── HAMBURGER ────────────────────────────────────────
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => { menu.style.display = 'none'; });
    });
}

// ─── MAGNETIC BUTTONS ─────────────────────────────────
function initMagneticButtons() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) * 0.3;
            const y = (e.clientY - rect.top - rect.height/2) * 0.3;
            btn.style.transform = `translate(${x}px,${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}


// ─── SMOOTH SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
