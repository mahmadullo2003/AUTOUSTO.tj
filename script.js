// ==========================================
// 1. ИДОРАКУНИИ МЕНЮИ МОБИЛӢ (Instagram Menu)
// ==========================================

// Функсияи асосӣ барои боз/пинҳон кардани меню
function toggleMobileMenu() {
    const dropdown = document.getElementById('mobileDropdown');
    if (dropdown) {
        const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
        dropdown.style.display = isHidden ? 'flex' : 'none';
    }
}

// Функсия барои зерменюҳо (Accordion) дар дохили меню
function toggleSubMenu(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    if (content.style.display === "flex") {
        content.style.display = "none";
        element.classList.remove("active-btn");
        if(arrow) arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "flex";
        element.classList.add("active-btn");
        if(arrow) arrow.style.transform = "rotate(180deg)";
    }
}

// ==========================================
// 2. ИДОРАКУНИИ МОДАЛ (ФРЕЙМ) ВА ГПС
// ==========================================

function openModal() {
    document.getElementById("registrationModal").style.display = "block";
}

function closeModal() {
    document.getElementById("registrationModal").style.display = "none";
}

// Функсияи ГПС
function getLocation() {
    const status = document.getElementById('locationStatus');
    const mapInput = document.getElementById('mapUrl');

    if (navigator.geolocation) {
        status.innerText = "⌛ Ҷустуҷӯи GPS...";
        status.style.color = "orange";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                // Линки дуруст барои Google Maps
                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                mapInput.value = url;
                status.innerText = "✅ Мавқеъ муайян шуд!";
                status.style.color = "green";
            },
            () => {
                status.innerText = "❌ GPS ёфт нашуд";
                status.style.color = "red";
            },
            { enableHighAccuracy: true }
        );
    }
}

// ==========================================
// 3. ФИРИСТОДАН БА WHATSAPP
// ==========================================

const regForm = document.getElementById('regForm');

if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Гирифтани маълумот
        const name = document.getElementById('fullName')?.value || "Нишон дода нашудааст";
        const year = document.getElementById('birthYear')?.value || "-";
        const phone = document.getElementById('userPhone')?.value || "-";
        const work = document.getElementById('workPlace')?.value || "Нишон дода нашудааст";
        const job = document.getElementById('userJob')?.value || "";
        const exp = document.getElementById('experience')?.value || "0";
        const selectedSrv = document.getElementById('serviceInput')?.value || "Интихоб нашудааст";
        const map = document.getElementById('mapUrl')?.value || "Фиристода нашуд";

        const adminPhone = "992933099029"; 

        // Сохтани матни паём
        const message = `🛡️ *ВЕРИФИКАЦИЯИ УСТО* %0A%0A` +
                        `👤 *Усто:* ${name}%0A` +
                        `📅 *Таваллуд:* ${year}%0A` +
                        `📞 *Тел:* ${phone}%0A` +
                        `📍 *Ҷои кор:* ${work}%0A` +
                        `🛠️ *Касб:* ${job} (${selectedSrv})%0A` +
                        `⏳ *Таҷриба:* ${exp} сол%0A` +
                        `🗺️ *Харита:* ${map}%0A%0A` +
                        `⚠️ _Лутфан акси шиносномаро замима кунед!_`;

        const whatsappUrl = `https://wa.me/${adminPhone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
    });
}

// Функсияҳои иловагӣ барои Custom Select дар дохили форма
function toggleMainDropdown() {
    const options = document.getElementById('customOptions');
    if(options) options.style.display = (options.style.display === 'block') ? 'none' : 'block';
}

function toggleCustomSub(element) {
    const sub = element.nextElementSibling;
    if(sub) sub.style.display = (sub.style.display === 'flex') ? 'none' : 'flex';
}

function selectService(name) {
    const display = document.getElementById('selectedService');
    const input = document.getElementById('serviceInput');
    if(display) display.innerText = name;
    if(input) input.value = name;
    const options = document.getElementById('customOptions');
    if(options) options.style.display = 'none';
}