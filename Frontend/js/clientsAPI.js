export const getClients = async () => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
    });

    const result = await response.json();
    
    return result;
}

export const createClient = async (client) => {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify(client),
    });

    const result = await response.json();
    return result;
}

export const changeClient = async (client, id) => {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(client),
    });
    // console.log(response.json());

    const result = await response.json();
    return result;
}

export const deleteClientItem = async (id) => {
    await fetch(`http://localhost:3000/api/clients/${id}`, { 
        method: 'DELETE',
    });
}

export const searchResult = async (value) => {
    const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
        method: 'GET',
    });

    const result = await response.json();
    
    return result;
}