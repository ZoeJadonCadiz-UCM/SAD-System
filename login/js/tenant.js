function loginTenant() {
    const email = document.getElementById('tenantLoginEmail').value;
    const password = document.getElementById('tenantLoginPassword').value;

    const tenants = JSON.parse(localStorage.getItem('tenants')) || {};
    const tenant = Object.values(tenants).find(t => t.email === email && t.password === password);

    if (!tenant) {
        alert('Invalid email or password');
        return false;
    }

    // ✅ Save tenant for all pages
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    localStorage.setItem('currentTenantEmail', tenant.email); // optional, for safety

    // redirect to dashboard or account page
    window.location.href = '../../tenant/html/dashboard2.html';
    return false; // prevent default form submission
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
