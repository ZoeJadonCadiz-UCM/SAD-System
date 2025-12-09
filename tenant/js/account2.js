document.addEventListener('DOMContentLoaded', () => {
    // --- Load tenant first ---
    const lastTenant = JSON.parse(localStorage.getItem('lastTenant'));
    const savedUser = lastTenant || JSON.parse(localStorage.getItem('accountUser')) || {};

    const firstname = savedUser.firstName || '--';
    const lastname  = savedUser.lastName  || '--';
    const contact   = savedUser.contact   || '--';
    const email     = savedUser.email     || '--';
    const status    = savedUser.status    || 'Active';
    const profilePhoto = localStorage.getItem('profilePicture');

    // Display user info
    document.getElementById('display-firstname').textContent = firstname;
    document.getElementById('display-lastname').textContent  = lastname;
    document.getElementById('display-contact').textContent   = contact;
    document.getElementById('display-email').textContent     = email;

    const statusElem = document.querySelector('.status');
    if (statusElem) statusElem.textContent = status;

    // Populate settings inputs
    document.getElementById('input-firstname').value = firstname;
    document.getElementById('input-lastname').value  = lastname;
    document.getElementById('input-contact').value   = contact;
    document.getElementById('input-email').value     = email;

    // Display profile picture if exists
    if (profilePhoto) {
        const pd = document.getElementById('profileDisplay');
        const psd = document.getElementById('profileSettingsDisplay');
        [pd, psd].forEach(el => {
            if (el) {
                el.style.backgroundImage = `url(${profilePhoto})`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
            }
        });
    }

    // Update info on Enter key
    ['input-firstname', 'input-lastname', 'input-contact', 'input-email'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();

                const updatedUser = {
                    firstName: document.getElementById('input-firstname').value.trim(),
                    lastName:  document.getElementById('input-lastname').value.trim(),
                    contact:   document.getElementById('input-contact').value.trim(),
                    email:     document.getElementById('input-email').value.trim(),
                    status: savedUser.status || 'Active'
                };

                // Save for tenant or owner depending on who is logged in
                if (lastTenant) {
                    localStorage.setItem('lastTenant', JSON.stringify(updatedUser));
                } else {
                    localStorage.setItem('accountUser', JSON.stringify(updatedUser));
                }

                // Update display
                document.getElementById('display-firstname').textContent = updatedUser.firstName || '--';
                document.getElementById('display-lastname').textContent  = updatedUser.lastName || '--';
                document.getElementById('display-contact').textContent   = updatedUser.contact || '--';
                document.getElementById('display-email').textContent     = updatedUser.email || '--';

                input.blur();
            }
        });
    });

    // -------------------------------
    // LISTEN for tenantsUpdated event from dashboard modal
    // -------------------------------
    document.addEventListener('tenantsUpdated', () => {
        const lastTenant = JSON.parse(localStorage.getItem('lastTenant'));
        if (!lastTenant) return;

        const firstname = lastTenant.firstName || '--';
        const lastname  = lastTenant.lastName  || '--';
        const contact   = lastTenant.contact   || '--';
        const email     = lastTenant.email     || '--';
        const status    = lastTenant.status    || 'Active';

        // Update display
        document.getElementById('display-firstname').textContent = firstname;
        document.getElementById('display-lastname').textContent  = lastname;
        document.getElementById('display-contact').textContent   = contact;
        document.getElementById('display-email').textContent     = email;

        const statusElem = document.querySelector('.status');
        if (statusElem) statusElem.textContent = status;

        // Update settings inputs
        document.getElementById('input-firstname').value = firstname;
        document.getElementById('input-lastname').value  = lastname;
        document.getElementById('input-contact').value   = contact;
        document.getElementById('input-email').value     = email;
    });
});
