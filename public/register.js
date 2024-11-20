document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('password');
    const nickname = formData.get('nickname');

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password, nickname }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        alert('회원 가입 완료!');
        window.location.href = '/login';
    } catch(error) {
        alert(error);
    }
});