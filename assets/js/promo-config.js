/*************************************************
 * CONFIGURAÇÃO DE PROMOÇÕES
 * Configure aqui suas promoções facilmente
 *************************************************/

const PROMOCAO_CONFIG = {
  // ===== POP-UP DA TELA INICIAL =====
  popup: {
    ativo: false, // true = mostrar popup | false = ocultar popup
    imagem: "./assets/imgs/card-garage.jpeg", // Caminho da imagem do popup
    produto: "Pizza Grande Especial", // Nome do produto em promoção
    precoOriginal: 59.90, // Preço original (será mostrado riscado)
    precoPromocional: 45.90, // Preço da promoção
    descricao: "Pizza Grande de qualquer sabor especial!", // Descrição da promoção
    badge: "50% OFF", // Texto do badge (ex: "50% OFF", "PROMOÇÃO", etc)
  },

  // ===== SEÇÃO NO CARDÁPIO =====
  secao: {
    ativo: false, // true = mostrar seção | false = ocultar seção
    titulo: "🔥 Promoções da Semana",
    itens: [
      {
        nome: "Combo Família",
        imagem: "./assets/imgs/promo.jpg",
        descricao: "2 Pizzas Grandes + 2 Refrigerantes 2L",
        precoOriginal: 120.00,
        precoPromocional: 89.90,
        badge: "COMBO"
      },
      {
        nome: "Pizza do Dia",
        imagem: "./assets/imgs/promo.jpg",
        descricao: "Pizza Média Especial com Borda Grátis",
        precoOriginal: 62.80,
        precoPromocional: 49.90,
        badge: "BORDA GRÁTIS"
      }
      // Adicione mais promoções aqui se desejar
    ]
  }
};

/*************************************************
 * NÃO EDITE DAQUI PARA BAIXO
 * (A menos que saiba o que está fazendo)
 *************************************************/

// Salvar configuração no localStorage
function salvarConfigPromocao() {
  try {
    localStorage.setItem('forno_promo_config', JSON.stringify(PROMOCAO_CONFIG));
  } catch (e) {
    console.warn('Erro ao salvar configuração de promoção:', e);
  }
}

// Carregar configuração do localStorage
function carregarConfigPromocao() {
  try {
    const saved = localStorage.getItem('forno_promo_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(PROMOCAO_CONFIG, parsed);
    }
  } catch (e) {
    console.warn('Erro ao carregar configuração de promoção:', e);
  }
}

// Inicializar
carregarConfigPromocao();

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.PROMOCAO_CONFIG = PROMOCAO_CONFIG;
  window.salvarConfigPromocao = salvarConfigPromocao;
}