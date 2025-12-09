
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".room-layout .tabs button");
    const rooms = document.querySelectorAll(".rooms .room");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            if (index === 0) {
                rooms.forEach(r => r.style.display = "block");
            }
            else if (index === 1) {
                rooms.forEach(r => {
                    const roomNum = parseInt(r.textContent.match(/\d+/)[0]);
                    r.style.display = (roomNum >= 101 && roomNum <= 105) ? "block" : "none";
                });
            }
            else if (index === 2) { 
                rooms.forEach(r => {
                    const roomNum = parseInt(r.textContent.match(/\d+/)[0]);
                    r.style.display = (roomNum >= 106 && roomNum <= 110) ? "block" : "none";
                });
            }
        });
    });
});
