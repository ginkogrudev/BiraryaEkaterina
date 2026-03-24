document.addEventListener('DOMContentLoaded', () => {
    
    // ═══════════════════════════════════
    // 1. MOBILE MENU LOGIC
    // ═══════════════════════════════════
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            const icon = menuBtn.querySelector('i');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };

        menuBtn.addEventListener('click', toggleMenu);

        // Close when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    }

    // ═══════════════════════════════════
    // 2. BEER SCROLL TRACKER (Index Page)
    // ═══════════════════════════════════
    const beerLiquid = document.getElementById('beer-liquid');
    const beerFoam = document.getElementById('beer-foam');

    if (beerLiquid && beerFoam) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            let scrollPercent = 0;
            if (docHeight > 0) {
                scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            }
            beerLiquid.style.height = `${scrollPercent}%`;
            beerFoam.style.bottom = `${scrollPercent}%`;
        });
    }

    // ═══════════════════════════════════
    // 3. GALLERY FILTER & LIGHTBOX
    // ═══════════════════════════════════
    const btns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    if (btns.length > 0 && items.length > 0) {
        // Filter logic
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        setTimeout(() => { item.style.opacity = '1'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => { item.classList.add('hidden'); }, 300);
                    }
                });
            });
        });
    }

    if (lightbox) {
        const lbImg = document.getElementById('lightbox-img');
        const closeBtn = document.getElementById('close-lb');
        let currentIdx = 0;
        let visibleItems = [];

        const openLightbox = (index) => {
            visibleItems = Array.from(items).filter(i => !i.classList.contains('hidden'));
            currentIdx = index;
            lbImg.src = visibleItems[currentIdx].querySelector('img').src;
            lightbox.style.display = 'flex';
            void lightbox.offsetWidth; // trigger reflow
            lightbox.style.opacity = '1';
            document.body.style.overflow = 'hidden';
        };

        items.forEach((item) => {
            item.addEventListener('click', () => {
                const visibleArray = Array.from(items).filter(i => !i.classList.contains('hidden'));
                const newIdx = visibleArray.indexOf(item);
                openLightbox(newIdx);
            });
        });

        // Zoom toggle
        lbImg.addEventListener('click', (e) => {
            e.stopPropagation();
            lbImg.classList.toggle('zoomed');
        });

        // Navigation
        const nextImg = () => {
            if (visibleItems.length === 0) return;
            currentIdx = (currentIdx + 1) % visibleItems.length;
            lbImg.src = visibleItems[currentIdx].querySelector('img').src;
            lbImg.classList.remove('zoomed');
        };

        const prevImg = () => {
            if (visibleItems.length === 0) return;
            currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
            lbImg.src = visibleItems[currentIdx].querySelector('img').src;
            lbImg.classList.remove('zoomed');
        };

        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');
        if(nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImg(); });
        if(prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImg(); });

        // Close
        const closeLB = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            lbImg.classList.remove('zoomed');
        };

        if(closeBtn) closeBtn.addEventListener('click', closeLB);
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) closeLB();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') nextImg();
                if (e.key === 'ArrowLeft') prevImg();
                if (e.key === 'Escape') closeLB();
            }
        });
    }

    // ═══════════════════════════════════
    // 4. GDPR COOKIE CONSENT BANNER
    // ═══════════════════════════════════
    const cookieName = 'ekaterina_cookie_consent';
    const hasConsented = localStorage.getItem(cookieName);

    if (!hasConsented) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'fixed bottom-0 left-0 w-full z-[100] transform transition-transform duration-500 translate-y-full';
        
        banner.innerHTML = `
            <div class="bg-ocean-900/95 backdrop-blur-xl border-t border-surf-accent/30 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-gray-300 text-sm font-medium leading-relaxed md:pr-8 text-center md:text-left">
                        <strong class="text-white font-outfit text-base tracking-wide uppercase">Използваме Бисквитки 🍪</strong><br>
                        Този сайт използва бисквитки (cookies), за да анализира трафика (Google Analytics) и да подобри вашето преживяване. С натискането на "Приемам", вие се съгласявате с нашата <a href="privacy.html" class="text-surf-accent hover:underline font-bold">Политика за поверителност</a>.
                    </div>
                    <div class="flex gap-3 shrink-0 w-full md:w-auto">
                        <button id="cookie-accept" class="flex-1 md:flex-none bg-surf-accent text-ocean-900 px-6 py-3 rounded-xl font-black font-outfit uppercase tracking-wide text-sm hover:bg-amber-400 transition-colors">
                            Приемам
                        </button>
                        <button id="cookie-decline" class="flex-1 md:flex-none bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold font-outfit uppercase tracking-wide text-sm hover:bg-white/20 transition-colors">
                            Отказвам
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        setTimeout(() => { banner.classList.remove('translate-y-full'); }, 1000);

        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem(cookieName, 'accepted');
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.remove(), 500);
        });

        document.getElementById('cookie-decline').addEventListener('click', () => {
            localStorage.setItem(cookieName, 'declined');
            banner.classList.add('translate-y-full');
            setTimeout(() => banner.remove(), 500);
        });
    }
});