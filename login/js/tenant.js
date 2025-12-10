
function loginTenant() {
    const email = document.getElementById("tenantLoginEmail").value;
    const password = document.getElementById("tenantLoginPassword").value;

    const tenants = JSON.parse(localStorage.getItem("tenants")) || {};
    let currentUserKey = null;

    for (const key in tenants) {
        if (tenants[key].email === email && tenants[key].password === password) {
            currentUserKey = key;
            break;
        }
    }

    if (currentUserKey) {
        localStorage.setItem("currentUser", currentUserKey); 
        window.location.href = "../../tenant/html/payments2.html"; 
        return false;
    } else {
        alert("Invalid email or password.");
        return false;
    }
}

function logoutTenant() {
    localStorage.removeItem('currentTenant');
    window.location.href = "../../login/html/login.html";
}

function getCurrentTenant() {
    const tenant = JSON.parse(localStorage.getItem('currentTenant')) || null;
    if (!tenant) return null;
    return {
        roomNumber: tenant.roomNumber,
        firstName: tenant.firstName || "Tenant",
        lastName: tenant.lastName || "",
        email: tenant.email
    };
}
