document.addEventListener("DOMContentLoaded", () => {
  
    const profilePhoto = document.querySelector(".profile-photo");
    const savedPic = localStorage.getItem("profilePicture");
    if (savedPic && profilePhoto) {
        profilePhoto.style.backgroundImage = `url(${savedPic})`;
        profilePhoto.style.backgroundSize = "cover";
        profilePhoto.style.backgroundPosition = "center";
        profilePhoto.style.borderRadius = "50%"; 
    }

    const dormOwner = JSON.parse(localStorage.getItem("accountUser")) || {};

    const fName = dormOwner.firstName || "Kim";
    const lName = dormOwner.lastName || "Rangaig";
    const contact = dormOwner.contact || "0911 222 3333";
    const email = dormOwner.email || "kimrang21@gmail.com";

    const ownerDetails = document.querySelector(".owner-details");
    if (ownerDetails) {
        ownerDetails.innerHTML = `
            <p><strong>Dorm Owner:</strong> ${fName} ${lName}</p>
            <p><strong>Contact No.:</strong> ${contact}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Years of Operation:</strong> 12 years</p>
        `;
    }
});
