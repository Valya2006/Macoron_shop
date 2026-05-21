export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const getSweetSet = async (id) => {
	try {
		const response = fetch(`/api/set/${id}`)

		if (!response.ok) {
			throw new Error('Ошибка получения набора')
		}

		const data = (await response).json()

		return data

	} catch (error) {
		console.log(error)
	}
}