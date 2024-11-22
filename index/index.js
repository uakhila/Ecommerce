document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartDisplay();
  });
  document.getElementById('all').addEventListener('click', () => fetchProducts());
  document.getElementById('menBtn').addEventListener('click', () => fetchProducts('men\'s clothing'));
  document.getElementById('womenBtn').addEventListener('click', () => fetchProducts('women\'s clothing'));
  document.getElementById('electronicsBtn').addEventListener('click', () => fetchProducts('electronics'));
  document.getElementById('jeweleryBtn').addEventListener('click', () => fetchProducts('jewelery'));
  
  let cart = [];
  
  async function fetchProducts(category = '') {
    try {
        const response = await fetch(`https://fakestoreapi.com/products${category ? '/category/' + category : ''}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
  }
  
  function displayProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="item">
                <div class="card">
                    <img src="${product.image}" alt="${product.title}">
                    <h6 class="title">${product.title.substring(0, 12) + "..."}</h6>
                    <p class="desc">${product.description.substring(0, 140) + "..."}</p>
                    <span class="rate">$${product.price}</span>
                    <h2>
                    <button>Details</button>
                    <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button></h2>
                </div>
            </div>`;
        productsDiv.appendChild(productDiv);
    });
  }
  
  function addToCart(productId, title, image, price) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id: productId, title: title, image: image, price: price, quantity: 1 });
    }
    updateCartDisplay();
    saveCart();
  }
  
  function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart').innerText = `Cart (${cartCount})`;
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
  }
  
  loadCart();
  updateCartDisplay();