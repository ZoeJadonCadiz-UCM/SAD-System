document.addEventListener('DOMContentLoaded', () => {

    const firstGrid = document.getElementById('firstFloorGrid');
    const secondGrid = document.getElementById('secondFloorGrid');

    const roomModal = document.getElementById('roomModal');
    const modalTitle = document.getElementById('modalTitle');
    const tenantNameInput = document.getElementById('tenantName');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const accountInput = document.getElementById('account');
    const passwordInput = document.getElementById('password');
    const statusSelect = document.getElementById('status');

    const firstFloorRooms = [101, 102, 103, 104, 105];
    const secondFloorRooms = [201, 202, 203, 204, 205];

    function createTenantCard(room, t) {
        const card = document.createElement('div');
        card.classList.add('tenant-card');
        card.dataset.room = room;

        const name = t?.name || 'Empty';
        const email = t?.email || 'Empty';
        const contact = t?.contact || 'Empty';
        const account = t?.account || 'Empty';
        const status = t?.status || 'Vacant';

        card.innerHTML = `
            <div class="photo"></div>
            <div class="info">
                <h3 class="tenant-name"><i class="fa-solid fa-user"></i> ${name}</h3>
                <p class="tenant-email"><i class="fa-solid fa-envelope"></i> ${email}</p>
                <p class="tenant-phone"><i class="fa-solid fa-phone"></i> ${contact}</p>
                <p class="tenant-start"><i class="fa-solid fa-id-card"></i> Account: ${account}</p>
            </div>
            <div class="bottom-row">
                <span class="unit"><i class="fa-solid fa-house"></i> ${room}</span>
                <span class="status ${status === "Occupied" ? "active" : ""}">
                    <i class="fa-solid ${status === "Occupied" ? "fa-circle-check" : "fa-circle-question"}"></i> ${status}
                </span>
            </div>
        `;

        if (room >= 101 && room <= 105) firstGrid.appendChild(card);
        else if (room >= 201 && room <= 205) secondGrid.appendChild(card);

        if (roomModal) {
            card.addEventListener('click', () => {
                modalTitle.textContent = `Room ${room} Info`;
                tenantNameInput.value = name;
                emailInput.value = email;
                contactInput.value = contact;
                accountInput.value = account;
                passwordInput.value = t?.password || '';
                statusSelect.value = status;
                roomModal.style.display = 'block';
            });
        }
    }

    function renderTenants() {
        firstGrid.innerHTML = '';
        secondGrid.innerHTML = '';

        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

        firstFloorRooms.forEach(room => createTenantCard(room, tenants[room]));
        secondFloorRooms.forEach(room => createTenantCard(room, tenants[room]));
    }

    renderTenants();

    document.addEventListener('tenantsUpdated', renderTenants);

    if (roomModal) {
        document.querySelector('.close').addEventListener('click', () => {
            roomModal.style.display = 'none';
        });
        roomModal.addEventListener('click', e => {
            if (e.target === roomModal) roomModal.style.display = 'none';
        });
    }
});
