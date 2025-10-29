/*************************************************
 * CONFIGURAÇÃO — AJUSTE PARA SEU NEGÓCIO
 *************************************************/

const WHATSAPP_NUMBER = "5582991201916";
const PIX_KEY = "59.130.875/0001-50";

/*************************************************
 * DADOS DO CARDÁPIO
 *************************************************/
const PRECO_PIZZA = {
  Tradicional: { Brotinho: 20.90, Média: 37.90, Grande: 47.90 },
  Especial:    { Brotinho: 30.90, Média: 49.90, Grande: 59.90 },
  Doce:        { Brotinho: 25.90,  Média: 39.90, Grande: 49.90 }
};
const PRECO_BORDA = { Brotinho: 0.00, Média: 12.90, Grande: 15.90 };

const SABORES = {
  Tradicional: [
    { name: "Mussarela", imagePath: "../imgs/pizza/mussarela.webp" },
    { name: "Mista", imagePath: "../imgs/pizza/mista.webp" },
    { name: "Calabresa", imagePath: "../imgs/pizza/calabresa.webp" },
    { name: "Milho", imagePath: "../imgs/pizza/milho.webp" },
    { name: "Frango", imagePath: "../imgs/pizza/frango.webp" },
    { name: "Marguerita", imagePath: "../imgs/pizza/marguerita.webp" },
    { name: "Baiana", imagePath: "../imgs/pizza/baiana.webp" },
    { name: "Napolitana", imagePath: "../imgs/pizza/napolitana.webp" }
  ],
  Especial: [
    { name: "Frango com Catupiry", imagePath: "../imgs/pizza/frangocatupiry.webp" },
    { name: "Carne de Sol", imagePath: "../imgs/pizza/carnedesol.webp" },
    { name: "Nordestina", imagePath: "../imgs/pizza/nordestina.webp" },
    { name: "Camarão", imagePath: "../imgs/pizza/camarao.webp" },
    { name: "Portuguesa", imagePath: "../imgs/pizza/portuguesa.webp" },
    { name: "Lombo Canadense", imagePath: "../imgs/pizza/lombocanadense.webp" },
    { name: "Quatro Queijos", imagePath: "../imgs/pizza/quatroqueijos.webp" },
    { name: "Bacon", imagePath: "../imgs/pizza/bacon.webp" },
    { name: "Atum", imagePath: "../imgs/pizza/atum.webp" },
    { name: "Catupirela", imagePath: "../imgs/pizza/catupirela.webp" }
  ],
  Doce: [
    { name: "Brigadeiro", imagePath: "../imgs/pizza/brigadeiro.webp" },
    { name: "M&M", imagePath: "../imgs/pizza/m&m.webp" },
    { name: "Banana", imagePath: "../imgs/pizza/banana.webp" },
    { name: "Romeu e Julieta", imagePath: "../imgs/pizza/romeuejulieta.webp" }
  ]
};

const BORDAS = [
  { name: "Nenhuma", imagePath: "../imgs/borda/nenhuma.png" },
  { name: "Mussarela", imagePath: "../imgs/borda/mussarela.webp" },
  { name: "Cheddar", imagePath: "../imgs/borda/cheddar.webp" },
  { name: "Catupiry", imagePath: "../imgs/borda/catupiry.webp" },
  { name: "Creme Cheese", imagePath: "../imgs/borda/cremecheese.webp" },
  { name: "Chocolate", imagePath: "../imgs/borda/chocolate.webp" }
];
const TAMANHOS = ["Brotinho", "Média", "Grande"];

/*************************************************
 * ESTADO GLOBAL
 *************************************************/
let cart = JSON.parse(localStorage.getItem("cart_fornoalenha") || "[]");
const deliveryState = {
  modo: "retirada", // retirada | delivery
  nome: "",
  telefone: "",
  rua: "",
  numero: "",
  complemento: "",
  cep: "",
  referencia: "",
  bairro: "", 
  formaPagamento: "dinheiro", // dinheiro | debito | credito | pix
  valorPago: 0,
  observacao: "" 
};

/*************************************************
 * ELEMENTOS
 *************************************************/
const cartDrawer   = document.getElementById('cart');
const openCartBtn  = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsEl  = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal    = document.getElementById('cart-total');
const cartCount    = document.getElementById('cart-count');
const btnFinalizar = document.getElementById('btn-finalizar');
const btnContinuar = document.getElementById('btn-continuar');

