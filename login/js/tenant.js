function loginTenant() {
    const email = document.getElementById('tenantLoginEmail').value.trim();
    const password = document.getElementById('tenantLoginPassword').value;

    const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

    // find tenant by email
    let loggedInTenant = null;
    for (const room in tenants) {
        if (tenants[room].email === email && tenants[room].password === password) {
            loggedInTenant = tenants[room];
            break;
        }
    }

    if (loggedInTenant) {
        // e save ang current tenant in localStorage
        localStorage.setItem('currentTenant', JSON.stringify(loggedInTenant));
 
        window.location.href = "../../tenant/html/dashboard2.html";
        return false; 
    } else {
        alert("Invalid email or password");
        return false;
    }
}
