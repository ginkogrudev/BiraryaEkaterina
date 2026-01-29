const MENU_DATA = {
    beer: {
        title: "Cold Drafts",
        icon: "🍺",
        items: [
            { name: "Burgasko Draft", price: "4.20", desc: "The local favorite, ice cold", tags: ["Local"] },
            { name: "Bernard Lager", price: "6.50", desc: "Premium Czech unpasteurized beer", tags: ["Premium"] }
        ]
    },
    fish: {
        title: "From the Sea",
        icon: "🐟",
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
        <button onclick="scrollToCat('${key}')" class="flex flex-col items-center min-w-[70px]">
            <span class="text-2xl mb-1">${MENU_DATA[key].icon}</span>
            <span class="text-[10px] font-bold uppercase tracking-tighter text-gray-500">${key}</span>
        </button>
    `).join('');

    // 2. Build Grid
    grid.innerHTML = Object.keys(MENU_DATA).map(key => `
        <section id="${key}" class="scroll-mt-32">
            <h2 class="text-2xl font-serif italic text-blue-900 mb-4 flex items-center gap-2">
                ${MENU_DATA[key].title}
            </h2>
            <div class="space-y-4">
                ${MENU_DATA[key].items.map(item => `
                    <div class="flex justify-between items-start border-b border-dashed border-gray-200 pb-4">
                        <div class="pr-4">
                            <h4 class="font-bold text-gray-900">${item.name}</h4>
                            <p class="text-sm text-gray-500 mt-1 leading-tight">${item.desc}</p>
                            <div class="flex gap-1 mt-2">
                                ${item.tags.map(t => `<span class="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">${t}</span>`).join('')}
                            </div>
                        </div>
                        <span class="font-serif font-bold text-blue-900 whitespace-nowrap">${item.price} лв.</span>
                    </div>
                `).join('')}
            </div>
        </section>
    `).join('');
}

function scrollToCat(id) {
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

const MENU_DATA = {
    salads: { title: "Fresh Salads", icon: "🥗", items: [
        { name: "Shopska Salad", price: "9.50", desc: "Tomatoes, cucumbers, peppers, onion, and Bulgarian brine cheese." },
        { name: "Ovcharska Salad", price: "11.20", desc: "Shopska base plus ham, mushrooms, and boiled egg." }
    ]},
    appetizers: { title: "Appetizers", icon: "🍢", items: [
        { name: "Sarafovo Sprats", price: "8.90", desc: "Classic fried small fish, perfect with cold beer." },
        { name: "Grilled Halloumi", price: "12.50", desc: "Served with honey and walnuts." }
    ]},
    main_meals: { title: "Main Meals", icon: "🍽️", items: [
        { name: "Pork Knuckle", price: "22.00", desc: "Slow-roasted for 6 hours, served with potatoes." },
        { name: "Sea Bass Fillet", price: "19.50", desc: "Grilled with Mediterranean herbs and lemon." }
    ]},
    coffee: { title: "Coffee & Tea", icon: "☕", items: [
        { name: "Espresso", price: "3.20", desc: "Premium Italian roast." },
        { name: "Frappe", price: "4.50", desc: "Ice-cold whipped coffee." }
    ]},
    non_alcoholic: { title: "Soft Drinks", icon: "🥤", items: [
        { name: "Homemade Lemonade", price: "5.50", desc: "Fresh lemons, mint, and honey." },
        { name: "Mineral Water", price: "2.80", desc: "Devin / Bankia 500ml." }
    ]},
    beer: { title: "Beer", icon: "🍺", items: [
        { name: "Burgasko Draft", price: "4.20", desc: "Local favorite 500ml." },
        { name: "Staropramen", price: "5.50", desc: "Premium Czech lager." }
    ]},
    wine: { title: "Wine Selection", icon: "🍷", items: [
        { name: "Chardonnay (Glass)", price: "7.00", desc: "Local Sarafovo boutique winery." },
        { name: "Rose (Bottle)", price: "32.00", desc: "Light and fruity, perfect for the sea view." }
    ]},
    cocktails: { title: "Cocktails", icon: "🍹", items: [
        { name: "Aperol Spritz", price: "12.00", desc: "The ultimate seaside drink." },
        { name: "Mojito", price: "13.50", desc: "Fresh mint from our garden." }
    ]},
    hard_drinks: { title: "Hard Drinks", icon: "🥃", items: [
        { name: "Burgas 63 Rakia", price: "5.50", desc: "The gold standard of Bulgarian rakia." },
        { name: "Jack Daniels", price: "7.50", desc: "Classic Tennessee whiskey 50ml." }
    ]}
};

initMenu();