document.addEventListener("DOMContentLoaded", () => {

    const displayFName = document.getElementById("display-firstname");
    const displayLName = document.getElementById("display-lastname");
    const displayContact = document.getElementById("display-contact");
    const displayEmail = document.getElementById("display-email");

    const fNameInput = document.getElementById("input-firstname");
    const lNameInput = document.getElementById("input-lastname");
    const contactInput = document.getElementById("input-contact");
    const emailInput = document.getElementById("input-email");

    const savedUser = JSON.parse(localStorage.getItem("accountUser")) || {};

    displayFName.textContent = savedUser.firstName || "--";
    displayLName.textContent = savedUser.lastName || "--";
    displayContact.textContent = savedUser.contact || "--";
    displayEmail.textContent = savedUser.email || "--";

    fNameInput.value = savedUser.firstName || "";
    lNameInput.value = savedUser.lastName || "";
    contactInput.value = savedUser.contact || "";
    emailInput.value = savedUser.email || "";

    function updateAll() {
        const updatedUser = {
            firstName: fNameInput.value.trim(),
            lastName: lNameInput.value.trim(),
            contact: contactInput.value.trim(),
            email: emailInput.value.trim()
        };

        localStorage.setItem("accountUser", JSON.stringify(updatedUser));

        displayFName.textContent = updatedUser.firstName || "--";
        displayLName.textContent = updatedUser.lastName || "--";
        displayContact.textContent = updatedUser.contact || "--";
        displayEmail.textContent = updatedUser.email || "--";
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            updateAll();
        }
    });
});