const btnMontePizza = document.getElementById('btn-monte-pizza');
const pizzaModal    = document.getElementById('pizza-modal');
const closeModalBtn = document.getElementById('close-modal');
const pizzaForm     = document.getElementById('pizza-form');
const tamanhoOptionsEl = document.getElementById('tamanho-options');
const saborOptionsEl   = document.getElementById('sabor-options');
const bordaOptionsEl   = document.getElementById('borda-options');
const hintPrecosFamilia = document.getElementById('hint-precos-familia');
const btnVoltarPizza = document.getElementById('btn-voltar-pizza'); 

// Campos de entrega/contato
const radiosModoEntrega = document.querySelectorAll('input[name="modo-entrega"]');
const deliveryFieldsBox = document.getElementById('delivery-fields');
const inputRua = document.getElementById('rua');
const inputNumero = document.getElementById('numero');
const inputComplemento = document.getElementById('complemento');
const inputCep = document.getElementById('cep');
const inputReferencia = document.getElementById('referencia');
const inputNome = document.getElementById('nome');
const inputTelefone = document.getElementById('telefone');
const inputBairro = document.getElementById('bairro');

// ELEMENTOS DE PAGAMENTO
const selectFormaPagamento = document.getElementById('forma-pagamento-select');
const dinheiroFields = document.getElementById('dinheiro-fields'); // pode não existir
const pixFields = document.getElementById('pix-fields');
const pixKeyEl = document.getElementById('pix-key');
const btnCopyPixInline = document.getElementById('btn-copy-pix-inline');

// NOVO: Campo de Observação
const inputObservacao = document.getElementById('observacao'); 

// Modal PIX (novo)
const pixAlert = document.getElementById('pix-alert');
const pixAlertKey = document.getElementById('pix-key-alert');
const btnPixFechar = document.getElementById('btn-pix-fechar');
const btnPixCancelar = document.getElementById('btn-pix-cancelar');
const btnPixContinuar = document.getElementById('btn-pix-continuar');
const btnCopyPix = document.getElementById('btn-copy-pix');

/*************************************************
 * NAV & HEADER EFFECTS
 *************************************************/
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 6);
});
document.querySelectorAll('.main-nav .nav-link').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelectorAll('.main-nav .nav-link').forEach(n => n.classList.remove('active'));
    a.classList.add('active');
    if (cartDrawer?.classList.contains('open')) closeCart();
    document.body.classList.remove('lock-scroll');
  });
});

/*************************************************
 * INICIALIZAÇÃO — CAMPOS DE ENTREGA E PAGAMENTO
 *************************************************/
(function initDeliveryAndPaymentFields() {
  // Inicialização PIX (inputs e botões de copiar)
  if (pixKeyEl) {
    pixKeyEl.value = PIX_KEY;
    pixKeyEl.parentElement.addEventListener('click', () => {
      navigator.clipboard.writeText(PIX_KEY);
      if (btnCopyPixInline) {
        const old = btnCopyPixInline.textContent;
        btnCopyPixInline.textContent = "Copiado!";
        setTimeout(()=>btnCopyPixInline.textContent = old, 1400);
      }
    });
  }
  if (btnCopyPixInline) {
    btnCopyPixInline.addEventListener('click', (e)=>{
      e.stopPropagation();
      navigator.clipboard.writeText(PIX_KEY);
      const old = btnCopyPixInline.textContent;
      btnCopyPixInline.textContent = "Copiado!";
      setTimeout(()=>btnCopyPixInline.textContent = old, 1400);
    });
  }
  if (pixAlertKey) {
    pixAlertKey.value = PIX_KEY;
  }

  // Inicialização Entrega
  radiosModoEntrega.forEach(r => {
    r.addEventListener('change', () => {
      deliveryState.modo = r.value;
      if (deliveryState.modo === "delivery") {
        deliveryFieldsBox.classList.remove('hidden');
      } else {
        deliveryFieldsBox.classList.add('hidden');
      }
      renderCart();
    });
  });

  // Captura de dados
  inputBairro?.addEventListener('input', e => deliveryState.bairro = e.target.value);
  inputRua?.addEventListener('input', e => deliveryState.rua = e.target.value);
  inputNumero?.addEventListener('input', e => deliveryState.numero = e.target.value);
  inputComplemento?.addEventListener('input', e => deliveryState.complemento = e.target.value);
  inputCep?.addEventListener('input', e => deliveryState.cep = e.target.value);
  inputReferencia?.addEventListener('input', e => deliveryState.referencia = e.target.value);
  inputNome?.addEventListener('input', e => deliveryState.nome = e.target.value);
  inputTelefone?.addEventListener('input', e => deliveryState.telefone = e.target.value);
  inputObservacao?.addEventListener('input', e => deliveryState.observacao = e.target.value);
  
  // Pagamento (Select)
  if (selectFormaPagamento) {
    selectFormaPagamento.addEventListener('change', (e) => {
      deliveryState.formaPagamento = e.target.value;
      if (typeof dinheiroFields !== "undefined" && dinheiroFields) dinheiroFields.classList.add('hidden');
      pixFields.classList.add('hidden');
      if (deliveryState.formaPagamento === "dinheiro") {
        if (typeof dinheiroFields !== "undefined" && dinheiroFields) dinheiroFields.classList.remove('hidden');
      } else if (deliveryState.formaPagamento === "pix") {
        pixFields.classList.remove('hidden');
      }
      renderCart();
    });
  }
})();

