import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.esm.js';

let page = 1;

function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
    const categorySelect = document.getElementById('category');
    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch('/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const categories = await response.json();

        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        let name = getQueryParameter('name');
        if(name === null) {
            name = '';
        }

        let category = getQueryParameter('category');
        if(category === null) {
            category = '';
        }

        document.getElementById('name').value = name;
        document.getElementById('category').value = category;
    } catch (error) {
        alert(error);
    }

    document.getElementById('prevButton').addEventListener("click", () => handlePageChange("prev"));
    document.getElementById('nextButton').addEventListener("click", () => handlePageChange("next"));
})

async function itemCheck() {
    try {
        const jwt = localStorage.getItem('jwt');
        const decoded = jwtDecode(jwt);
        const id = decoded.sub;

        let name = getQueryParameter('name');
        if(name === null) {
            name = '';
        }

        let category = getQueryParameter('category');
        if(category === null) {
            category = '';
        }

        const response = await fetch(`/items?name=${name}&category=${category}&page=${page}`, {
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

        table.innerHTML = `
            <tr>
                <th>이름</th>
                <th>개수</th>
                <th>소비기한</th>
                <th>카테고리</th>
                <th>변경 / 삭제</th>
            </tr>
        `;
        
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
                <td>${item.category}</td>
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

async function handlePageChange(direction) {
    if (direction === "prev") {
        if (page > 1) {
            page--;
            itemCheck();
        }
    } else if (direction === "next") {
        const jwt = localStorage.getItem('jwt');

        let name = getQueryParameter('name');
        if(name === null) {
            name = '';
        }

        let category = getQueryParameter('category');
        if(category === null) {
            category = '';
        }

        const response = await fetch(`/items/count?name=${name}&category=${category}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        const itemCount = await response.json();
        const totalPage = Math.ceil(itemCount / 5);

        if (page < totalPage) {
            page++;
            itemCheck();
        }
    }
}

itemCheck();
window.itemDelete = itemDelete;
window.itemChange = itemChange;