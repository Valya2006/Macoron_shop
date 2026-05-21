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

const PRODUCTS = [
	 { id: 1, name: "Чёрная смородина с чабрецом", slug: "chernaya-smorodina-s-chabretsom", description: "Тёмно-фиолетовые (почти чёрные) макаруны с терпкой чёрной смородиной и травянистым чабрецом в начинке.", price: 300, image: "./images/Чёрная смородина с чабрецом.png" },
	 { id: 2, name: "Медовая дыня", slug: "medovaya-dinya", description: "Золотисто-жёлтые макаруны с мускусной дыней и липовым мёдом. Отлично освежает с айс-ти.", price: 300, image: "image/Медовая дыня.png" },
	 { id: 3, name: "Фисташковое облако", slug: "fistashkovoe-oblako", description: "Светло-зелёные макаруны с маслянистой фисташковой пастой внутри. Очень уютно с матча-латте.", price: 300, image: "image/Фисташковое облако.png" },
	 { id: 4, name: "Фиолетовый туман", slug: "fioletoviy-tuman", description: "Лавандово-серые крышечки. Вкус — успокаивающий, как вечер в Провансе.", price: 250, image: "image/Фиолетовый туман.png" },
	 { id: 5, name: "Утренняя карамель с солью", slug: "utrennyaya-karamel-s-solyu", description: "Тёплый беж с золотыми блёстками. Сладко-солёный баланс.", price: 300, image: "image/Утренняя карамель с солью.png" },
	 { id: 6, name: "Matcha Mystery", slug: "matcha-mystery", description: "Изумрудные макарон с японским матча. Игривое сочетание: сначала травяной, потом цитрус.", price: 200, image: "image/Matcha Mystery.png" },
	 { id: 7, name: "Дикая ежевика под звёздами", slug: "dikaya-ezhevika-pod-zvezdami", description: "Тёмно-синие (почти чёрные) макарон с фиолетовыми вкраплениями. Очень ягодно и чуть цветочно.", price: 350, image: "image/Дикая ежевика под звёздами.png" },
	 { id: 8, name: "Поцелуй Жюльетты", slug: "potseluy-zhuletti", description: "Нежно-розовые макарон с ароматом личи и лепестков розы. Очень театрально и романтично.", price: 250, image: "image/Поцелуй Жюльетты.png" },
	 { id: 9, name: "Белый трюфель и мёд", slug: "belyy-tryufel-i-med", description: "Кремово-бежевые макарон. Звучит странно, но это изысканный десерт для настоящих гурманов.", price: 300, image: "image/Белый трюфель и мёд.png" },
	 { id: 10, name: "Лавандовый сон", slug: "lavandoviy-son", description: "Нежнейшие фиолетовые макаруны с ароматом прованской лаванды и кремом из белого шоколада.", price: 200, image: "image/Лавандовый сон.png" },
	 { id: 11, name: "Солёный ирис", slug: "soleniy-iris", description: "Карамельно-бежевые макаруны с ирисовым кремом, который тянется за ложкой.", price: 250, image: "image/Солёный ирис.png" },
	 { id: 12, name: "Малиновое пике", slug: "malinovoe-pike", description: "Ярко-розовые макаруны с кисло-сладкой малиной и неожиданным уколом розового перца в начинке.", price: 250, image: "image/Малиновое пике.png" }
];

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
    console.log('База данных инициализирована:', PRODUCTS.length, 'товаров');
}
function getProducts() {
    return JSON.parse(localStorage.getItem('products'));
}

let currentPage = 1;
const ITEMS_PER_PAGE = 6;

function renderProducts() {
    const products = getProducts();
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentProducts = products.slice(start, end);
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = currentProducts.map(product => `
        <a href="/card/${product.slug}" class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/360x260?text=Macaron'">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="price-row">
                    <span class="price">${product.price} ₽</span>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">+ Добавить</button>
                </div>
            </div>
        </a>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            alert(`${name} добавлен в корзину!\nЦена: ${price} ₽`);
        });
    });
    
    renderPagination(products.length);
}

function renderPagination(total) {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const paginationDiv = document.getElementById('pagination');
    if (!paginationDiv) return;
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="paginationbtn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    paginationDiv.innerHTML = html;
    
    initPagination();
}

function initPagination() {
    const paginationBtns = document.querySelectorAll('.paginationbtn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            const page = parseInt(button.dataset.page);
            if (page && page !== currentPage) {
                currentPage = page;
                renderProducts();
            }
            document.querySelectorAll('.paginationbtn').forEach(b => {
                b.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
}
