function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
    const name = getQueryParameter('name');
    const categorySelect = document.getElementById('category');

    if (!name) {
        alert('아이템이 지정되지 않았습니다.');
        return;
    }
    
    try {
        const jwt = localStorage.getItem('jwt');

        let response = await fetch(`/items/${name}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const itemData = await response.json();

        response = await fetch('/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message); 
        }
        
        const categoriesData = await response.json();

        categoriesData.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        document.getElementById('name').value = itemData.name;
        document.getElementById('number').value = itemData.number;
        document.getElementById('expDate').value = itemData.expDate;
        categorySelect.value = itemData.category;
    } catch (error) {
        alert(error);
    }
});

document.getElementById('item-change-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = getQueryParameter('name');
    const number = formData.get('number');
    const expDate = formData.get('expDate');
    const category = formData.get('category');

    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch(`/items/${name}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ number, expDate, category }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('아이템 변경 완료!');
        window.location.href = '/item-check';
    } catch(error) {
        alert(error);
    }
});