/* ═══════════════════════════════════════════════════════════════════════════
   Nocturne Information Security Inc. - Main JavaScript
   Interactive features, animations, form handling
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── DOM Ready ───────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initNavbar();
        initMobileNav();
        initAOS();
        initBackToTop();
        initFooterYear();
        initParticles();
        initTypewriter();
        initStatCounters();
        initContactForm();
        initSmoothScroll();
    });

    // ─── Preloader ───────────────────────────────────────────────────────────
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 500);
            }, 800);
        });

        // Fallback: hide preloader after 3 seconds max
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    if (preloader.parentNode) preloader.remove();
                }, 500);
            }
        }, 3000);
    }

    // ─── Navbar Scroll Effect ────────────────────────────────────────────────
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        function handleScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run on load
    }

    // ─── Mobile Navigation ───────────────────────────────────────────────────
    function initMobileNav() {
        const toggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (!toggle || !navLinks) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ─── AOS (Animate On Scroll) ─────────────────────────────────────────────
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 700,
                once: true,
                offset: 80,
                easing: 'ease-out-cubic',
            });
        }
    }

    // ─── Back to Top ─────────────────────────────────────────────────────────
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Footer Year ─────────────────────────────────────────────────────────
    function initFooterYear() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // ─── Floating Particles ──────────────────────────────────────────────────
    function initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    // ─── Typewriter Effect ───────────────────────────────────────────────────
    function initTypewriter() {
        const el = document.getElementById('typewriter');
        if (!el) return;

        const commands = [
            'nmap -sV --script vuln target.nocturn3.com',
            'openssl s_client -connect nocturn3.com:443',
            'nikto -h https://client-app.nocturn3.com',
            'sqlmap -u "https://target.com/?id=1" --batch',
            'gobuster dir -u https://target.com -w /usr/share/wordlists/common.txt',
            'echo "Security Assessment Complete ✓"',
            'cat /var/log/audit/security_report.log | tail -20',
        ];

        let cmdIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = commands[cmdIndex];

            if (!isDeleting) {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    setTimeout(() => { isDeleting = true; type(); }, 2000);
                    return;
                }
            } else {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    cmdIndex = (cmdIndex + 1) % commands.length;
                }
            }

            const speed = isDeleting ? 30 : 50 + Math.random() * 40;
            setTimeout(type, speed);
        }

        setTimeout(type, 1000);
    }

    // ─── Stat Counter Animation ──────────────────────────────────────────────
    function initStatCounters() {
        const stats = document.querySelectorAll('.stat-number[data-count]');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ─── Contact Form ────────────────────────────────────────────────────────
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear errors
            clearErrors();

            // Validate
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const subject = form.querySelector('#subject');
            const message = form.querySelector('#message');
            let valid = true;

            if (!name.value.trim()) {
                showError('nameError', 'Please enter your name');
                valid = false;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError('emailError', 'Please enter a valid email address');
                valid = false;
            }

            if (!subject.value) {
                showError('subjectError', 'Please select a subject');
                valid = false;
            }

            if (!message.value.trim() || message.value.trim().length < 10) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                valid = false;
            }

            if (!valid) return;

            // Submit
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

            try {
                // Construct mailto link with form data
                const mailSubject = encodeURIComponent('Website Inquiry: ' + subject.value);
                const mailBody = encodeURIComponent(
                    'Name: ' + name.value.trim() + '\n' +
                    'Email: ' + email.value.trim() + '\n' +
                    'Subject: ' + subject.value + '\n\n' +
                    'Message:\n' + message.value.trim()
                );
                
                window.location.href = 'mailto:saikat@nocturn3.com?subject=' + mailSubject + '&body=' + mailBody;

                formStatus.className = 'form-status success';
                formStatus.textContent = 'Your email client has been opened. Please click Send to deliver your message.';
                form.reset();
            } catch (err) {
                const formStatus = document.getElementById('formStatus');
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Could not open email client. Please email us directly at saikat@nocturn3.com';
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }

    function showError(id, msg) {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    }

    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        const status = document.getElementById('formStatus');
        if (status) {
            status.className = 'form-status';
            status.textContent = '';
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ─── Smooth Scroll ───────────────────────────────────────────────────────
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

})();
