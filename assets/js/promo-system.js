/*************************************************
 * SISTEMA DE PROMOÇÕES - IMPLEMENTAÇÃO
 * Fonte: :contentReference[oaicite:0]{index=0}
 *************************************************/

(function initPromoSystem() {
  // Aguardar DOM e configuração
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (typeof PROMOCAO_CONFIG === 'undefined') {
      console.warn('PROMOCAO_CONFIG não encontrada. Sistema de promoções desabilitado.');
      return;
    }

    initPopupPromocional();
    initSecaoPromocoes();
    initNavLinkPromocoes();
  }

  /*************************************************
   * POP-UP PROMOCIONAL (somente na Home)
   *************************************************/
  function initPopupPromocional() {
    const config = PROMOCAO_CONFIG.popup;

    // Não exibir popup em páginas internas (ex.: /assets/html/cardapio.html)
    if (window.location.pathname.includes('/assets/html/')) return;

    if (!config || !config.ativo) {
      // console.log('Pop-up promocional desativado');
      return;
    }

    // Verificar se já foi mostrado nesta sessão
    // if (sessionStorage.getItem('forno_popup_mostrado') === 'true') {
    //   return;
    // }

    // Criar estrutura do pop-up
    const overlay = document.createElement('div');
    overlay.id = 'promo-popup-overlay';
    overlay.innerHTML = `
      <div class="promo-popup-card">
        <button class="promo-popup-close" aria-label="Fechar" title="Fechar">✖</button>
        <div class="promo-popup-content">
          <div class="promo-popup-image-wrapper">
            ${config.badge ? `<div class="promo-popup-badge">${config.badge}</div>` : ''}
            <img 
              src="${config.imagem}" 
              alt="${config.produto || 'Promoção'}"
              class="promo-popup-image"
              onerror="this.src='./assets/imgs/fornoalenha.webp'"
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
      // Tenta adicionar ao carrinho se as funções existirem nesta página
      let conseguiuAdicionar = false;
      if (typeof addToCart === 'function') {
        addToCart(
          config.produto,
          Number(config.precoPromocional),
          1,
          { tipo: 'promocao', descricao: config.descricao || '' }
        );
        conseguiuAdicionar = true;
      }

      fecharPopup();

      if (conseguiuAdicionar && typeof openCart === 'function') {
        setTimeout(() => openCart(), 400);
      } else {
        // Sem carrinho na Home → vai para o Cardápio com a "bandeirinha" ?promo=1
        window.location.href = './assets/html/cardapio.html?promo=1#secao-promocoes';
      }
    });

    // Mostrar popup após 1 segundo
    setTimeout(() => {
      overlay.classList.add('show');
      document.body.classList.add('lock-scroll');
    }, 1000);
  }

  /*************************************************
   * SEÇÃO DE PROMOÇÕES NO CARDÁPIO
   *************************************************/
  function initSecaoPromocoes() {
    const config = PROMOCAO_CONFIG.secao;

    if (!config || !config.ativo || !Array.isArray(config.itens) || config.itens.length === 0) {
      // console.log('Seção de promoções desativada ou sem itens');
      return;
    }

    // Encontrar container principal (após o header, antes das pizzas)
    const container = document.querySelector('.container');
    const pizzasSection = document.getElementById('pizzas');

    if (!container || !pizzasSection) {
      console.warn('Container ou seção de pizzas não encontrada');
      return;
    }

    // Criar seção de promoções
    const secao = document.createElement('section');
    secao.id = 'secao-promocoes';
    secao.className = 'secao';
    secao.innerHTML = `
      <h1>${config.titulo || '🔥 Promoções'}</h1>
      <div class="promo-cards-grid" id="promo-cards-container"></div>
    `;

    // Inserir antes da seção de pizzas
    container.insertBefore(secao, pizzasSection);

    // Renderizar cards de promoção
    const cardsContainer = secao.querySelector('#promo-cards-container');
    config.itens.forEach((item) => {
      const card = criarCardPromocao(item);
      cardsContainer.appendChild(card);
    });
  }

  function criarCardPromocao(item) {
    const card = document.createElement('div');
    card.className = 'promo-card-item';

    const precoOriginal = Number(item.precoOriginal || 0);
    const precoPromocional = Number(item.precoPromocional || 0);
    const economia = Math.max(0, precoOriginal - precoPromocional);
    const percentual = precoOriginal > 0 ? Math.round((economia / precoOriginal) * 100) : 0;

    /*card.innerHTML = `
      ${item.badge ? `
      <div class="promo-card-badge">${item.badge}</div>` : ''}
        <img 
          src="${item.imagem}" 
          alt="${item.nome || 'Promoção'}"
          class="promo-card-image"
          onerror="this.src='../imgs/promocao/promosushi.jpeg'"
        />
      <div class="promo-card-body">
        <h3 class="promo-card-title">${item.nome || ''}</h3>
        ${item.descricao ? `<p class="promo-card-desc">${item.descricao}</p>` : ''}
        <div class="promo-card-prices">
          ${precoOriginal > 0 ? `<span class="promo-card-price-old">De R$ ${precoOriginal.toFixed(2).replace('.', ',')}</span>` : ''}
          <span class="promo-card-price-new">R$ ${precoPromocional.toFixed(2).replace('.', ',')}</span>
        </div>
        ${percentual > 0 ? `<p style="color:#4ade80;font-size:.9rem;margin:0 0 12px 0;">💰 Economize ${percentual}%</p>` : ''}
        <button class="promo-card-btn" type="button">Adicionar ao Carrinho</button>
      </div>
    `;*/

    // Adicionar evento ao botão
    const btn = card.querySelector('.promo-card-btn');
    btn.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        addToCart(
          item.nome,
          Number(item.precoPromocional),
          1,
          { tipo: 'promocao', descricao: item.descricao || '' }
        );

        // Feedback visual
        const oldText = btn.textContent;
        btn.textContent = '✓ Adicionado!';
        btn.style.background = '#4ade80';
        setTimeout(() => {
          btn.textContent = oldText;
          btn.style.background = '';
        }, 1200);

        if (typeof openCart === 'function') {
          setTimeout(() => openCart(), 300);
        }
      }
    });

    return card;
  }

  /*************************************************
   * LINK DE PROMOÇÕES NO NAV (Cardápio)
   *************************************************/
  function initNavLinkPromocoes() {
    const config = PROMOCAO_CONFIG.secao;
    if (!config || !config.ativo) return;

    const mainNav = document.querySelector('.main-nav');
    if (!mainNav) return;

    // Evitar duplicidade
    if (mainNav.querySelector('[data-target="promocoes"]')) return;

    // Criar link de promoções
    const link = document.createElement('a');
    link.className = 'nav-link nav-link-promo';
    link.href = '#secao-promocoes';
    link.setAttribute('data-target', 'promocoes');
    link.setAttribute('title', 'Promoções');
    link.innerHTML = `🔥<span>Promoções</span>`;

    // Inserir como primeiro item do nav
    mainNav.insertBefore(link, mainNav.firstChild);

    // Scroll suave e controle de estado
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const secao = document.getElementById('secao-promocoes');
      if (!secao) return;

      secao.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Atualizar classe ativa
      document.querySelectorAll('.main-nav .nav-link').forEach(n => n.classList.remove('active'));
      link.classList.add('active');

      // Fechar carrinho se estiver aberto
      const cartDrawer = document.getElementById('cart');
      if (cartDrawer && cartDrawer.classList.contains('open')) {
        cartDrawer.classList.remove('open');
        document.body.classList.remove('lock-scroll');
      }
    });
  }

})();
