async function categoryCheck() {
    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch(`/categories`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });
    
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const categoriesData = await response.json();
        
        const table = document.getElementById('categoryTable');
        
        categoriesData.forEach(category => {
            const row = document.createElement('tr');
            row.setAttribute('id', category.name);
            row.innerHTML = `
                <td>${category.name}</td>
                <td>
                    <button onclick="categoryDelete('${category.name}')">삭제</button>
                </td>
            `;
            table.appendChild(row);
        });
    } catch(error) {
        alert(error);
    }
}

async function categoryDelete(categoryName) {
    if (confirm("정말 삭제하시겠습니까?") !== true) { 
        return; 
    }

    try {
        const jwt = localStorage.getItem('jwt');
    
        const response = await fetch(`/categories/${categoryName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });
    
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    
        const table = document.getElementById('categoryTable');
        const rowToDelete = table.querySelector(`tr[id="${categoryName}"]`);
        rowToDelete.remove();
    } catch(error) {
        alert(error);
    }
}

categoryCheck();