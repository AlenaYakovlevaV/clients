import { createClientsHeader } from "./header.js"
import { createClientsSection } from "./clientsSection.js";
import { getClients } from "./clientsAPI.js";
import { createClientItem } from "./createClientItem.js";
import { sortClients } from "./sortClientTable.js";
import { searchClients } from "./searchClient.js";

const createApp = async () => {
    const header = createClientsHeader();
    const clientsSection = createClientsSection();
    document.body.append(header, clientsSection.main);
    const preloader = document.querySelector('.preloader');

    try {
        const clients = await getClients();
        searchClients(clients);
        for (const client of clients) {
            document.querySelector('.clients__tbody').append(createClientItem(client));
        }
    } catch (error) {
        console.log(error);
    } finally {
        setTimeout(() => preloader.remove(), 1000) ;
    }
}

createApp();
document.addEventListener('DOMContentLoaded', () => {
    sortClients();
})

