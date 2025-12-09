document.addEventListener('DOMContentLoaded', () => {

    const roomForm = document.getElementById('roomForm');
    const roomModal = document.getElementById('roomModal');
    const modalContent = roomModal.querySelector('.modal-content');
    let currentRoom = null;

    const tenantNameInput = document.getElementById('tenantName');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const accountInput = document.getElementById('account');
    const passwordInput = document.getElementById('password');
    const statusSelect = document.getElementById('status');

    const totalRoomsElem = document.querySelector('.stat-box:nth-child(1) .stat-number');
    const occupiedRoomsElem = document.querySelector('.stat-box:nth-child(2) .stat-number');
    const vacantRoomsElem = document.querySelector('.stat-box:nth-child(3) .stat-number');

    document.querySelectorAll('.room').forEach(roomDiv => {
        roomDiv.addEventListener('click', () => {
            currentRoom = roomDiv.dataset.room;
            document.getElementById('modalTitle').textContent = `Room ${currentRoom} Info`;

            const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

            if (tenants[currentRoom]) {
                const t = tenants[currentRoom];
                tenantNameInput.value = t.name;
                emailInput.value = t.email;
                contactInput.value = t.contact;
                accountInput.value = t.account;
                passwordInput.value = t.password;
                statusSelect.value = t.status;
            } else {
                roomForm.reset();
            }

            roomModal.style.display = 'block';
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        roomModal.style.display = 'none';
    });

    roomModal.addEventListener('click', (e) => {
        if (e.target === roomModal) roomModal.style.display = 'none';
    });

    modalContent.addEventListener('click', (e) => e.stopPropagation());

    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentRoom) return;

        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

        const tenantData = {
            name: tenantNameInput.value,
            email: emailInput.value,
            contact: contactInput.value,
            account: accountInput.value,
            password: passwordInput.value,
            status: statusSelect.value
        };

        tenants[currentRoom] = tenantData;
        localStorage.setItem('tenants', JSON.stringify(tenants));

        // -------------------------------
        // SAVE LAST TENANT ONLY (for manual account.html update)
        // -------------------------------
        const fullName = tenantNameInput.value.trim();
        const split = fullName.split(" ");

        const lastTenant = {
            firstName: split[0] || "",
            lastName: split.slice(1).join(" ") || "",
            email: emailInput.value.trim(),
            contact: contactInput.value.trim(),
            account: accountInput.value.trim(),
            status: statusSelect.value,
            password: passwordInput.value
        };

        localStorage.setItem("lastTenant", JSON.stringify(lastTenant));

        updateRoomVisual(currentRoom, statusSelect.value);
        updateRoomStats();

        roomModal.style.display = 'none';
        roomForm.reset();
    });

    document.getElementById('clearTenantBtn').addEventListener('click', () => {
        if (!currentRoom) return;

        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};
        delete tenants[currentRoom];
        localStorage.setItem('tenants', JSON.stringify(tenants));

        updateRoomVisual(currentRoom, "Vacant");
        updateRoomStats();

        roomModal.style.display = 'none';
        roomForm.reset();
    });

    function updateRoomVisual(roomNumber, status) {
        const roomDiv = document.querySelector(`.room[data-room="${roomNumber}"]`);
        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};
        if (!roomDiv) return;

        if (status === "Occupied" && tenants[roomNumber]) {
            roomDiv.classList.add('occupied');
            roomDiv.classList.remove('vacant');
            roomDiv.querySelector('.vacant-label').textContent = tenants[roomNumber].name;
        } else {
            roomDiv.classList.add('vacant');
            roomDiv.classList.remove('occupied');
            roomDiv.querySelector('.vacant-label').textContent = "Vacant";
        }
    }

    function updateRoomStats() {
        const rooms = document.querySelectorAll('.room');
        let total = rooms.length;
        let occupied = 0;

        rooms.forEach(r => {
            if (r.classList.contains('occupied')) occupied++;
        });

        totalRoomsElem.textContent = total;
        occupiedRoomsElem.textContent = occupied;
        vacantRoomsElem.textContent = total - occupied;
    }

    updateRoomStats();
});
