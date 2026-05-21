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

const aaa = async () => {
	return await getSets()
}

aaa()

const products = [
	 { id: 1, name: "Сердце", slug: "serdtse", description: "24 штуки в коробке в виде сердца. Ассорти из 6 вкусов.", price: 2800, image: "/images/Секретная гостинная.svg" },
	 { id: 2, name: "Красота спасёт мир", slug: "krasota-spaset-mir", description: "Набор 16 шт. Вкусы: клубника-базилик, кокос, голубой сыр, парижан.", price: 750, image: "/images/Сладкая провокация.svg" },
	 { id: 3, name: "Круглый набор", slug: "kruglyy-nabor", description: "40 макаронок в круглой коробке с персональной надписью.", price: 3900, image: "/images/Цветущий сад.svg" }, 
	 { id: 4, name: "Набор на 9", slug: "nabor-na-9", description: "Набор из 9 штук в квадратной коробке. Вкусы: шоколад, фисташка, вишня.", price: 950, image: "/images/Изумрудный лес.svg" },
	 { id: 5, name: "Набор на 16", slug: "nabor-na-16", description: "Набор 16 шт. Вкусы: соленая карамель, голубой сыр, парижан, шоколад.",  price: 1500, image: "/images/Для настоящего гурмана.svg" },
	 { id: 6, name: "Сердце", slug: "serdtse-2", description: "24 штуки в коробке в виде сердца. Ассорти из 6 вкусов.", price: 2500, image: "/images/Цветущий сад.svg" }
];
console.log('Загружено товаров:', products.length);


let cart = [];

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
    const cartCountSpan = document.getElementById('cartCount');
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
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
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="price-row">
                    <span class="price">${product.price.toLocaleString()} ₽</span>
                    <button class="add-to-cart" data-id="${product.id}">В корзину</button>
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
renderProducts();
});