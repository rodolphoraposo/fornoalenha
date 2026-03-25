/*************************************************
 * SISTEMA DE PROMOÇÕES - FINAL
 * Correção: Caminhos dinâmicos + Layout Padrão + Imagem Inteira
 *************************************************/

(function initPromoSystem() {
  // Aguardar DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // --- FUNÇÃO AUXILIAR PARA CORRIGIR CAMINHOS ---
  // Se estivermos dentro da pasta /html/ (Cardápio),
  // trocamos "./assets/" por "../" para a imagem não quebrar.
  function corrigirCaminhoImagem(caminhoOriginal) {
    if (window.location.pathname.includes('/assets/html/')) {
      return caminhoOriginal.replace('./assets/', '../');
    }
    return caminhoOriginal; // Se estiver na Home, mantém original
  }

  function init() {
    if (typeof PROMOCAO_CONFIG === 'undefined') {
      console.warn('PROMOCAO_CONFIG não encontrada.');
      return;
    }
    initPopupPromocional();
    initSecaoPromocoes();
    initNavLinkPromocoes();
  }

  /*************************************************
   * POP-UP PROMOCIONAL (Home)
   *************************************************/
  function initPopupPromocional() {
    const config = PROMOCAO_CONFIG.popup;
    
    // Se estiver no cardápio, não mostra popup (regra original)
    if (window.location.pathname.includes('/assets/html/')) return;

    if (!config || !config.ativo) return;

    // Verificar se já mostrou (opcional, descomente se quiser ativar)
    // if (sessionStorage.getItem('forno_popup_mostrado') === 'true') return;

    const overlay = document.createElement('div');
    overlay.id = 'promo-popup-overlay';
    
    // Aqui usamos o config.imagem direto, pois na Home o caminho ./assets funciona
    overlay.innerHTML = `
      <div class="promo-popup-card">
        <button class="promo-popup-close" aria-label="Fechar">✖</button>
        <div class="promo-popup-content">
          <div class="promo-popup-image-wrapper">
            ${config.badge ? `<div class="promo-popup-badge">${config.badge}</div>` : ''}
            <img 
              src="${config.imagem}" 
              alt="${config.produto}"
              class="promo-popup-image"
            />
            <div class="promo-popup-footer">
              <button class="promo-popup-btn" type="button">${config.rotuloCTA || 'Pedir agora'}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const btnClose = overlay.querySelector('.promo-popup-close');
    const btnPedir = overlay.querySelector('.promo-popup-btn');

    function fecharPopup() {
      overlay.classList.remove('show');
      sessionStorage.setItem('forno_popup_mostrado', 'true');
      document.body.classList.remove('lock-scroll');
      setTimeout(() => overlay.remove(), 300);
    }

    btnClose.addEventListener('click', fecharPopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fecharPopup(); });

    btnPedir.addEventListener('click', () => {
      // Redireciona para o cardápio ativando a promo
      window.location.href = './assets/html/cardapio.html?promo=1#secao-promocoes';
    });

    setTimeout(() => {
      overlay.classList.add('show');
      document.body.classList.add('lock-scroll');
    }, 1000);
  }

  /*************************************************
   * SEÇÃO DE PROMOÇÕES (Cardápio)
   *************************************************/
  function initSecaoPromocoes() {
    const secoes = PROMOCAO_CONFIG.secao;
  
    // ✅ Verifica se é array e filtra apenas as seções ativas com itens
    if (!Array.isArray(secoes)) return;
    const secoesAtivas = secoes.filter(s => s.ativo && Array.isArray(s.itens) && s.itens.length > 0);
    if (secoesAtivas.length === 0) return;
  
    const container = document.querySelector('.container');
    const pizzasSection = document.getElementById('pizzas');
    if (!container || !pizzasSection) return;
  
    // ✅ Itera sobre cada seção ativa
    secoesAtivas.forEach((config, index) => {
      const secao = document.createElement('section');
      secao.id = index === 0 ? 'secao-promocoes' : `secao-promocoes-${index}`;
      secao.className = 'secao';
      secao.innerHTML = `
        <h1>${config.titulo || '🔥 Promoções'}</h1>
        <div class="cards" id="promo-cards-container-${index}"></div>
      `;
  
      container.insertBefore(secao, pizzasSection);
  
      const cardsContainer = secao.querySelector(`#promo-cards-container-${index}`);
      config.itens.forEach((item) => {
        const card = criarCardPromocaoPadrao(item);
        cardsContainer.appendChild(card);
      });
    });
  }

  function criarCardPromocaoPadrao(item) {
    const card = document.createElement('div');
    card.className = 'card';

    // 1. Corrige o caminho da imagem dinamicamente
    const imgPath = corrigirCaminhoImagem(item.imagem);

    const precoOriginal = Number(item.precoOriginal || 0);
    const precoPromocional = Number(item.precoPromocional || 0);
    const precoFormatado = precoPromocional.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const originalFormatado = precoOriginal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    // 2. Monta o HTML com object-fit: contain e layout padrão
    card.innerHTML = `
      <img 
        class="card-img" 
        src="${imgPath}" 
        alt="${item.nome}" 
        loading="lazy" 
        style="object-fit: contain;"
      >
      <h3>${item.nome}
          ${item.badge ? `<small style="background:var(--acc); color:#000; padding:2px 6px; border-radius:4px; font-size:10px; margin-left:6px; vertical-align:middle;">${item.badge}</small>` : ''}
      </h3>
      
      ${item.descricao ? `<p>${item.descricao}</p>` : '<p class="muted">Promoção especial.</p>'}
      
      <div style="margin-top:auto;">
        ${precoOriginal > precoPromocional ? `<span style="text-decoration: line-through; color: var(--muted); font-size: 0.85em; display: block;">R$ ${originalFormatado}</span>` : ''}
        <span class="price">R$ ${precoFormatado}</span>
      </div>
      
      <button class="btn btn-add btn-primary" style="margin-top:8px; width:100%;">Adicionar</button>
    `;

    // Evento adicionar
    card.querySelector('.btn-add').addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        addToCart(
          item.nome,
          precoPromocional,
          1,
          { tipo: 'promocao', descricao: item.descricao || '' }
        );
        if (typeof openCart === 'function') openCart();
      }
    });

    return card;
  }

  /*************************************************
   * LINK NAV
   *************************************************/
  function initNavLinkPromocoes() {
  const secoes = PROMOCAO_CONFIG.secao;

  // ✅ Só cria o link se houver ao menos uma seção ativa
  if (!Array.isArray(secoes) || !secoes.some(s => s.ativo)) return;

  const mainNav = document.querySelector('.main-nav');
  if (!mainNav || mainNav.querySelector('[data-target="promocoes"]')) return;

  const link = document.createElement('a');
  link.className = 'nav-link';
  link.href = '#secao-promocoes';
  link.dataset.target = 'promocoes';
  link.title = 'Promoções';
  link.innerHTML = `🔥<span>Promoções</span>`;

  mainNav.insertBefore(link, mainNav.firstChild);

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const secao = document.getElementById('secao-promocoes');
    if (!secao) return;

    const headerOffset = 100;
    const elementPosition = secao.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

    document.querySelectorAll('.main-nav .nav-link').forEach(n => n.classList.remove('active'));
    link.classList.add('active');
  });
}

})();