/*************************************************
 * UI DO MODAL — MONTE SUA PIZZA
 *************************************************/
function renderGrupoSabores(titulo, lista, familia) {
  const itens = lista.map((sabor, i) => `
    <input type="checkbox" id="sabor-${familia}-${i}" name="sabor" value="${sabor.name}" data-familia="${familia}">
    <label for="sabor-${familia}-${i}">
        <img class="sabor-img" src="${sabor.imagePath}" alt="${sabor.name}">
        ${sabor.name}
    </label>
  `).join('');
  return `
    <div class="grupo-sabores">
      <strong>${titulo}</strong>
      <div class="options options-grid">
        ${itens}
      </div>
      <hr style="margin:8px 0;border:none;border-top:1px dashed #222;">
    </div>
  `;
}

function populatePizzaOptions() {
  tamanhoOptionsEl.innerHTML = TAMANHOS.map((t) => `
    <input type="radio" id="tamanho-${t}" name="tamanho" value="${t}" ${t==="Grande" ? "checked" : ""}>
    <label for="tamanho-${t}">${t}</label>
  `).join('');

  saborOptionsEl.innerHTML = `
    ${renderGrupoSabores("Tradicionais", SABORES.Tradicional, "Tradicional")}
    ${renderGrupoSabores("Especiais", SABORES.Especial, "Especial")}
    ${renderGrupoSabores("Doces", SABORES.Doce, "Doce")}
  `;

  bordaOptionsEl.innerHTML = BORDAS.map((borda, i) => `
    <input type="radio" id="borda-${i}" name="borda" value="${borda.name}" ${borda.name === "Nenhuma" ? "checked" : ""}>
    <label for="borda-${i}">
        <img class="sabor-img" src="${borda.imagePath}" alt="${borda.name}">
        ${borda.name}
    </label>
  `).join('');

  pizzaForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', handlePizzaChange);
  });

  updateHintPrecosFamilia();
  handlePizzaChange();
}

function updateHintPrecosFamilia() {
  const t = getSelectedTamanho();
  if (!t) {
    hintPrecosFamilia.textContent = "Selecione um tamanho para ver os preços por família.";
    return;
  }
  const trad = PRECO_PIZZA.Tradicional[t];
  const esp  = PRECO_PIZZA.Especial[t];
  const doce = PRECO_PIZZA.Doce[t];

  const partes = [];
  if (trad) partes.push(`Tradicionais: R$ ${trad.toFixed(2)}`);
  if (esp)  partes.push(`Especiais: R$ ${esp.toFixed(2)}`);
  if (doce) partes.push(`Doces: R$ ${doce.toFixed(2)}`);
  hintPrecosFamilia.textContent = partes.join(" • ");
}

/*************************************************
 * LÓGICA DE PIZZA
 *************************************************/
function getSelectedTamanho() {
  const r = pizzaForm.querySelector('input[name="tamanho"]:checked');
  return r ? r.value : null;
}

/* Limitação dinâmica: 1 sabor para Brotinho, 2 para demais tamanhos */
function limitPizzaFlavors() {
  const max = getSelectedTamanho() === "Brotinho" ? 1 : 2;
  const selected = [...pizzaForm.querySelectorAll('input[name="sabor"]:checked')];
  if (selected.length > max) {
    // mantém os primeiros selecionados e desmarca o último clicado
    selected.slice(max).forEach(inp => inp.checked = false);
  }
}

