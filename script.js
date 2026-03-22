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
// 1. Функсияи ГПС (GPS)
function getLocation() {
    var status = document.getElementById('locationStatus');
    var mapInput = document.getElementById('mapUrl');

    if (navigator.geolocation) {
        status.innerText = "⌛ Ҷустуҷӯи GPS...";
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            // Линки оддӣ барои ҳама браузерҳо
            var url = "https://www.google.com/maps?q=" + lat + "," + lng;
            mapInput.value = url;
            status.innerText = "✅ Мавқеъ муайян шуд!";
            status.style.color = "green";
        }, function() {
            status.innerText = "❌ GPS ёфт нашуд";
            status.style.color = "red";
        }, { enableHighAccuracy: true });
    }
}

// 2. Фиристодан ба WhatsApp
var regForm = document.getElementById('regForm');

if (regForm) {
    regForm.onsubmit = function(e) {
        e.preventDefault();

        // Гирифтани маълумот (Шакли классикӣ барои Chrome-и телефон)
        var nameEl = document.getElementById('fullName');
        var yearEl = document.getElementById('birthYear');
        var phoneEl = document.getElementById('userPhone');
        var workEl = document.getElementById('workPlace');
        var jobEl = document.getElementById('userJob');
        var expEl = document.getElementById('experience');
        var srvEl = document.getElementById('serviceInput');
        var mapEl = document.getElementById('mapUrl');

        var name = nameEl ? nameEl.value : "Нишон дода нашудааст";
        var year = yearEl ? yearEl.value : "-";
        var phone = phoneEl ? phoneEl.value : "-";
        var work = workEl ? workEl.value : "-";
        var job = jobEl ? jobEl.value : "";
        var exp = expEl ? expEl.value : "0";
        var srv = srvEl ? srvEl.value : "";
        var map = mapEl ? mapEl.value : "Фиристода нашуд";

        var adminPhone = "992933099029"; 

        // Сохтани матни паём (бо аломати + ба ҷои нохунакҳои каҷ)
        var message = "🛡️ *ВЕРИФИКАЦИЯИ УСТО*" + "%0A%0A" +
                      "👤 *Усто:* " + name + "%0A" +
                      "📅 *Таваллуд:* " + year + "%0A" +
                      "📞 *Тел:* " + phone + "%0A" +
                      "📍 *Ҷои кор:* " + work + "%0A" +
                      "🛠️ *Касб:* " + job + " (" + srv + ")%0A" +
                      "⏳ *Таҷриба:* " + exp + " сол" + "%0A" +
                      "🗺️ *Харита:* " + map + "%0A%0A" +
                      "⚠️ _Лутфан акси шиносномаро замима кунед!_";

        var whatsappUrl = "https://wa.me/" + adminPhone + "?text=" + message;
        
        // Кушодани WhatsApp
        window.open(whatsappUrl, '_blank');
        
        if (typeof closeModal === "function") {
            closeModal();
        }
    };
}