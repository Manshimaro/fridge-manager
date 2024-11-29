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
    } catch (error) {
        alert(error);
    }
});

document.getElementById('item-add-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const number = formData.get('number');
    const expDate = formData.get('expDate');
    const category = formData.get('category');

    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ name, number, expDate, category }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('아이템 추가 완료!');
        window.location.href = '/dashboard';
    } catch(error) {
        alert(error);
    }
});