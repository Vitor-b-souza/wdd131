document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeNewsletter();
    initializeLearnMore();
    loadStoredData();
});

function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    updateActiveLink();
}

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleNewsletterSubmit();
    });
}

function handleNewsletterSubmit() {
    const emailInput = document.getElementById('emailInput');
    const messageDiv = document.getElementById('formMessage');
    
    if (!emailInput || !messageDiv) return;

    const email = emailInput.value.trim();

    if (validateEmail(email)) {
        const subscribers = JSON.parse(localStorage.getItem('f1_subscribers')) || [];
        
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('f1_subscribers', JSON.stringify(subscribers));
        }

        messageDiv.textContent = `✓ Thank you! ${email} has been added to our mailing list.`;
        messageDiv.className = 'success-message';
        
        emailInput.value = '';

        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 5000);
    } else {
        messageDiv.textContent = '✗ Please enter a valid email address.';
        messageDiv.className = 'error-message';
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeLearnMore() {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (!learnMoreBtn) return;

    learnMoreBtn.addEventListener('click', () => {
        const basicsSection = document.getElementById('basics');
        if (basicsSection) {
            basicsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function initializeDrivers() {
    const driversData = getDriversData();
    renderDrivers(driversData);
}

function getDriversData() {
    return [
        {
            id: 1,
            name: 'Ayrton Senna',
            country: 'Brazil',
            era: '1984-1994',
            championships: 3,
            wins: 41,
            description: 'One of the greatest drivers in F1 history. Known for his aggressive driving style and determination.'
        },
        {
            id: 2,
            name: 'Michael Schumacher',
            country: 'Germany',
            era: '1991-2006',
            championships: 7,
            wins: 91,
            description: 'Record holder for most championships. Dominated Ferrari and showed exceptional consistency.'
        },
        {
            id: 3,
            name: 'Juan Manuel Fangio',
            country: 'Argentina',
            era: '1950-1958',
            championships: 5,
            wins: 24,
            description: 'Pioneer of modern F1 racing. Won championships with multiple teams, showcasing exceptional skill.'
        },
        {
            id: 4,
            name: 'Lewis Hamilton',
            country: 'United Kingdom',
            era: '2007-Present',
            championships: 7,
            wins: 103,
            description: 'Currently one of the most successful drivers. Dominated Mercedes era with record wins.'
        },
        {
            id: 5,
            name: 'Max Verstappen',
            country: 'Netherlands',
            era: '2015-Present',
            championships: 3,
            wins: 50,
            description: 'Modern era champion. Youngest winner in F1 history with exceptional raw speed.'
        }
    ];
}

function renderDrivers(drivers) {
    const container = document.querySelector('.drivers-container');
    if (!container) return;

    container.innerHTML = drivers.map(driver => createDriverCard(driver)).join('');
}

function createDriverCard(driver) {
    return `
        <div class="driver-card">
            <img src="https://via.placeholder.com/280x250?text=${encodeURIComponent(driver.name)}" 
                 alt="${driver.name}" 
                 loading="lazy">
            <div class="driver-info">
                <h3>${driver.name}</h3>
                <p>${driver.description}</p>
                <div class="driver-stat">
                    <span>Country:</span>
                    <strong>${driver.country}</strong>
                </div>
                <div class="driver-stat">
                    <span>Era:</span>
                    <strong>${driver.era}</strong>
                </div>
                <div class="driver-stat">
                    <span>Championships:</span>
                    <strong>${driver.championships}</strong>
                </div>
                <div class="driver-stat">
                    <span>Wins:</span>
                    <strong>${driver.wins}</strong>
                </div>
            </div>
        </div>
    `;
}

function filterDrivers(drivers, criteria) {
    return drivers.filter(driver => {
        if (criteria.country && driver.country !== criteria.country) return false;
        if (criteria.minWins && driver.wins < criteria.minWins) return false;
        return true;
    });
}

function initializeCircuits() {
    const circuitsData = getCircuitsData();
    renderCircuits(circuitsData);
}

function getCircuitsData() {
    return [
        {
            id: 1,
            name: 'Circuit de Monaco',
            country: 'Monaco',
            length: '3.337 km',
            laps: 78,
            description: 'The most prestigious circuit in the world. Street circuit through Monte Carlo.'
        },
        {
            id: 2,
            name: 'Autodromo Nazionale di Monza',
            country: 'Italy',
            length: '5.793 km',
            laps: 53,
            description: 'Historic circuit known for high speeds and passionate fans. Temple of speed.'
        },
        {
            id: 3,
            name: 'Silverstone Circuit',
            country: 'United Kingdom',
            length: '5.891 km',
            laps: 52,
            description: 'Home of British Grand Prix. High-speed circuit with technical sections.'
        },
        {
            id: 4,
            name: 'Circuit de Spa-Francorchamps',
            country: 'Belgium',
            length: '7.004 km',
            laps: 44,
            description: 'Longest circuit on calendar. Iconic Eau Rouge corner tests driver skill.'
        },
        {
            id: 5,
            name: 'Autódromo José María Gurvich',
            country: 'Argentina',
            length: '4.805 km',
            laps: 72,
            description: 'Modern South American circuit. Hosted Argentine Grand Prix.'
        }
    ];
}

function renderCircuits(circuits) {
    const container = document.querySelector('.circuits-container');
    if (!container) return;

    container.innerHTML = circuits.map(circuit => createCircuitCard(circuit)).join('');
}

function createCircuitCard(circuit) {
    return `
        <div class="circuit-card">
            <img src="https://via.placeholder.com/400x200?text=${encodeURIComponent(circuit.name)}" 
                 alt="${circuit.name}"
                 loading="lazy">
            <div class="circuit-info">
                <h3>${circuit.name}</h3>
                <p>${circuit.description}</p>
                <div class="circuit-stat">
                    <span><strong>Country:</strong> ${circuit.country}</span>
                </div>
                <div class="circuit-stat">
                    <span><strong>Track Length:</strong> ${circuit.length}</span>
                </div>
                <div class="circuit-stat">
                    <span><strong>Laps:</strong> ${circuit.laps}</span>
                </div>
            </div>
        </div>
    `;
}

function loadStoredData() {
    const subscribers = localStorage.getItem('f1_subscribers');
    if (subscribers) {
        const list = JSON.parse(subscribers);
    }
}

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Storage error:', e);
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Storage error:', e);
        return null;
    }
}

if (window.location.pathname.includes('drivers.html')) {
    document.addEventListener('DOMContentLoaded', initializeDrivers);
}

if (window.location.pathname.includes('circuits.html')) {
    document.addEventListener('DOMContentLoaded', initializeCircuits);
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('contactMessage');
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            const messages = JSON.parse(localStorage.getItem('f1_messages')) || [];
            messages.push(formData);
            localStorage.setItem('f1_messages', JSON.stringify(messages));
            
            messageDiv.textContent = '✓ Thank you for your message! We will get back to you soon.';
            messageDiv.className = 'success-message';
            contactForm.reset();
            
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = '';
            }, 5000);
        });
    }
});