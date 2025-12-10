document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmit();
        });
    }

    initializeLocalStorage();
    loadSavedData();
});

function handleFormSubmit() {
    const email = document.getElementById('email').value;
    const interest = document.getElementById('interest').value;

    if (!email || !interest) {
        alert('Please fill in all fields');
        return;
    }

    const subscriptionData = {
        email: email,
        interest: interest,
        timestamp: new Date().toISOString()
    };

    saveSubscription(subscriptionData);
    
    alert(`Thank you for subscribing! We will send updates about ${interest} to ${email}`);
    document.getElementById('contactForm').reset();
}

function saveSubscription(data) {
    let subscriptions = localStorage.getItem('f1_subscriptions');
    subscriptions = subscriptions ? JSON.parse(subscriptions) : [];
    subscriptions.push(data);
    localStorage.setItem('f1_subscriptions', JSON.stringify(subscriptions));
}

function initializeLocalStorage() {
    if (!localStorage.getItem('f1_user_preferences')) {
        const defaultPreferences = {
            theme: 'dark',
            language: 'en',
            notifications: true
        };
        localStorage.setItem('f1_user_preferences', JSON.stringify(defaultPreferences));
    }

    if (!localStorage.getItem('f1_favorite_drivers')) {
        localStorage.setItem('f1_favorite_drivers', JSON.stringify([]));
    }

    if (!localStorage.getItem('f1_visited_pages')) {
        localStorage.setItem('f1_visited_pages', JSON.stringify([]));
    }
}

function loadSavedData() {
    const visitedPages = JSON.parse(localStorage.getItem('f1_visited_pages') || '[]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('f1_visited_pages', JSON.stringify(visitedPages));
    }
}

function addFavoriteDriver(driverName) {
    const favorites = JSON.parse(localStorage.getItem('f1_favorite_drivers') || '[]');
    
    if (!favorites.includes(driverName)) {
        favorites.push(driverName);
        localStorage.setItem('f1_favorite_drivers', JSON.stringify(favorites));
        return true;
    }
    return false;
}

function removeFavoriteDriver(driverName) {
    const favorites = JSON.parse(localStorage.getItem('f1_favorite_drivers') || '[]');
    const index = favorites.indexOf(driverName);
    
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem('f1_favorite_drivers', JSON.stringify(favorites));
        return true;
    }
    return false;
}

function getFavoriteDrivers() {
    return JSON.parse(localStorage.getItem('f1_favorite_drivers') || '[]');
}

function createDriverCard(driver) {
    return `
        <div class="driver-card">
            <h3>${driver.name}</h3>
            <p>${driver.team}</p>
            <span>${driver.achievement}</span>
        </div>
    `;
}

function createNewsCard(news) {
    return `
        <div class="news-card">
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <h3>${news.title}</h3>
            <p>${news.description}</p>
        </div>
    `;
}

function getTeamColors(teamName) {
    const teamColors = {
        'Red Bull Racing': { primary: '#0600EF', secondary: '#FFFFFF' },
        'McLaren Mercedes': { primary: '#FF8700', secondary: '#FFFFFF' },
        'Ferrari': { primary: '#DC0000', secondary: '#FFFFFF' },
        'Mercedes': { primary: '#00D2BE', secondary: '#FFFFFF' },
        'Aston Martin': { primary: '#006F62', secondary: '#FFFFFF' },
        'Williams Racing': { primary: '#005AFF', secondary: '#FFFFFF' },
        'Alpine F1 Team': { primary: '#0082FA', secondary: '#FFFFFF' },
        'Kick Sauber': { primary: '#52E252', secondary: '#FFFFFF' },
        'Racing Bulls': { primary: '#5E72E4', secondary: '#FFFFFF' },
        'Haas F1 Team': { primary: '#FFFFFF', secondary: '#000000' }
    };
    return teamColors[teamName] || { primary: '#404048', secondary: '#FFFFFF' };
}

function initializeDriverDatabase() {
    const drivers = [
        { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, nationality: 'Dutch', championships: 4 },
        { id: 2, name: 'Lando Norris', team: 'McLaren Mercedes', number: 4, nationality: 'British', championships: 1 },
        { id: 3, name: 'Charles Leclerc', team: 'Ferrari', number: 16, nationality: 'Monegasque', championships: 0 },
        { id: 4, name: 'Lewis Hamilton', team: 'Ferrari', number: 44, nationality: 'British', championships: 7 },
        { id: 5, name: 'Oscar Piastri', team: 'McLaren Mercedes', number: 81, nationality: 'Australian', championships: 0 },
        { id: 6, name: 'George Russell', team: 'Mercedes', number: 63, nationality: 'British', championships: 0 },
        { id: 7, name: 'Yuki Tsunoda', team: 'Red Bull Racing', number: 22, nationality: 'Japanese', championships: 0 },
        { id: 8, name: 'Kimi Antonelli', team: 'Mercedes', number: 12, nationality: 'Italian', championships: 0 },
        { id: 9, name: 'Carlos Sainz', team: 'Williams Racing', number: 55, nationality: 'Spanish', championships: 0 },
        { id: 10, name: 'Fernando Alonso', team: 'Aston Martin', number: 14, nationality: 'Spanish', championships: 2 },
        { id: 11, name: 'Lance Stroll', team: 'Aston Martin', number: 18, nationality: 'Canadian', championships: 0 },
        { id: 12, name: 'Alex Albon', team: 'Williams Racing', number: 23, nationality: 'Thai-British', championships: 0 },
        { id: 13, name: 'Pierre Gasly', team: 'Alpine F1 Team', number: 10, nationality: 'French', championships: 0 },
        { id: 14, name: 'Franco Colapinto', team: 'Alpine F1 Team', number: 43, nationality: 'Argentine', championships: 0 },
        { id: 15, name: 'Nico Hulkenberg', team: 'Kick Sauber', number: 27, nationality: 'German', championships: 0 },
        { id: 16, name: 'Gabriel Bortoleto', team: 'Kick Sauber', number: 5, nationality: 'Brazilian', championships: 0 },
        { id: 17, name: 'Esteban Ocon', team: 'Haas F1 Team', number: 31, nationality: 'French', championships: 0 },
        { id: 18, name: 'Oliver Bearman', team: 'Haas F1 Team', number: 87, nationality: 'British', championships: 0 },
        { id: 19, name: 'Isack Hadjar', team: 'Racing Bulls', number: 6, nationality: 'French', championships: 0 },
        { id: 20, name: 'Liam Lawson', team: 'Racing Bulls', number: 30, nationality: 'New Zealander', championships: 0 }
    ];
    localStorage.setItem('f1_drivers_2025', JSON.stringify(drivers));
    return drivers;
}

function getDrivers() {
    let drivers = localStorage.getItem('f1_drivers_2025');
    if (!drivers) {
        drivers = initializeDriverDatabase();
    } else {
        drivers = JSON.parse(drivers);
    }
    return drivers;
}

function filterDriversByTeam(teamName) {
    const drivers = getDrivers();
    return drivers.filter(driver => driver.team === teamName);
}

function sortDriversByName(drivers) {
    return [...drivers].sort((a, b) => a.name.localeCompare(b.name));
}

window.addEventListener('load', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.complete || img.currentSrc) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});