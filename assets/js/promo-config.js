/*************************************************
 * CONFIGURAÇÃO DE PROMOÇÕES
 * Configure aqui suas promoções facilmente
 *************************************************/

const PROMOCAO_CONFIG = {
  // ===== POP-UP DA TELA INICIAL =====
  popup: {
    ativo: true,
    imagem: "./assets/imgs/promocao/promoesfihas.jpeg", 
    produto: "Promoção Esfihas - 10unidades",
    precoOriginal: 39.90,
    precoPromocional: 19.00,
    descricao: "10 unidades - Apenas sabores tradicionais (Mista, Frango, Mussarela, Calabresa e Marguerita.",
    badge: "PROMOÇÃO",
  },

  // ===== SEÇÃO NO CARDÁPIO =====
  secao: [
    {
      ativo: true,
      titulo: "🔥 Promoções de Hoje",
      itens: [
        {
          nome: "Pedido Mínimo 10 unidades",
          imagem: "./assets/imgs/promocao/promoesfihas.jpeg",
          descricao: "10 unidades - Apenas sabores tradicionais (Mista, Frango, Mussarela, Calabresa e Marguerita.",
          precoOriginal: 39.90,
          precoPromocional: 19.00,
          badge: "PROMOÇÃO"
        }
      ]
  },
  {
    ativo: false,
    titulo: "🔥 Promoções da Semana",
    itens: [
        {
          nome: "Temaki Salmão Grelhado",
          imagem: "./assets/imgs/promocao/promotemaki.jpeg",
          descricao: "Temaki de salmão grelhado com molho especial.",
          precoOriginal: 37.90,
          precoPromocional: 31.90,
          badge: "PROMOÇÃO"
        },
        {
          nome: "Sushidog Salmão Grelhado",
          imagem: "./assets/imgs/promocao/promosushi.jpeg",
          descricao: "Salmão grelhado com molho especial, clássico da casa!",
          precoOriginal: 38.90,
          precoPromocional: 31.90,
          badge: "PROMOÇÃO"
        }
      ]
    }
  ]
};

// ... (O restante do código de salvar/carregar permanece igual) ...
// Salvar configuração no localStorage
function salvarConfigPromocao() {
  try {
    localStorage.setItem('forno_promo_config', JSON.stringify(PROMOCAO_CONFIG));
  } catch (e) {
    console.warn('Erro ao salvar configuração de promoção:', e);
  }
}

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

carregarConfigPromocao();

if (typeof window !== 'undefined') {
  window.PROMOCAO_CONFIG = PROMOCAO_CONFIG;
  window.salvarConfigPromocao = salvarConfigPromocao;
}
