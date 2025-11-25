const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-187030-wallpaper.jpg"
  },
  {
    templeName: "Provo City Center Utah",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/2018/400x250/Provo-City-Center-Temple08.jpg"
  },
  {
    templeName: "Buenos Aires Argentina",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, January, 17",
    area: 30659,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/buenos-aires-argentina/400x250/buenos-airies-argentina-temple-1009069-wallpaper.jpg"
  },
  {
    templeName: "Manhattan New York",
    location: "Manhattan, New York, United States",
    dedicated: "2004, June, 13",
    area: 20630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manhattan-new-york/400x250/manhattan-temple-lds-903670-wallpaper.jpg"
  }
];

let currentFilter = 'home';

function createTempleCard(temple) {
  const figure = document.createElement('figure');
  figure.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    <figcaption>
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </figcaption>
  `;
  return figure;
}

function filterTemples(filter) {
  let filtered = temples;

  if (filter === 'old') {
    filtered = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year < 1900;
    });
  } else if (filter === 'new') {
    filtered = temples.filter(temple => {
      const year = parseInt(temple.dedicated.split(',')[0]);
      return year > 2000;
    });
  } else if (filter === 'large') {
    filtered = temples.filter(temple => temple.area > 90000);
  } else if (filter === 'small') {
    filtered = temples.filter(temple => temple.area < 10000);
  }

  displayTemples(filtered);
}

function displayTemples(templesToDisplay) {
  const container = document.getElementById('temple-container');
  container.innerHTML = '';

  templesToDisplay.forEach(temple => {
    const card = createTempleCard(temple);
    container.appendChild(card);
  });
}

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
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filterType = link.getAttribute('data-filter');
    currentFilter = filterType;
    filterTemples(filterType);

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


filterTemples('home');