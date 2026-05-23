// Корзина логика + динамическая верстка
import { getCookie, getSweetSet } from "./common.js";

const getCardProducts =  async () => {
	const userId = getCookie('userId')
	try {
		const responce = await fetch(`/api/card/${userId}`)

		if (!responce.ok) throw new Error('Ошибка получения корзины товаров')

		const data = responce.json()

		return data;
	} catch (error) {
		console.error(error.messange)
		throw error;
  }
}

let cartProduct = []

const renderCartProducts = async () => {
	const container = document.querySelector('.main-block .cart-total')
	container.innerHTML = ''
	const data = await getCardProducts()
	const lengthData = data.length
	
	data.forEach((item) => {
		const { cost, quantity, user_sets: { title } } = item
		cartProduct.push({cost, quantity, title})
		const rowCard = renderRowCard(cost, quantity, title)

		container.appendChild(rowCard)
	})

	renderQuantity(lengthData)

}

const renderRowCard = (cost, quantity, title) => {
	const row = document.createElement('div')
	row.classList.add('row-card-set')
	row.innerHTML = `
	<a href='#'>
		 <img src="./images/Пустой аватар.jpg" alt="1">
		 <div class="title-description">
        <h4>${title}</h4>
    </div>
		<div class="quantity">
        <button type="button" class="minus">-</button>
        <p class="count">${quantity}</p>
        <button type="button" class="plus">+</button>
    </div>
      <p class="total-price">${cost} руб.</p>
      <button class="delete" style="color:#999; font-size:15px;">✕</button>
	</a>
	`

	return row
}

const renderQuantity = (quantity) => {
	const p = document.querySelector('.description-block p')
	const headerP = document.querySelector('[quantity-header] p')
	console.log(headerP)
	p.innerHTML = `Товаров ${quantity}`
	headerP.innerHTML = `В корзине: ${quantity}`
}

const initQuantityControls = () => {
	document.addEventListener('click', (e) => {
		const row = e.target.closest('.row-card-set')
		const button = e.target.closest('.row-card-set button')
		
		if (button) {
			 e.preventDefault();
			 e.stopPropagation()
			updateQuantity(row, button)
			updateRowCost(row)
		}
	})
}

const updateQuantity = (row, button) => {
	const quantity = row.querySelector('.quantity .count')
	const item = parseInt(quantity.textContent)

	if (button.className === 'minus' && item > 1) {
		quantity.innerHTML = `${item - 1}`
	}
	if (button.className === 'plus') {
		quantity.innerHTML = `${item + 1}`
	}
}

const updateRowCost = (row) => {
	const totalCost = row.querySelector('.total-price')
	const title = row.querySelector('.title-description h4').textContent
	const quantity = row.querySelector('.count').textContent
	const dessert = cartProduct.find((item) => item.title === title)

	totalCost.innerHTML = `${dessert.cost * parseInt(quantity)} руб.`
}

const initDeleteRow = () => {
	document.addEventListener('click', (e) => {
		const row = e.target.closest('.row-card-set')
		const bthDelete = e.target.closest('.row-card-set .delete')

		if (bthDelete) {
			row.remove()
		}
	})
}

document.addEventListener('DOMContentLoaded', () => {
	renderCartProducts()
	initQuantityControls()
	initDeleteRow()
})

