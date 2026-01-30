const MENU_DATA = {
    lunch_special: {
        title: "Lunch  Special",
        image: "",
        items: [
            { name: "Chicken Soup", price: "4.80", desc: "Creamy broth with farm chicken", tags: ["Local"] },
            { name: "Fish Soup", price: "6.30", desc: "Fresh Black Sea catch, herbs", tags: ["Local"] }
        ]
    },
    beer: {
        title: "Cold Drafts",
        image: "",
        items: [
            { name: "Burgasko Draft", price: "4.20", desc: "The local favorite, ice cold", tags: ["Local"] },
            { name: "Bernard Lager", price: "6.50", desc: "Premium Czech unpasteurized beer", tags: ["Premium"] }
        ]
    },
    fish: {
        title: "From the Sea",
        image: "",
        items: [
            { name: "Sarafovo Sprats", price: "8.90", desc: "Crispy, salty, perfect with beer", tags: ["Popular"] },
            { name: "Grilled Seabass", price: "18.50", desc: "Freshly caught, served with lemon", tags: ["Fresh"] }
        ]
    },
    deserts: {
        title: "Deserts",
        image: "",
        items: [
            { name: "Blueberry Cheesecake", price: "7.60", desc: "Classic cheesecake with berries", tags: ["Sweat"] },
            { name: "Creme Caramel", price: "4.30", desc: "A timeless Bulgarian favorite", tags: ["Sweat"] }
        ]
    }
};

const nav = document.getElementById('category-nav');
const grid = document.getElementById('menu-grid');

function initMenu() {
    // 1. Build Navigation
    nav.innerHTML = Object.keys(MENU_DATA).map(key => `
        <button onclick="renderCategory('${key}')" 
            class="flex flex-col min-w-[120px] group active:scale-95 transition-all shrink-0">
            
            <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-sm mb-3 border-2 border-transparent group-hover:border-amber-500 transition-all bg-gray-100">
                <img src="${MENU_DATA[key].image}" 
                    alt="${MENU_DATA[key].title}" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
            </div>
            
            <div class="flex flex-col items-center">
                <span class="text-[12px] font-black uppercase tracking-wide text-blue-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
                    ${MENU_DATA[key].title}
                </span>
                <div class="h-0.5 w-0 group-hover:w-8 bg-amber-500 transition-all duration-300 mt-1"></div>
            </div>
        </button>
    `).join('');

    renderCategory("lunch_special");
}

function scrollToCategory(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 3. Simple Service Worker for Offline access
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Menu cached for offline use!');
        });
    });
}

function renderCategory(categoryKey) {
    const category = MENU_DATA[categoryKey];
    const grid = document.getElementById('menu-grid');

    grid.innerHTML = `
        <section class="animate-fadeIn">
            <div class="mb-8 text-center md:text-left px-4">
                <h2 class="text-4xl font-serif text-blue-900 flex items-center justify-center md:justify-start gap-3">
                    ${category.title}
                </h2>
                <div class="h-1 w-20 bg-amber-500 mt-2 mx-auto md:mx-0"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 pb-8">
                ${category.items.map(item => `
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden h-32 md:h-40 relative group">
                        
                        <div class="w-32 md:w-48 shrink-0 overflow-hidden bg-gray-50">
                            <img src="${item.image || 'images/placeholder-food.jpg'}" 
                                 alt="${item.name}" 
                                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                 onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop'">
                        </div>

                        <div class="flex-1 p-3 md:p-5 flex flex-col justify-between min-w-0 pr-12">
                            <div>
                                <div class="flex justify-between items-start gap-2">
                                    <h4 class="font-bold text-gray-900 text-base md:text-xl leading-tight truncate">${item.name}</h4>
                                </div>
                                <p class="text-xs md:text-sm text-gray-500 line-clamp-2 mt-1 leading-snug">${item.desc}</p>
                            </div>
                            
                            <div class="flex flex-col gap-1">
                                <span class="font-serif font-black text-blue-900 text-base md:text-lg">
                                    ${item.price} <span class="text-[10px] md:text-xs font-sans">лв.</span>
                                </span>
                                <div class="flex flex-wrap gap-1">
                                    ${item.tags.map(t => `
                                        <span class="text-[8px] md:text-[9px] bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 font-bold uppercase">${t}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <button onclick="addToCart('${item.name}', '${item.price}')" 
                            class="absolute bottom-3 right-3 bg-amber-500/10 backdrop-blur-sm text-amber-600 w-9 h-9 rounded-full shadow-sm border border-amber-500/20 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all active:scale-90 z-20">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v12m6-6H6" />
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
initMenu();