// --- Регистрация через серверное API ---
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
window.togglePassword = togglePassword;

function showNotification(message, type = 'success') {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#e74c3c' : '#2ecc71';
    notification.style.color = '#fff';
    notification.style.position = 'fixed';
    notification.style.left = '50%';
    notification.style.top = '30px';
    notification.style.transform = 'translateX(-50%)';
    notification.style.zIndex = '9999';
    notification.style.padding = '16px 32px';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '17px';
    notification.style.boxShadow = '0 4px 16px rgba(44,62,80,0.15)';
    notification.style.opacity = '0.98';
    notification.style.display = 'block';
    setTimeout(() => notification.remove(), 3000);
}
window.showNotification = showNotification;

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password })
        });
        const result = await response.json();
        if (response.ok) {
            showNotification('Регистрация успешна!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            showNotification(result.error || 'Ошибка регистрации', 'error');
        }
    } catch (err) {
        showNotification('Ошибка сервера', 'error');
    }
}
window.handleRegister = handleRegister;

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}
['name', 'surname', 'email', 'password', 'confirmPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                registerForm.requestSubmit();
            }
        });
    }
});