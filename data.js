// ─── CONFIGURACIÓN ───────────────────────────────────────────────
const WA_NUMBER = '+5493813159106';
// ─── CONFIGURACIÓN ───────────────────────────────────────────────

// Imágenes: Unsplash (libres de derechos, alta resolución)
// Parámetros: w=600&h=400&q=85&fit=crop&auto=format

const MENU = [

  // ── PIZZAS ─────────────────────────────────────────────────────
  {
    id: 1,
    cat: 'pizzas',
    name: 'Mozzarella Clásica',
    desc: 'Salsa de tomate artesanal, mozzarella entera y albahaca fresca',
    price: 3200,
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['vegetariana'],
    hot: true,
    rating: 4.9
  },
  {
    id: 2,
    cat: 'pizzas',
    name: 'Napolitana Fuego',
    desc: 'Tomate fresco, mozzarella, ajo y orégano. Un clásico irresistible',
    price: 3600,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['spicy', 'popular'],
    hot: true,
    rating: 4.8
  },
  {
    id: 3,
    cat: 'pizzas',
    name: 'Especial de la Casa',
    desc: 'Jamón, morrones, aceitunas, huevo y triple mozzarella',
    price: 4200,
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['popular'],
    hot: false,
    rating: 4.7
  },
  {
    id: 4,
    cat: 'pizzas',
    name: 'Fugazzeta Rellena',
    desc: 'Cebolla caramelizada, doble mozzarella y masa crocante',
    price: 4000,
    img: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['vegetariana', 'pop'],
    hot: true,
    rating: 5.0
  },
  {
    id: 5,
    cat: 'pizzas',
    name: 'Pizza Americana',
    desc: 'Salsa de tomate, mozzarella, panceta, maíz y morrones rojos',
    price: 3900,
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.6
  },

  // ── EMPANADAS ──────────────────────────────────────────────────
  {
    id: 6,
    cat: 'empanadas',
    name: 'Carne Criolla',
    desc: 'Carne picada con cebolla, aceitunas y huevo. Receta de la abuela',
    price: 450,
    img: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['popular'],
    hot: true,
    rating: 4.9
  },
  {
    id: 7,
    cat: 'empanadas',
    name: 'Jamón y Queso',
    desc: 'Jamón cocido y queso cremoso fundido por dentro',
    price: 420,
    img: 'https://images.unsplash.com/photo-1559058789-672da06263d8?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.7
  },
  {
    id: 8,
    cat: 'empanadas',
    name: 'Pollo Suave',
    desc: 'Pollo desmenuzado con morrón, cebolla y especias',
    price: 440,
    img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.6
  },
  {
    id: 9,
    cat: 'empanadas',
    name: 'Humita',
    desc: 'Choclo, queso y especias en masa crocante. Sabor que enamora',
    price: 430,
    img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['vegetariana'],
    hot: false,
    rating: 4.5
  },
  {
    id: 10,
    cat: 'empanadas',
    name: 'Caprese',
    desc: 'Tomate, mozzarella y albahaca. La empanada italiana',
    price: 460,
    img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['vegetariana', 'spicy'],
    hot: true,
    rating: 4.8
  },

  // ── COMBOS ─────────────────────────────────────────────────────
  {
    id: 11,
    cat: 'combos',
    name: 'Combo Familiar',
    desc: 'Pizza grande + 12 empanadas + 2 gaseosas 1.5L',
    price: 8500,
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&q=85&fit=crop&auto=format',
    tags: ['popular'],
    hot: true,
    rating: 5.0
  },
  {
    id: 12,
    cat: 'combos',
    name: 'Combo Pareja',
    desc: 'Pizza mediana + 6 empanadas surtidas + 1 gaseosa',
    price: 5200,
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.8
  },

  // ── BEBIDAS ────────────────────────────────────────────────────
  {
    id: 13,
    cat: 'bebidas',
    name: 'Coca-Cola 1.5L',
    desc: 'Bebida fría, perfecta para acompañar tu pedido',
    price: 900,
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.5
  },
  {
    id: 14,
    cat: 'bebidas',
    name: 'Sprite / 7UP 1.5L',
    desc: 'Refresco claro, ideal con empanadas',
    price: 900,
    img: 'https://images.unsplash.com/photo-1625772452859-1c03d884dcd7?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.4
  },
  {
    id: 15,
    cat: 'bebidas',
    name: 'Agua Mineral',
    desc: '500ml con o sin gas',
    price: 400,
    img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&q=85&fit=crop&auto=format',
    tags: [],
    hot: false,
    rating: 4.3
  },
];