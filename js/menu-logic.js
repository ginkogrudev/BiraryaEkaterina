const MENU_DATA = {
    lunch_special: {
        title: "Lunch  Special",
        icon: "🍽️",
        image: "",
        items: [
            { name: "Chicken Soup", price: "4.80", desc: "Creamy broth with farm chicken.", tags: ["Local"] },
            { name: "Fish Soup", price: "6.30", desc: "Fresh Black Sea catch, herbs.", tags: ["Local"] },
            { name: "Blueberry Cheesecake", price: "7.60", desc: "Classic cheesecake with berries.", tags: ["Sweat"] }
        ]
    },
    beer: {
        title: "Cold Drafts",
        icon: "🍺",
        image: "",
        items: [
            { name: "Burgasko Draft", price: "4.20", desc: "The local favorite, ice cold", tags: ["Local"] },
            { name: "Bernard Lager", price: "6.50", desc: "Premium Czech unpasteurized beer", tags: ["Premium"] }
        ]
    },
    fish: {
        title: "From the Sea",
        icon: "🐟",
        image: "",
        items: [
            { name: "Sarafovo Sprats", price: "8.90", desc: "Crispy, salty, perfect with beer", tags: ["Popular"] },
            { name: "Grilled Seabass", price: "18.50", desc: "Freshly caught, served with lemon", tags: ["Fresh"] }
        ]
    }
};

const nav = document.getElementById('category-nav');
const grid = document.getElementById('menu-grid');

function initMenu() {
    // 1. Build Navigation
    nav.innerHTML = Object.keys(MENU_DATA).map(key => `
        <button onclick="renderCategory('${key}')" class="bg-blue-900 text-white px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">${MENU_DATA[key].icon} ${MENU_DATA[key].title}</button>
    `).join('');
    
    renderCategory("lunch_special")
    // 2. Build Grid
    // grid.innerHTML = Object.keys(MENU_DATA).map(key => `
    //     <section id="${key}" class="scroll-mt-32">
    //         <h2 class="text-2xl font-serif italic text-blue-900 mb-4 flex items-center gap-2">
    //             ${MENU_DATA[key].title}
    //         </h2>
    //         <div class="space-y-4">
    //             ${MENU_DATA[key].items.map(item => `
    //                 <div class="flex justify-between items-start border-b border-dashed border-gray-200 pb-4">
    //                     <div class="pr-4">
    //                         <h4 class="font-bold text-gray-900">${item.name}</h4>
    //                         <p class="text-sm text-gray-500 mt-1 leading-tight">${item.desc}</p>
    //                         <div class="flex gap-1 mt-2">
    //                             ${item.tags.map(t => `<span class="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">${t}</span>`).join('')}
    //                         </div>
    //                     </div>
    //                     <span class="font-serif font-bold text-blue-900 whitespace-nowrap">${item.price} лв.</span>
    //                 </div>
    //             `).join('')}
    //         </div>
    //     </section>
    // `).join('');
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
    const grid = document.getElementById('menu-grid'); // Ensure your container has this ID

    grid.innerHTML = `
        <section class="animate-fadeIn">
            <div class="mb-8 text-center md:text-left">
                <h2 class="text-4xl font-serif text-blue-900 flex items-center justify-center md:justify-start gap-3">
                    <span class="text-3xl">${category.icon}</span>
                    ${category.title}
                </h2>
                <div class="h-1 w-20 bg-amber-500 mt-2 mx-auto md:mx-0"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${category.items.map(item => `
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-bold text-gray-900 text-xl">${item.name}</h4>
                                <span class="font-serif font-black text-blue-900 text-lg whitespace-nowrap">
                                    ${item.price} <span class="text-xs">лв.</span>
                                </span>
                            </div>
                            <p class="text-sm text-gray-500 leading-relaxed mb-4">${item.desc}</p>
                        </div>
                        
                        <div class="flex flex-wrap gap-2">
                            ${item.tags.map(t => `
                                <span class="text-[10px] bg-blue-50 px-2 py-1 rounded-full text-blue-600 font-bold uppercase tracking-wider">${t}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

initMenu();