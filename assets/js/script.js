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
    { name: "Mussarela", imagePath: "../imgs/pizzas/mussarela.webp" },
    { name: "Mista", imagePath: "../imgs/pizzas/mista.webp" },
    { name: "Calabresa", imagePath: "../imgs/pizzas/calabresa.webp" },
    { name: "Milho", imagePath: "../imgs/pizzas/milho.webp" },
    { name: "Frango", imagePath: "../imgs/pizzas/frango.webp" },
    { name: "Marguerita", imagePath: "../imgs/pizzas/marguerita.webp" },
    { name: "Baiana", imagePath: "../imgs/pizzas/baiana.webp" },
    { name: "Napolitana", imagePath: "../imgs/pizzas/napolitana.webp" }
  ],
  Especial: [
    { name: "Frango com Catupiry", imagePath: "../imgs/pizzas/frangocatupiry.webp" },
    { name: "Carne de Sol", imagePath: "../imgs/pizzas/carnedesol.webp" },
    { name: "Nordestina", imagePath: "../imgs/pizzas/nordestina.webp" },
    { name: "Camarão", imagePath: "../imgs/pizzas/camarao.webp" },
    { name: "Portuguesa", imagePath: "../imgs/pizzas/portuguesa.webp" },
    { name: "Lombo Canadense", imagePath: "../imgs/pizzas/lombocanadense.webp" },
    { name: "Quatro Queijos", imagePath: "../imgs/pizzas/quatroqueijos.webp" },
    { name: "Bacon", imagePath: "../imgs/pizzas/bacon.webp" },
    { name: "Atum", imagePath: "../imgs/pizzas/atum.webp" },
    { name: "Catupirela", imagePath: "../imgs/pizzas/catupirela.webp" }
  ],
  Doce: [
    { name: "Brigadeiro", imagePath: "../imgs/pizzas/brigadeiro.webp" },
    { name: "M&M", imagePath: "../imgs/pizzas/m&m.webp" },
    { name: "Banana", imagePath: "../imgs/pizzas/banana.webp" },
    { name: "Romeu e Julieta", imagePath: "../imgs/pizzas/romeuejulieta.webp" }
  ]
};

const BORDAS = [
  { name: "Nenhuma", imagePath: "../imgs/bordas/nenhuma.png" },
  { name: "Mussarela", imagePath: "../imgs/bordas/mussarela.webp" },
  { name: "Cheddar", imagePath: "../imgs/bordas/cheddar.webp" },
  { name: "Catupiry", imagePath: "../imgs/bordas/catupiry.webp" },
  { name: "Creme Cheese", imagePath: "../imgs/bordas/cremecheese.webp" },
  { name: "Chocolate", imagePath: "../imgs/bordas/chocolate.webp" }
];
const TAMANHOS = ["Brotinho", "Média", "Grande"];

/*************************************************
 * ESTADO GLOBAL
 *************************************************/
