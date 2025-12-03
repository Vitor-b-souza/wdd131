const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function populateProductSelect() {
    const selectElement = document.getElementById('product-select');
    const firstOption = selectElement.querySelector('option');
    firstOption.disabled = true;
    firstOption.selected = true;
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
}

function updateLastModification() {
    const lastModSpan = document.getElementById('last-mod');
    const lastModDate = new Date(document.lastModified);
    const formattedDate = lastModDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    lastModSpan.textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', () => {
    populateProductSelect();
    updateLastModification();
});