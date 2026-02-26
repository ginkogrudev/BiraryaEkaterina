const menuData = [
    { id: 1, category: 'beer', name: 'Draft Bulgarian Lager', price: '4.50 BGN', desc: 'Ice cold, local brew.' },
    { id: 2, category: 'food', name: 'Fresh Fried Sprats (Tsatsa)', price: '8.90 BGN', desc: 'The classic seaside snack.' },
    { id: 3, category: 'coffee', name: 'Espresso', price: '3.00 BGN', desc: 'Premium Arabica with a view.' },
    { id: 4, category: 'food', name: 'Shopska Salad', price: '9.50 BGN', desc: 'Traditional Bulgarian salad.' }
];

// --- MOBILE MENU TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        // Toggle Menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    }
});

const container = document.getElementById('menu-container');

function filterMenu(category) {
    // Update Tab UI
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
        if(tab.innerText.toLowerCase() === category) tab.classList.add('active');
    });

    // Filter Logic
    const filtered = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    renderMenu(filtered);
}

function renderMenu(items) {
    container.innerHTML = items.map(item => `
        <div class="menu-item bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
                <h3 class="font-bold text-lg text-blue-900">${item.name}</h3>
                <p class="text-sm text-gray-500">${item.desc}</p>
            </div>
            <div class="font-bold text-amber-600">${item.price}</div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOBILE MENU LOGIC ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const banner = document.getElementById('promo-banner');

    if (menuBtn && mobileMenu) {
        // Toggle Function
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

        // Click Events
        menuBtn.addEventListener('click', toggleMenu);

        // Close on Link Click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });

        // Close on Click Outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    }

    // --- 2. SMART NAV POSITIONING (Fixes the Gap) ---
    const adjustNavPosition = () => {
        if (!banner || !navbar) return;
        
        const bannerHeight = banner.getBoundingClientRect().height;
        const scrollY = window.scrollY;

        // If we are at the very top, push nav down by banner height
        // If we scroll down even 1px, snap nav to top (0px)
        if (scrollY > 0) {
            navbar.style.top = '0px';
        } else {
            navbar.style.top = `${bannerHeight}px`;
        }
    };

    // Run on Scroll and Resize
    window.addEventListener('scroll', adjustNavPosition);
    window.addEventListener('resize', adjustNavPosition);
    
    // Initial Calc
    adjustNavPosition();
});

// Initial Load
window.addEventListener('DOMContentLoaded', () => renderMenu(menuData));

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    
    // Optional: Prevent scrolling when menu is open
    // document.body.classList.toggle('overflow-hidden');
}

// Close mobile menu when clicking outside (UX Upgrade)
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    const nav = document.getElementById('navbar');
    
    // If click is outside nav and menu is NOT hidden
    if (!nav.contains(e.target) && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});