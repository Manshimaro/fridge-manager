document.getElementById('item-add-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const number = formData.get('number');
    const expDate = formData.get('expDate');

    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ name, number, expDate }),
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