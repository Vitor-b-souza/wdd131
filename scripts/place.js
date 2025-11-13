function calculateWindChill(temp, windSpeed) {
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temp * Math.pow(windSpeed, 0.16));
}

function displayWindChill() {
    const temperature = 28;
    const windSpeed = 12;
    
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        document.getElementById('wind-chill').textContent = windChill.toFixed(1) + ' °C';
    } else {
        document.getElementById('wind-chill').textContent = 'N/A';
    }
}

function displayYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}

function displayLastModified() {
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
}

document.addEventListener('DOMContentLoaded', function() {
    displayWindChill();
    displayYear();
    displayLastModified();
});