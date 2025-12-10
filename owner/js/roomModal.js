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

    // ------------------------------
    // Open Modal for Each Room
    // ------------------------------
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

    // ------------------------------
    // Close Modal
    // ------------------------------
    document.querySelector('.close').addEventListener('click', () => {
        roomModal.style.display = 'none';
    });

    roomModal.addEventListener('click', (e) => {
        if (e.target === roomModal) roomModal.style.display = 'none';
    });

    modalContent.addEventListener('click', (e) => e.stopPropagation());

    // ------------------------------
    // Submit Tenant Info
    // ------------------------------
    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentRoom) return;

        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

        const tenantData = {
            room: currentRoom,
            name: tenantNameInput.value,
            email: emailInput.value,
            contact: contactInput.value,
            account: accountInput.value,
            password: passwordInput.value,
            status: statusSelect.value,     
            rent: 450,                        
            lastPayment: "------",
            paymentStatus: "Pending"
        };

        tenants[currentRoom] = tenantData;
        localStorage.setItem('tenants', JSON.stringify(tenants));

        // -------------------------------
        // Save last tenant info for account.html
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
            password: passwordInput.value,
            roomNumber: currentRoom 
        };
        localStorage.setItem("lastTenant", JSON.stringify(lastTenant));

        updateRoomVisual(currentRoom, statusSelect.value);
        updateRoomStats();

        roomModal.style.display = 'none';
        roomForm.reset();
    });

    // ------------------------------
    // Clear Tenant Info
    // ------------------------------
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

    // ------------------------------
    // Update Room Appearance
    // ------------------------------
    function updateRoomVisual(roomNumber, status) {
        const roomDiv = document.querySelector(`.room[data-room="${roomNumber}"]`);
        if (!roomDiv) return;

        if (status === "Occupied") {
            roomDiv.classList.add('occupied');
            roomDiv.classList.remove('vacant');
            roomDiv.querySelector('.vacant-label').textContent = "Occupied";
        } else {
            roomDiv.classList.add('vacant');
            roomDiv.classList.remove('occupied');
            roomDiv.querySelector('.vacant-label').textContent = "Vacant";
        }
    }

    // ------------------------------
    // Update Room Stats
    // ------------------------------
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
