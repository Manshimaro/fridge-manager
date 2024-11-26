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

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const expDate = new Date(item.expDate);

            const expDateCell = document.createElement('td');
            expDateCell.textContent = item.expDate;
            if (expDate < today) {
                expDateCell.style.backgroundColor = 'red';
            }

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.number}</td>
            `;
            row.appendChild(expDateCell);
            row.innerHTML += `
                <td>
                    <button onclick="itemChange('${item.name}')">변경</button>
                    <button onclick="itemDelete('${item.name}')">삭제</button>
                </td>
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

function itemChange(itemName) {
    const itemChangeUrl = `/item-change?name=${itemName}`;

    window.location.href = itemChangeUrl;
}

itemCheck();