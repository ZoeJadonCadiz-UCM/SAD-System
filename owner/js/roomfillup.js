
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".room-layout .tabs button");
    const rooms = document.querySelectorAll(".rooms .room");

    // -------------------------------
    // function: mo update ang room buttons
    // -------------------------------
    function updateRoomButtons() {
        const tenants = JSON.parse(localStorage.getItem('tenants')) || {};

        rooms.forEach(roomDiv => {
            const roomNum = roomDiv.dataset.room;

            if (tenants[roomNum] && tenants[roomNum].status === "Occupied") {
                roomDiv.classList.remove("vacant");
                roomDiv.classList.add("occupied");
                roomDiv.querySelector(".vacant-label").textContent = "Occupied";
            } else {
                roomDiv.classList.remove("occupied");
                roomDiv.classList.add("vacant");
                roomDiv.querySelector(".vacant-label").textContent = "Vacant";
            }
        });

        // update ang room stats
        const totalRooms = rooms.length;
        const occupiedRooms = Array.from(rooms).filter(r => r.classList.contains("occupied")).length;
        const vacantRooms = totalRooms - occupiedRooms;

        document.querySelector(".room-stats .stat-box:nth-child(1) .stat-number").textContent = totalRooms;
        document.querySelector(".room-stats .stat-box:nth-child(2) .stat-number").textContent = occupiedRooms;
        document.querySelector(".room-stats .stat-box:nth-child(3) .stat-number").textContent = vacantRooms;
    }

    // -------------------------------
    // initial update on page load
    // -------------------------------
    updateRoomButtons();

    // -------------------------------
    // katong 1st and 2nd floor buttons
    // -------------------------------
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Show/hide rooms based on floor
            rooms.forEach(r => {
                const roomNum = parseInt(r.dataset.room);

                if (index === 0) {
                    r.style.display = "block";
                } else if (index === 1) {
                    r.style.display = roomNum >= 101 && roomNum <= 105 ? "block" : "none"; 
                } else if (index === 2) {
                    r.style.display = roomNum >= 201 && roomNum <= 205 ? "block" : "none"; 
                }
            });
        });
    });
    
    document.addEventListener('tenantsUpdated', updateRoomButtons);
});
