async function itemCheck() {
    try {
        const jwt = localStorage.getItem('jwt');
    
        const response = await fetch('/items', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });
    
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        const data = await response.json();
        data.forEach(item => {
            const table = document.getElementById('itemTable');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${item.expDate}</td>
            `;
            table.appendChild(row);
        });
    } catch(error) {
        alert(error);
    }
}
itemCheck();