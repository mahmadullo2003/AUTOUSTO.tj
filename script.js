/* ===== UstaTJ — app.js ===== */

// ===== DEMO DATA =====
const MASTERS_DATA = [
  {
    id: 1, name: "Аслиддинов Садриддин", photo: "01.jpg", profession: "Автоэлектрик",
    city: "Душанбе", workplace: "Автосервис кушониён",
    experience: 8, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.8, reviews: 34, vip: true, weekly: true,
    color: "#1a6e4a",
    bio: "Мутахассис, электрик ва компютерҳои автомобилӣ. Таҷрибаи 8-сол. Кор бо ҳамаи маркаҳо.",
  },
  {
    id: 2, name: "Баҳром Раҳимов", photo: "01.jpg", profession: "Моторист",
    city: "Хуҷанд", workplace: "СТО «Хуҷанд Авто»",
    experience: 12, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.6, reviews: 28, vip: true, weekly: false,
    color: "#0f4a31",
    bio: "Таъмири двигатель, КПП, подвеска. Кор мекунам бо ҳамаи маркаҳо.",
  },
  {
    id: 3, name: "Комил Юсупов", photo: "01.jpg", profession: "Ходовой",
    city: "Душанбе", workplace: "Кузовной цех «ТоҷАвто»",
    experience: 9, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.7, reviews: 41, vip: true, weekly: true,
    color: "#7c3aed",
    bio: "Таъмири кузов, рихтагирии панел, иваз кардани қисмҳо. Сифати олӣ.",
  },
  {
    id: 4, name: "Шариф Мирзоев", photo: "01.jpg", profession: "Рангкунӣ",
    city: "Айни", workplace: "Покрасочный цех «Айни»",
    experience: 7, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.5, reviews: 19, vip: false, weekly: false,
    color: "#b45309",
    bio: "Рангкунии автомобил, полировка, антикор. Технологияи муосир.",
  },
  {
    id: 5, name: "Давлат Ҳасанов", photo: "01.jpg", profession: "Шиномантаж",
    city: "Бохтар", workplace: "Шиномонтаж «Бохтар»",
    experience: 5, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.3, reviews: 22, vip: false, weekly: false,
    color: "#0369a1",
    bio: "Иваз кардани шина, балансировка, ҳаво пур кардан. Зуд ва боэтимод.",
  },
  {
    id: 6, name: "Аслиддинов Садриддин", photo: "01.jpg", profession: "Автодиагностика",
    city: "Душанбе", workplace: "Автосервис кушониён",
    experience: 6, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.9, reviews: 51, vip: true, weekly: false,
    color: "#1d4ed8",
    bio: "Диагностикаи компютерӣ, хониши хато, танзими ECU. Асбобҳои муосир ва Инчунин мутахассис оид ба датчикҳои фишори шинаҳо",
  },
  {
    id: 7, name: "Ҷамшед Бобоев", photo: "01.jpg", profession: "Сварщик",
    city: "Панҷакент", workplace: "Варкохона «АвтоСвар»",
    experience: 11, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.6, reviews: 17, vip: false, weekly: true,
    color: "#be185d",
    bio: "Ҷӯшонидани кузов, рама, глушитель. Аргон ва полуавтомат.",
  },
  {
    id: 8, name: "Мирзо Саидов", photo: "01.jpg", profession: "Мойщик",
    city: "Кӯлоб", workplace: "Мойхона «Кристал»",
    experience: 4, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.4, reviews: 33, vip: false, weekly: false,
    color: "#0891b2",
    bio: "Шустани дастӣ, химчистка салон, полировка. Муддати кам, сифати баланд.",
  },
  {
    id: 9, name: "Фирдавс Раҳмонов", photo: "01.jpg", profession: "Тонировщик",
    city: "Исфара", workplace: "Студия «ДаркФилм»",
    experience: 5, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.2, reviews: 12, vip: false, weekly: false,
    color: "#374151",
    bio: "Тонировка шишаҳои автомобил. Плёнкаи хориҷӣ, кафолат 2 сол.",
  },
  {
    id: 10, name: "Сарвар Неъматов", photo: "01.jpg", profession: "Аккумуляторщик",
    city: "Конибодом", workplace: "Дӯкони «АвтоАккум»",
    experience: 8, phone: "+992933099029", whatsapp: "992933099029",
    rating: 4.7, reviews: 26, vip: true, weekly: false,
    color: "#15803d",
    bio: "Фурӯш ва таъмири аккумулятор. Ташхис, зарядка, иваз кардан.",
  },
];

