const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');

openMenuBtn.addEventListener('click', () => {
    mobileOverlay.classList.add('is-open');
});

closeMenuBtn.addEventListener('click', () => {
    mobileOverlay.classList.remove('is-open');
});