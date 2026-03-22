// 1. Функсияҳои идоракунии Модал (Пайдошавӣ ва Пӯшидан)
function openModal() {
    var modal = document.getElementById("registrationModal");
    if (modal) modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("registrationModal");
    if (modal) modal.style.display = "none";
}

// 2. Идоракунии Рӯйхати Касбҳо (Custom Dropdown)
function toggleMainDropdown() {
    var options = document.getElementById('customOptions');
    if (options) {
        options.style.display = (options.style.display === 'block') ? 'none' : 'block';
    }
}

function toggleCustomSub(element) {
    var sub = element.nextElementSibling;
    var arrow = element.querySelector('.arrow');
    if (sub) {
        if (sub.style.display === 'flex') {
            sub.style.display = 'none';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
            sub.style.display = 'flex';
            if (arrow) arrow.style.transform = 'rotate(90deg)';
        }
    }
}

function selectService(name) {
    var display = document.getElementById('selectedService');
    var input = document.getElementById('serviceInput');
    if (display) display.innerText = name;
    if (input) input.value = name;
    
    var options = document.getElementById('customOptions');
    if (options) options.style.display = 'none';
}

// 3. Функсияи ГПС (GPS) - Танҳо бо HTTPS кор мекунад
function getLocation() {
    var status = document.getElementById('locationStatus');
    var mapInput = document.getElementById('mapUrl');

    if (navigator.geolocation) {
        status.innerText = "⌛ Ҷустуҷӯи GPS...";
        status.style.color = "orange";

        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            // Линкаи универсалӣ барои ҳамаи телефонҳо
            var url = "https://www.google.com/maps?q=" + lat + "," + lng;
            if (mapInput) mapInput.value = url;
            status.innerText = "✅ Мавқеъ муайян шуд!";
            status.style.color = "green";
        }, function() {
            status.innerText = "❌ GPS ёфт нашуд ё баста аст";
            status.style.color = "red";
        }, { enableHighAccuracy: true });
    } else {
        status.innerText = "❌ Браузер GPS-ро дастгирӣ намекунад";
    }
}

// 4. ФИРИСТОДАН БА WHATSAPP (Мантиқи асосӣ)
var regForm = document.getElementById('regForm');

if (regForm) {
    regForm.onsubmit = function(e) {
        e.preventDefault();

        // 1. Пайдо кардани тугма ва иловаи лоадинг
        var submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.innerText = "Дар ҳоли фиристодан..."; // Барои бехатарӣ матнро ҳам иваз мекунем
        }

        // 2. Гирифтани маълумот
        var name = document.getElementById('fullName') ? document.getElementById('fullName').value : "Н/Н";
        var year = document.getElementById('birthYear') ? document.getElementById('birthYear').value : "-";
        var phone = document.getElementById('userPhone') ? document.getElementById('userPhone').value : "-";
        var work = document.getElementById('workPlace') ? document.getElementById('workPlace').value : "-";
        var exp = document.getElementById('experience') ? document.getElementById('experience').value : "0";
        var srv = document.getElementById('serviceInput') ? document.getElementById('serviceInput').value : "Интихоб нашудааст";
        var map = document.getElementById('mapUrl') ? document.getElementById('mapUrl').value : "Фиристода нашуд";

        var adminPhone = "992933099029";

        // 3. Омода кардани матн
        var message = "🛡️ *ВЕРИФИКАЦИЯИ УСТО*" + "%0A%0A" +
                      "👤 *Усто:* " + name + "%0A" +
                      "📅 *Таваллуд:* " + year + "%0A" +
                      "📞 *Тел:* " + phone + "%0A" +
                      "📍 *Ҷои кор:* " + work + "%0A" +
                      "🛠️ *Касб:* " + srv + "%0A" +
                      "⏳ *Таҷриба:* " + exp + " сол" + "%0A" +
                      "🗺️ *Харита:* " + map;

        var whatsappUrl = "https://wa.me/" + adminPhone + "?text=" + message;

        // 4. Баъд аз 1 сония WhatsApp-ро мекушоем (барои намоиши эффект)
        setTimeout(function() {
            window.open(whatsappUrl, '_blank');
            
            // Тоза кардани лоадинг пас аз фиристодан
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.innerText = "Фиристодан ба WhatsApp";
            }
            
            if (typeof closeModal === "function") {
                closeModal();
            }
        }, 1200); 
    };
}