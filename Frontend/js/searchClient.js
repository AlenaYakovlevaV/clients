// import { searchResult } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";

// Поиск клиента
export const searchClients = (clients) => {
    const findList = document.querySelector('.find-list');
    const input = document.querySelector('.header__input');

    let fio;
   

    input.addEventListener('input', function search() {
        findList.innerHTML = '';
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';
        for (const client of clients) {
            const findItem = document.createElement('li');
            const findLink = document.createElement('a');
            findItem.classList.add('find-list__item');
            findLink.classList.add('find-list__link');

            fio = `${client.surname} ${client.name} ${client.lastName}`;
            if (input.value !== '') {
                findList.style.display = 'block';
                if (fio.includes(input.value)) {
                    tbody.append(createClientItem(client));    
                    findLink.textContent = fio; 
                    findLink.innerHTML = insertMark(findLink.innerText, findLink.innerText.search(input.value), input.value.length);
                    findLink.addEventListener('click', () => {
                        tbody.innerHTML = '';
                        tbody.append(createClientItem(client));    
                        findLink.textContent = fio; 
                        findList.style.display = 'none';
                        input.value = '';
                    })
                    findItem.append(findLink);
                    findList.append(findItem);
                }
            }  else {
                tbody.append(createClientItem(client));
            }
            
        }
        
    });

    findList.addEventListener('mouseleave', () => {
        findList.style.display = 'none';
    })
    
    // Маркировка совпадений искомых и найденных данных
    const insertMark = (str, position, length) => str
    .slice(0, position) + '<mark>' + str
    .slice(position, position + length) + '</mark>' + str
    .slice(position + length);
}
