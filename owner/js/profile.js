document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn = document.getElementById("changeProfileBtn");
    const fileInput = document.getElementById("profileUpload");

    const profileDisplay = document.getElementById("profileDisplay");
    const profileSettingsDisplay = document.getElementById("profileSettingsDisplay");

    const savedPic = localStorage.getItem("profilePicture");
    if (savedPic) {
        profileDisplay.style.backgroundImage = `url(${savedPic})`;
        profileDisplay.style.backgroundSize = "cover";
        profileDisplay.style.backgroundPosition = "center";
        profileDisplay.classList.add("has-image"); 

        profileSettingsDisplay.style.backgroundImage = `url(${savedPic})`;
        profileSettingsDisplay.style.backgroundSize = "cover";
        profileSettingsDisplay.style.backgroundPosition = "center";
        profileSettingsDisplay.classList.add("has-image"); 
    }

    uploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;

            profileDisplay.style.backgroundImage = `url(${imageUrl})`;
            profileDisplay.style.backgroundSize = "cover";
            profileDisplay.style.backgroundPosition = "center";
            profileDisplay.classList.add("has-image");

            profileSettingsDisplay.style.backgroundImage = `url(${imageUrl})`;
            profileSettingsDisplay.style.backgroundSize = "cover";
            profileSettingsDisplay.style.backgroundPosition = "center";
            profileSettingsDisplay.classList.add("has-image"); 

            localStorage.setItem("profilePicture", imageUrl);
        };

        reader.readAsDataURL(file);
    });

});
