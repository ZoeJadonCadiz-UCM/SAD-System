document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("changeProfileBtn");
    const fileInput = document.getElementById("profileUpload");

    const profileDisplay = document.getElementById("profileDisplay");
    const profileSettingsDisplay = document.getElementById("profileSettingsDisplay");
    const dashboardProfile = document.getElementById("dashboard-profile-photo");

    function loadProfile() {
        const lastTenant = JSON.parse(localStorage.getItem("lastTenant"));
        const ownerProfile = localStorage.getItem("profilePicture");

        const profilePic = lastTenant && lastTenant.profilePicture ? lastTenant.profilePicture : ownerProfile;

        [profileDisplay, profileSettingsDisplay, dashboardProfile].forEach(el => {
            if (el) {
                if (profilePic) {
                    el.style.backgroundImage = `url(${profilePic})`;
                    el.style.backgroundSize = "cover";
                    el.style.backgroundPosition = "center";
                    el.classList.add("has-image");
                } else {
                    el.style.backgroundImage = "";
                    el.classList.remove("has-image");
                }
            }
        });
    }

    loadProfile(); 

    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener("click", (e) => {
            e.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;

                const lastTenant = JSON.parse(localStorage.getItem("lastTenant"));
                if (lastTenant) {
                    lastTenant.profilePicture = imageUrl;
                    localStorage.setItem("lastTenant", JSON.stringify(lastTenant));
                } else {
                    localStorage.setItem("profilePicture", imageUrl);
                }

                loadProfile(); 
            };
            reader.readAsDataURL(file);
        });
    }

    document.addEventListener("tenantsUpdated", loadProfile);
});
