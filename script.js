// 1. Маълумоти устоҳо
const mastersData = [
    {
        id: 1,
        name: "Садриддин Аслиддинов",
        isVIP: true, // Ин усто VIP аст
        job: "электрик",
        experience: "10 сол",
        photo: "img.jpg", // Дар ин ҷо ссилкаи аксро гузоред
        city: "Душанбе-Кушониён",
        phone: "+992933099029",
        rating: 4.8,
        about: "Мутахассиси қисмҳои электорнии автомобил, қобилияти диагностика кардани мошин пок кардани хатогиҳо, TPMS-датчик шина, ва ғайра, таҷрибаи кори 2сол ",
        mapUrl: "https://goo.gl/maps/example1",
        openTime: 8,
        closeTime: 18,
        schedule: { "Душанбе то Ҷумъа": "08:00 - 18:00", "Шанбе":"9:00-16:00" },
        reviews: ["Кораш баромад, ташаккур!"]
    },
    {
        id: 2,
        name: "electrick",
        job: "электрик",
        experience: "10 сол",
        photo: "https://via.placeholder.com/100",
        city: "Хуҷанд",
        phone: "+992933099029",
        rating: 5.0,
        about: "Мутахассиси электроника ва компютери мошин.",
        mapUrl: "https://goo.gl/maps/example2",
        openTime: 9,
        closeTime: 19,
        schedule: { "Дш-Шн": "09:00 - 19:00" },
        reviews: []
    },
    {
        id: 3,
        name: "шина мантаж",
        job: "чарх",
        photo: "https://via.placeholder.com/100",
        city: "Душанбе",
        phone: "+992933099029",
        rating: 2.0,
        about: "Мутахассиси электроника ва компютери мошин.",
        mapUrl: "https://goo.gl/maps/example2",
        openTime: 8,
        closeTime: 19,
        schedule: { "Дш-Шн": "09:00 - 19:00" },
        reviews: []
    }
];
let selectedMasterId = null;
let currentScore = 0;

// 2. Функсияи нормализатсия (Барои ислоҳи хатогии normalizeText)
function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/ӯ/g, 'у')
        .replace(/ҳ/g, 'х')
        .replace(/ҷ/g, 'ч')
        .replace(/қ/g, 'к')
        .replace(/ғ/g, 'г')
        .replace(/ӣ/g, 'и')
        .trim();
}

// 3. Функсияи намоиши устоҳо
function displayMasters(list) {
    const grid = document.getElementById("mastersGrid");
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach(m => {
        const status = getWorkStatus(m.openTime, m.closeTime);
        const lastReview = m.reviews && m.reviews.length > 0 ? m.reviews[0] : "Ҳанӯз шарҳ нест";

        grid.innerHTML += `
            <div class="card">
                <div class="card-content">
                    <div style="margin-bottom: 10px;">${status}</div>
                    <div class="card-header">
                        <img src="${m.photo}" alt="${m.name}" class="master-photo">
                        <div>
                            <h3 style="margin: 0; color: #2c3e50;">${m.name}</h3>
                            <p style="color: #666; font-size: 14px; margin: 5px 0;">🛠 ${m.job} | 📍 ${m.city}</p>
                            <div style="color:#f1c40f; font-size: 16px;">⭐ ${m.rating}</div>
                        </div>
                    </div>
                    <div style="color:#f1c40f; margin:10px 0; font-size: 18px;">⭐ ${m.rating}</div>
                    
                    <div style="background:#f8f9fa; padding:10px; border-radius:8px; margin-bottom:15px; font-size: 13px;">
                        <strong>📅 Ҷадвали корӣ:</strong>
                        <div>${Object.entries(m.schedule).map(([d, t]) => `<div>${d}: ${t}</div>`).join('')}</div>
                    </div>

                    <div style="margin-top: 10px; margin-bottom: 15px;">
                        <details style="cursor: pointer; background: #eef2f3; padding: 10px; border-radius: 8px;">
                            <summary style="font-weight: bold; font-size: 13px;">ℹ️ Дар бораи усто</summary>
                            <p style="font-size: 13px; color: #555; margin-top: 8px; line-height: 1.5;">${m.about}</p>
                        </details>
                    </div>

                    <div style="margin-bottom: 20px; border-top: 1px dashed #eee; padding-top: 10px;">
                        <p style="font-size: 12px; color: #888; font-weight: bold;">Шарҳи охирин:</p>
                        <div style="background: #fffdf0; padding: 8px; border-radius: 8px; font-size: 13px; font-style: italic;">
                            "${lastReview}"
                        </div>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <a href="tel:${m.phone}" style="background:#27ae60; color:white; text-decoration:none; text-align:center; padding:12px; border-radius:8px; font-weight:bold;">📞 Занг</a>
                    <button onclick="openModal(${m.id})" style="background:#f1c40f; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">⭐ Баҳо</button>
                    <a href="${m.mapUrl}" target="_blank" style="background:#1a73e8; color:white; text-decoration:none; text-align:center; padding:12px; border-radius:8px; font-weight:bold; grid-column: span 2;">📍 Харита</a>
                </div>
            </div>
        `;
    });
}

