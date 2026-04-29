document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════
    // 1. MOBILE NAV
    // ═══════════════════════════════════
    const menuBtn    = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const icon = menuBtn.querySelector('i');

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            icon.classList.replace('fa-times', 'fa-bars');
        };

        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                closeMenu();
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // ═══════════════════════════════════
    // 2. GALLERY — filter + lightbox
    //    (no-ops silently on other pages)
    // ═══════════════════════════════════
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox     = document.getElementById('lightbox');

    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                galleryItems.forEach(item => {
                    const match = filter === 'all' || item.dataset.category === filter;
                    if (match) {
                        item.classList.remove('hidden');
                        requestAnimationFrame(() => { item.style.opacity = '1'; });
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.classList.add('hidden'), 300);
                    }
                });
            });
        });
    }

    if (lightbox) {
        const lbImg    = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lb');
        const nextBtn  = document.getElementById('next');
        const prevBtn  = document.getElementById('prev');
        let currentIdx   = 0;
        let visibleItems = [];

        const getVisible = () =>
            Array.from(galleryItems).filter(
                i => !i.classList.contains('hidden') && i.querySelector('img')
            );

        const openLightbox = (idx) => {
            visibleItems = getVisible();
            if (!visibleItems.length) return;
            currentIdx = idx;
            lbImg.src = visibleItems[currentIdx].querySelector('img').src;
            lightbox.style.display = 'flex';
            void lightbox.offsetWidth;
            lightbox.style.opacity = '1';
            document.body.style.overflow = 'hidden';
        };

        const closeLB = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            lbImg.classList.remove('zoomed');
        };

        const navigate = (dir) => {
            if (!visibleItems.length) return;
            currentIdx = (currentIdx + dir + visibleItems.length) % visibleItems.length;
            lbImg.src = visibleItems[currentIdx].querySelector('img').src;
            lbImg.classList.remove('zoomed');
        };

        galleryItems.forEach(item => {
            if (!item.querySelector('img')) return;
            item.addEventListener('click', () => {
                const visible = getVisible();
                openLightbox(visible.indexOf(item));
            });
        });

        lbImg.addEventListener('click',  (e) => { e.stopPropagation(); lbImg.classList.toggle('zoomed'); });
        if (nextBtn)  nextBtn.addEventListener('click',  (e) => { e.stopPropagation(); navigate(+1); });
        if (prevBtn)  prevBtn.addEventListener('click',  (e) => { e.stopPropagation(); navigate(-1); });
        if (closeBtn) closeBtn.addEventListener('click', closeLB);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display !== 'flex') return;
            if (e.key === 'ArrowRight') navigate(+1);
            if (e.key === 'ArrowLeft')  navigate(-1);
            if (e.key === 'Escape')     closeLB();
        });
    }

    // ═══════════════════════════════════
    // 3. GDPR COOKIE CONSENT
    //
    //    Single source of truth — runs on every page.
    //    Key    : 'ek_cookie_consent'
    //    Values : 'accepted' | 'declined' | null (first visit → show banner)
    //
    //    First visit  → banner slides up after 1s
    //    Accept       → gtag consent update + loadGA4() fired
    //    Decline      → stored, banner gone, GA4 stays off forever
    //    Return visit → <head> inline script already applied consent,
    //                   localStorage is set, so this block is skipped entirely
    // ═══════════════════════════════════
    const CONSENT_KEY = 'ek_cookie_consent';

    if (!localStorage.getItem(CONSENT_KEY)) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'fixed bottom-0 left-0 w-full z-[9999] transform transition-transform duration-500 translate-y-full';

        banner.innerHTML = `
            <div style="background:rgba(10,26,36,0.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(245,166,35,0.25);box-shadow:0 -10px 40px rgba(0,0,0,0.5);"
                 class="p-4 md:p-6">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-gray-300 text-sm font-medium leading-relaxed md:pr-8 text-center md:text-left">
                        <strong class="text-white font-outfit text-base tracking-wide uppercase">Използваме Бисквитки 🍪</strong><br>
                        Използваме Google Analytics, за да разберем как гостите ни намират. Без вашето съгласие не стартираме никакво проследяване.
                        <a href="privacy.html" class="text-surf-accent hover:underline font-bold ml-1">Политика за поверителност →</a>
                    </div>
                    <div class="flex gap-3 shrink-0 w-full md:w-auto">
                        <button id="cookie-decline"
                                class="flex-1 md:flex-none border border-white/20 text-gray-400 px-6 py-3 rounded-xl font-bold font-outfit uppercase tracking-wide text-sm hover:bg-white/10 transition-colors">
                            Отказвам
                        </button>
                        <button id="cookie-accept"
                                class="flex-1 md:flex-none bg-surf-accent text-ocean-900 px-6 py-3 rounded-xl font-black font-outfit uppercase tracking-wide text-sm hover:bg-amber-400 transition-colors"
                                style="box-shadow:0 0 15px rgba(245,166,35,0.3);">
                            Приемам
                        </button>
                    </div>
                </div>
            </div>`;

        document.body.appendChild(banner);
        setTimeout(() => banner.classList.remove('translate-y-full'), 1000);

        const dismiss = (choice) => {
            localStorage.setItem(CONSENT_KEY, choice);
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.remove(), 500);
        };

        document.getElementById('cookie-accept').addEventListener('click', () => {
            dismiss('accepted');
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    analytics_storage:  'granted',
                    ad_storage:         'granted',
                    ad_user_data:       'granted',
                    ad_personalization: 'granted',
                });
            }
            if (typeof loadGA4 === 'function') loadGA4();
        });

        document.getElementById('cookie-decline').addEventListener('click', () => {
            dismiss('declined');
        });
    }

});