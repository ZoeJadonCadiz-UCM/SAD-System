function loginTenant() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const correctEmail = "zoejadoncadiz@gmail.com";
    const correctPassword = "1234";

    if (email === correctEmail && pass === correctPassword) {
        window.location.href = "../html/dashboard.html";  
        return false;
    } else {
        alert("Incorrect email or password.");
        return false;
        
    }
}
