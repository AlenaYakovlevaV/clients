// import { svgArrow } from "./svg.js";
import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddClient } from "./svg.js";

export const createClientsSection = () => {
    const section = document.createElement('section'); //Секция с таблицей клиентов
    const h1 = document.createElement('h1'); //Подпись клиенты
    const container = document.createElement('div'); //Контейнер
    const main = document.createElement('main'); //Содержимое контейнера
    const clientsHead = document.createElement('thead'); //Заголовок таблицы
    const clientsHeadTr = document.createElement('tr'); // Строка заголовка
    const clientsHeadId = document.createElement('th'); 
    const clientsHeadFio = document.createElement('th'); 
    const clientsHeadCreateAt = document.createElement('th'); 
    const clientsHeadUpdateAt = document.createElement('th'); 
    const clientsHeadContacts = document.createElement('th'); //Столбец контактов
    const clientsHeadActions = document.createElement('th'); //Столбец действий (Изменить/Удалить)
    const clientsHeadSpan = document.createElement('span'); //Сортировка ФИО
    const addClientBtn = document.createElement('btn'); //Кнопка добавления клиента
    const addClientBtnIcon = document.createElement('span'); //Иконка добавления клиента
    const clientsTableWrapper = document.createElement('div'); //Контейнер для таблицы (адаптив)
    const clientsTable = document.createElement('table'); //Таблица клиентов
    const clientsTableBody = document.createElement('tbody'); //Тело таблицы
    const createSpan = document.createElement('span'); //Время создания
    const updateSpan = document.createElement('span'); // Время изменения
    const sortItems = [clientsHeadId, clientsHeadFio, clientsHeadCreateAt, clientsHeadUpdateAt];

    for (const item of sortItems) {
        item.addEventListener('click', () => {
            if (item.classList.contains('sort-down')) {
                item.classList.remove('sort-down');
                item.classList.add('sort-up');
            } else {
                item.classList.remove('sort-up');
                item.classList.add('sort-down');
            }
        })
    }

    clientsHeadCreateAt.addEventListener('click', () => {
        if (clientsHeadCreateAt.classList.contains('sort-down')) {
            createSpan.classList.add('sort-up');
        } else {
            createSpan.classList.remove('sort-up');
        }
    });

    clientsHeadUpdateAt.addEventListener('click', () => {
        if (clientsHeadUpdateAt.classList.contains('sort-down')) {
            updateSpan.classList.add('sort-up');
        } else {
            updateSpan.classList.remove('sort-up');
        }
    });

    clientsHeadId.setAttribute('data-type', 'id'); 
    clientsHeadFio.setAttribute('data-type', 'text');
    clientsHeadCreateAt.setAttribute('data-type', 'create');
    clientsHeadUpdateAt.setAttribute('data-type', 'update'); 
    section.classList.add('clients');
    clientsTableWrapper.classList.add('clients__wrapper');
    h1.classList.add('clients__heading');
    clientsTableBody.classList.add('clients__tbody');
    clientsHead.classList.add('clients__thead', 'thead-info');
    clientsHeadId.classList.add('thead-info__item', 'thead-info__item--id', 'sort-up');
    clientsHeadFio.classList.add('thead-info__item', 'thead-info__item--fio', 'sort-down');
    clientsHeadCreateAt.classList.add('thead-info__item', 'thead-info__item--create', 'sort_down');
    clientsHeadUpdateAt.classList.add('thead-info__item', 'thead-info__item--update', 'sort_down');
    clientsHeadContacts.classList.add('thead-info__item', 'thead-info__item--contacts');
    clientsHeadActions.classList.add('thead-info__item', 'thead-info__item--actions');
    clientsHeadSpan.classList.add('thead-info__span');
    addClientBtn.classList.add('clients__btn', 'btn-reset');
    addClientBtnIcon.classList.add('clients__icon');

    container.classList.add('container', 'clients__container');
    main.classList.add('main');
    clientsTable.classList.add('clients__table');
    createSpan.classList.add('create__span');
    updateSpan.classList.add('update__span');
    // updateSpan.classList.add('update__span');

    h1.textContent = 'Клиенты';
    clientsHeadId.textContent = 'ID';
    clientsHeadFio.textContent = 'Фамилия Имя Отчество';
    clientsHeadSpan.textContent = 'А-Я'
    clientsHeadCreateAt.textContent = 'Дата и время';
    clientsHeadUpdateAt.textContent = 'Последние';
    clientsHeadContacts.textContent = 'Контакты';
    clientsHeadActions.textContent = 'Действия';
    addClientBtn.textContent = 'Добавить клиента';
    addClientBtnIcon.innerHTML = svgAddClient;

    addClientBtn.addEventListener('click', () => {
        document.body.append(addClientModal());
    })

    main.append(section);
    section.append(container);
    clientsHeadFio.appendChild(clientsHeadSpan);
    clientsHeadCreateAt.append(createSpan);
    clientsHeadUpdateAt.append(updateSpan);
    clientsHeadTr.append(
        clientsHeadId, 
        clientsHeadFio, 
        clientsHeadCreateAt, 
        clientsHeadUpdateAt, 
        clientsHeadContacts, 
        clientsHeadActions
    );
    clientsHead.append(clientsHeadTr);
    clientsTableWrapper.append(clientsTable);
    clientsTable.append(clientsHead, clientsTableBody, createPreloader());
    // clientsTableBody.append();
    addClientBtn.append(addClientBtnIcon);
    container.append(h1, clientsTableWrapper, addClientBtn);

    return {
        main,
        clientsTable,
        clientsTableBody,
    }
}