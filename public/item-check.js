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
        const table = document.getElementById('itemTable');
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('id', item.name);
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${item.expDate}</td>
                <td><button onclick="itemDelete('${item.name}')">삭제</button></td>
            `;
            table.appendChild(row);
        });
    } catch(error) {
        alert(error);
    }
}

async function itemDelete(itemName) {
    if (confirm("정말 삭제하시겠습니까?") !== true) { 
        return; 
    }

    try {
        const jwt = localStorage.getItem('jwt');
    
        const response = await fetch(`/items/${itemName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });
    
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        const table = document.getElementById('itemTable');
        const rowToDelete = table.querySelector(`tr[id="${itemName}"]`);
        rowToDelete.remove();
    } catch(error) {
        alert(error);
    }
}

itemCheck();