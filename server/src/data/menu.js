// server/src/data/menu.js (ES Modules)
// Espelha o cardápio atual sem alterar visual do front.
// Caminhos das imagens são absolutos para funcionar a partir de qualquer página.


export const CATEGORIES = ["pizzas", "bordas", "esfihas", "sushis", "bebidas"];

// Helper só para manter consistência de caminho
const ABS = (p) => `/assets${p}`;

// ====== DADOS ======
// PIZZAS/BORDAS: seu front já trata tabelas e "Monte sua pizza"; listas vazias por enquanto.
const menu = {
  pizzas: [],
  bordas: [],

  // SUSHIS — Combinados, Temakis e Sushidog (exatamente como no HTML)
  sushis: [
    // 🍱 Combinados (5)
    {
      id: "cb-01",
      nome: "Combinado 01 (12 peças)",
      descricao:
        "4 Hot de Filadélfia • 4 Hot de Camarão • 2 Uramaki de Salmão • 2 Hossomaki de Kani",
      preco: 31.9,
      imagem: ABS("/imgs/sushis/combinado1.webp"),
    },
    {
      id: "cb-02",
      nome: "Combinado 02 (12 peças)",
      descricao: "4 Hot de Camarão • 4 Hot de Kani • 4 Hot de Filadélfia",
      preco: 35.9,
      imagem: ABS("/imgs/sushis/combinado2.webp"),
    },
    {
      id: "cb-03",
      nome: "Combinado 03 (14 peças)",
      descricao:
        "2 Uramaki de Salmão • 2 Hossomaki de Kani • 5 Hot Filadélfia • 5 Hot Camarão",
      preco: 37.9,
      imagem: ABS("/imgs/sushis/combinado3.webp"),
    },
    {
      id: "cb-04",
      nome: "Combinado 04 (19 peças)",
      descricao:
        "2 Uramaki Salmão • 2 Hossomaki Kani • 5 Hot Filadélfia • 5 Hot Camarão • 5 Hot Polvo ou 5 Hot Kani",
      preco: 47.9,
      imagem: ABS("/imgs/sushis/combinado4.webp"),
    },
    {
      id: "cb-05",
      nome: "Combinado 05 (26 peças)",
      descricao:
        "4 Uramaki Salmão • 4 Hossomaki Kani • 5 Hot Filadélfia • 5 Hot Camarão • 2 Niguiri • 2 Sashimi • 2 Dragon • 2 Jyo",
      preco: 64.9,
      imagem: ABS("/imgs/sushis/combinado5.webp"),
    },

    // 🐙 Temakis (4)
    {
      id: "tk-salmao",
      nome: "Temaki de Salmão",
      descricao: "Cones de alga com arroz e salmão.",
      preco: 37.9,
      imagem: ABS("/imgs/sushis/tsalmao.webp"),
    },
    {
      id: "tk-salmao-grelhado",
      nome: "Temaki de Salmão Grelhado",
      descricao: "Salmão grelhado no cone de alga com arroz.",
      preco: 37.9,
      imagem: ABS("/imgs/sushis/tsalmaogrelhado.webp"),
    },
    {
      id: "tk-polvo",
      nome: "Temaki de Polvo",
      descricao: "Polvo selecionado com arroz no cone de alga.",
      preco: 37.9,
      imagem: ABS("/imgs/sushis/tpolvo.webp"),
    },
    {
      id: "tk-camarao",
      nome: "Temaki de Camarão",
      descricao: "Camarão com arroz no cone de alga crocante.",
      preco: 37.9,
      imagem: ABS("/imgs/sushis/tcamarao.webp"),
    },

    // 🌮 Sushidog (4)
    {
      id: "sd-salmao",
      nome: "Sushidog de Salmão",
      descricao: "Clássico da casa.",
      preco: 38.9,
      imagem: ABS("/imgs/sushis/sushidog.webp"),
    },
    {
      id: "sd-salmao-grelhado",
      nome: "Sushidog de Salmão Grelhado",
      descricao: "Clássico da casa.",
      preco: 38.9,
      imagem: ABS("/imgs/sushis/sushidog.webp"),
    },
    {
      id: "sd-camarao",
      nome: "Sushidog de Camarão",
      descricao: "Clássico da casa.",
      preco: 38.9,
      imagem: ABS("/imgs/sushis/sushidog.webp"),
    },
    {
      id: "sd-polvo",
      nome: "Sushidog de Polvo",
      descricao: "Clássico da casa.",
      preco: 38.9,
      imagem: ABS("/imgs/sushis/sushidog.webp"),
    },
  ],

  // ESFIHAS — Tradicionais (6), Especiais (4), Doces (4)
  esfihas: [
    // Tradicionais
    { id: "es-mi", nome: "Esfiha Mista",          preco: 3.9, imagem: ABS("/imgs/esfihas/esfirrami.webp") },
    { id: "es-fr", nome: "Esfiha de Frango",      preco: 3.9, imagem: ABS("/imgs/esfihas/esfirrafr.webp") },
    { id: "es-mu", nome: "Esfiha de Mussarela",   preco: 3.9, imagem: ABS("/imgs/esfihas/esfirramu.webp") },
    { id: "es-cn", nome: "Esfiha de Carne Moída", preco: 3.9, imagem: ABS("/imgs/esfihas/esfirracn.webp") },
    { id: "es-cb", nome: "Esfiha de Calabresa",   preco: 3.9, imagem: ABS("/imgs/esfihas/esfirracb.webp") },
    { id: "es-mg", nome: "Esfiha de Marguerita",  preco: 3.9, imagem: ABS("/imgs/esfihas/esfirramg.webp") },

    // Especiais
    { id: "es-cm", nome: "Esfiha de Camarão",            preco: 4.9, imagem: ABS("/imgs/esfihas/esfirracm.webp") },
    { id: "es-cs", nome: "Esfiha de Carne de Sol",       preco: 4.9, imagem: ABS("/imgs/esfihas/esfirracs.webp") },
    { id: "es-fc", nome: "Esfiha Frango com Catupiry",   preco: 4.9, imagem: ABS("/imgs/esfihas/esfirrafc.webp") },
    { id: "es-qq", nome: "Esfiha Quatro Queijos",        preco: 4.9, imagem: ABS("/imgs/esfihas/esfirraqq.webp") },

    // Doces
    { id: "es-br", nome: "Esfiha de Brigadeiro",         preco: 4.9, imagem: ABS("/imgs/esfihas/esfihabr.webp") },
    { id: "es-bn", nome: "Esfiha de Banana",             preco: 4.9, imagem: ABS("/imgs/esfihas/esfihabn.webp") },
    { id: "es-mm", nome: "Esfiha M & M",                 preco: 4.9, imagem: ABS("/imgs/esfihas/esfihamm.webp") },
    { id: "es-rj", nome: "Esfiha Romeu & Julieta",       preco: 4.9, imagem: ABS("/imgs/esfihas/esfiharj.webp") },
  ],

  // BEBIDAS — 5 opções (como no seu HTML)
  bebidas: [
    { id: "bb-cc-350",  nome: "Coca-Cola 350ml",       descricao: "Coca-Cola 350ml.",       preco: 6.9, imagem: ABS("/imgs/bebidas/cocalt.webp") },
    { id: "bb-ccz-350", nome: "Coca-Cola Zero 350ml",  descricao: "Coca-Cola Zero 350ml.",  preco: 6.9, imagem: ABS("/imgs/bebidas/cocaltzr.webp") },
    { id: "bb-cc-1l",   nome: "Coca-Cola 1L",          descricao: "Coca-Cola 1L.",          preco: 9.9, imagem: ABS("/imgs/bebidas/coca1l.webp") },
    { id: "bb-ccz-1l",  nome: "Coca-Cola Zero 1L",     descricao: "Coca-Cola Zero 1L.",     preco: 9.9, imagem: ABS("/imgs/bebidas/coca1lzr.webp") },
    { id: "bb-gu-1l",   nome: "Guaraná 1L",            descricao: "Guaraná 1L.",            preco: 9.9, imagem: ABS("/imgs/bebidas/guarana1l.webp") },
  ],
};

// ====== FUNÇÕES UTILITÁRIAS ======
export function getAllMenu() {
  return menu;
}

export function getByCategory(category) {
  const key = String(category || "").toLowerCase();
  if (!CATEGORIES.includes(key)) return null;
  return menu[key];
}

export function searchMenu(q) {
  const text = String(q || "").trim().toLowerCase();
  if (!text) return [];
  const results = [];
  for (const cat of CATEGORIES) {
    const items = menu[cat];
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const hay = `${item.nome} ${item.descricao ?? ""}`.toLowerCase();
      if (hay.includes(text)) results.push({ ...item, categoria: cat });
    }
  }
  return results;
}
