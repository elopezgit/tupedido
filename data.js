const APP_DATA = {
  brand: {
    title: "TuPedido",
    subtitle: "Motor de pedidos por WhatsApp"
  },

  client: {
    name: "Pizzería & Empanadas El Turco",
    subtitle: "Pizzas y empanadas recién hechas",
    logo: "🍕",
    topbarSubtitle: "Pedidos por WhatsApp",
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
    status: "Abierto ahora",
    eta: "25 a 35 min",
    zone: "Envíos en la zona",
    tags: ["🔥 Promos", "🛵 Envíos", "💳 Transferencia"]
  },

  whatsappPhone: "5493813159106",

  payment: {
    alias: "elopez2025",
    ownerLabel: "Alias para transferencia"
  },

  hero: {
    title: "Pedí rápido y sin vueltas",
    text: "Elegí tu pizza o tus empanadas, sumalas al carrito y mandá tu pedido directo por WhatsApp.",
    badge: "⚡ Rápido y simple"
  },

  featuredProductsIds: [
    "pizza-muzzarella",
    "pizza-napolitana",
    "empanadas-carne",
    "empanadas-jamonyqueso"
  ],

  categories: [
    {
      id: "pizzas",
      name: "Pizzas",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
      badge: "PROMOS"
    },
    {
      id: "empanadas",
      name: "Empanadas",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
      badge: "DOCENAS"
    }
  ],

  products: [
    {
      id: "pizza-muzzarella",
      categoryId: "pizzas",
      name: "Muzzarella",
      image:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=1200&q=80",
      description: "La clásica pizza de muzzarella con salsa y aceitunas.",
      badge: "TOP",
      tag: "🔥 Más pedida",
      options: [
        { id: "muzzarella-4", label: "4 porciones", price: 7800 },
        { id: "muzzarella-8", label: "8 porciones", price: 9800 }
      ]
    },
    {
      id: "pizza-napolitana",
      categoryId: "pizzas",
      name: "Napolitana",
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80",
      description: "Muzzarella, tomate fresco, ajo y aceitunas.",
      badge: "PROMO",
      tag: "🍅 Imperdible",
      options: [
        { id: "napolitana-4", label: "4 porciones", price: 8300 },
        { id: "napolitana-8", label: "8 porciones", price: 10800, oldPrice: 11800 }
      ]
    },
    {
      id: "pizza-fugazzeta",
      categoryId: "pizzas",
      name: "Fugazzeta",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
      description: "Muzzarella, cebolla salteada y aceitunas.",
      badge: "",
      tag: "🧀 Clásica",
      options: [
        { id: "fugazzeta-4", label: "4 porciones", price: 8600 },
        { id: "fugazzeta-8", label: "8 porciones", price: 10900 }
      ]
    },
    {
      id: "pizza-especial",
      categoryId: "pizzas",
      name: "Especial",
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80",
      description: "Jamón, muzzarella, morrones y aceitunas.",
      badge: "COMPLETA",
      tag: "💥 Bien cargada",
      options: [
        { id: "especial-4", label: "4 porciones", price: 9100 },
        { id: "especial-8", label: "8 porciones", price: 11800 }
      ]
    },

    {
      id: "empanadas-carne",
      categoryId: "empanadas",
      name: "Carne",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
      description: "Empanadas de carne bien jugosas y condimentadas.",
      badge: "DOCENA",
      tag: "🥟 Promo",
      options: [
        { id: "carne-3", label: "3 unidades", price: 2600 },
        { id: "carne-6", label: "6 unidades", price: 4900 },
        { id: "carne-12", label: "12 unidades", price: 9200, oldPrice: 10200 }
      ]
    },
    {
      id: "empanadas-jamonyqueso",
      categoryId: "empanadas",
      name: "Jamón y queso",
      image:
        "https://images.unsplash.com/photo-1628191012827-dacc18f15f41?auto=format&fit=crop&w=1200&q=80",
      description: "Empanadas suaves de jamón cocido y queso cremoso.",
      badge: "",
      tag: "🧀 Suaves",
      options: [
        { id: "jyq-3", label: "3 unidades", price: 2700 },
        { id: "jyq-6", label: "6 unidades", price: 5100 },
        { id: "jyq-12", label: "12 unidades", price: 9500 }
      ]
    },
    {
      id: "empanadas-pollo",
      categoryId: "empanadas",
      name: "Pollo",
      image:
        "https://images.unsplash.com/photo-1633945274405-b6c8069047b5?auto=format&fit=crop&w=1200&q=80",
      description: "Empanadas de pollo desmenuzado con cebolla y especias.",
      badge: "NUEVO",
      tag: "🍗 Sabrosas",
      options: [
        { id: "pollo-3", label: "3 unidades", price: 2650 },
        { id: "pollo-6", label: "6 unidades", price: 5000 },
        { id: "pollo-12", label: "12 unidades", price: 9300 }
      ]
    },
    {
      id: "empanadas-caprese",
      categoryId: "empanadas",
      name: "Caprese",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      description: "Queso, tomate y albahaca.",
      badge: "",
      tag: "🌿 Livianas",
      options: [
        { id: "caprese-3", label: "3 unidades", price: 2750 },
        { id: "caprese-6", label: "6 unidades", price: 5200 },
        { id: "caprese-12", label: "12 unidades", price: 9700 }
      ]
    }
  ]
};