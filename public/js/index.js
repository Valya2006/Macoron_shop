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