// --- STATE MANAGEMENT ---
let cart = {}; // { itemId: { qty: 1, nameBg: "...", nameEn: "...", price: 5.50 } }
let currentLang = 'bg'; // Default language

// --- LANGUAGE LOGIC ---
function setLang(lang) {
    currentLang = lang;
    
    // Toggle Button Styles
    const btnBg = document.getElementById('btn-bg');
    const btnEn = document.getElementById('btn-en');
    
    if (lang === 'bg') {
        btnBg.classList.replace('text-gray-400', 'text-blue-900');
        btnBg.classList.replace('bg-transparent', 'bg-white');
        btnBg.classList.add('shadow-sm');
        
        btnEn.classList.replace('text-blue-900', 'text-gray-400');
        btnEn.classList.replace('bg-white', 'bg-transparent');
        btnEn.classList.remove('shadow-sm');
    } else {
        btnEn.classList.replace('text-gray-400', 'text-blue-900');
        btnEn.classList.replace('bg-transparent', 'bg-white');
        btnEn.classList.add('shadow-sm');
        
        btnBg.classList.replace('text-blue-900', 'text-gray-400');
        btnBg.classList.replace('bg-white', 'bg-transparent');
        btnBg.classList.remove('shadow-sm');
    }

    // Toggle Content Visibility
    document.querySelectorAll('.lang-bg').forEach(el => {
        el.classList.toggle('hidden', lang !== 'bg');
    });
    document.querySelectorAll('.lang-en').forEach(el => {
        el.classList.toggle('hidden', lang !== 'en');
    });

    // Update Cart UI if open
    updateCartUI();
    // Re-render modal list if open to update names
    if (!document.getElementById('cart-modal').classList.contains('hidden')) {
        renderCartItems();
    }
}

// --- CART LOGIC ---
function addToCart(btn) {
    // Traverse up to find the parent article container
    const card = btn.closest('.menu-item');
    const id = card.getAttribute('data-id');
    const price = parseFloat(card.getAttribute('data-price'));
    const category = card.getAttribute('data-category');
    
    // Scrape names from the DOM
    const nameBg = card.querySelector('.item-name-bg').innerText;
    const nameEn = card.querySelector('.item-name-en').innerText;

    if (!cart[id]) {
        cart[id] = { qty: 0, price: price, nameBg: nameBg, nameEn: nameEn, cat: category };
    }
    cart[id].qty++;
    
    updateCartUI();
    
    // Haptic Feedback
    if (navigator.vibrate) navigator.vibrate(50);
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id].qty--;
        if (cart[id].qty <= 0) delete cart[id];
        updateCartUI();
        renderCartItems(); // Re-render the list immediately
    }
}

function updateCartUI() {
    const floatBtn = document.getElementById('cart-float');
    const badge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    const totalItems = Object.values(cart).reduce((a, b) => a + b.qty, 0);
    const totalPrice = Object.values(cart).reduce((a, b) => a + (b.price * b.qty), 0);
    
    if (totalItems > 0) {
        floatBtn.classList.remove('translate-y-32');
        badge.innerText = totalItems;
        totalEl.innerText = `€${totalPrice.toFixed(2)}`;
    } else {
        floatBtn.classList.add('translate-y-32');
    }
}

function openCart() {
    if (!hasDrinks()) {
        const modal = document.getElementById('upsell-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        showFinalOrder();
    }
}

function hasDrinks() {
    return Object.values(cart).some(item => item.cat === 'drinks');
}

function jumpToDrinks() {
    document.getElementById('upsell-modal').classList.add('hidden');
    document.getElementById('upsell-modal').classList.remove('flex');
    
    const el = document.getElementById('cat-drinks');
    const navHeight = document.getElementById('main-nav').offsetHeight;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    
    window.scrollTo({top: y, behavior: 'smooth'});
}

function showFinalOrder() {
    document.getElementById('upsell-modal').classList.add('hidden');
    document.getElementById('upsell-modal').classList.remove('flex');
    
    renderCartItems();
    
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        panel.classList.remove('translate-y-full');
    }, 10);
}

function renderCartItems() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    
    let grandTotal = 0;

    Object.keys(cart).forEach(id => {
        const item = cart[id];
        const lineTotal = item.price * item.qty;
        grandTotal += lineTotal;

        // Determine which name to show based on currentLang
        const displayName = currentLang === 'bg' ? item.nameBg : item.nameEn;

        list.innerHTML += `
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div class="flex items-center gap-4">
                <div class="bg-blue-50 text-blue-900 font-bold w-8 h-8 rounded flex items-center justify-center text-sm">
                    ${item.qty}x
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 leading-tight">${displayName}</h4>
                    <span class="text-sm text-gray-500">€${item.price.toFixed(2)}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold text-lg">€${lineTotal.toFixed(2)}</span>
                <button onclick="removeFromCart('${id}')" class="text-red-400 font-bold px-2 text-xl">×</button>
            </div>
        </div>
        `;
    });

    document.getElementById('modal-total').innerText = `€${grandTotal.toFixed(2)}`;
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