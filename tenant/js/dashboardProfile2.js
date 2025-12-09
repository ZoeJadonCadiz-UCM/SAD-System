
window.addEventListener('DOMContentLoaded', () => {

    const lastTenant = JSON.parse(localStorage.getItem('lastTenant'));
    const accountUser = JSON.parse(localStorage.getItem('accountUser')) || {};

    const firstname = (lastTenant?.firstName || accountUser.firstName) || localStorage.getItem('firstname') || 'Kim';
    const lastname = (lastTenant?.lastName || accountUser.lastName) || localStorage.getItem('lastname') || 'Rangaig';
    const contact = (lastTenant?.contact || accountUser.contact) || localStorage.getItem('contact') || '0911 222 3333';
    const email = (lastTenant?.email || accountUser.email) || localStorage.getItem('email') || 'kimrang21@gmail.com';
    const status = (lastTenant?.status || accountUser.status) || 'Active';

    document.getElementById('dashboard-owner-name').textContent = `${firstname} ${lastname}`;
    document.getElementById('dashboard-owner-contact').textContent = contact;
    document.getElementById('dashboard-owner-email').textContent = email;
    document.querySelector('.active-status').textContent = status;

    const profilePhoto = localStorage.getItem('profilePhoto');
    if (profilePhoto) {
        document.getElementById('dashboard-profile-photo').style.backgroundImage = `url(${profilePhoto})`;
    }
});
