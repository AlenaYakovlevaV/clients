import { searchResult } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";

// Поиск клиента
export const searchClients = (clients) => {
    const findList = document.querySelector('.find-list');
    const input = document.querySelector('.header__input');

    clients.forEach(client => {
        const findItem = document.createElement('li');
        const findLink = document.createElement('a');

        findItem.classList.add('find-list__item');
        findLink.classList.add('find-list__link');

        findLink.textContent = `${client.surname} ${client.name} ${client.lastName}`;
        findLink.href = '#';

        findItem.append(findLink);
        findList.append(findItem);
    });

    // Перерисовка таблицы с данными найденных клиентов
    const rewriteTable = async (str) => {
        const response = await searchResult(str);
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';
        for (const client of response) {
            tbody.append(createClientItem(client));
        }
    }

    // Поиск клиента по введенному значению
    input.addEventListener('input', async () => {
        const value = input.value.trim();
        const foundItems = document.querySelectorAll('.find-list__link');

        if (value !== '') {
            rewriteTable(value);

            foundItems.forEach(link => {
                if (link.innerText.search(value) == -1) {
                    link.classList.add('hide');
                    link.innerHTML = link.innerText;
                } else {
                    link.classList.remove('hide');
                    findList.classList.remove('hide');

                    const str = link.innerText;
                    link.innerHTML = insertMark(str, link.innerText.search(value), value.length);
                }
            })
        } else {
            foundItems.forEach(link => {
                const tbody = document.querySelector('.clients__tbody');
                tbody.innerHTML = '';

                clients.forEach(client => tbody.append(createClientItem(client)));

                link.classList.remove('hide');
                findList.classList.add('hide');
                link.innerHTML = link.innerText;
            });
        }
    });
    
    // Маркировка совпадений искомых и найденных данных
    const insertMark = (str, position, length) => str
    .slice(0, position) + '<mark>' + str
    .slice(position, position + length) + '</mark>' + str
    .slice(position + length);
}