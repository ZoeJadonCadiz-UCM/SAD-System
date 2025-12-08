function loginTenant() {
    const inputEmail = document.getElementById("tenantLoginEmail").value.trim();
    const inputPassword = document.getElementById("tenantLoginPassword").value.trim();

    const tenants = JSON.parse(localStorage.getItem("tenants")) || {};

    let matchedTenant = null;

    for (const room in tenants) {
        const t = tenants[room];

        if (t.email === inputEmail && t.password === inputPassword) {
            matchedTenant = { ...t, room };
            break;
        }
    }

    if (!matchedTenant) {
        alert("❌ Incorrect email or password.");
        return false;
    }

    localStorage.setItem("loggedTenant", JSON.stringify(matchedTenant));
    alert("✔ Login successful!");

    window.location.href = "../../tenant/html/dashboard.html"; // Change if needed
    return false;
}
