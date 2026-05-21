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

const renderCartProducts = async () => {
 const container = document.querySelector('.main-block .cart-total')
 const data = await getCardProducts()

 console.log(data)

}

document.addEventListener('DOMContentLoaded', () => {
 renderCartProducts()
})