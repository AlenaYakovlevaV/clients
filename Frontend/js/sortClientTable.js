export const sortClients = () => {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    const dirs = Array.from(headers).map(() => '');

    const transform = (type, content) => {
        switch (type) {
            case 'ID':
                return parseFloat(content);
            case 'create':
            case 'update':
                return content.split('.').reverse().join('-');
            case 'text':   
            default:
                return content;
        }
    }

    const sortColumn = (index) => {
        const type = headers[index].getAttribute('data-type');
        const rows = tbody.querySelectorAll('tr');
        const dir = dirs[index] || 'sortUp';
        const multiply = dir === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);

        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;

            let a = transform(type, cellA);
            let b = transform(type, cellB);
            if (type === 'id') {
                a = Number(transform(type, cellA));
                b = Number(transform(type, cellB));
            }

            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;   
                case a === b:
                    return 0; 
                default:
                    break;
            }
        });

        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });
        
        dirs[index] = dir === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        })
        
    }

    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
        });
    });
}