// ===== STATE =====
let state = {
  user: null,
  favorites: JSON.parse(localStorage.getItem('usta_favs') || '[]'),
  ratings: JSON.parse(localStorage.getItem('usta_ratings') || '{}'),
  activeCat: 'all',
  activeCity: 'all',
  currentPage: 'home',
  searchQuery: '',
};

// ===== DOM HELPERS =====
const $ = id => document.getElementById(id);
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2600);
}

// ===== ONBOARDING =====
on($('policy-cb'), 'change', e => {
  $('policy-next-btn').disabled = !e.target.checked;
});

on($('policy-next-btn'), 'click', () => {
  $('policy-step').classList.add('hidden');
  $('name-step').classList.remove('hidden');
  setTimeout(() => $('user-name-input').focus(), 100);
});

on($('name-next-btn'), 'click', () => {
  const first = $('user-name-input').value.trim();
  const last = $('user-surname-input').value.trim();
  if (!first) { $('user-name-input').focus(); showInputError($('user-name-input')); return; }
  state.user = { name: first, surname: last, fullname: `${first} ${last}`.trim() };
  localStorage.setItem('usta_user', JSON.stringify(state.user));
  launchApp();
});

function showInputError(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation = 'shake 0.3s';
  setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 600);
}

// check saved user
const savedUser = JSON.parse(localStorage.getItem('usta_user') || 'null');
if (savedUser) {
  state.user = savedUser;
  launchApp();
}

function launchApp() {
  $('onboarding-screen').classList.remove('active');
  $('app-screen').classList.add('active');
  updateUserUI();
  renderMasters();
  updateFavBadge();
}

function updateUserUI() {
  if (!state.user) return;
  const name = state.user.fullname || state.user.name;
  $('hero-greeting').textContent = `Салом, ${state.user.name}!`;
  $('sidebar-username-display').textContent = name;
  $('sidebar-avatar-text').textContent = (state.user.name[0] || 'А').toUpperCase();
}

// ===== SIDEBAR =====
on($('burger-btn'), 'click', () => toggleSidebar());
on($('sidebar-close'), 'click', () => toggleSidebar(false));
on($('sidebar-overlay'), 'click', () => toggleSidebar(false));

function toggleSidebar(force) {
  const s = $('sidebar');
  const o = $('sidebar-overlay');
  const b = $('burger-btn');
  const isOpen = s.classList.contains('open');
  const open = force !== undefined ? force : !isOpen;
  s.classList.toggle('open', open);
  o.classList.toggle('active', open);
  b.classList.toggle('open', open);
}

document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  on(el, 'click', e => {
    e.preventDefault();
    const pg = el.dataset.page;
    navigateTo(pg);
    toggleSidebar(false);
  });
});

// ===== BOTTOM NAV =====
document.querySelectorAll('.bn-item[data-page]').forEach(el => {
  on(el, 'click', () => navigateTo(el.dataset.page));
});

function navigateTo(page) {
  state.currentPage = page;
  // hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = $(`page-${page}`);
  if (target) { target.classList.remove('hidden'); target.classList.add('active'); }

  // update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  document.querySelectorAll('.bn-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.bn-item[data-page="${page}"]`)?.classList.add('active');

  // render page content
  if (page === 'masters') renderGrid('all-masters-grid', getFilteredMasters(MASTERS_DATA));
  if (page === 'weekly') renderGrid('weekly-grid', MASTERS_DATA.filter(m => m.weekly));
  if (page === 'vip') renderGrid('vip-grid', MASTERS_DATA.filter(m => m.vip));
  if (page === 'favorites') renderFavorites();

  // scroll to top
  document.querySelector('.page-content').scrollTop = 0;
}

// ===== SEARCH =====
on($('topbar-search-btn'), 'click', () => {
  const w = $('search-bar-wrap');
  w.classList.toggle('hidden');
  if (!w.classList.contains('hidden')) $('search-input').focus();
});
on($('search-close'), 'click', () => {
  $('search-bar-wrap').classList.add('hidden');
  $('search-input').value = '';
  state.searchQuery = '';
  renderMasters();
});
on($('search-input'), 'input', e => {
  state.searchQuery = e.target.value.toLowerCase();
  renderMasters();
});

// ===== CATEGORY & CITY FILTERS =====
document.querySelectorAll('.cat-btn').forEach(btn => {
  on(btn, 'click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeCat = btn.dataset.cat;
    renderMasters();
  });
});

document.querySelectorAll('.city-btn').forEach(btn => {
  on(btn, 'click', () => {
    document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeCity = btn.dataset.city;
    renderMasters();
  });
});