function handlePizzaChange() {
  limitPizzaFlavors();
  toggleBordaByTamanho();
  updateHintPrecosFamilia();

  // Se mudou para Brotinho e havia 2 sabores, garante apenas 1
  if (getSelectedTamanho() === "Brotinho") {
    const sel = [...pizzaForm.querySelectorAll('input[name="sabor"]:checked')];
    sel.slice(1).forEach(inp => inp.checked = false);
  }
  calculatePizzaPrice();
}

function toggleBordaByTamanho() {
  const t = getSelectedTamanho();
  const isBrotinho = t === "Brotinho";
  pizzaForm.querySelectorAll('input[name="borda"]').forEach((r) => {
    if (r.value === "Nenhuma") {
      r.disabled = false;
      if (isBrotinho) r.checked = true;
    } else {
      r.disabled = isBrotinho;
      if (isBrotinho) r.checked = false;
    }
  });
}

function calculatePizzaPrice() {
  const selectedTamanho = pizzaForm.querySelector('input[name="tamanho"]:checked');
  const selectedSabores = pizzaForm.querySelectorAll('input[name="sabor"]:checked');
  const selectedBorda   = pizzaForm.querySelector('input[name="borda"]:checked');

  let tamanho = selectedTamanho ? selectedTamanho.value : null;
  let borda   = selectedBorda   ? selectedBorda.value   : "Nenhuma";

  let subtotalPizza = 0;
  let tituloPizza   = "Pizza - Escolha os Sabores";

  if (tamanho && selectedSabores.length > 0) {
    let familias = new Set();
    let nomes    = [];
    selectedSabores.forEach(i => {
      familias.add(i.dataset.familia);
      nomes.push(i.value);
    });

    let maiorPreco = 0;
    familias.forEach(fam => {
      const tabela = PRECO_PIZZA[fam];
      const preco  = tabela ? tabela[tamanho] : 0;
      if (preco && preco > maiorPreco) maiorPreco = preco;
    });

    subtotalPizza = maiorPreco || 0;
    tituloPizza   = (nomes.length > 1)
      ? `Pizza Meio a Meio (${nomes.join(' / ')})`
      : `Pizza de ${nomes[0]}`;
  }

  const adicionalBorda = (borda && borda !== "Nenhuma") ? (PRECO_BORDA[tamanho] || 0) : 0;

  const subtotal = Math.round(subtotalPizza * 100) / 100;
  const total    = Math.round((subtotal + adicionalBorda) * 100) / 100;

  document.getElementById('pizza-subtotal').textContent     = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('borda-adicional').textContent    = `R$ ${adicionalBorda.toFixed(2).replace('.', ',')}`;
  document.getElementById('pizza-final-price').textContent  = `R$ ${total.toFixed(2).replace('.', ',')}`;

  return {
    precoFinal: total,
    nomePizza: tituloPizza,
    tamanho,
    borda,
    sabores: Array.from(selectedSabores).map(i => i.value)
  };
}

/*************************************************
 * CARRINHO
 *************************************************/
function saveCart() { localStorage.setItem("cart_fornoalenha", JSON.stringify(cart)); }
function formatBRL(v) { return `R$ ${v.toFixed(2).replace('.', ',')}`; }
function addToCart(name, price, qty = 1, meta = {}) {
  const key = JSON.stringify({ name, price, meta });
  const existing = cart.find(i => JSON.stringify({ name: i.name, price: i.price, meta: i.meta }) === key);
  if (existing) existing.qty += qty; else cart.push({ name, price, qty, meta });
  renderCart(); openCart();
}
function removeFromCart(index) { cart.splice(index, 1); renderCart(); }
function changeQty(index, delta) { cart[index].qty += delta; if (cart[index].qty <= 0) cart.splice(index, 1); renderCart(); }

