const menuData = [
    { id: 1, category: 'beer', name: 'Draft Bulgarian Lager', price: '4.50 BGN', desc: 'Ice cold, local brew.' },
    { id: 2, category: 'food', name: 'Fresh Fried Sprats (Tsatsa)', price: '8.90 BGN', desc: 'The classic seaside snack.' },
    { id: 3, category: 'coffee', name: 'Espresso', price: '3.00 BGN', desc: 'Premium Arabica with a view.' },
    { id: 4, category: 'food', name: 'Shopska Salad', price: '9.50 BGN', desc: 'Traditional Bulgarian salad.' }
];

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

// Initial Load
window.addEventListener('DOMContentLoaded', () => renderMenu(menuData));