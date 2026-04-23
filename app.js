// ─── STATE ───────────────────────────────────────────────────────
let cart = {};
let currentCat = 'todos';
let deliveryMode = 'delivery';
let toastTimer;

// ─── HELPERS ─────────────────────────────────────────────────────
function tagLabel(t) {
  const map = {
    vegetariana: '🌿 Veggie',
    spicy: '🌶️ Picante',
    popular: '🔥 Popular',
    pop: '⭐ Estrella'
  };
  return map[t] || t;
}

function formatPrice(n) {
  return '$' + n.toLocaleString('es-AR');
}

/**
 * Devuelve el HTML de una foto con skeleton + fallback emoji.
 * @param {string} src  - URL de la imagen
 * @param {string} emoji - emoji de respaldo si la foto no carga
 * @param {string} alt  - texto alternativo
 */
function photoHTML(src, emoji, alt = '') {
  return `
    <div class="img-skeleton"></div>
    <img
      src="${src}"
      alt="${alt}"
      loading="lazy"
      onload="this.previousElementSibling.remove()"
      onerror="this.previousElementSibling.remove(); this.style.display='none'; this.nextElementSibling.style.opacity='1';"
    >
    <div class="item-photo-fallback" style="opacity:0">${emoji}</div>
  `;
}

// ─── RENDER MENU ─────────────────────────────────────────────────
function renderMenu(items) {
  const list = document.getElementById('menuList');
  list.innerHTML = '';

  items.forEach(item => {
    const qty = cart[item.id] || 0;
    const inCart = qty > 0;

    const controls = inCart
      ? `<button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
         <div class="qty-num" id="qn-${item.id}">${qty}</div>
         <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>`
      : `<button class="qty-add-btn" onclick="addItem(${item.id})">+</button>`;

    const tags = item.tags
      .map(t => `<div class="item-tag ${t === 'spicy' ? 'spicy' : (t === 'popular' || t === 'pop') ? 'pop' : ''}">${tagLabel(t)}</div>`)
      .join('');

    list.innerHTML += `
      <div class="menu-item ${inCart ? 'in-cart' : ''}" id="mi-${item.id}">
        <div class="item-photo">
          ${photoHTML(item.img, item.emoji, item.name)}
        </div>
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-desc">${item.desc}</div>
          <div class="item-tags">${tags}</div>
          <div class="item-footer">
            <div class="item-price">${formatPrice(item.price)}</div>
            <div class="item-controls" id="ctrl-${item.id}">${controls}</div>
          </div>
        </div>
      </div>`;
  });
}

// ─── FEATURED ────────────────────────────────────────────────────
function renderFeatured() {
  const top = MENU.filter(i => i.hot).slice(0, 5);
  const s = document.getElementById('featScroll');

  s.innerHTML = top.map(item => `
    <div class="feat-card" onclick="scrollToItem(${item.id})">
      <div class="feat-img">
        ${item.hot ? '<div class="feat-hot">🔥 TOP</div>' : ''}
        <div class="img-skeleton"></div>
        <img
          src="${item.img}"
          alt="${item.name}"
          loading="lazy"
          onload="this.previousElementSibling.remove()"
          onerror="this.previousElementSibling.remove(); this.style.display='none'; this.nextElementSibling.style.opacity='1';"
        >
        <div class="feat-img-fallback" style="opacity:0">${item.emoji}</div>
      </div>
      <div class="feat-body">
        <div class="feat-name">${item.name}</div>
        <div class="feat-desc">${item.desc.substring(0, 48)}...</div>
        <div class="feat-footer">
          <div class="feat-price">${formatPrice(item.price)}</div>
          <button class="feat-add" onclick="event.stopPropagation();addItem(${item.id})">+</button>
        </div>
      </div>
    </div>`).join('');

  document.getElementById('fsFeat').style.display = 'block';
}

function scrollToItem(id) {
  const el = document.getElementById('mi-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── CATEGORY FILTER ─────────────────────────────────────────────
function filterCat(cat) {
  currentCat = cat;

  document.querySelectorAll('.cat-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.cat === cat);
  });

  const items = cat === 'todos' ? MENU : MENU.filter(i => i.cat === cat);
  const labels = {
    todos: '🍽️ Menú completo',
    pizzas: '🍕 Pizzas',
    empanadas: '🥟 Empanadas',
    combos: '🎁 Combos',
    bebidas: '🥤 Bebidas'
  };

  document.getElementById('menuTitle').textContent = labels[cat];
  renderMenu(items);
  document.getElementById('fsFeat').style.display = cat === 'todos' ? 'block' : 'none';
}

function filterMenu() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  if (!q) { filterCat(currentCat); return; }

  const items = MENU.filter(i =>
    i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
  );
  document.getElementById('menuTitle').textContent = `🔍 "${q}"`;
  renderMenu(items);
}

// ─── CART ACTIONS ─────────────────────────────────────────────────
function addItem(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateAll(id);
  spawnParticle(id);
  showToast(`🍕 ${MENU.find(i => i.id === id).name} agregado`);
}

function changeQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (cart[id] === 0) delete cart[id];
  updateAll(id);
}

function updateAll(changedId) {
  const qty = cart[changedId] || 0;
  const ctrl = document.getElementById('ctrl-' + changedId);
  const mi = document.getElementById('mi-' + changedId);

  if (ctrl) {
    if (qty > 0) {
      ctrl.innerHTML = `
        <button class="qty-btn" onclick="changeQty(${changedId},-1)">−</button>
        <div class="qty-num" id="qn-${changedId}">${qty}</div>
        <button class="qty-btn" onclick="changeQty(${changedId},1)">+</button>`;
      mi.classList.add('in-cart');
    } else {
      ctrl.innerHTML = `<button class="qty-add-btn" onclick="addItem(${changedId})">+</button>`;
      mi.classList.remove('in-cart');
    }
  }

  updateCartBadge();

  if (document.getElementById('cartPanel').classList.contains('open')) {
    renderCartPanel();
  }
}

function getTotals() {
  let count = 0, total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const item = MENU.find(i => i.id === parseInt(id));
    if (item) { count += qty; total += item.price * qty; }
  });
  return { count, total };
}

function updateCartBadge() {
  const { count, total } = getTotals();

  document.getElementById('cartCount').textContent = count;
  document.getElementById('btnCount').textContent = count;
  document.getElementById('btnTotal').textContent = formatPrice(total);
  document.getElementById('orderBtn').classList.toggle('active', count > 0);

  const cc = document.getElementById('cartCount');
  cc.classList.remove('bump');
  void cc.offsetWidth;
  cc.classList.add('bump');
}

// ─── CART PANEL ───────────────────────────────────────────────────
function openCart() {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('panelOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartPanel();
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('panelOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCartPanel() {
  const { count, total } = getTotals();
  const content = document.getElementById('cartContent');
  const form = document.getElementById('cartForm');

  if (count === 0) {
    content.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-emoji">🛒</div>
        <div class="cart-empty-text">Tu carrito está vacío.<br>¡Agregá algo rico!</div>
      </div>`;
    form.style.display = 'none';
    return;
  }

  let rows = '<div class="cart-list">';
  Object.entries(cart).forEach(([id, qty]) => {
    const item = MENU.find(i => i.id === parseInt(id));
    if (!item) return;
    rows += `
      <div class="cart-row">
        <div class="cart-row-photo">
          <img src="${item.img}" alt="${item.name}"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\'display:flex;align-items:center;justify-content:center;height:100%;font-size:24px\'>${item.emoji}</div>'">
        </div>
        <div class="cart-row-info">
          <div class="cart-row-name">${item.name}</div>
          <div class="cart-row-price">${formatPrice(item.price * qty)}</div>
        </div>
        <div class="cart-row-controls">
          <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
          <div class="qty-num">${qty}</div>
          <button class="qty-btn" onclick="changeQty(${id},1)">+</button>
        </div>
      </div>`;
  });
  rows += '</div>';

  const envio = deliveryMode === 'delivery' ? 500 : 0;
  rows += `<div class="cart-subtotal"><span>Subtotal</span><span>${formatPrice(total)}</span></div>`;
  rows += `<div class="cart-subtotal"><span>Envío ${deliveryMode === 'delivery' ? '🛵' : '🏃 Gratis (retiro)'}</span><span>${envio ? formatPrice(envio) : '$0'}</span></div>`;
  rows += `<div class="cart-total"><span>Total</span><span>${formatPrice(total + envio)}</span></div>`;
  rows += '<div style="height:14px"></div>';

  content.innerHTML = rows;
  form.style.display = 'block';
  document.getElementById('addressSection').style.display = deliveryMode === 'delivery' ? 'block' : 'none';
}

// ─── DELIVERY MODE ────────────────────────────────────────────────
function setDelivery(mode) {
  deliveryMode = mode;
  document.getElementById('dBtn1').classList.toggle('active', mode === 'delivery');
  document.getElementById('dBtn2').classList.toggle('active', mode === 'takeaway');
  renderCartPanel();
}

// ─── WHATSAPP ─────────────────────────────────────────────────────
function sendWhatsApp() {
  const nombre = document.getElementById('fNombre').value.trim();
  const tel = document.getElementById('fTel').value.trim();
  const dir = document.getElementById('fDir').value.trim();
  const nota = document.getElementById('fNota').value.trim();

  if (!nombre || !tel) { showToast('⚠️ Completá tu nombre y teléfono'); return; }
  if (deliveryMode === 'delivery' && !dir) { showToast('⚠️ Ingresá tu dirección'); return; }

  const { total } = getTotals();
  const envio = deliveryMode === 'delivery' ? 500 : 0;

  let msg = `🍕 *NUEVO PEDIDO - La Buena Pizza*\n\n`;
  msg += `👤 *Cliente:* ${nombre}\n`;
  msg += `📞 *Tel:* ${tel}\n`;
  msg += deliveryMode === 'delivery'
    ? `📍 *Dirección:* ${dir}\n`
    : `🏃 *Modalidad:* Retiro en local\n`;
  msg += `\n🛒 *Detalle del pedido:*\n`;

  Object.entries(cart).forEach(([id, qty]) => {
    const item = MENU.find(i => i.id === parseInt(id));
    if (item) msg += `  • ${qty}x ${item.name} — ${formatPrice(item.price * qty)}\n`;
  });

  if (deliveryMode === 'delivery') msg += `\n🛵 Envío: ${formatPrice(envio)}\n`;
  msg += `💰 *TOTAL: ${formatPrice(total + envio)}*\n`;
  if (nota) msg += `\n📝 *Notas:* ${nota}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('📲 Abriendo WhatsApp...');
}

// ─── TOAST ───────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ─── PARTICLES ───────────────────────────────────────────────────
function spawnParticle(id) {
  const el = document.getElementById('mi-' + id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const p = document.createElement('div');
  p.className = 'particle';
  p.textContent = MENU.find(i => i.id === id).emoji;
  p.style.left = (rect.left + rect.width / 2 - 12) + 'px';
  p.style.top = (rect.top + window.scrollY) + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 800);
}

// ─── PROMO DOTS ──────────────────────────────────────────────────
function initPromoDots() {
  const promoScroll = document.getElementById('promoScroll');
  promoScroll.addEventListener('scroll', () => {
    const idx = Math.round(promoScroll.scrollLeft / promoScroll.offsetWidth);
    document.querySelectorAll('.promo-dots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  });
}

// ─── SCROLL OBSERVER ─────────────────────────────────────────────
function initScrollObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
}

// ─── INIT ─────────────────────────────────────────────────────────
function init() {
  renderMenu(MENU);
  renderFeatured();
  initPromoDots();
  initScrollObserver();
}

init();