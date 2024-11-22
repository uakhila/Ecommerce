document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayCartItems();
    updateOrderSummary();
});

let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const orderSummary = document.getElementById('orderSummary');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        orderSummary.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        orderSummary.style.display = 'block';
        cartItemsDiv.innerHTML = '<h2 class=heading>Item list</h2>';
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <div class="item">
                    <div class="card">
                        <img src="${item.image}" alt="${item.title}">
                        <h6 class="title">${item.title}</h6>
                        <h2>
                            <button onclick="decrementQuantity(${item.id})">-</button>
                            <p class="quantity"> ${item.quantity}</p>
                            <button onclick="incrementQuantity(${item.id})">+</button>
                        </h2>
                    </div>
                </div>`;
            cartItemsDiv.appendChild(productDiv);
        });
    }
}

function incrementQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
        saveCart();
        displayCartItems();
        updateOrderSummary();
    }
}

function decrementQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 0) {
        product.quantity--;
        if (product.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart();
        displayCartItems();
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const productCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipmentPrice = 10.00; // Fixed shipment price
    const totalAmount = totalPrice + shipmentPrice;

    document.getElementById('productnumber').innerText= `(${productCount})`;
    document.getElementById('productCount').innerText = `$${totalPrice.toFixed(2)}`;
    document.getElementById('shipmentPrice').innerText = `$${shipmentPrice.toFixed(2)}`;
    document.getElementById('totalAmount').innerText = `$${totalAmount.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}