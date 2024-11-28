document.getElementById('category-add-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    
    try {
        const jwt = localStorage.getItem('jwt');

        const response = await fetch('/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('카테고리 추가 완료!');
        window.location.href = '/dashboard';
    } catch(error) {
        alert(error);
    }
});