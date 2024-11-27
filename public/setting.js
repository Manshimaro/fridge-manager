import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.esm.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const jwt = localStorage.getItem('jwt');
        const decoded = jwtDecode(jwt);
        const id = decoded.sub;
        const response = await fetch(`/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        
        const userData = await response.json();
        document.getElementById('cautionDay').value = userData.cautionDay;
    } catch (error) {
        alert(error);
    }
});

document.getElementById('setting-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const cautionDay = formData.get('cautionDay');

    try {
        const jwt = localStorage.getItem('jwt');
        const decoded = jwtDecode(jwt);
        const id = decoded.sub;

        const response = await fetch(`/users/${id}/setting`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ cautionDay }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('설정 완료!');
        window.location.href = '/dashboard';
    } catch(error) {
        alert(error);
    }
});