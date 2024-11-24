function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
    const name = getQueryParameter('name');
    if (name) {
        try {
            const jwt = localStorage.getItem('jwt');
            const response = await fetch(`/items/${name}`, {
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
            document.getElementById('name').value = itemData.name;
            document.getElementById('number').value = itemData.number;
            document.getElementById('expDate').value = itemData.expDate;
        } catch (error) {
            alert(error);
        }
    } else {
        alert('아이템이 지정되지 않았습니다.');
    }
});

document.getElementById('item-change-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = getQueryParameter('name');
    const number = formData.get('number');
    const expDate = formData.get('expDate');

    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch(`/items/${name}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ number, expDate }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('아이템 변경 완료!');
        window.location.href = '/dashboard';
    } catch(error) {
        alert(error);
    }
});