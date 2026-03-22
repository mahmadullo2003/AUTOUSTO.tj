// Аввал боварӣ ҳосил кунед, ки ин функсия танҳо ЯК БОР дар тамоми лоиҳа ҳаст
function toggleMobileMenu() {
    const dropdown = document.getElementById('mobileDropdown');
    if (dropdown) {
        if (dropdown.style.display === 'flex') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'flex';
        }
    }
}

// Функсия барои зерменюҳо (Accordion)
function toggleSubMenu(element) {
    const content = element.nextElementSibling;
    if (content) {
        if (content.style.display === "flex") {
            content.style.display = "none";
            element.classList.remove("active-btn");
        } else {
            content.style.display = "flex";
            element.classList.add("active-btn");
        }
    }
}

// Пӯшидани меню ҳангоми пахш кардани ҷои холӣ
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('mobileDropdown');
    const isClickInside = event.target.closest('.inst-item');

    if (!isClickInside && dropdown) {
        dropdown.style.display = 'none';
    }
});