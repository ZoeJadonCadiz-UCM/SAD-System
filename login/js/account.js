
window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if(userData) {
        document.getElementById('display-firstname').textContent = userData.firstname;
        document.getElementById('display-lastname').textContent = userData.lastname;
        document.getElementById('display-email').textContent = userData.email;

        document.getElementById('input-firstname').value = userData.firstname;
        document.getElementById('input-lastname').value = userData.lastname;
        document.getElementById('input-email').value = userData.email;
    }
});
