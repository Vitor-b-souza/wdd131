const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    
    if (navMenu.classList.contains('show')) {
        menuButton.textContent = '✕';
    } else {
        menuButton.textContent = '☰';
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        menuButton.textContent = '☰';
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navMenu.classList.remove('show');
        menuButton.textContent = '☰';
    }
});

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById('last-modified');
const lastModDate = new Date(document.lastModified);
const formattedDate = lastModDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
lastModifiedSpan.textContent = formattedDate;