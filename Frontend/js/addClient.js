import { createClient } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";
import { createClients } from "./createModalForm.js"
import { validateContactForm } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";

// Функция создания модального окна для добавления клиента
export const addClientModal = () => {
    const createForm = createClients();
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.classList.add('modal', 'site-modal', 'modal-active');
    modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
    createForm.form.classList.add('add-client');

    modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);
    modal.append(modalContent);

    // Отправка данных из формы добавления клиента
    createForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const contactTypes = document.querySelectorAll('.contact__name');
        const contactValues = document.querySelectorAll('.contact__input');
        let contacts = [];
        let clientObj = {};
        
        if(!validateClientForm()) {
            return;
        }

        for (let i = 0; i < contactTypes.length; i++)  {
            if (!validateContactForm(contactTypes[i], contactValues[i])) {
                return;
            }
            contacts.push({
                type: contactTypes[i].innerHTML,
                value: contactValues[i].value,
            });
        };

        clientObj.name = createForm.inputName.value;
        clientObj.surname = createForm.inputSurname.value;
        clientObj.lastName = createForm.inputLastname.value;
        clientObj.contacts = contacts;

        const spinner = document.querySelector('.modal__spinner');

        try {
            spinner.style.display = "block";
            const data = await createClient(clientObj);
            setTimeout(() => {
                document.querySelector('.clients__table').append(createClientItem(data));
                document.querySelector('.modal').remove();
            }, 1000);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                spinner.style.display = "none";
            }, 1000);
        }
        
    })

    createForm.modalClose.addEventListener('click', () => {
        modal.remove();
    })

    document.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.remove();
        }
    });

    return modal;
}