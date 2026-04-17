const APP_DATA = {
  brand: {
    title: "TuPedido",
    subtitle: "Motor de pedidos por WhatsApp"
  },

  client: {
  name: "Lomitos El Turco",
  subtitle: "Lomitos, empanadas, pizzas y hamburguesas",
  logo: "🍔",
  topbarSubtitle: "Pedidos por WhatsApp",
  coverImage:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80",
  status: "Abierto ahora",
  eta: "30 min aprox",
  zone: "Envíos en la zona",
  tags: ["🔥 Promos", "🛵 Envíos", "💳 Transferencia"]
},

  whatsappPhone: "5493813159106",

  payment: {
    alias: "elopez2025",
    ownerLabel: "Alias para transferencia"
  },

  hero: {
    title: "Pedí sin vueltas",
    text: "Elegí lo que querés, sumalo al carrito y mandá tu pedido directo por WhatsApp.",
    badge: "⚡ Rápido y simple"
  },

  featuredProductsIds: [
    "pizza-napolitana",
    "empa-carne",
    "burger-bacon"
  ],

  categories: [
    {
      id: "pizzas",
      name: "Pizzas",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
      badge: "HASTA 20% OFF"
    },
    {
      id: "empanadas",
      name: "Empanadas",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
      badge: "PROMOS"
    },
    {
      id: "hamburguesas",
      name: "Hamburguesas",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      badge: "COMBOS"
    },
    {
      id: "lomitos",
      name: "Lomitos",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      badge: "TOP"
    },
    {
      id: "milanesas",
      name: "Sánguches de milanesa",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      badge: "CLÁSICOS"
    }
  ],

  products: [
    {
      id: "pizza-napolitana",
      categoryId: "pizzas",
      name: "Napolitana",
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80",
      description: "Salsa, muzza, rodajas de tomate y ajo.",
      badge: "28% OFF",
      tag: "🔥 Más pedida",
      options: [
        { id: "napo-4", label: "4 porciones", price: 7734.3 },
        { id: "napo-8", label: "8 porciones", price: 8312.22, oldPrice: 11544.75 }
      ]
    },
    {
      id: "pizza-fugazzeta",
      categoryId: "pizzas",
      name: "Fugazzeta",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
      description: "Muzzarella, cebolla y aceitunas.",
      badge: "",
      tag: "🧀 Clásica",
      options: [
        { id: "fuga-4", label: "4 porciones", price: 8689.8 },
        { id: "fuga-8", label: "8 porciones", price: 9790.5 }
      ]
    },

    {
      id: "empa-carne",
      categoryId: "empanadas",
      name: "Empanadas de carne",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
      description: "Carne cortada a cuchillo, cebolla y condimentos.",
      badge: "DOCENA",
      tag: "🥟 Promo docena",
      options: [
        { id: "carne-3", label: "3 unidades", price: 2500 },
        { id: "carne-6", label: "6 unidades", price: 4700 },
        { id: "carne-12", label: "12 unidades", price: 8800, oldPrice: 9800 }
      ]
    },
    {
      id: "empa-jamon-queso",
      categoryId: "empanadas",
      name: "Empanadas JyQ",
      image:
        "https://images.unsplash.com/photo-1628191012827-dacc18f15f41?auto=format&fit=crop&w=1200&q=80",
      description: "Jamón cocido y queso cremoso.",
      badge: "",
      tag: "🧀 Suaves",
      options: [
        { id: "jyq-3", label: "3 unidades", price: 2600 },
        { id: "jyq-6", label: "6 unidades", price: 4800 },
        { id: "jyq-12", label: "12 unidades", price: 9100 }
      ]
    },

    {
      id: "burger-clasica",
      categoryId: "hamburguesas",
      name: "Hamburguesa clásica",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      description: "Medallón, lechuga, tomate y cheddar.",
      badge: "COMBO",
      tag: "🍔 Sale rápido",
      options: [
        { id: "clasica-simple", label: "Simple", price: 6900 },
        { id: "clasica-doble", label: "Doble", price: 8400 }
      ]
    },
    {
      id: "burger-bacon",
      categoryId: "hamburguesas",
      name: "Hamburguesa bacon",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      description: "Doble carne, cheddar, bacon y salsa especial.",
      badge: "TOP",
      tag: "🔥 Recomendado",
      options: [
        { id: "bacon-simple", label: "Simple", price: 7900 },
        { id: "bacon-doble", label: "Doble", price: 9300 }
      ]
    },

    {
      id: "lomito-completo",
      categoryId: "lomitos",
      name: "Lomito completo",
      image:
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=80",
      description: "Lomo, jamón, queso, huevo, lechuga y tomate.",
      badge: "",
      tag: "🥩 Bien cargado",
      options: [
        { id: "lomito-normal", label: "Normal", price: 9800 },
        { id: "lomito-papas", label: "Con papas", price: 11400 }
      ]
    },

    {
      id: "mila-completa",
      categoryId: "milanesas",
      name: "Milanesa completa",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      description: "Milanesa, jamón, queso, huevo, tomate y lechuga.",
      badge: "CLÁSICO",
      tag: "🥪 Bien de barrio",
      options: [
        { id: "mila-simple", label: "Simple", price: 7600 },
        { id: "mila-combo", label: "Con papas", price: 9200 }
      ]
    }
  ]
};