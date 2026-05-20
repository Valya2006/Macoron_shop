import { userSetsQueries, userSetDessertsQueries, dessertsQueries } from "../db/supabase.js";

export const getDesserts = async (prev, next) => {
  try {
    const desserts = await dessertsQueries.getLimit(prev, next)
    return desserts;

  } catch (error) {
    console.error('Ошибка в контроллере getDesserts:', error);
    throw error;

  }
}

export const getDessertsCount = async () => {
  try {
    const countDessrts = await dessertsQueries.getCont()
    return countDessrts;
  } catch (error) {
    console.error('Ошибка в контроллере getDessertsCount:', error);
    throw error;
  }
}

export const addUserToSet = async (title, price, items, userId) => {
  try {
      const isAddUser = await userSetsQueries.add({ title, price, userId}) // добавляем пользовательский набор в бд
      const { id: idUserSet } = await userSetsQueries.getSetById(userId, title) // получаем id созданного пользовательского набора
      const isSave = await saveDessertToUserSet({items, idUserSet}) // добавляем дессерты поль. набора в бд

      if (!isAddUser || !idUserSet || !isSave) {
        throw new Error
      }
      console.log('Пользовательский набор успешно добавлен')
      return true;

    } catch (error){ 
      console.error('Набор не добавлен')
      throw error;
    }

}

// сохраняем дессерты поль. набора в бд
export const saveDessertToUserSet = async ({ items, idUserSet }) => {
    try {
        const promises = items.map(async (item) => {
          const { title, quantity } = item; // получаем название и количество дессерта
          const { id: idDessert} = await dessertsQueries.getDessertByTitle(title); // получаем id дессерта

          if (!idDessert) {
              throw new Error(`Десерт "${title}" не найден`);
          }
          
          // добавляем дессерт в состав поль. набора
          return userSetDessertsQueries.add({ 
              quantity, 
              idDessert, 
              idUserSet 
          });
        });
        
        const results = await Promise.all(promises);

        const allSaved = results.every(result => result === true);
        
        if (!allSaved) {
            throw new Error('Не все десерты были добавлены');
        }
        
        console.log('Все десерты успешно добавлены');
        return true;
        
    } catch (error) {
        console.error('Ошибка:', error.message);
        throw error;
    }
};