import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.esm.js';

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function itemCheck() {
    try {
        const jwt = localStorage.getItem('jwt');
        const decoded = jwtDecode(jwt);
        const id = decoded.sub;

        let name = getQueryParameter('name');
        if(name === null) {
            name = '';
        }

        const response = await fetch(`/items?name=${name}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });
    
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const response2 = await fetch(`/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        if(!response2.ok) {
            const errorData = await response2.json();
            throw new Error(errorData.message);
        }
    
        const itemsData = await response.json();
        const userData = await response2.json();

        const table = document.getElementById('itemTable');
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cautionDate = new Date(today);
        cautionDate.setDate(cautionDate.getDate() + userData.cautionDay);

        itemsData.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('id', item.name);

            const expDate = new Date(item.expDate);
            expDate.setHours(0, 0, 0, 0);

            const expDateCell = document.createElement('td');
            expDateCell.textContent = item.expDate;
            if (expDate < today) {
                expDateCell.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            } else if (expDate <= cautionDate) {
                expDateCell.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
            } else {
                expDateCell.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
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
window.itemDelete = itemDelete;
window.itemChange = itemChange;