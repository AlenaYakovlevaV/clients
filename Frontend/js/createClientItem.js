import { changeClientModal } from "./changeClient.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createContactItemType, formatDate, formatTime } from "./format.js";
import { svgSpinner } from "./svg.js";

// Функция отрисовки строки клиента
export const createClientItem = (data) => {
    const clientTr = document.createElement('tr');
    const clientIdTd = document.createElement('td');
    const clientId = document.createElement('span');
    const clientFio = document.createElement('td');
    const clientName = document.createElement('span');
    const clientSurname = document.createElement('span');
    const clientLastname = document.createElement('span');
    const clientCreateAt = document.createElement('td');
    const clientUpdateAt = document.createElement('td');
    const clientCreateDate = document.createElement('span');
    const clientCreateTime = document.createElement('span');
    const clientUpdateDate = document.createElement('span');
    const clientUpdateTime = document.createElement('span');
    const clientContacts = document.createElement('td');
    const clientActions = document.createElement('td');
    const clientActionChange = document.createElement('button');
    const clientActionDelete = document.createElement('button');
    const deleteClient = deleteClientModal();
    const changeClient = changeClientModal(data);
    const changeSpinner = document.createElement('span');
    const deleteSpinner = document.createElement('span');
    const shortContacts = document.createElement('span');

    clientTr.classList.add('client__item');
    clientTr.id = data.id;
    clientIdTd.classList.add('client__id');
    clientFio.classList.add('client__fio');
    clientName.classList.add('client__name');
    clientSurname.classList.add('client__surname');
    clientLastname.classList.add('client__lastname');
    clientCreateAt.classList.add('client__create');
    clientUpdateAt.classList.add('client__update');
    clientCreateDate.classList.add('create__date');
    clientCreateTime.classList.add('create__time');
    clientUpdateDate.classList.add('update__date');
    clientUpdateTime.classList.add('update__time');
    clientContacts.classList.add('client__contacts');
    clientActions.classList.add('client__actions');
    clientActionChange.classList.add('client__change', 'btn-reset');
    clientActionDelete.classList.add('client__delete', 'btn-reset');
    changeSpinner.classList.add('actions__spinner');
    deleteSpinner.classList.add('actions__spinner');
    shortContacts.classList.add('client__contact-short');

    // Отображение контактов клиента
    if (data.contacts.length <= 5) {
        for (const contact of data.contacts) {
            createContactItemType(contact.type, contact.value, clientContacts);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            createContactItemType(data.contacts[i].type, data.contacts[i].value, clientContacts);
            shortContacts.style.display = 'flex';
            shortContacts.textContent = `+${data.contacts.length - 4}`;
        }
    }

    // Отображение скрытых контактов клиента
    shortContacts.addEventListener('click', () => {
        clientContacts.innerHTML = '';
        for (const contact of data.contacts) {
            createContactItemType(contact.type, contact.value, clientContacts);
            shortContacts.style.display = 'none';
        }
    })   

    // Удаление клиента
    const deleteById = () => {
        import('./clientsAPI.js').then(({ deleteClientItem }) => {
            deleteClient.modalBtnDelete.addEventListener('click', () => {
                try {
                    deleteClient.deleteSpinner.style.display = 'block';
                    setTimeout(() => {
                        deleteClientItem(data.id);
                        document.getElementById(data.id).remove();
                        deleteClient.deleteModal.remove();
                    }, 1000);
                } catch (error) {
                    console.log(error);
                } finally {
                    setTimeout(() => {
                        deleteClient.deleteSpinner.style.display = 'none';
                    }, 1000)
                }
            })
        });
    }

    // Событие нажатия на кнопку удаления клиента
    clientActionDelete.addEventListener('click', () => {
        deleteSpinner.style.display = 'block';
        clientActionDelete.classList.add('action-wait');
        setTimeout(() => {
            deleteById();
            document.body.append(deleteClient.deleteModal);
            deleteSpinner.style.display = 'none';
            clientActionDelete.classList.remove('action-wait');
        }, 1000);
    });

    // Событие нажатия на кнопку изменения клиента
    clientActionChange.addEventListener('click', () => {
        changeSpinner.style.display = 'block';
        clientActionChange.classList.add('action-wait');
        setTimeout(() => {
            document.body.append(changeClient.changeModal);
            changeSpinner.style.display = 'none';
            clientActionChange.classList.remove('action-wait');
        }, 1000);
    })

    // clientId.textContent = data.id.substr(0, 6);
    clientId.textContent = data.id.substr(7, 6);
    clientName.textContent = data.name;
    clientSurname.textContent = data.surname;
    clientLastname.textContent = data.lastName;
    clientCreateDate.textContent = formatDate(data.createdAt);
    clientCreateTime.textContent = formatTime(data.createdAt);
    clientUpdateDate.textContent = formatDate(data.updatedAt);
    clientUpdateTime.textContent = formatTime(data.updatedAt);
    clientActionChange.textContent = 'Изменить';
    clientActionDelete.textContent = 'Удалить';
    changeSpinner.innerHTML = svgSpinner;
    deleteSpinner.innerHTML = svgSpinner;

    clientContacts.append(shortContacts);
    clientIdTd.append(clientId);
    clientActionChange.append(changeSpinner);
    clientActionDelete.append(deleteSpinner);
    clientFio.append(clientSurname, clientName, clientLastname);
    clientCreateAt.append(clientCreateDate, clientCreateTime);
    clientUpdateAt.append(clientUpdateDate, clientUpdateTime);
    clientActions.append(clientActionChange, clientActionDelete);
    clientTr.append(clientIdTd, clientFio, clientCreateAt, clientUpdateAt, clientContacts, clientActions);

    return clientTr;

}