export const validateClientForm = () => {
    const clientSurname = document.getElementById('floatingSurname');
    const clientName = document.getElementById('floatingName');
    const clientLastname = document.getElementById('floatingLastname');
    const unacceptableLetter = document.getElementById('unacceptableLetter');
    const emptySurname = document.getElementById('emptySurname');
    const emptyName = document.getElementById('emptyName');
    const emptyLastname = document.getElementById('emptyLastname');
    const emptyValue = document.getElementById('emptyValue');
    // const emptyContacts = document.getElementById('emptyContacts');
    const validateArr = [unacceptableLetter, emptySurname, emptyName, emptyLastname, emptyValue];
    const language = /[^а-яА-ЯёЁ]+$/g;

    const onInputValue = (input) => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            for (const item of validateArr) {
                item.textContent = '';
            }
        });

        input.oncut = input.oncopy = input.onpast = () => {
            input.style.borderColor = 'var(--color-gray-suit)';
            for (const item of validateArr) {
                item.textContent = '';
            }
        }

        input.onchange = () => {
            input.style.borderColor = 'var(--color-gray-suit)';

            if (clientSurname.value && clientName.value && clientLastname.value) {
                for (const item of validateArr) {
                    item.textContent = '';
                }
            }
        }
    }

    onInputValue(clientSurname);
    onInputValue(clientName);
    onInputValue(clientLastname);

    const checkEmptyName = (input, message, name) => {
        if (!input.value) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            message.textContent = `Введите ${name} клиента`;
            return false;
        } else {
            message.textContent = '';
        }

        return true;
    }

    const checkByLanguage = (input, language) => {
        if (language.test(input.value)) {
            input.style.borderColor = 'var(--color-burnt-sienna)';
            unacceptableLetter.textContent = `Недопустимые символы`;
            return false;
        }

        return true;
    }

    if (!checkEmptyName(clientSurname, emptySurname, 'фамилию')) {
        return false;
    }

    if (!checkEmptyName(clientName, emptyName, 'имя')) {
        return false;
    }

    // if (!checkEmptyName(clientLastname, emptyLastname, 'отчество')) {
    //     return false;
    // }

    if (!checkByLanguage(clientSurname, language)) {
        return false;
    }

    if (!checkByLanguage(clientName, language)) {
        return false;
    }

    if (!checkByLanguage(clientLastname, language)) {
        return false;
    }

    return true;
}