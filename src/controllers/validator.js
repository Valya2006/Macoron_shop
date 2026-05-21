export const validator = {
	validatorUser: (user) => {
		const { name, phone, password, email } = user;
		
		const error = [];
		if (name.length < 2) {
			error.push('ФИО должно иметь более 2 символов')
		}
		if (!(/^(\+7|8)[0-9]{10}$/.test(phone))) {
			error.push('Неправильный формат номера')
		}
		if (password.length < 4) {
			error.push('Пароль должен иметь от 4 символов')
		}
		if (!(/^[^\s@]+@(gmail\.com|mail\.ru|yandex\.ru)$/i.test(email))) {
			error.push('Неправильный формат email')
		}

		return error;
	}
}