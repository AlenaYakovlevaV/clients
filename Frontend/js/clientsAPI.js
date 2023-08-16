//Функция получения всех клиентов с сервера
export const getClients = async () => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
    });

    const result = await response.json();
    
    return result;
}

//Функция создания клиента на сервере
export const createClient = async (client) => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
    });

    const result = await response.json();
    return result;
}

//Функция изменения данных существующего клиента на сервере по его Id
export const changeClient = async (client, id) => {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(client),
    });

    const result = await response.json();
    return result;
}

// Функция удаления клиента на сервере по Id
export const deleteClientItem = async (id) => {
    await fetch(`http://localhost:3000/api/clients/${id}`, { 
        method: 'DELETE',
    });
}

//Функция поиска искомого клиента на сервере
export const searchResult = async (value) => {
    const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
        method: 'GET',
    });

    const result = await response.json();
    
    return result;
}