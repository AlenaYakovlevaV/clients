import { changeClient } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClients } from "./createModalForm.js";
import { validateContactForm } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

// Функция создания модального окна изменения клиента
export const changeClientModal = (data) => {
    const changeModal = document.createElement('div');
    const changeModalContent = document.createElement('div');
    const createForm = createClients();
    const titleId = document.createElement('span');

    changeModal.classList.add('change-modal', 'site-modal', 'modal-active');
    changeModalContent.classList.add('change-modal__content', 'site-modal__content', 'modal-active');
    titleId.classList.add('modal__id');

    titleId.textContent = 'ID: ' + data.id.substr(0, 6);
    createForm.modalTitle.textContent = 'Изменить данные';
    createForm.cancelBtn.textContent = 'Удалить клиента';

    // Возможность удаления клиента при изменении его данных
    createForm.cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const deleteModal = deleteClientModal();
        document.body.append(deleteModal.deleteModal);

        import('./clientsAPI.js').then(({ deleteClientItem }) => {
            deleteModal.modalBtnDelete.addEventListener('click', () => {
                try {
                    deleteModal.deleteSpinner.style.display = 'block';
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteModal.deleteModal.remove();
                        changeModal.remove();
                    }, 1000);
                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => {
                        deleteModal.deleteSpinner.style.display = 'none';
                    }, 1000)
                }
            });
        });
    });

    //Закрытие модального окна на кнопку закрытия
    createForm.modalClose.addEventListener('click', () => {
        changeModal.remove();
    });

    //Закрытие модального окна при клике на область за пределами модального окна
    document.addEventListener('click', (e) => {
        if (e.target == changeModal) {
            changeModal.remove();
        }
    });

    createForm.inputSurname.value = data.surname;
    createForm.inputName.value = data.name;
    createForm.inputLastname.value = data.lastName;

    for (const contact of data.contacts) {
        const createContact = createContactItem();

        createContact.contactName.textContent = contact.type;
        createContact.contactInput.value = contact.value;

        createForm.contactsBlock.prepend(createContact.contact);
        createForm.contactsBlock.style.backgroundColor = 'var(--color-athens-gray)';
    }

    if (data.contacts.length === 10) {
        createForm.addContactBtn.classList.remove('modal__btn-contact--active');
    }

    // Отправка измененных данных
    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(!validateClientForm()) {
            return;
        }

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let client = {};

        for (let i = 0; i < contactTypes.length; i++) {
            if (!validateContactForm(contactTypes[i], contactValues[i])) {
                return;
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value,
            });
        }

        client.name = createForm.inputName.value;
        client.surname = createForm.inputSurname.value;
        client.lastName = createForm.inputLastname.value;
        client.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');

        try {
            spinner.style.display = "block";
            const changeData = await changeClient(client, data.id);
            setTimeout(() => {
                document.getElementById(changeData.id).remove();
                document.querySelector('.clients__table').append(createClientItem(changeData));
                document.querySelector('.change-modal').remove();
            }, 1000);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                spinner.style.display = "none";
            }, 1000);
        }
    });

    createForm.modalTitle.append(titleId);
    changeModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
    changeModal.append(changeModalContent);

    return {
        changeModal,
        changeModalContent,
    }
}