function renderCart() {
  if (!cartItemsEl) return;
  cartItemsEl.innerHTML = '';
  let subtotal = 0; 

  cart.forEach((item, idx) => {
    const line = item.price * item.qty;
    subtotal += line;

    const metaLines = [];
    if (item.meta?.tamanho) metaLines.push(`Tamanho: ${item.meta.tamanho}`);
    if (item.meta?.borda && item.meta.borda !== "Nenhuma") metaLines.push(`Borda: ${item.meta.borda}`);
    if (item.meta?.sabores?.length) metaLines.push(`Sabores: ${item.meta.sabores.slice(0, 2).join(' / ')}${item.meta.sabores.length > 2 ? '...' : ''}`);

    const metaText = metaLines.join(" • ");

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="title">${item.name}</div>
      ${metaText ? `<div class="meta">${metaText}</div>` : ""}
      <div class="controls">
        <div class="qty">
          <button onclick="changeQty(${idx}, -1)">−</button>
          <strong>${item.qty}</strong>
          <button onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <div>
          <strong>${formatBRL(line)}</strong>
          <button class="icon-btn" style="margin-left:8px" title="Remover" onclick="removeFromCart(${idx})">🗑️</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(el);
  });

  const total = subtotal;

  cartSubtotal.textContent = formatBRL(subtotal);
  cartTotal.textContent    = formatBRL(total);
  cartCount.textContent    = cart.reduce((s,i)=>s+i.qty,0);

  saveCart();
}

/*************************************************
 * WHATSAPP — MENSAGEM (modelo novo)
 *************************************************/
function montarMensagemWhatsApp() {
  const linhas = [];
  const SEP = "====================================";

  // Cabeçalho
  linhas.push("🍕 NOVO PEDIDO — Forno a Lenha 🍕");
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");
  linhas.push("ITENS DO PEDIDO:");
  linhas.push("");

  // Itens
  cart.forEach(i => {
    const totalItem = i.price * i.qty;
    // Título do item (nome + tamanho no nome) — exibe no padrão solicitado
    let titulo = `• ${i.qty}x ${i.name.replace(/\s+\(.+\)$/, '').trim()}`;
    // Se houver tamanho no meta, exibir junto ao título
    if (i.meta?.tamanho) {
      // Ex.: "Pizza Grande"
      const tipo = (i.name.toLowerCase().includes("pizza") ? "Pizza " : "");
      titulo = `• ${i.qty}x ${tipo}${i.meta.tamanho}`;
    }
    titulo += ` - ${formatBRL(totalItem)}`;
    linhas.push(titulo);

    // Sabores — se 2 sabores, usa "¹/²"
    if (i.meta?.sabores?.length) {
      if (i.meta.sabores.length === 2) {
        linhas.push(`¹/² ${i.meta.sabores[0]}`);
        linhas.push(`¹/² ${i.meta.sabores[1]}`);
      } else {
        // único sabor
        linhas.push(`${i.meta.sabores[0]}`);
      }
    }

    // Borda (em linha separada com seu preço específico)
    if (i.meta?.borda && i.meta.borda !== "Nenhuma" && i.meta?.tamanho) {
      const adicionalBorda = PRECO_BORDA[i.meta.tamanho] || 0;
      if (adicionalBorda > 0) {
        linhas.push("");
        linhas.push(`• Borda: ${i.meta.borda} - ${formatBRL(adicionalBorda)}`);
      }
    }

    linhas.push(""); // espaço entre itens
  });

  // Totais
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const total = subtotal;

  linhas.push(SEP);
  linhas.push("");
  linhas.push(`SUBTOTAL: ${formatBRL(subtotal)}`);
  linhas.push(`TOTAL: ${formatBRL(total)}`);
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");
  
  // Forma de pagamento
  linhas.push("FORMA DE PAGAMENTO:");
  if (deliveryState.formaPagamento === "dinheiro") {
    linhas.push("* Dinheiro (Pagamento em mãos)");
  } else if (deliveryState.formaPagamento === "debito") {
    linhas.push("* Cartão de Débito (Máquina na entrega)");
  } else if (deliveryState.formaPagamento === "credito") {
    linhas.push("* Cartão de Crédito (Máquina na entrega)");
  } else if (deliveryState.formaPagamento === "pix") {
    linhas.push("* PIX (Comprovante em anexo)");
  }
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");

  // Entrega
  linhas.push(`ENTREGA: ${deliveryState.modo === "delivery" ? "Delivery" : "Retirada no balcão"}`);
  if (deliveryState.modo === "delivery") {
    linhas.push("DADOS DA ENTREGA:");
    if (deliveryState.rua) linhas.push(`* Rua/Avenida: ${deliveryState.rua}`);
    if (deliveryState.numero) linhas.push(`* Nº: ${deliveryState.numero}`);
    if (deliveryState.complemento) linhas.push(`* Comp.: ${deliveryState.complemento}`);
    if (deliveryState.bairro) linhas.push(`* Bairro: ${deliveryState.bairro}`);
    if (deliveryState.cep) linhas.push(`* CEP: ${deliveryState.cep}`);
    if (deliveryState.referencia) {
      // Se a referência for muito longa, pode conter quebra natural
      linhas.push(`* Referência: ${deliveryState.referencia}`);
    }
    linhas.push("");
  }
  linhas.push(SEP);
  linhas.push("");

  // Contato
  linhas.push("DADOS DE CONTATO:");
  linhas.push(`* Nome: ${deliveryState.nome || "—"}`);
  linhas.push(`* Telefone: ${deliveryState.telefone || "—"}`);
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");

  // Observação
  if (deliveryState.observacao) {
    linhas.push(`OBSERVAÇÃO: ${deliveryState.observacao}`);
    linhas.push("");
    linhas.push(SEP);
    linhas.push("");
  }

  // Agradecimento
  linhas.push("Obrigado pela preferência!");

  return linhas.join("\n");
}