// 4. Функсияи Ҷустуҷӯ (Ислоҳшуда)
function searchMaster() {
    const searchVal = normalizeText(document.getElementById("citySearch").value);
    const jobVal = document.getElementById("proSearch").value;

    const filtered = mastersData.filter(m => {
        const matchNameOrCity = normalizeText(m.name).includes(searchVal) || normalizeText(m.city).includes(searchVal);
        const matchJob = (jobVal === "" || m.job === jobVal);
        return matchNameOrCity && matchJob;
    });

    displayMasters(filtered);
}

// 5. Функсияҳои Модал ва Рейтинг
function openModal(id) {
    selectedMasterId = id;
    document.getElementById("ratingModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("ratingModal").style.display = "none";
    resetStars();
}

const stars = document.querySelectorAll(".star");
stars.forEach(star => {
    star.onclick = function() {
        currentScore = this.getAttribute("data-value");
        resetStars();
        for (let i = 0; i < currentScore; i++) {
            stars[i].style.color = "#f1c40f";
        }
    };
});

function resetStars() {
    stars.forEach(s => s.style.color = "#ccc");
}

function submitRating() {
    const comment = document.getElementById("commentText").value.trim();
    
    if (currentScore > 0) {
        // Тайёр кардани маълумот барои фиристодан
        const ratingData = {
            masterId: selectedMasterId,
            stars: currentScore,
            text: comment,
            date: new Date().toLocaleString()
        };

        console.log("Маълумоти нав:", ratingData);
        
        alert(`Ташаккур! Баҳои шумо (${currentScore} ⭐) ва шарҳи шумо қабул шуд.`);
        
        // Тоза кардани форма ва пӯшидани модал
        document.getElementById("commentText").value = "";
        closeModal();
    } else {
        alert("Лутфан камаш як ситораро интихоб кунед!");
    }
}

// Менюи Бургер
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Боркунии аввалия
document.addEventListener("DOMContentLoaded", () => {
    displayMasters(mastersData);
});

function getWorkStatus(open, close) {
    const now = new Date();
    const hour = now.getHours(); // Соати ҳозираи телефон

    if (hour >= open && hour < close) {
        return '<span style="color: #27ae60; font-weight: bold;">● Ҳозир кушода аст</span>';
    } else {
        return '<span style="color: #e74c3c; font-weight: bold;">● Ҳозир баста аст</span>';
    }
}

function updateMasterCount() {
    // Гирифтани миқдори устоҳо аз массив
    const totalMasters = mastersData.length; 
    
    // Пайдо кардани элемент дар HTML
    const countElement = document.getElementById("masterCount");
    
    if (countElement) {
        countElement.innerText = totalMasters;
    }
}

// Ин функсияро дар дохили window.onload ё DOMContentLoaded даъват кунед
document.addEventListener("DOMContentLoaded", () => {
    displayMasters(mastersData);
    updateMasterCount(); // Нав кардани миқдор ҳангоми кушодани сайт
});

function filterByService(category) {
    // Интихоби категория дар селекти ҷустуҷӯ
    const jobSelect = document.getElementById("proSearch");
    jobSelect.value = category;
    
    // Даъват кардани функсияи ҷустуҷӯи мавҷуда
    searchMaster();
    
    // Пур кардани саҳифа то рӯйхати устоҳо (барои қулайнокӣ)
    document.getElementById("mastersGrid").scrollIntoView({ behavior: 'smooth' });
}



function displayVIPMasters() {
    const container = document.getElementById("vipContainer");
    if (!container) return;
    
    const vipList = mastersData.filter(m => m.isVIP);
    container.innerHTML = "";

    vipList.forEach(m => {
        const phoneNum = m.phone || "+992000000000";
        const waPhone = phoneNum.replace(/\D/g, '');
        const waMessage = encodeURIComponent(`Салом, ${m.name}! Ман шуморо аз сайти USTO.TJ пайдо кардам.`);

        container.innerHTML += `
            <div class="vip-card">
                <span class="vip-badge">VIP МУТАХАССИС</span>
                <img src="${m.photo || 'img/default.jpg'}" class="vip-photo" alt="${m.name}">
                <h3>${m.name}</h3>
                
                <p style="color: #1a73e8; font-weight: bold; margin-bottom: 5px;">
                    ${m.job === 'motorist' ? 'Моторист' : m.job === 'electric' ? 'Электрик' : m.job}
                </p>
                <p style="color: #666; font-size: 13px; margin-bottom: 10px;">
                    📍 ${m.city || 'Тоҷикистон'} </p>

                <div style="color: #f1c40f; margin: 10px 0;">⭐⭐⭐⭐⭐ ${m.rating}</div>
                <p style="font-size: 13px; color: #777; margin-bottom: 15px;">Собиқаи корӣ: ${m.experience || '10 сол'}</p>
                
                <div style="display: flex; gap: 10px; flex-direction: column;">
                    <a href="tel:${phoneNum}" style="background:#27ae60; color:white; text-decoration:none; padding:12px; border-radius:10px; font-weight:bold; font-size: 14px; text-align: center;">
                        📞 Занг задан
                    </a>
                    <a href="https://wa.me/${waPhone}?text=${waMessage}" target="_blank" style="background:#25D366; color:white; text-decoration:none; padding:12px; border-radius:10px; font-weight:bold; font-size: 14px; text-align: center;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        `;
    });
}

// Дар охири файл илова кунед:
document.addEventListener("DOMContentLoaded", () => {
    displayVIPMasters();
    // дигар функсияҳои шумо...
});




// Ин қисм мегӯяд, ки вақте саҳифа бор шуд, функсияҳоро иҷро кун
window.onload = function() {
    if (typeof displayMasters === "function") {
        displayMasters(mastersData); // Барои устоҳои оддӣ
    }
    displayVIPMasters(); // Барои устоҳои VIP
    
    // Агар функсияи ҳисоби устоҳо дошта бошед:
    if (typeof updateMasterCount === "function") {
        updateMasterCount();
    }
};



function sendToWhatsApp() {
    // Гирифтани маълумот аз элементҳо
    const name = document.getElementById("masterName").value;
    const birthYear = document.getElementById("masterBirthYear").value;
    const phone = document.getElementById("masterPhone").value;
    const address = document.getElementById("masterAddress").value;
    const job = document.getElementById("masterJob").value;
    const map = document.getElementById("masterMap").value || "Надорад";

    // Санҷиши пур будани майдонҳои асосӣ
    if (!name || !phone || !job) {
        alert("Лутфан майдонҳои асосиро пур кунед!");
        return;
    }

    // Сохтани матни паём
    const message = `🚀 *Аризаи нав барои USTO.TJ* %0A%0A` +
                    `👤 *Ном:* ${name}%0A` +
                    `📅 *Соли таваллуд:* ${birthYear}%0A` +
                    `📞 *Телефон:* ${phone}%0A` +
                    `🛠 *Касб:* ${job}%0A` +
                    `📍 *Суроға:* ${address}%0A` +
                    `🗺 *Харита:* ${map}`;

    // Рақами WhatsApp-и шумо
    const myNumber = "992933099029"; 

    // Кушодани линк
    window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');

}