// ===== FILTER LOGIC =====
function getFilteredMasters(source) {
  return source.filter(m => {
    const catOk = state.activeCat === 'all' || m.profession === state.activeCat;
    const cityOk = state.activeCity === 'all' || m.city === state.activeCity;
    const searchOk = !state.searchQuery ||
      m.name.toLowerCase().includes(state.searchQuery) ||
      m.profession.toLowerCase().includes(state.searchQuery) ||
      m.city.toLowerCase().includes(state.searchQuery);
    return catOk && cityOk && searchOk;
  });
}

// ===== RENDER MASTERS (HOME) =====
function renderMasters() {
  const filtered = getFilteredMasters(MASTERS_DATA);
  const grid = $('masters-grid');
  const empty = $('empty-state');
  const label = $('masters-count-label');
  label.textContent = `Устоҳо (${filtered.length})`;
  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = filtered.map(m => masterCardHTML(m)).join('');
    attachCardEvents(grid);
  }
}

// ===== RENDER ANY GRID =====
function renderGrid(gridId, masters) {
  const grid = $(gridId);
  if (!grid) return;
  grid.innerHTML = masters.length
    ? masters.map(m => masterCardHTML(m)).join('')
    : '<p style="padding:20px;color:var(--text3);text-align:center;grid-column:1/-1;">Усто ёфт нашуд</p>';
  attachCardEvents(grid);
}

// ===== CARD HTML =====
function masterCardHTML(m) {
  const isFav = state.favorites.includes(m.id);
  const rating = state.ratings[m.id] !== undefined ? state.ratings[m.id] : m.rating;
  const stars = starsHTML(rating, false);
  const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const avatarBg = m.color || '#1a6e4a';
  const imgHTML = m.photo
    ? `<img class="master-avatar" src="${m.photo}" alt="${m.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />`
    : '';
  const phStyle = m.photo ? 'display:none' : '';
  return `
    <div class="master-card${m.vip ? ' vip-card' : ''}" data-id="${m.id}">
      <div class="card-top">
        ${imgHTML}
        <div class="master-avatar-placeholder" style="background:linear-gradient(135deg,${avatarBg}cc,${avatarBg}66);${phStyle}">
          ${initials}
        </div>
        ${m.vip ? '<span class="vip-badge">⭐ VIP</span>' : ''}
        <button class="fav-btn${isFav ? ' active' : ''}" data-fav="${m.id}" title="Писандидан">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div class="card-body" data-open="${m.id}" style="cursor:pointer">
        <div class="master-name">${m.name}</div>
        <div class="master-prof">${m.profession}</div>
        <div class="master-meta"><i class="fa-solid fa-location-dot"></i>${m.city}</div>
        <div class="master-meta"><i class="fa-solid fa-briefcase"></i>${m.experience} сол</div>
        <div class="stars">${stars}</div>
      </div>
      <div class="card-actions">
        <button class="act-btn phone" data-phone="${m.phone}">
          <i class="fa-solid fa-phone"></i> Занг
        </button>
        <a class="act-btn whatsapp" href="https://wa.me/${m.whatsapp}" target="_blank">
          <i class="fa-brands fa-whatsapp"></i> WA
        </a>
      </div>
    </div>`;
}

function starsHTML(rating, big = false) {
  const cls = big ? 'modal-star' : 'star';
  return [1,2,3,4,5].map(i =>
    `<span class="${cls}${i <= Math.round(rating) ? ' filled' : ''}">★</span>`
  ).join('');
}

// ===== ATTACH CARD EVENTS =====
function attachCardEvents(container) {
  container.querySelectorAll('[data-fav]').forEach(btn => {
    on(btn, 'click', e => {
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.fav));
    });
  });
  container.querySelectorAll('[data-open]').forEach(el => {
    on(el, 'click', () => openMasterModal(parseInt(el.dataset.open)));
  });
  container.querySelectorAll('[data-phone]').forEach(btn => {
    on(btn, 'click', e => {
      e.stopPropagation();
      window.location.href = `tel:${btn.dataset.phone}`;
    });
  });
}

// ===== FAVORITES =====
function toggleFavorite(id) {
  const idx = state.favorites.indexOf(id);
  if (idx === -1) {
    state.favorites.push(id);
    showToast('❤️ Ба писандидаҳо илова шуд!');
  } else {
    state.favorites.splice(idx, 1);
    showToast('Аз писандидаҳо хориҷ шуд');
  }
  localStorage.setItem('usta_favs', JSON.stringify(state.favorites));
  updateFavBadge();
  refreshAllGrids();
}

function updateFavBadge() {
  const b = $('fav-badge');
  if (b) b.textContent = state.favorites.length;
}

