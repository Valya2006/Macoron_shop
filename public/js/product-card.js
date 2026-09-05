// Карточка товара логика + динамическая верстка
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
async function loadProduct() {
    try {
        const response = await fetch('/index/sets');
        if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
        }
        const products = await response.json();
        const product = products.find(p => p.id === productId);
        if (!product) {
            document.getElementById('product-details').innerHTML = '<p>Товар не найден</p>';
            return;
        }
        
        document.getElementById('product-title').textContent = product.title;
        
        const image = document.getElementById('product-image');
        image.src = `/images/${product.image_url}`;
        image.style.display = 'block';
        document.getElementById('product-description').textContent = product.description || 'Описание отсутствует';
        document.getElementById('product-price').textContent = `${product.price.toLocaleString()} руб`;
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.dataset.id = product.id;
        addToCartBtn.addEventListener('click', function() {
            console.log('Товар добавлен в корзину:', product);
        });
        
    } catch (error) {
        console.error('Ошибка загрузки товара:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProduct);