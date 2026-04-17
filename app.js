const state = {
  view: "categories",
  selectedCategoryId: null,
  selectedProductId: null,

  cart: [],

  checkout: {
    name: "",
    phone: "",
    deliveryType: "envio", // local | retiro | envio
    address: "",
    paymentMethod: "efectivo", // efectivo | transferencia | debito_credito | mercadopago
    generalNotes: ""
  }
};

const els = {
  appView: document.getElementById("appView"),
  backButton: document.getElementById("backButton"),
  cartBar: document.getElementById("cartBar"),
  cartButton: document.getElementById("cartButton"),
  cartTotal: document.getElementById("cartTotal"),
  topbar: document.getElementById("topbar"),
  topbarStoreName: document.getElementById("topbarStoreName"),
  topbarStoreSubtitle: document.getElementById("topbarStoreSubtitle"),
  topbarLogo: document.getElementById("topbarLogo"),
  topbarRightSpacer: document.getElementById("topbarRightSpacer")
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2
  }).format(Number(value) || 0);
}

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function getCategoryById(categoryId) {
  return APP_DATA.categories.find((category) => category.id === categoryId);
}

function getProductById(productId) {
  return APP_DATA.products.find((product) => product.id === productId);
}

function getProductsByCategory(categoryId) {
  return APP_DATA.products.filter((product) => product.categoryId === categoryId);
}

function getFeaturedProducts() {
  return (APP_DATA.featuredProductsIds || [])
    .map((id) => getProductById(id))
    .filter(Boolean);
}

function getProductMinPrice(product) {
  return Math.min(...product.options.map((option) => option.price));
}

function getCartTotal() {
  return state.cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
}

function getCartItemsCount() {
  return state.cart.reduce((acc, item) => acc + item.quantity, 0);
}

function updateHeader() {
  const client = APP_DATA.client || {};
  const isHome = state.view === "categories";

  els.topbarStoreName.textContent = client.name || APP_DATA.brand.title;
  els.topbarStoreSubtitle.textContent =
    client.topbarSubtitle || APP_DATA.brand.subtitle || "Pedidos por WhatsApp";

  els.topbarLogo.textContent = client.logo || "🍔";

  if (isHome) {
    els.topbarRightSpacer.classList.remove("hidden");
  } else {
    els.topbarRightSpacer.classList.remove("hidden");
  }
}

function updateBackButton() {
  const isHome = state.view === "categories";
  els.backButton.classList.toggle("hidden", isHome);
}

function updateCartBar() {
  const hasItems = state.cart.length > 0;
  els.cartBar.classList.toggle("hidden", !hasItems);
  els.cartTotal.textContent = formatCurrency(getCartTotal());
}

function saveCart() {
  localStorage.setItem("tupedido_cart", JSON.stringify(state.cart));
  localStorage.setItem("tupedido_checkout", JSON.stringify(state.checkout));
}

function loadCart() {
  const savedCart = localStorage.getItem("tupedido_cart");
  const savedCheckout = localStorage.getItem("tupedido_checkout");

  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (error) {
      state.cart = [];
    }
  }

  if (savedCheckout) {
    try {
      state.checkout = { ...state.checkout, ...JSON.parse(savedCheckout) };
    } catch (error) {
      // ignore
    }
  }
}

function goToCategories() {
  state.view = "categories";
  state.selectedCategoryId = null;
  state.selectedProductId = null;
  render();
}

function goToProducts(categoryId) {
  state.view = "products";
  state.selectedCategoryId = categoryId;
  state.selectedProductId = null;
  render();
}

function goToProductDetail(productId) {
  state.view = "detail";
  state.selectedProductId = productId;
  render();
}

function goToCart() {
  state.view = "cart";
  render();
}

function goToCheckout() {
  state.view = "checkout";
  render();
}

function renderCategoriesView() {
  const featuredProducts = getFeaturedProducts();
  const client = APP_DATA.client;

  const featuredHtml = featuredProducts
    .map((product) => `
      <article class="featured-card" data-featured-id="${product.id}">
        <img class="featured-thumb" src="${product.image}" alt="${product.name}">
        <div class="featured-content">
          <div class="featured-tag">${product.tag || "🔥 Recomendado"}</div>
          <h3 class="featured-name">${product.name}</h3>
          <div class="featured-price">Desde ${formatCurrency(getProductMinPrice(product))}</div>
        </div>
      </article>
    `)
    .join("");

  const categoriesHtml = APP_DATA.categories
    .map((category) => `
      <button class="category-card" data-category-id="${category.id}">
        <img src="${category.image}" alt="${category.name}">
        <div class="category-content">
          <h2 class="category-name">${category.name}</h2>
          ${category.badge ? `<span class="badge badge-success">${category.badge}</span>` : ""}
        </div>
      </button>
    `)
    .join("");

  const tagsHtml = (client.tags || [])
    .map((tag) => `<span class="hero-chip">${tag}</span>`)
    .join("");

  els.appView.innerHTML = `
    <section class="home-stack">
      <section class="hero-store">
        <img class="hero-store-image" src="${client.coverImage}" alt="${client.name}">
        <div class="hero-store-overlay">
          <span class="hero-store-status">🟢 ${client.status}</span>
          <h1 class="hero-store-title">${client.name}</h1>
          <p class="hero-store-subtitle">${client.subtitle}</p>

          <div class="hero-store-meta">
            <span class="hero-chip">⏱ ${client.eta}</span>
            <span class="hero-chip">📍 ${client.zone}</span>
            ${tagsHtml}
          </div>
        </div>
      </section>

      <article class="hero-card">
        <div class="hero-badge">${APP_DATA.hero.badge}</div>
        <h2 class="hero-title">${APP_DATA.hero.title}</h2>
        <p class="hero-text">${APP_DATA.hero.text}</p>
      </article>

      <section>
        <div class="section-header">
          <h2 class="section-title">Lo más pedido</h2>
        </div>
        <div class="featured-list">
          ${featuredHtml}
        </div>
      </section>

      <section>
        <div class="section-header">
          <h2 class="section-title">Categorías</h2>
          <button class="filter-button" type="button">Filtros</button>
        </div>

        <div class="category-list">
          ${categoriesHtml}
        </div>
      </section>

      <section class="home-kpis">
        <article class="kpi-card">
          <span class="kpi-value">Rápido</span>
          <span class="kpi-label">Pedido claro</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-value">Simple</span>
          <span class="kpi-label">Sin vueltas</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-value">WhatsApp</span>
          <span class="kpi-label">Directo</span>
        </article>
      </section>
    </section>
  `;

  document.querySelectorAll("[data-category-id]").forEach((button) => {
    button.addEventListener("click", () => {
      goToProducts(button.dataset.categoryId);
    });
  });

  document.querySelectorAll("[data-featured-id]").forEach((card) => {
    card.addEventListener("click", () => {
      goToProductDetail(card.dataset.featuredId);
    });
  });
}

function renderProductsView() {
  const category = getCategoryById(state.selectedCategoryId);
  const products = getProductsByCategory(state.selectedCategoryId);

  const productsHtml = products
    .map((product) => {
      const minPrice = getProductMinPrice(product);

      return `
        <article class="product-card" data-product-id="${product.id}">
          <img class="product-thumb" src="${product.image}" alt="${product.name}">
          <div class="product-content">
            <h3 class="product-name">${product.name}</h3>
            <div>
              <span class="product-price-label">Desde</span>
              <span class="product-price">${formatCurrency(minPrice)}</span>
            </div>
            ${product.badge ? `<div style="margin-top:12px;"><span class="badge badge-success">${product.badge}</span></div>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  els.appView.innerHTML = `
    <section style="padding-top:16px;">
      <div class="section-header">
        <h2 class="section-title">${category ? category.name : "Productos"}</h2>
        <button class="share-button" type="button" aria-label="Compartir">⤴</button>
      </div>

      <div class="product-list">
        ${productsHtml || `<div class="empty-state">No hay productos en esta categoría.</div>`}
      </div>
    </section>
  `;

  document.querySelectorAll("[data-product-id]").forEach((card) => {
    card.addEventListener("click", () => {
      goToProductDetail(card.dataset.productId);
    });
  });
}

function renderDetailView() {
  const product = getProductById(state.selectedProductId);

  if (!product) {
    els.appView.innerHTML = `<div class="empty-state">Producto no encontrado.</div>`;
    return;
  }

  const optionsHtml = product.options
    .map((option, index) => `
      <label class="option-card ${index === 0 ? "selected" : ""}" data-option-card>
        <div class="option-info">
          <div class="option-label">${option.label}</div>
          <div class="option-price-row">
            ${option.oldPrice ? `<span class="old-price">${formatCurrency(option.oldPrice)}</span>` : ""}
            <span class="current-price">${formatCurrency(option.price)}</span>
            ${option.oldPrice ? `<span class="badge badge-success">${product.badge || "PROMO"}</span>` : ""}
          </div>
        </div>
        <input
          class="option-select"
          type="radio"
          name="productOption"
          value="${option.id}"
          ${index === 0 ? "checked" : ""}
        >
      </label>
    `)
    .join("");

  els.appView.innerHTML = `
    <section class="detail-view">
      <div class="detail-head">
        <h2 class="detail-title">${product.name}</h2>
        <button class="share-button" type="button" aria-label="Compartir">⤴</button>
      </div>

      <div class="detail-image-wrap">
        <img class="detail-image" src="${product.image}" alt="${product.name}">
      </div>

      <p class="detail-description">${product.description}</p>

      <section class="options-block">
        <h3 class="options-title">Elegí tu opción</h3>
        <p class="options-subtitle">Seleccioná la presentación que quieras sumar al pedido.</p>
        ${optionsHtml}
      </section>

      <section class="textarea-block">
        <h3 class="textarea-label">Observaciones</h3>
        <textarea
          id="observationInput"
          class="textarea"
          maxlength="150"
          placeholder="Ej: sin ajo, bien cocido, sin cebolla..."
        ></textarea>
      </section>

      <div class="add-bar">
        <button id="addToCartButton" class="add-button" type="button">
          <span>Sumar al pedido</span>
          <strong id="addButtonPrice">${formatCurrency(product.options[0].price)}</strong>
        </button>
      </div>
    </section>
  `;

  const optionCards = document.querySelectorAll("[data-option-card]");
  const radios = document.querySelectorAll('input[name="productOption"]');
  const addButtonPrice = document.getElementById("addButtonPrice");
  const addToCartButton = document.getElementById("addToCartButton");
  const observationInput = document.getElementById("observationInput");

  function updateSelectedOptionUI() {
    const selectedRadio = document.querySelector('input[name="productOption"]:checked');
    const selectedOption = product.options.find((item) => item.id === selectedRadio.value);

    optionCards.forEach((card) => card.classList.remove("selected"));
    selectedRadio.closest("[data-option-card]").classList.add("selected");
    addButtonPrice.textContent = formatCurrency(selectedOption.price);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", updateSelectedOptionUI);
  });

  addToCartButton.addEventListener("click", () => {
    const selectedRadio = document.querySelector('input[name="productOption"]:checked');
    const selectedOption = product.options.find((item) => item.id === selectedRadio.value);

    state.cart.push({
      id: `${product.id}-${selectedOption.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      optionLabel: selectedOption.label,
      observation: observationInput.value.trim(),
      unitPrice: selectedOption.price,
      quantity: 1
    });

    saveCart();
    goToCart();
  });
}

function renderCartView() {
  if (state.cart.length === 0) {
    els.appView.innerHTML = `
      <section class="cart-view">
        <h2 class="cart-title">Mi pedido</h2>
        <div class="empty-state">Todavía no agregaste productos.</div>
      </section>
    `;
    return;
  }

  const itemsHtml = state.cart
    .map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-content">
          <div class="cart-item-top">
            <h3 class="cart-item-title">${item.name}</h3>
            <button class="cart-item-remove" type="button" data-remove-id="${item.id}">×</button>
          </div>

          <p class="cart-item-meta">
            ${item.optionLabel}
            ${item.observation ? `<br>Obs: ${item.observation}` : ""}
          </p>

          <div class="qty-row">
            <div class="qty-controls">
              <button class="qty-button" type="button" data-minus-id="${item.id}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-button" type="button" data-plus-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">${formatCurrency(item.unitPrice * item.quantity)}</div>
          </div>
        </div>
      </article>
    `)
    .join("");

  els.appView.innerHTML = `
    <section class="cart-view">
      <h2 class="cart-title">Mi pedido</h2>

      <div class="cart-list">
        ${itemsHtml}
      </div>

      <div class="summary-card">
        <h3 class="summary-title">Resumen</h3>
        <div class="summary-row">
          <span>Productos</span>
          <strong>${getCartItemsCount()}</strong>
        </div>
        <div class="summary-row summary-total">
          <span>Total</span>
          <strong>${formatCurrency(getCartTotal())}</strong>
        </div>
      </div>

      <button id="goCheckoutButton" class="primary-button" type="button">
        Confirmar pedido
      </button>
    </section>
  `;

  document.querySelectorAll("[data-remove-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.cart = state.cart.filter((item) => item.id !== button.dataset.removeId);
      saveCart();
      render();
    });
  });

  document.querySelectorAll("[data-minus-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.cart.find((cartItem) => cartItem.id === button.dataset.minusId);
      if (!item) return;

      item.quantity -= 1;

      if (item.quantity <= 0) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id);
      }

      saveCart();
      render();
    });
  });

  document.querySelectorAll("[data-plus-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.cart.find((cartItem) => cartItem.id === button.dataset.plusId);
      if (!item) return;

      item.quantity += 1;
      saveCart();
      render();
    });
  });

  document.getElementById("goCheckoutButton").addEventListener("click", goToCheckout);
}

function renderCheckoutView() {
  if (state.cart.length === 0) {
    els.appView.innerHTML = `
      <section class="cart-view">
        <h2 class="cart-title">Checkout</h2>
        <div class="empty-state">No hay productos en el carrito.</div>
      </section>
    `;
    return;
  }

  const isEnvio = state.checkout.deliveryType === "envio";
  const isRetiro = state.checkout.deliveryType === "retiro";
  const isLocal = state.checkout.deliveryType === "local";
  const isTransferencia = state.checkout.paymentMethod === "transferencia";

  let locationBlock = "";

  if (isEnvio) {
    locationBlock = `
      <div class="checkout-card">
        <div class="field-block">
          <label class="field-label" for="customerAddress">Dirección</label>
          <input
            id="customerAddress"
            class="input"
            type="text"
            placeholder="Calle, número, barrio, referencia..."
            value="${state.checkout.address}"
          >
          <p class="helper-text">Ingresá la dirección donde querés recibir el pedido.</p>
        </div>
      </div>
    `;
  } else if (isRetiro) {
    locationBlock = `
      <div class="checkout-card">
        <div class="field-block">
          <label class="field-label" for="customerAddress">Referencia opcional</label>
          <input
            id="customerAddress"
            class="input"
            type="text"
            placeholder="Ej: paso en 20 minutos"
            value="${state.checkout.address}"
          >
          <p class="helper-text">Podés dejar una referencia para organizar mejor el retiro.</p>
        </div>
      </div>
    `;
  }

  let aliasBlock = "";

  if (isTransferencia) {
    aliasBlock = `
      <div class="alias-card">
        <h3 class="alias-title">Transferencia</h3>
        <div class="alias-box">
          <span class="alias-label">${APP_DATA.payment.ownerLabel}</span>
          <div class="alias-value" id="aliasValue">${APP_DATA.payment.alias}</div>
        </div>
        <button id="copyAliasButton" class="alias-copy-button" type="button">
          Copiar alias
        </button>
        <div id="copyFeedback" class="copy-feedback hidden">Alias copiado</div>
      </div>
    `;
  }

  els.appView.innerHTML = `
    <section class="cart-view">
      <h2 class="cart-title">¡Lo último!</h2>

      <div class="checkout-grid">
        <div class="checkout-card">
          <div class="field-block">
            <label class="field-label" for="customerName">Nombre y apellido</label>
            <input
              id="customerName"
              class="input"
              type="text"
              placeholder="Tu nombre"
              value="${state.checkout.name}"
            >
          </div>
        </div>

        <div class="checkout-card">
          <div class="field-block">
            <label class="field-label" for="customerPhone">Teléfono</label>
            <input
              id="customerPhone"
              class="input"
              type="tel"
              placeholder="381..."
              value="${state.checkout.phone}"
            >
          </div>
        </div>

        <div class="checkout-card">
          <div class="field-block">
            <label class="field-label">Forma de entrega</label>
            <div class="segmented three">
              <button type="button" class="segment-button ${isLocal ? "active" : ""}" data-delivery="local">
                En el local
              </button>
              <button type="button" class="segment-button ${isRetiro ? "active" : ""}" data-delivery="retiro">
                Retiro
              </button>
              <button type="button" class="segment-button ${isEnvio ? "active" : ""}" data-delivery="envio">
                Envío
              </button>
            </div>
          </div>
        </div>

        ${locationBlock}

        <div class="checkout-card">
          <div class="field-block">
            <label class="field-label">Forma de pago</label>
            <div class="segmented">
              <button type="button" class="segment-button ${state.checkout.paymentMethod === "efectivo" ? "active" : ""}" data-payment="efectivo">
                Efectivo
              </button>
              <button type="button" class="segment-button ${state.checkout.paymentMethod === "transferencia" ? "active" : ""}" data-payment="transferencia">
                Transferencia
              </button>
              <button type="button" class="segment-button ${state.checkout.paymentMethod === "debito_credito" ? "active" : ""}" data-payment="debito_credito">
                Tarjeta
              </button>
              <button type="button" class="segment-button ${state.checkout.paymentMethod === "mercadopago" ? "active" : ""}" data-payment="mercadopago">
                Mercado Pago
              </button>
            </div>
            <p class="helper-text">
              ${isTransferencia
                ? "Si elegís transferencia, podés copiar el alias de abajo."
                : "Elegí la forma de pago que te quede más cómoda."}
            </p>
          </div>
        </div>

        <div class="checkout-card">
          <div class="field-block">
            <label class="field-label" for="generalNotes">Observaciones generales</label>
            <textarea
              id="generalNotes"
              class="textarea"
              maxlength="200"
              placeholder="Ej: tocar timbre, llamar al llegar, sin apuro..."
            >${state.checkout.generalNotes}</textarea>
          </div>
        </div>

        <div class="summary-card">
          <h3 class="summary-title">Resumen del pedido</h3>
          <div class="summary-row">
            <span>Productos</span>
            <strong>${getCartItemsCount()}</strong>
          </div>
          <div class="summary-row">
            <span>Entrega</span>
            <strong>${getDeliveryLabel(state.checkout.deliveryType)}</strong>
          </div>
          <div class="summary-row">
            <span>Pago</span>
            <strong>${getPaymentLabel(state.checkout.paymentMethod)}</strong>
          </div>
          <div class="summary-row summary-total">
            <span>Total</span>
            <strong>${formatCurrency(getCartTotal())}</strong>
          </div>
        </div>

        ${aliasBlock}

        <div class="checkout-actions">
          <button id="sendWhatsappButton" class="whatsapp-button" type="button">
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </section>
  `;

  document.querySelectorAll("[data-delivery]").forEach((button) => {
    button.addEventListener("click", () => {
      state.checkout.deliveryType = button.dataset.delivery;

      if (state.checkout.deliveryType === "local") {
        state.checkout.address = "";
      }

      saveCart();
      render();
    });
  });

  document.querySelectorAll("[data-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      state.checkout.paymentMethod = button.dataset.payment;
      saveCart();
      render();
    });
  });

  document.getElementById("customerName").addEventListener("input", (e) => {
    state.checkout.name = e.target.value;
    saveCart();
  });

  document.getElementById("customerPhone").addEventListener("input", (e) => {
    state.checkout.phone = e.target.value;
    saveCart();
  });

  const addressInput = document.getElementById("customerAddress");
  if (addressInput) {
    addressInput.addEventListener("input", (e) => {
      state.checkout.address = e.target.value;
      saveCart();
    });
  }

  document.getElementById("generalNotes").addEventListener("input", (e) => {
    state.checkout.generalNotes = e.target.value;
    saveCart();
  });

  document.getElementById("sendWhatsappButton").addEventListener("click", sendOrderToWhatsApp);

  const copyAliasButton = document.getElementById("copyAliasButton");
  if (copyAliasButton) {
    copyAliasButton.addEventListener("click", copyAliasToClipboard);
  }
}

function getDeliveryLabel(value) {
  const map = {
    local: "Lo consumo en el local",
    retiro: "Lo retiro personalmente",
    envio: "Necesito que me lo envíen"
  };

  return map[value] || value;
}

function getPaymentLabel(value) {
  const map = {
    efectivo: "Efectivo",
    transferencia: "Transferencia bancaria",
    debito_credito: "Tarjeta débito/crédito",
    mercadopago: "Mercado Pago"
  };

  return map[value] || value;
}

function buildWhatsAppMessage() {
  const lines = [];

  lines.push("Hola, quiero hacer este pedido:");
  lines.push("");

  state.cart.forEach((item) => {
    lines.push(`- ${item.quantity}x ${item.name} (${item.optionLabel}) - ${formatCurrency(item.unitPrice * item.quantity)}`);
    if (item.observation) {
      lines.push(`  Obs: ${item.observation}`);
    }
  });

  lines.push("");
  lines.push(`Total: ${formatCurrency(getCartTotal())}`);
  lines.push("");
  lines.push(`Nombre: ${state.checkout.name || "-"}`);
  lines.push(`Teléfono: ${state.checkout.phone || "-"}`);
  lines.push(`Entrega: ${getDeliveryLabel(state.checkout.deliveryType)}`);

  if (state.checkout.deliveryType === "envio") {
    lines.push(`Dirección: ${state.checkout.address || "-"}`);
  }

  if (state.checkout.deliveryType === "retiro" && state.checkout.address.trim()) {
    lines.push(`Referencia retiro: ${state.checkout.address}`);
  }

  lines.push(`Pago: ${getPaymentLabel(state.checkout.paymentMethod)}`);

  if (state.checkout.paymentMethod === "transferencia") {
    lines.push(`Alias de referencia: ${APP_DATA.payment.alias}`);
  }

  if (state.checkout.generalNotes.trim()) {
    lines.push("");
    lines.push("Observaciones generales:");
    lines.push(state.checkout.generalNotes.trim());
  }

  return lines.join("\n");
}

function validateCheckout() {
  if (!state.checkout.name.trim()) {
    alert("Ingresá tu nombre y apellido.");
    return false;
  }

  if (!state.checkout.phone.trim()) {
    alert("Ingresá tu teléfono.");
    return false;
  }

  if (!normalizePhone(state.checkout.phone)) {
    alert("Ingresá un teléfono válido.");
    return false;
  }

  if (state.checkout.deliveryType === "envio" && !state.checkout.address.trim()) {
    alert("Ingresá la dirección para el envío.");
    return false;
  }

  return true;
}

function sendOrderToWhatsApp() {
  if (!validateCheckout()) return;

  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${APP_DATA.whatsappPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

async function copyAliasToClipboard() {
  const alias = APP_DATA.payment.alias;
  const feedback = document.getElementById("copyFeedback");

  try {
    await navigator.clipboard.writeText(alias);
    if (feedback) {
      feedback.classList.remove("hidden");
      setTimeout(() => {
        feedback.classList.add("hidden");
      }, 1800);
    }
  } catch (error) {
    alert(`No se pudo copiar automáticamente. Alias: ${alias}`);
  }
}

function render() {
  updateHeader();
  updateBackButton();
  updateCartBar();

  switch (state.view) {
    case "categories":
      renderCategoriesView();
      break;
    case "products":
      renderProductsView();
      break;
    case "detail":
      renderDetailView();
      break;
    case "cart":
      renderCartView();
      break;
    case "checkout":
      renderCheckoutView();
      break;
    default:
      renderCategoriesView();
      break;
  }
}

els.backButton.addEventListener("click", () => {
  if (state.view === "checkout") {
    goToCart();
    return;
  }

  if (state.view === "cart") {
    if (state.selectedCategoryId) {
      goToProducts(state.selectedCategoryId);
      return;
    }
    goToCategories();
    return;
  }

  if (state.view === "detail") {
    goToProducts(state.selectedCategoryId);
    return;
  }

  if (state.view === "products") {
    goToCategories();
    return;
  }

  goToCategories();
});

els.cartButton.addEventListener("click", goToCart);

loadCart();
render();