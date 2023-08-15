export const validateContactForm = (type, value) => {
    const emptyValue = document.getElementById('emptySurname');
    const onlyNumbers = /[^0-9]+$/g;
    const onlyEnglish = /[^a-zA-Z|@|.]+$/g;

    const onInputValue = (input) => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            emptyValue.textContent = '';
        });

        input.oncut = input.oncopy = input.onpast = () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            emptyValue.textContent = '';
        }
    }

    const showError = (message, block, input) => {
        block.textContent = message;
        input.style.borderColor = 'var(--color-burnt-sienna)';
    }

    onInputValue(value);

    if(!value.value) {
        showError('Не заполнены поля контактов', emptyValue, value);
        return false;
    }

    switch (type.innerHTML) {
        case 'Телефон':
            if (onlyNumbers.test(value.value)) {
                showError('Допустимы только цифры', emptyValue, value);
                return false;
            } else if (value.value.length !== 11) {
                showError('Телефон должен содержать 11 цифр', emptyValue, value);
                return false;
            }
            return true;
        case 'Доп. телефон':
            if (onlyNumbers.test(value.value)) {
                showError('Допустимы только цифры', emptyValue, value);
                return false;
            } else if (value.value.length !== 11) {
                showError('Телефон должен содержать 11 цифр', emptyValue, value);
                return false;
            }
            return true;
        case 'Email':
            if (onlyEnglish.test(value.value)) {
                showError('Email может содержать только буквы латинского алфавита, цифры, "@", "."', emptyValue, value);
                return false;
            }
            return true;
        default:
            return true;
    }
}