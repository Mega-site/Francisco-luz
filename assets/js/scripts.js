/* ============================================================
   INTERACTIVE SCRIPTS — FRANCISCO LUZ
============================================================ */

document.addEventListener('DOMContentLoaded', () => {



    // 2. Reveal Animations (Scroll Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close others
            faqItems.forEach(i => i.classList.remove('open'));
            
            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. WhatsApp Form/Link Helper (Optional)
    const waLinks = document.querySelectorAll('.btn-primary, .wa-btn-circle');
    waLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('User initiated WhatsApp contact');
        });
    });

    // 6. Testimonials Carousel Navigation
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.test-nav.prev');
    const nextBtn = document.querySelector('.test-nav.next');

    if (track && prevBtn && nextBtn) {
        // A largura do card (400px) + gap (32px) = 432px de deslocamento
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 432, behavior: 'smooth' });
        });
        
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -432, behavior: 'smooth' });
        });
    }

    // 7. Info Map Switcher
    const mapButtons = document.querySelectorAll('.btn-map-switch');
    const infoIframe = document.getElementById('info-iframe');

    if (mapButtons && infoIframe) {
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const newSrc = btn.getAttribute('data-map');
                
                // Add a small fade effect via CSS if desired, 
                // but just changing src is the direct requirement
                infoIframe.style.opacity = '0.3';
                
                setTimeout(() => {
                    infoIframe.src = newSrc;
                    infoIframe.style.opacity = '1';
                }, 300);

                // Optional: Scroll to map on mobile if buttons are far
                if (window.innerWidth < 900) {
                    infoIframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

});

/* ============================================================
   VIDEO SHOWCASE SWITCHER
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    var videoCards = document.querySelectorAll('.video-selector-card');
    var allVideos = document.querySelectorAll('.showcase-video');

    if (videoCards.length && allVideos.length) {
        for (var i = 0; i < videoCards.length; i++) {
            videoCards[i].addEventListener('click', function() {
                var videoKey = this.getAttribute('data-video');

                // Skip if already active
                if (this.classList.contains('active')) return;

                // Update active card
                for (var j = 0; j < videoCards.length; j++) {
                    videoCards[j].classList.remove('active');
                }
                this.classList.add('active');

                // Pause all videos, hide them, then show the selected one
                for (var k = 0; k < allVideos.length; k++) {
                    allVideos[k].pause();
                    allVideos[k].style.display = 'none';
                    allVideos[k].classList.remove('active');
                }

                // Find and show the matching video
                var targetVideo = document.querySelector('.showcase-video[data-video="' + videoKey + '"]');
                if (targetVideo) {
                    targetVideo.style.display = 'block';
                    targetVideo.classList.add('active');
                    targetVideo.currentTime = 0;
                    targetVideo.play().catch(function(){});
                }
            });
        }
    }
});

/* ============================================================
   FLOATING WHATSAPP BALLOON TIMEOUT
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
    var waTooltip = document.getElementById('wa-tooltip');
    if (waTooltip) {
        setTimeout(function() {
            waTooltip.classList.add('active');
        }, 3000); // 3 seconds delay

        var closeBtn = waTooltip.querySelector('.wa-tooltip-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                waTooltip.classList.remove('active');
            });
        }
    }
});
