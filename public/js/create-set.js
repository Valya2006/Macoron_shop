// Создание набора, логика + динамическая верстка
const getDesserts = async () => {
    try {
      const response = await fetch('/create-set/desserts');
      if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const desserts = await response.json();
      return desserts;
        
    } catch (error) {
        console.error('Ошибка получения десертов:', error);
        throw error;
    }
};


const renderProducts = async () => {
  const desertsContainer = document.querySelector('.deserts');
	const desserts = await getDesserts()

	desserts.forEach((dessert) => {
		const { title, description, image_url, price } = dessert
		const card = renderCardProduct(title, description, image_url, price)

		desertsContainer.appendChild(card)
		
	});
	console.log(desserts)
}

const renderCardProduct = (title, description, imageUrl, price) => {
	const cardProduct = document.createElement('div');
	cardProduct.innerHTML = `
  <img src="/images/${imageUrl}" alt="${title}">
	<h4>${title}</h4>
	<div class='descriptionCard'><p>${description}</p></div>
	<p class='priceDesserts'>${price} руб.</p>
	<div class='addDessert'>+</div>
	`
	cardProduct.classList.add('card-dessert');
	return cardProduct;

}

renderProducts()



