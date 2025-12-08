
// --- Load user info from localStorage ---
window.addEventListener('DOMContentLoaded', () => {
    const firstname = localStorage.getItem('firstname') || 'Kim';
    const lastname = localStorage.getItem('lastname') || 'Rangaig';
    const contact = localStorage.getItem('contact') || '0911 222 3333';
    const email = localStorage.getItem('email') || 'kimrang21@gmail.com';
    const profilePhoto = localStorage.getItem('profilePhoto');

    document.getElementById('display-firstname').textContent = firstname;
    document.getElementById('display-lastname').textContent = lastname;
    document.getElementById('display-contact').textContent = contact;
    document.getElementById('display-email').textContent = email;

    document.getElementById('input-firstname').value = firstname;
    document.getElementById('input-lastname').value = lastname;
    document.getElementById('input-contact').value = contact;
    document.getElementById('input-email').value = email;

    if (profilePhoto) {
        document.getElementById('profileDisplay').style.backgroundImage = `url(${profilePhoto})`;
        document.getElementById('profileSettingsDisplay').style.backgroundImage = `url(${profilePhoto})`;
    }
});

// --- mo update ang localstorage inig enter
const updateOnEnter = (inputId, displayId, storageKey) => {
    const input = document.getElementById(inputId);
    input.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            const value = input.value.trim();
            if (value) {
                document.getElementById(displayId).textContent = value;
                localStorage.setItem(storageKey, value);
                input.blur();
            }
        }
    });
};

updateOnEnter('input-firstname', 'display-firstname', 'firstname');
updateOnEnter('input-lastname', 'display-lastname', 'lastname');
updateOnEnter('input-contact', 'display-contact', 'contact');
updateOnEnter('input-email', 'display-email', 'email');

// --- Profile picture upload ---
const profileUpload = document.getElementById('profileUpload');
const changeProfileBtn = document.getElementById('changeProfileBtn');

changeProfileBtn.addEventListener('click', () => {
    profileUpload.click();
});

profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const imgData = reader.result;
        document.getElementById('profileDisplay').style.backgroundImage = `url(${imgData})`;
        document.getElementById('profileSettingsDisplay').style.backgroundImage = `url(${imgData})`;
        localStorage.setItem('profilePhoto', imgData);
    };
    reader.readAsDataURL(file);
});
