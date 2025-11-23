/*************************************************
 * CONFIGURAÇÃO DE PROMOÇÕES
 * Configure aqui suas promoções facilmente
 *************************************************/

const PROMOCAO_CONFIG = {
  // ===== POP-UP DA TELA INICIAL =====
  popup: {
    ativo: true, // true = mostrar popup | false = ocultar popup
    imagem: "./assets/imgs/promocao/promosushi.jpeg", // Caminho da imagem do popup
    produto: "Sushidog Salmão Grelhado", // Nome do produto em promoção
    precoOriginal: 38.90, // Preço original (será mostrado riscado)
    precoPromocional: 31.90, // Preço da promoção
    descricao: "Salmão grelhado com molho especial, clássico da casa!", // Descrição da promoção
    badge: "PROMOÇÃO", // Texto do badge (ex: "50% OFF", "PROMOÇÃO", etc)
  },

  // ===== SEÇÃO NO CARDÁPIO =====
  secao: {
    ativo: false, // true = mostrar seção | false = ocultar seção
    titulo: "🔥 Promoções da Semana",
    itens: [
      {
        nome: "Temaki Salmão Grelhado",
        imagem: "./assets/imgs/promocao/promotemaki.jpeg",
        descricao: "Temaki de salmão grelhado com molho especial.",
        precoOriginal: 120.00,
        precoPromocional: 89.90,
        badge: "COMBO"
      },
      {
        nome: "Sushidog Salmão Grelhado",
        imagem: "./assets/imgs/promocao/promosushi.jpeg",
        descricao: "Salmão grelhado com molho especial, clássico da casa!",
        precoOriginal: 38.90,
        precoPromocional: 31.90,
        badge: "PROMOÇÃO"
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