function renderFavorites() {
  const favMasters = MASTERS_DATA.filter(m => state.favorites.includes(m.id));
  const grid = $('fav-grid');
  const empty = $('fav-empty');
  if (favMasters.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = favMasters.map(m => masterCardHTML(m)).join('');
    attachCardEvents(grid);
  }
}

function refreshAllGrids() {
  if (state.currentPage === 'home') renderMasters();
  if (state.currentPage === 'masters') renderGrid('all-masters-grid', getFilteredMasters(MASTERS_DATA));
  if (state.currentPage === 'weekly') renderGrid('weekly-grid', MASTERS_DATA.filter(m => m.weekly));
  if (state.currentPage === 'vip') renderGrid('vip-grid', MASTERS_DATA.filter(m => m.vip));
  if (state.currentPage === 'favorites') renderFavorites();
}

// ===== MASTER MODAL =====
function openMasterModal(id) {
  const m = MASTERS_DATA.find(x => x.id === id);
  if (!m) return;
  const isFav = state.favorites.includes(m.id);
  const userRating = state.ratings[m.id] !== undefined ? state.ratings[m.id] : 0;
  const displayRating = state.ratings[m.id] !== undefined ? state.ratings[m.id] : m.rating;
  const initials = m.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const avatarBg = m.color || '#1a6e4a';

  const avatarHTML = m.photo
    ? `<img class="modal-avatar" src="${m.photo}" alt="${m.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
       <div class="modal-avatar-ph" style="background:linear-gradient(135deg,${avatarBg}cc,${avatarBg}66);display:none">${initials}</div>`
    : `<div class="modal-avatar-ph" style="background:linear-gradient(135deg,${avatarBg}cc,${avatarBg}66)">${initials}</div>`;

  $('modal-content').innerHTML = `
    <div class="modal-master-hero">
      ${avatarHTML}
      <div>
        <div class="modal-name">${m.name}</div>
        <div class="modal-prof">${m.profession} · ${m.city}</div>
        <div class="modal-stars">${starsHTML(displayRating, true)}</div>
        <div style="font-size:12px;opacity:0.8;margin-top:4px;">${displayRating.toFixed(1)} ⭐ (${m.reviews} баҳо)</div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <div class="label"><i class="fa-solid fa-briefcase"></i> Касб</div>
          <div class="value">${m.profession}</div>
        </div>
        <div class="modal-info-item">
          <div class="label"><i class="fa-solid fa-location-dot"></i> Шаҳр</div>
          <div class="value">${m.city}</div>
        </div>
        <div class="modal-info-item">
          <div class="label"><i class="fa-solid fa-building"></i> Ҷои кор</div>
          <div class="value">${m.workplace}</div>
        </div>
        <div class="modal-info-item">
          <div class="label"><i class="fa-solid fa-calendar-days"></i> Собиқа</div>
          <div class="value">${m.experience} сол</div>
        </div>
      </div>
      ${m.bio ? `<div style="background:var(--bg);border-radius:12px;padding:14px;margin-bottom:16px;font-size:14px;line-height:1.7;color:var(--text2)">${m.bio}</div>` : ''}
      <div class="rating-section">
        <h4>Баҳодиҳӣ</h4>
        <div class="rate-stars" id="rate-stars-${m.id}">
          ${[1,2,3,4,5].map(i =>
            `<span class="rate-star${i <= userRating ? ' selected' : ''}" data-val="${i}">★</span>`
          ).join('')}
        </div>
        <div id="rate-msg-${m.id}" style="font-size:12px;color:var(--text3);margin-top:6px">
          ${userRating ? `Шумо ${userRating} ситора додед` : 'Ба усто баҳо диҳед'}
        </div>
      </div>
      <div style="margin-bottom:16px">
        <button class="modal-btn" onclick="toggleFavorite(${m.id});updateModalFavBtn(${m.id})"
          id="modal-fav-btn" style="background:${isFav ? '#fef2f2' : 'var(--bg)'};color:${isFav ? 'var(--heart)' : 'var(--text2)'}">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          ${isFav ? 'Аз писандидаҳо хориҷ кун' : 'Ба писандидаҳо илова кун'}
        </button>
      </div>
      <div class="modal-actions">
        <a class="modal-btn phone" href="tel:${m.phone}">
          <i class="fa-solid fa-phone"></i> ${m.phone}
        </a>
        <a class="modal-btn whatsapp" href="https://wa.me/${m.whatsapp}" target="_blank">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
      </div>
    </div>`;

  // Rating stars
  const rateContainer = $(`rate-stars-${m.id}`);
  const stars = rateContainer.querySelectorAll('.rate-star');
  stars.forEach(star => {
    on(star, 'mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('hover', i < parseInt(star.dataset.val)));
    });
    on(star, 'mouseleave', () => stars.forEach(s => s.classList.remove('hover')));
    on(star, 'click', () => {
      const val = parseInt(star.dataset.val);
      state.ratings[m.id] = val;
      localStorage.setItem('usta_ratings', JSON.stringify(state.ratings));
      stars.forEach((s, i) => { s.classList.toggle('selected', i < val); s.classList.remove('hover'); });
      $(`rate-msg-${m.id}`).textContent = `Шумо ${val} ситора додед ✓`;
      showToast(`${val} ⭐ баҳо гузошта шуд!`);
    });
  });

  $('master-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

window.updateModalFavBtn = function(id) {
  const isFav = state.favorites.includes(id);
  const btn = $('modal-fav-btn');
  if (btn) {
    btn.style.background = isFav ? '#fef2f2' : 'var(--bg)';
    btn.style.color = isFav ? 'var(--heart)' : 'var(--text2)';
    btn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i> ${isFav ? 'Аз писандидаҳо хориҷ кун' : 'Ба писандидаҳо илова кун'}`;
  }
};

on($('modal-close'), 'click', closeModal);
on($('master-modal'), 'click', e => { if (e.target === $('master-modal')) closeModal(); });

function closeModal() {
  $('master-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== REGISTER FORM =====
on($('get-location-btn'), 'click', () => {
  const status = $('location-status');
  status.textContent = 'Ҷойгиршавиро муайян мекунем...';
  if (!navigator.geolocation) {
    status.textContent = 'Геолокация дастгирӣ намешавад';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    $('reg-location').value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    status.textContent = `✓ Координатҳо гирифта шуд`;
    // Reverse geocode attempt
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(r => r.json())
      .then(d => {
        const addr = d.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        $('reg-location').value = addr;
        status.textContent = '✓ Суроға муайян шуд';
      })
      .catch(() => {});
  }, err => {
    status.textContent = 'Хато: иҷозат дода нашуд';
  });
});

on($('send-whatsapp-btn'), 'click', () => {
  if (!validateRegForm()) return;
  const data = getRegData();
  const msg = encodeURIComponent(
    `🔨 *Бақайдгирии Усто — УстаТж*\n\n` +
    `👤 Ном: ${data.fullname}\n` +
    `📅 Соли таваллуд: ${data.birth}\n` +
    `💼 Касб: ${data.profession}\n` +
    `🏢 Ҷои кор: ${data.workplace}\n` +
    `📆 Собиқа: ${data.experience} сол\n` +
    `📞 Телефон: ${data.phone}\n` +
    `📍 Суроға: ${data.location}`
  );
  window.open(`https://wa.me/992933099029?text=${msg}`, '_blank');
});

on($('send-email-btn'), 'click', () => {
  if (!validateRegForm()) return;
  const data = getRegData();
  const body = encodeURIComponent(
    `Бақайдгирии Усто\n\n` +
    `Ном: ${data.fullname}\n` +
    `Соли таваллуд: ${data.birth}\n` +
    `Касб: ${data.profession}\n` +
    `Ҷои кор: ${data.workplace}\n` +
    `Собиқа: ${data.experience} сол\n` +
    `Телефон: ${data.phone}\n` +
    `Суроға: ${data.location}`
  );
  window.location.href = `mailto:mahmadullokomilzod@gmail.com?subject=Бақайдгирии Усто&body=${body}`;
});

function validateRegForm() {
  const fields = ['reg-fullname','reg-birth','reg-profession','reg-workplace','reg-experience','reg-phone'];
  let ok = true;
  fields.forEach(fid => {
    const el = $(fid);
    if (el && !el.value.trim()) { showInputError(el); ok = false; }
  });
  if (!ok) showToast('⚠️ Лутфан ҳамаи майдонҳоро пур кунед');
  return ok;
}

function getRegData() {
  return {
    fullname: $('reg-fullname').value.trim(),
    birth: $('reg-birth').value.trim(),
    profession: $('reg-profession').value.trim(),
    workplace: $('reg-workplace').value.trim(),
    experience: $('reg-experience').value.trim(),
    phone: $('reg-phone').value.trim(),
    location: $('reg-location').value.trim() || 'Нишон дода нашуд',
  };
}

// ===== SHAKE ANIMATION =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake {
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}`;
document.head.appendChild(shakeStyle);

// ===== INIT =====
if (!savedUser) {
  // show onboarding — already done above
}