function validarDadosAntesDeEnviar() {
  if (!cart.length) { alert('Seu carrinho está vazio.'); return false; }
  if (!deliveryState.nome || !deliveryState.telefone) {
    alert('Informe seu nome e telefone (WhatsApp).'); return false;
  }
  if (deliveryState.modo === "delivery") {
    if (!deliveryState.rua || !deliveryState.numero || !deliveryState.bairro) { 
      alert('Informe o Bairro, Rua/Avenida e número para a entrega.'); return false; 
    }
  }
  return true;
}

/*************************************************
 * AJUDANTES MODAL PIX
 *************************************************/
function openPixAlert(){
  try { closeCart(); } catch(e){}
  pixAlert.classList.add('open');
  pixAlert.setAttribute('aria-hidden','false');
  document.body.classList.add('lock-scroll');
}
function closePixAlert(){
  pixAlert.classList.remove('open');
  pixAlert.setAttribute('aria-hidden','true');
  document.body.classList.remove('lock-scroll');
}

/*************************************************
 * EVENTOS GERAIS
 *************************************************/
function openCart(){ cartDrawer.classList.add('open'); document.body.classList.add('lock-scroll'); }
function closeCart(){ cartDrawer.classList.remove('open'); document.body.classList.remove('lock-scroll'); }

function initAppListeners() {
  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);

  btnContinuar?.addEventListener('click', () => {
    closeCart();
    document.querySelector('.container')?.scrollIntoView({behavior:'smooth', block:'start'}); 
  });

  // FINALIZAR: agora com fluxo especial para PIX
  btnFinalizar?.addEventListener('click', () => {
    if (!validarDadosAntesDeEnviar()) return;

    // Se for PIX, abre modal com chave e botão copiar
    if (deliveryState.formaPagamento === "pix") {
      openPixAlert();
      return;
    }

    // Demais formas: envia direto
    const texto = montarMensagemWhatsApp();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });

  // PIX Modal — botões
  btnPixFechar?.addEventListener('click', closePixAlert);
  btnPixCancelar?.addEventListener('click', closePixAlert);

  btnPixContinuar?.addEventListener('click', () => {
    const texto = montarMensagemWhatsApp();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    closePixAlert();
  });

  btnCopyPix?.addEventListener('click', () => {
    navigator.clipboard.writeText(PIX_KEY);
    const old = btnCopyPix.textContent;
    btnCopyPix.textContent = "Copiado!";
    setTimeout(()=>btnCopyPix.textContent = old, 1400);
  });

  /* Modal Monte sua Pizza */
  btnMontePizza?.addEventListener('click', () => {
    pizzaModal.classList.add('open');
    document.body.classList.add('lock-scroll');
    populatePizzaOptions();
  });
  closeModalBtn?.addEventListener('click', () => {
    pizzaModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  });
  pizzaModal?.addEventListener('click', (e) => {
    if (e.target === pizzaModal){
      pizzaModal.classList.remove('open');
      document.body.classList.remove('lock-scroll');
    }
  });
  btnVoltarPizza?.addEventListener('click', () => {
    pizzaModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  });

  /* Submit da pizza */
  pizzaForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const { precoFinal, nomePizza, tamanho, borda, sabores } = calculatePizzaPrice();
    if (precoFinal <= 0) { alert('Escolha pelo menos 1 sabor e um tamanho válido.'); return; }
    const meta = { tamanho, borda, sabores };
    addToCart(`${nomePizza} (${tamanho})`, precoFinal, 1, meta);
    pizzaModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  });
}

/*************************************************
 * INICIALIZAÇÃO DA APLICAÇÃO
 *************************************************/
renderCart();
initAppListeners();