let cart = JSON.parse(localStorage.getItem("cart_fornoalenha") || "[]");
const deliveryState = {
  modo: "retirada",
  nome: "",
  telefone: "",
  rua: "",
  numero: "",
  complemento: "",
  cep: "",
  referencia: "",
  bairro: "", 
  formaPagamento: "dinheiro",
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
const hintSabores = document.getElementById('hint-sabores');
const btnVoltarPizza = document.getElementById('btn-voltar-pizza'); 

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

const selectFormaPagamento = document.getElementById('forma-pagamento-select');
const dinheiroFields = document.getElementById('dinheiro-fields');
const pixFields = document.getElementById('pix-fields');
const pixKeyEl = document.getElementById('pix-key');
const btnCopyPixInline = document.getElementById('btn-copy-pix-inline');

const inputObservacao = document.getElementById('observacao'); 

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

  inputBairro?.addEventListener('input', e => deliveryState.bairro = e.target.value);
  inputRua?.addEventListener('input', e => deliveryState.rua = e.target.value);
  inputNumero?.addEventListener('input', e => deliveryState.numero = e.target.value);
  inputComplemento?.addEventListener('input', e => deliveryState.complemento = e.target.value);
  inputCep?.addEventListener('input', e => deliveryState.cep = e.target.value);
  inputReferencia?.addEventListener('input', e => deliveryState.referencia = e.target.value);
  inputNome?.addEventListener('input', e => deliveryState.nome = e.target.value);
  inputTelefone?.addEventListener('input', e => deliveryState.telefone = e.target.value);
  inputObservacao?.addEventListener('input', e => deliveryState.observacao = e.target.value);
  
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
  updateHintSabores();
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

function updateHintSabores() {
  const t = getSelectedTamanho();
  if (!hintSabores) return;
  if (t === "Brotinho") {
    hintSabores.innerHTML = 'Para <b>Brotinho</b>, apenas <b>1 sabor</b> e <b>sem borda</b>.';
  } else if (t === "Média" || t === "Grande") {
    hintSabores.textContent = 'Pode escolher até 2 sabores (meio a meio).';
  } else {
    hintSabores.textContent = 'Selecione um tamanho para ver as regras de sabores.';
  }
}

/*************************************************
 * LÓGICA DE PIZZA
 *************************************************/
function getSelectedTamanho() {
  const r = pizzaForm.querySelector('input[name="tamanho"]:checked');
  return r ? r.value : null;
}

function limitPizzaFlavors() {
  const max = getSelectedTamanho() === "Brotinho" ? 1 : 2;
  const selected = [...pizzaForm.querySelectorAll('input[name="sabor"]:checked')];
  if (selected.length > max) {
    selected.slice(max).forEach(inp => inp.checked = false);
  }
}

function handlePizzaChange() {
  limitPizzaFlavors();
  toggleBordaByTamanho();
  updateHintPrecosFamilia();
  updateHintSabores();

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
 * WHATSAPP — MENSAGEM (ajustada p/ não somar borda ao preço da pizza)
 *************************************************/
function getFamiliaDoSabor(nome) {
  for (const fam of Object.keys(SABORES)) {
    if (SABORES[fam].some(s => s.name === nome)) return fam;
  }
  return null;
}
function getPrecoBasePizza(tamanho, sabores) {
  let maior = 0;
  (sabores || []).forEach(sabor => {
    const fam = getFamiliaDoSabor(sabor);
    const tabela = fam ? PRECO_PIZZA[fam] : null;
    const p = tabela ? tabela[tamanho] : 0;
    if (p > maior) maior = p;
  });
  return maior;
}

// ===== BACKEND ORDER HELPER =====
const API_BASE_ORDERS = 'http://localhost:3333';

function buildOrderPayload() {
  // Usa os estados que você já tem: `cart` e `deliveryState`
  const items = cart.map(i => ({
    name: i.name,
    price: Number(i.price),
    qty: Number(i.qty),
    // se quiser enviar metadados (ex.: tamanho/borda/sabores), mantém:
    meta: i.meta || null
  }));

  const customer = {
    name: deliveryState.nome || '',
    phone: deliveryState.telefone || ''
  };

  const delivery = {
    mode: deliveryState.modo === 'delivery' ? 'delivery' : 'retirada',
    address: deliveryState.modo === 'delivery' ? {
      bairro: deliveryState.bairro || '',
      rua: deliveryState.rua || '',
      numero: deliveryState.numero || '',
      complemento: deliveryState.complemento || '',
      cep: deliveryState.cep || '',
      referencia: deliveryState.referencia || ''
    } : null
  };

  const payment = {
    method: (['dinheiro','debito','credito','pix'].includes(deliveryState.formaPagamento) ? deliveryState.formaPagamento : 'dinheiro')
  };

  const notes = deliveryState.observacao || '';

  return { items, customer, delivery, payment, notes };
}

async function postOrder(payload) {
  const res = await fetch(`${API_BASE_ORDERS}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && (data.errors?.join('\n') || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data; // { ok: true, orderId, message }
}

function montarMensagemWhatsApp() {
  const linhas = [];
  const SEP = "====================================";

  linhas.push("🍕 NOVO PEDIDO — Forno a Lenha 🍕");
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");
  linhas.push("ITENS DO PEDIDO:");
  linhas.push("");

  let subtotalCalc = 0;
  cart.forEach(i => {
    const isPizza = (i.meta?.tamanho && Array.isArray(i.meta?.sabores) && i.meta.sabores.length > 0);

    let itemBaseUnit = i.price;
    let adicionalBordaUnit = 0;

    if (isPizza) {
      const base = getPrecoBasePizza(i.meta.tamanho, i.meta.sabores) || 0;
      const addBorda = (i.meta?.borda && i.meta.borda !== "Nenhuma") ? (PRECO_BORDA[i.meta.tamanho] || 0) : 0;
      itemBaseUnit = base;
      adicionalBordaUnit = addBorda;
    }

    const lineValorBase = itemBaseUnit * i.qty;
    const lineValorBorda = adicionalBordaUnit * i.qty;

    subtotalCalc += lineValorBase + lineValorBorda;

    let titulo = `• ${i.qty}x ${i.name.replace(/\s+\(.+\)$/, '').trim()}`;
    if (i.meta?.tamanho) {
      const tipo = (i.name.toLowerCase().includes("pizza") ? "Pizza " : "");
      titulo = `• ${i.qty}x ${tipo}${i.meta.tamanho}`;
    }
    titulo += ` - ${formatBRL(lineValorBase)}`;
    linhas.push(titulo);

    if (i.meta?.sabores?.length) {
      if (i.meta.sabores.length === 2) {
        linhas.push(`¹/² ${i.meta.sabores[0]}`);
        linhas.push(`¹/² ${i.meta.sabores[1]}`);
      } else {
        linhas.push(`${i.meta.sabores[0]}`);
      }
    }

    if (adicionalBordaUnit > 0 && i.meta?.borda) {
      linhas.push("");
      linhas.push(`• Borda: ${i.meta.borda} - ${formatBRL(lineValorBorda)}`);
    }

    linhas.push("");
  });

  const subtotal = subtotalCalc;
  const total = subtotalCalc;

  linhas.push(SEP);
  linhas.push("");
  linhas.push(`SUBTOTAL: ${formatBRL(subtotal)}`);
  linhas.push(`TOTAL: ${formatBRL(total)}`);
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");
  
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

  linhas.push(`ENTREGA: ${deliveryState.modo === "delivery" ? "Delivery" : "Retirada no balcão"}`);
  if (deliveryState.modo === "delivery") {
    linhas.push("DADOS DA ENTREGA:");
    if (deliveryState.rua) linhas.push(`* Rua/Avenida: ${deliveryState.rua}`);
    if (deliveryState.numero) linhas.push(`* Nº: ${deliveryState.numero}`);
    if (deliveryState.complemento) linhas.push(`* Comp.: ${deliveryState.complemento}`);
    if (deliveryState.bairro) linhas.push(`* Bairro: ${deliveryState.bairro}`);
    if (deliveryState.cep) linhas.push(`* CEP: ${deliveryState.cep}`);
    if (deliveryState.referencia) linhas.push(`* Referência: ${deliveryState.referencia}`);
    linhas.push("");
  }
  linhas.push(SEP);
  linhas.push("");

  linhas.push("DADOS DE CONTATO:");
  linhas.push(`* Nome: ${deliveryState.nome || "—"}`);
  linhas.push(`* Telefone: ${deliveryState.telefone || "—"}`);
  linhas.push("");
  linhas.push(SEP);
  linhas.push("");

  if (deliveryState.observacao) {
    linhas.push(`OBSERVAÇÃO: ${deliveryState.observacao}`);
    linhas.push("");
    linhas.push(SEP);
    linhas.push("");
  }

  linhas.push("Obrigado pela preferência! Deus vos abençoe!");

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

  btnFinalizar?.addEventListener('click', async () => {
    if (!validarDadosAntesDeEnviar()) return;

    if (deliveryState.formaPagamento === "pix") {
      openPixAlert();
      return;
    }

    try {
      const payload = buildOrderPayload();
      const resp = await postOrder(payload);
      console.log('Pedido registrado no back:', resp);
      if (resp?.ok && resp?.orderId) {
      setLastOrderId(resp.orderId);
      showOrderBanner(resp.orderId);
  }
    } catch (err) {
      console.warn('Falha ao registrar pedido no back:', err?.message || err);
    }

    const texto = montarMensagemWhatsApp();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    cart = [];
    saveCart();
    renderCart();
    closeCart();
  });

  btnPixFechar?.addEventListener('click', closePixAlert);
  btnPixCancelar?.addEventListener('click', closePixAlert);

  btnPixContinuar?.addEventListener('click', async () => {
    try {
      const payload = buildOrderPayload();
      const resp = await postOrder(payload);
      console.log('Pedido (PIX) registrado no back:', resp);
      if (resp?.ok && resp?.orderId) {
      setLastOrderId(resp.orderId);
      showOrderBanner(resp.orderId);
  }
    } catch (err) {
      console.warn('Falha ao registrar pedido (PIX) no back:', err?.message || err);
    }

    const texto = montarMensagemWhatsApp();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    closePixAlert();

    cart = [];
    saveCart();
    renderCart();
    closeCart();
  });

  btnCopyPix?.addEventListener('click', () => {
    navigator.clipboard.writeText(PIX_KEY);
    const old = btnCopyPix.textContent;
    btnCopyPix.textContent = "Copiado!";
    setTimeout(()=>btnCopyPix.textContent = old, 1400);
  });

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

// ===== PROTOCOLO DO PEDIDO (orderId) =====
function setLastOrderId(id) {
  try { localStorage.setItem('forno_last_order_id', String(id)); } catch {}
}
function getLastOrderId() {
  try { return localStorage.getItem('forno_last_order_id'); } catch { return null; }
}

/**
 * Cria/atualiza um banner discreto no topo da tela.
 * Não requer mudanças no HTML: é injetado dinamicamente.
 */
function showOrderBanner(orderId) {
  let banner = document.getElementById('order-protocol-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'order-protocol-banner';
    banner.setAttribute('role', 'status');
    banner.style.cssText = `
      position: fixed; top: 8px; left: 50%; transform: translateX(-50%);
      background: #111; color: #fff; padding: 8px 12px; border-radius: 999px;
      font: 600 14px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial;
      box-shadow: 0 6px 20px rgba(0,0,0,.25); z-index: 9999; opacity: 0;
      transition: opacity .25s ease, transform .25s ease;
    `;
    document.body.appendChild(banner);
    // pequena animação de entrada
    requestAnimationFrame(() => {
      banner.style.opacity = '1';
      banner.style.transform = 'translateX(-50%) translateY(0)';
    });
  }
  banner.textContent = `✅ Protocolo do pedido: #${orderId}`;
  // some sozinho depois de 6s
  clearTimeout(banner._hideTimer);
  banner._hideTimer = setTimeout(() => {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  }, 6000);
}

/*************************************************
 * INICIALIZAÇÃO DA APLICAÇÃO
 *************************************************/
renderCart();
initAppListeners();

/*************************************************
 * INTEGRAÇÃO COM A API DO CARDÁPIO (dinâmico)
 * - Preenche Sushis, Esfihas e Bebidas a partir do back-end
 * - Mantém visual dos seus cards
 *************************************************/
(function integrateMenuAPI(){
  const API_BASE = 'http://localhost:3333';

  const grids = {
    sushis:  document.querySelector('[data-js="grid-sushis"]'),
    esfihas: document.querySelector('[data-js="grid-esfihas"]'),
    bebidas: document.querySelector('[data-js="grid-bebidas"]')
  };

  function currencyBRL(v){
    const n = Number(v);
    return isNaN(n) ? 'R$ 0,00' : n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  }

  function makeMenuCard(item){
    const nome = String(item?.nome ?? '');
    const preco = Number(item?.preco ?? 0);
    const imagem = String(item?.imagem ?? '');
    const desc = String(item?.descricao ?? '');

    // Usa suas classes atuais: .card, .card-img, .price, .btn.btn-add
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img class="card-img" src="${imagem}" alt="${nome}" loading="lazy">
      <h3>${nome}</h3>
      ${desc ? `<p>${desc}</p>` : ''}
      <span class="price">${currencyBRL(preco)}</span>
      <button class="btn btn-add" type="button">Adicionar</button>
    `;

    div.querySelector('.btn.btn-add').addEventListener('click', () => {
      addToCart(nome, preco, 1);
    });
    return div;
  }

  function renderList(container, items){
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    items.forEach(i => frag.appendChild(makeMenuCard(i)));
    container.appendChild(frag);
  }

  async function load(){
    try{
      const res = await fetch(`${API_BASE}/api/menu`, { headers: { Accept: 'application/json' }});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (grids.sushis  && data?.data?.sushis)  renderList(grids.sushis,  data.data.sushis);
      if (grids.esfihas && data?.data?.esfihas) renderList(grids.esfihas, data.data.esfihas);
      if (grids.bebidas && data?.data?.bebidas) renderList(grids.bebidas, data.data.bebidas);
    } catch (err){
      console.error('Falha ao carregar menu da API:', err);
      // Em caso de erro, mantemos o conteúdo (se houver) e não quebramos o layout
    }
  }

  // Aguarda DOM pronto (por segurança, já que o script está com defer)
  document.addEventListener('DOMContentLoaded', load);
})();
