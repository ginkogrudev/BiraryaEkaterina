// --- STATE ---
let cart = {}; 

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

// --- CORE ACTIONS ---
function addToCart(btn) {
    const card = btn.closest('.item-card');
    const id = card.getAttribute('data-id');
    const price = parseFloat(card.getAttribute('data-price'));
    const name = card.querySelector('.item-title').innerText.split(' <')[0]; // Clean name (remove weight span)

    if (!cart[id]) {
        cart[id] = { qty: 0, name: name, price: price };
    }
    cart[id].qty++;

    if (navigator.vibrate) navigator.vibrate(50);
    
    // Animation
    btn.style.transform = "scale(0.8)";
    setTimeout(() => btn.style.transform = "scale(1)", 150);

    updateCartUI();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id].qty--;
        if (cart[id].qty <= 0) delete cart[id];
        updateCartUI();
        renderCartItems();
    }
}

// --- UI UPDATES ---
function updateCartUI() {
    const floatBtn = document.getElementById('cart-float');
    const badge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    const totalItems = Object.values(cart).reduce((a, b) => a + b.qty, 0);
    const totalPrice = Object.values(cart).reduce((a, b) => a + (b.price * b.qty), 0);
    
    // Euro conversion for display if needed, but using Lev as base logic
    // Display logic: show Euro prominent as requested
    const totalEuro = (totalPrice / 1.95583).toFixed(2);

    if (totalItems > 0) {
        floatBtn.classList.remove('translate-y-32');
        badge.innerText = totalItems;
        totalEl.innerText = `€${totalEuro}`;
    } else {
        floatBtn.classList.add('translate-y-32');
    }
}

// --- MODAL LOGIC ---
function openCart() {
    renderCartItems();
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        panel.classList.remove('translate-y-full');
    }, 10);
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    
    modal.classList.add('opacity-0');
    panel.classList.add('translate-y-full');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function renderCartItems() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    
    let grandTotal = 0;

    if (Object.keys(cart).length === 0) {
        list.innerHTML = `<div class="text-center text-gray-400 py-10">Количката е празна</div>`;
        document.getElementById('modal-total').innerText = "€0.00";
        return;
    }

    Object.keys(cart).forEach(id => {
        const item = cart[id];
        const lineTotal = item.price * item.qty;
        grandTotal += lineTotal;
        const lineEuro = (lineTotal / 1.95583).toFixed(2);

        list.innerHTML += `
        <div class="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm mb-2 border border-gray-100">
            <div class="flex items-center gap-3">
                <div class="bg-blue-50 text-blue-900 font-bold w-8 h-8 rounded flex items-center justify-center text-sm border border-blue-100">
                    ${item.qty}x
                </div>
                <div>
                    <h4 class="font-bold text-gray-800 text-sm leading-tight">${item.name}</h4>
                    <span class="text-xs text-gray-400">${(item.price / 1.95583).toFixed(2)}€ / бр.</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="font-black text-blue-900">€${lineEuro}</span>
                <button onclick="removeFromCart('${id}')" class="text-red-500 w-8 h-8 flex items-center justify-center font-bold text-xl bg-red-50 rounded-full hover:bg-red-100">
                    −
                </button>
            </div>
        </div>
        `;
    });

    const grandEuro = (grandTotal / 1.95583).toFixed(2);
    document.getElementById('modal-total').innerText = `€${grandEuro}`;
}