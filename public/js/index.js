// Главная страница логика + динамическая верстка

const getSets = async () => {
	try {
		const response = await fetch('/index/sets');
		if (!response.ok) {
			throw new Error(`Ошибка HTTP: ${response.status}`);
		}
		const sets = await response.json();
		console.log(sets)
    return sets;
	} catch (error) {
		 console.error('Ошибка получения сетов:', error);
		 console.log(error)
     throw error;
	}
}

let products = []; 
let cart = [];

async function loadProducts() {
    try {
        const data = await getSets();
        if (data && Array.isArray(data)) {
            products = data; 
            renderProducts(); 
            console.log('Загружено товаров:', products.length);
        } else {
            console.error('Некорректные данные с сервера:', data);
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
}

function loadCart() {
    const saved = localStorage.getItem('macaronCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('macaronCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountHeader = document.getElementById('cartCountHeader');
    if (cartCountHeader) {
        cartCountHeader.textContent = totalItems;
    }
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification(`${product.name} добавлен в корзину!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    if (products.length === 0) {
        grid.innerHTML = `<p style="text-align:center;color:#666;">Товары не найдены</p>`;
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="/images/${product.image_url}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-description">${product.description}</div>
                <div class="price-row">
                    <span class="price">${product.price.toLocaleString()} руб</span>
                    <div class="cart-button-wrapper">    
В корзину</button>
                </div>
            </div>
        </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const id = parseInt(btn.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) {
                addToCart(product);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    loadProducts();
    });