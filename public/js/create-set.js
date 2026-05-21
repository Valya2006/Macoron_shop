// Создание набора, логика + динамическая верстка
import { getCookie }from "./common.js";


// получаем общее количество дессертов с бд
const getDesserts = async (page) => {
    try {
      const response = await fetch(`/create-set/desserts?page=${page}&limit=4`);
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const desserts = await response.json();
      return desserts;
        
    } catch (error) {
        console.error('Ошибка получения десертов:', error);
        throw error;
    }
}

// добавление готовых карточек в блок
const renderProducts = async () => {
  const dessertsContainer = document.querySelector('.deserts');
	const page = document.querySelector('.page')
	const data = await getDesserts(parseInt(page.textContent))

	dessertsContainer.innerHTML = '';

	data.desserts.forEach((dessert) => {
		const { title, description, image_url, price } = dessert
		const card = renderCardProduct(title, description, image_url, price)

		dessertsContainer.appendChild(card)

		disabledBth(parseInt(page.textContent))
		
	})
}

// рендер карточек
const renderCardProduct = (title, description, imageUrl, price) => {
	const cardProduct = document.createElement('div');
	cardProduct.innerHTML = `
  <img src="/images/${imageUrl}" alt="${title}">
	<h4>${title}</h4>
	<div class='descriptionCard'><p>${description}</p></div>
	<p class='priceDesserts'>${price} руб.</p>
	<div class='addDessert' title='Добавить в набор'>+</div>
	`;
	cardProduct.classList.add('card-dessert');
	return cardProduct;

}

// управление кнопками
const disabledBth = (maxPage) => {
	const page = document.querySelector('.page');
	const prev = document.querySelector('.prev')
	const next = document.querySelector('.next')

	prev.disabled = false;
  next.disabled = false;

	if (page.textContent === maxPage) {
		next.disabled = true
		return
	} else if (page.textContent === 1 ) {
		prev.disabled = true
		return
	}
}

// слушатель на пагинацию
const initPagination = () => {
	const paginationbtn = document.querySelector('.paginationbtn')
	paginationbtn.addEventListener('click', (e) => {
		const bth = e.target.closest('button')
		handlePageChange(bth)
		return bth
	})
}

// перелистывание страниц
const handlePageChange = async (bth) => {
	const data = await getDesserts()
	const maxPage = data.maxPageDesserts
	const page = document.querySelector('.page');
	const pageInt = parseInt(page.textContent);
  
	if (bth.className === 'prev' &&  pageInt > 1) {
			page.textContent = pageInt - 1
	}
	if (bth.className === 'next' &&  pageInt < maxPage) {
			page.textContent = pageInt + 1
	}

	disabledBth(maxPage);
	renderProducts()
}

// Состалвнение набора
let currentDesserts = []

const handleSetClick = () => {
	const desserts = document.querySelector('.deserts');
	desserts.addEventListener('click', (e) => {
		const dessertsCard = e.target.closest('.card-dessert');
		const dessertObj = collectSetData(dessertsCard)
		addToSet(dessertObj)
	}
)}

// слушатель на удаление набора
const handleRemoveClick = () => {
	const setCart = document.querySelector('.set-cart');
	setCart.addEventListener('click', (e) => {
		const row = e.target.closest('.row-set')
		removeFromSet(row)
	}
)}

// сборка данных в объект
const collectSetData = (card) => {
	const path = card.querySelector('img').src.split('/')
	const image_url = decodeURIComponent(path[path.length - 1])
	const title = card.querySelector('h4').textContent
	const price = card.querySelector('.priceDesserts').textContent.split(' ')

	return {title, price: price[0], image_url, totalPrice: price[0]}
}

// добавление в массив
const addToSet = (dessert) => {
	const obj = currentDesserts.find((data) => data.title === dessert.title)
	if (!obj) {
		const objNew = {...dessert, quantity: 1}
		currentDesserts.push(objNew)
		console.log(currentDesserts)
		renderRow()
		return
	}
	obj.quantity += 1
	obj.totalPrice = parseInt(obj.totalPrice) + parseInt(obj.price)
	renderRow()
	console.log(currentDesserts)
	return
}

// рендер добавленного набора
const renderRow = () => {
	const setCart = document.querySelector('.set-cart')
  setCart.innerHTML = '';
	currentDesserts.forEach((dessert) => {
		const row = document.createElement('div')
		row.innerHTML = `
		<img src='./images/${dessert.image_url}' alt=${dessert.title}>
		<p title>${dessert.title}</p>
		<div data>
			<p count>${dessert.quantity}</p>
			<p price>${dessert.totalPrice} руб.</p>
			<button type="button" class='removeRow'>Отменить</button>
		</div>
		`
		row.classList.add('row-set')
		setCart.appendChild(row)
	})

	calcTotal()
}

// корректировка общей суммы
const calcTotal = () => {
	const totalPrice = document.querySelector('.totalPrice [price]')
	const currentTotalPrice = currentDesserts.reduce((acc, dessert) => {
		return acc + parseInt(dessert.totalPrice)
	}, 0)
	totalPrice.textContent = `${currentTotalPrice} руб.`
}

// удаление не нужного дессерта с набора
const removeFromSet = (row) => {
	const title = row.querySelector('p[title]').textContent
	currentDesserts = currentDesserts.filter((dessert) => dessert.title !== title)
	renderRow()
	console.log(currentDesserts)
}

// открываем модальное окно
const handleAddToSet = () => {
	document.addEventListener('click', (e) => {
		const addToSetBth = e.target.closest('.addToSet')
		if (addToSetBth) {
			showModal()
		}
	})
}

// показываем модальное окно
const showModal = () => {
	document.querySelector('.modal-overlay').style.display = 'flex'
	document.querySelector('.set-name-modal').style.display = 'flex'
}

// слушатель на кнопки модального окна
const handleModal = async () => {
	document.querySelector('.set-name-modal')
	.addEventListener('click', async (e) => {
		const button = e.target.closest('button')

		if (!button) return;

		if (button.className === 'addToSetCart') {
			const payload = buildSetPayload()
			await saveSet(payload)
			hideModal()
			renderProducts()
		}

		if (button.className === 'back') {
			hideModal()
		}
	})
}

// скрываем модальное окно
const hideModal = () => {
	document.querySelector('.modal-overlay').style.display = 'none';
	document.querySelector('.set-name-modal').style.display = 'none';
}

// собираем данные для отправки на сервер
const buildSetPayload = () => {
	const titleInput = document.querySelector('.set-name-modal input');
	const totalPrice = document.querySelector('.totalPrice [price]').textContent.split(' ')
  const title = titleInput.value;
  const data = {
		title,
		items: currentDesserts,
		price: parseInt(totalPrice[0]),
		isCustom: true
	}

	return data
}

// отправка на сервер
const saveSet = async (data) => {
	const userId = getCookie('userId')
	try {
		const response = await fetch(`/api/cart/add-set/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
    });

		if (response.ok) {
			console.log('набор сохранен')
			currentDesserts = []
			window.location.href = '/cart';
		} else {
        console.error('Ошибка:', response.status);
    }
	} catch (error) {
		console.log('Ошбика сохранения набора', error)

	}
}


document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initPagination();
		handleSetClick();
		handleRemoveClick();
		handleAddToSet();
		handleModal();
});


