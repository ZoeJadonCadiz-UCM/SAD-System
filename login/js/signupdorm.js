
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const userData = { firstname, lastname, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));

        window.location.href = "../../owner/html/account.html";
    });
});
