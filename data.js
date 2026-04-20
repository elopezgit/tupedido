const APP_DATA = {
  brand: {
    title: "TuPedido",
    subtitle: "Motor de pedidos por WhatsApp"
  },

  client: {
    name: "Pizzas & Empanadas - EL TURCO",
    subtitle: "Pizzas y empanadas caseras",
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
    title: "Pedí fácil y sin vueltas",
    text: "Elegí tu pizza o tus empanadas, revisá tu pedido y mandalo directo por WhatsApp.",
    badge: "⚡ Rápido y claro"
  },

  featuredProductsIds: [
    "pizza-muzzarella",
    "pizza-napolitana",
    "emp-docena"
  ],

  categories: [
    {
      id: "pizzas",
      name: "Pizzas",
      image:
        "https://resizer.glanacion.com/resizer/v2/-OOYKN3HEDJFQXF3SOECAICFQWQ.jpg?auth=0f40a359db815154c30b0a689942817b35c4526464fff89970d39e1a625914d9&width=420&height=280&quality=70&smart=true",
      badge: "PROMOS"
    },
    {
      id: "empanadas",
      name: "Empanadas",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
      badge: "DOCENA"
    }
  ],

  products: [
    {
      id: "pizza-muzzarella",
      categoryId: "pizzas",
      type: "standard",
      name: "Pizza Muzzarella",
      image:
        "https://resizer.glanacion.com/resizer/v2/-OOYKN3HEDJFQXF3SOECAICFQWQ.jpg?auth=0f40a359db815154c30b0a689942817b35c4526464fff89970d39e1a625914d9&width=420&height=280&quality=70&smart=true",
      description: "La clásica pizza de muzzarella, salsa y aceitunas.",
      badge: "TOP",
      tag: "🔥 Más vendida",
      options: [
        { id: "muzza-4", label: "4 porciones (individual)", price: 7800 },
        { id: "muzza-8", label: "8 porciones (grande)", price: 9800 }
      ]
    },
    {
      id: "pizza-napolitana",
      categoryId: "pizzas",
      type: "standard",
      name: "Pizza Napolitana",
      image:
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=80",
      description: "Muzzarella, tomate fresco, ajo y aceitunas.",
      badge: "PROMO",
      tag: "🍅 Imperdible",
      options: [
        { id: "napo-4", label: "4 porciones (individual)", price: 8300 },
        { id: "napo-8", label: "8 porciones (grande)", price: 10800 }
      ]
    },
    {
      id: "pizza-fugazzeta",
      categoryId: "pizzas",
      type: "standard",
      name: "Pizza Fugazzeta",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
      description: "Cebolla, muzzarella y aceitunas.",
      badge: "",
      tag: "🧀 Clásica",
      options: [
        { id: "fuga-4", label: "4 porciones (individual)", price: 8600 },
        { id: "fuga-8", label: "8 porciones (grande)", price: 10900 }
      ]
    },
    {
      id: "pizza-especial",
      categoryId: "pizzas",
      type: "standard",
      name: "Pizza Especial",
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80",
      description: "Jamón, muzzarella, morrones y aceitunas.",
      badge: "COMPLETA",
      tag: "💥 Bien cargada",
      options: [
        { id: "esp-4", label: "4 porciones (individual)", price: 9100 },
        { id: "esp-8", label: "8 porciones (grande)", price: 11800 }
      ]
    },

    {
      id: "emp-docena",
      categoryId: "empanadas",
      type: "empanadas",
      name: "Empanadas",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
      description: "Elegí libre o armá tu docena con los gustos que prefieras.",
      badge: "ARMABLE",
      tag: "🥟 Libre o docena",
      empanadaFlavors: [
        { id: "carne", name: "Carne" },
        { id: "pollo", name: "Pollo" },
        { id: "mondongo", name: "Mondongo" },
        { id: "ternera_y_queso", name: "Ternera y queso" },
        { id: "cuatro_quesos", name: "4 quesos" },
        { id: "jamon_y_queso", name: "Jamón y queso" },
        { id: "caprese", name: "Caprese" },
        { id: "roquefort", name: "Roquefort" }
      ],
      options: [
        { id: "emp-libre", label: "Libres por unidad", price: 900 },
        { id: "emp-docena", label: "Docena", price: 9200 }
      ]
    }
  ]
};