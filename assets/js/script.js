/*************************************************
 *  CONFIGURAÇÃO — AJUSTE PARA SEU NEGÓCIO
 *************************************************/

// Número do WhatsApp no formato internacional (ex.: Brasil 55 + DDD + número)
// Exemplo abaixo (substitua pelo seu):
const WHATSAPP_NUMBER = "5582994336126";

// Tabela de taxas de entrega por bairro (edite conforme sua área)
const TAXAS_ENTREGA = {
  "São Jorge": 6.00,
  "Serraria": 3.00,
  "Feitosa": 7.00,
  "Jacintinho": 8.00,
  "Antares": 5.00
};


/*************************************************
 *  DADOS DO CARDÁPIO
 *************************************************/

// Preços das pizzas por família e tamanho
const PRECO_PIZZA = {
  Tradicional: { Brotinho: 19.90, Média: 36.90, Grande: 46.90 },
  Especial:    { Brotinho: 29.90, Média: 48.90, Grande: 58.90 },
  Doce:        { Brotinho: null,  Média: 38.90, Grande: 48.90 }
};

// Preço das bordas conforme tamanho
const PRECO_BORDA = { Brotinho: 0.00, Média: 11.90, Grande: 14.90 };

// Sabores por família
const SABORES = {
  Tradicional: [
    "Mussarela", "Mista", "Calabresa", "Milho",
    "Frango", "Marguerita", "Baiana", "Napolitana"
  ],
  Especial: [
    "Frango com Catupiry", "Carne de Sol", "Nordestina", "Camarão",
    "Portuguesa", "Lombo Canadense", "Quatro Queijos", "Bacon",
    "Atum", "Catupirela"
  ],
  Doce: [
    "Brigadeiro", "Ovomaltine", "M&M", "Banana", "Romeu e Julieta"
  ]
};

// Bordas e tamanhos
const BORDAS = ["Nenhuma", "Mussarela", "Cheddar", "Catupiry", "Creme Cheese", "Chocolate"];
const TAMANHOS = ["Brotinho", "Média", "Grande"];


/*************************************************
 *  ESTADO GLOBAL
 *************************************************/
let cart = JSON.parse(localStorage.getItem("cart_fornoalenha") || "[]");
const deliveryState = {
  modo: "retirada", // retirada | delivery
  bairro: null,
  taxa: 0,
  nome: "",
  telefone: "",
  rua: "",
  numero: "",
  complemento: "",
  cep: "",
  referencia: ""
};


/*************************************************
 *  ELEMENTOS
 *************************************************/
const cartDrawer   = document.getElementById('cart');
const openCartBtn  = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsEl  = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartFees     = document.getElementById('cart-fees');
const cartTotal    = document.getElementById('cart-total');
const cartCount    = document.getElementById('cart-count');
const btnFinalizar = document.getElementById('btn-finalizar');

const btnMontePizza = document.getElementById('btn-monte-pizza');
const pizzaModal    = document.getElementById('pizza-modal');
const closeModalBtn = document.getElementById('close-modal');
const pizzaForm     = document.getElementById('pizza-form');
const tamanhoOptionsEl = document.getElementById('tamanho-options');
const saborOptionsEl   = document.getElementById('sabor-options');
const bordaOptionsEl   = document.getElementById('borda-options');
const hintPrecosFamilia = document.getElementById('hint-precos-familia');

// Campos de entrega/contato
const radiosModoEntrega = document.querySelectorAll('input[name="modo-entrega"]');
const deliveryFieldsBox = document.getElementById('delivery-fields');
const selectBairro = document.getElementById('bairro');
const inputRua = document.getElementById('rua');
const inputNumero = document.getElementById('numero');
const inputComplemento = document.getElementById('complemento');
const inputCep = document.getElementById('cep');
const inputReferencia = document.getElementById('referencia');
const inputNome = document.getElementById('nome');
const inputTelefone = document.getElementById('telefone');


/*************************************************
 *  INICIALIZAÇÃO — CAMPOS DE ENTREGA
 *************************************************/
(function initDeliveryFields() {
  // Popula bairros
  if (selectBairro) {
    selectBairro.innerHTML = `<option value="">Selecione...</option>` + 
      Object.entries(TAXAS_ENTREGA).map(([b, v]) =>
        `<option value="${b}">${b} — R$ ${v.toFixed(2)}</option>`
      ).join("");
  }

  // Modo de entrega
  radiosModoEntrega.forEach(r => {
    r.addEventListener('change', () => {
      deliveryState.modo = r.value;
      if (deliveryState.modo === "delivery") {
        deliveryFieldsBox.classList.remove('hidden');
      } else {
        deliveryFieldsBox.classList.add('hidden');
        deliveryState.taxa = 0;
        deliveryState.bairro = null;
        if (selectBairro) selectBairro.value = "";
      }
      renderCart(); // atualiza total e taxa
    });
  });

  // Campos de endereço
  selectBairro?.addEventListener('change', () => {
    const bairro = selectBairro.value || null;
    deliveryState.bairro = bairro;
    deliveryState.taxa = bairro ? (TAXAS_ENTREGA[bairro] || 0) : 0;
    renderCart();
  });

  inputRua?.addEventListener('input', e => deliveryState.rua = e.target.value);
  inputNumero?.addEventListener('input', e => deliveryState.numero = e.target.value);
  inputComplemento?.addEventListener('input', e => deliveryState.complemento = e.target.value);
  inputCep?.addEventListener('input', e => deliveryState.cep = e.target.value);
  inputReferencia?.addEventListener('input', e => deliveryState.referencia = e.target.value);
  inputNome?.addEventListener('input', e => deliveryState.nome = e.target.value);
  inputTelefone?.addEventListener('input', e => deliveryState.telefone = e.target.value);
})();


/*************************************************
 *  UI DO MODAL — MONTE SUA PIZZA
 *************************************************/
function renderGrupoSabores(titulo, lista, familia) {
  const itens = lista.map((nome, i) => `
    <input type="checkbox" id="sabor-${familia}-${i}" name="sabor" value="${nome}" data-familia="${familia}">
    <label for="sabor-${familia}-${i}">${nome}</label>
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
  // Tamanhos
  tamanhoOptionsEl.innerHTML = TAMANHOS.map((t) => `
    <input type="radio" id="tamanho-${t}" name="tamanho" value="${t}" ${t==="Grande" ? "checked" : ""}>
    <label for="tamanho-${t}">${t}</label>
  `).join('');

  // Sabores (grupos)
  saborOptionsEl.innerHTML = `
    ${renderGrupoSabores("Tradicionais", SABORES.Tradicional, "Tradicional")}
    ${renderGrupoSabores("Especiais", SABORES.Especial, "Especial")}
    ${renderGrupoSabores("Doces", SABORES.Doce, "Doce")}
  `;

  // Bordas
  bordaOptionsEl.innerHTML = BORDAS.map((b, i) => `
    <input type="radio" id="borda-${i}" name="borda" value="${b}" ${b === "Nenhuma" ? "checked" : ""}>
    <label for="borda-${i}">${b}</label>
  `).join('');

  // Eventos de mudança
  pizzaForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', handlePizzaChange);
  });

  // Preços por família (tamanho selecionado)
  updateHintPrecosFamilia();

  // Cálculo inicial
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
 *  LÓGICA DE PIZZA
 *************************************************/
function getSelectedTamanho() {
  const r = pizzaForm.querySelector('input[name="tamanho"]:checked');
  return r ? r.value : null;
}

function limitPizzaFlavors() {
  const selected = pizzaForm.querySelectorAll('input[name="sabor"]:checked');
  if (selected.length > 2) {
    selected[selected.length - 1].checked = false;
  }
}

function handlePizzaChange() {
  limitPizzaFlavors();
  toggleBordaByTamanho();
  updateHintPrecosFamilia();
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

  // Subtotal da pizza (sem borda)
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

  document.getElementById('pizza-subtotal').textContent     = `R$ ${subtotal.toFixed(2)}`;
  document.getElementById('borda-adicional').textContent    = `R$ ${adicionalBorda.toFixed(2)}`;
  document.getElementById('pizza-final-price').textContent  = `R$ ${total.toFixed(2)}`;

  return {
    precoFinal: total,
    nomePizza: tituloPizza,
    tamanho,
    borda,
    sabores: Array.from(selectedSabores).map(i => i.value)
  };
}


/*************************************************
 *  CARRINHO
 *************************************************/
function saveCart() {
  localStorage.setItem("cart_fornoalenha", JSON.stringify(cart));
}

function formatBRL(v) {
  return `R$ ${v.toFixed(2)}`;
}

function addToCart(name, price, qty = 1, meta = {}) {
  const key = JSON.stringify({ name, price, meta });
  const existing = cart.find(i => JSON.stringify({ name: i.name, price: i.price, meta: i.meta }) === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty, meta });
  }
  renderCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

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
    if (item.meta?.sabores?.length) metaLines.push(`Sabores: ${item.meta.sabores.join(' / ')}`);

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

  // Atualiza subtotal, taxa e total
  const taxa = deliveryState.modo === "delivery" ? (deliveryState.taxa || 0) : 0;
  const total = subtotal + taxa;

  cartSubtotal.textContent = formatBRL(subtotal);
  cartFees.textContent     = formatBRL(taxa);
  cartTotal.textContent    = formatBRL(total);
  cartCount.textContent    = cart.reduce((s,i)=>s+i.qty,0);

  saveCart();
}


/*************************************************
 *  FINALIZAÇÃO VIA WHATSAPP
 *************************************************/
function montarMensagemWhatsApp() {
  const linhas = [];
  linhas.push("*NOVO PEDIDO — Forno a Lenha*");
  linhas.push("");
  linhas.push("*Itens:*");

  cart.forEach(i => {
    const meta = [];
    if (i.meta?.tamanho) meta.push(`Tamanho: ${i.meta.tamanho}`);
    if (i.meta?.borda && i.meta?.borda !== "Nenhuma") meta.push(`Borda: ${i.meta.borda}`);
    if (i.meta?.sabores?.length) meta.push(`Sabores: ${i.meta.sabores.join(' / ')}`);
    linhas.push(`• ${i.qty}x ${i.name}${meta.length ? ` (${meta.join(' • ')})` : ''} — ${formatBRL(i.price*i.qty)}`);
  });

  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const taxa = deliveryState.modo === "delivery" ? (deliveryState.taxa || 0) : 0;
  const total = subtotal + taxa;

  linhas.push("");
  linhas.push(`Subtotal: *${formatBRL(subtotal)}*`);
  linhas.push(`Taxa de entrega: *${formatBRL(taxa)}*`);
  linhas.push(`Total: *${formatBRL(total)}*`);
  linhas.push("");

  linhas.push(`*Entrega:* ${deliveryState.modo === "delivery" ? "Delivery" : "Retirada no balcão"}`);

  if (deliveryState.modo === "delivery") {
    const endereco = [
      deliveryState.rua ? `Rua/Avenida: ${deliveryState.rua}` : null,
      deliveryState.numero ? `Nº: ${deliveryState.numero}` : null,
      deliveryState.complemento ? `Comp.: ${deliveryState.complemento}` : null,
      deliveryState.bairro ? `Bairro: ${deliveryState.bairro}` : null,
      deliveryState.cep ? `CEP: ${deliveryState.cep}` : null,
      deliveryState.referencia ? `Referência: ${deliveryState.referencia}` : null
    ].filter(Boolean).join(" | ");

    linhas.push(endereco ? `Endereço: ${endereco}` : "Endereço: —");
  }

  linhas.push("");
  linhas.push(`Nome: ${deliveryState.nome || "—"}`);
  linhas.push(`Telefone: ${deliveryState.telefone || "—"}`);

  return linhas.join("\n");
}

function validarDadosAntesDeEnviar() {
  if (!cart.length) {
    alert('Seu carrinho está vazio.');
    return false;
  }
  if (!deliveryState.nome || !deliveryState.telefone) {
    alert('Informe seu nome e telefone (WhatsApp).');
    return false;
  }
  if (deliveryState.modo === "delivery") {
    if (!deliveryState.bairro) { alert('Selecione o bairro para calcular a taxa de entrega.'); return false; }
    if (!deliveryState.rua || !deliveryState.numero) { alert('Informe rua/avenida e número.'); return false; }
  }
  return true;
}


/*************************************************
 *  EVENTOS GERAIS
 *************************************************/
function openCart(){
  cartDrawer.classList.add('open');
  document.body.classList.add('lock-scroll');  // trava fundo
}
function closeCart(){
  cartDrawer.classList.remove('open');
  document.body.classList.remove('lock-scroll'); // libera fundo
}


openCartBtn?.addEventListener('click', openCart);
closeCartBtn?.addEventListener('click', closeCart);

btnFinalizar?.addEventListener('click', () => {
  if (!validarDadosAntesDeEnviar()) return;

  const texto = montarMensagemWhatsApp();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

/* Modal Monte sua Pizza */
btnMontePizza?.addEventListener('click', () => {
  pizzaModal.classList.add('open');
  document.body.classList.add('lock-scroll'); // trava fundo
  populatePizzaOptions();
});
closeModalBtn?.addEventListener('click', () => {
  pizzaModal.classList.remove('open');
  document.body.classList.remove('lock-scroll'); // libera fundo
});
pizzaModal?.addEventListener('click', (e) => {
  if (e.target === pizzaModal){
    pizzaModal.classList.remove('open');
    document.body.classList.remove('lock-scroll');
  } 
    
});

/* Submit da pizza */
pizzaForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const { precoFinal, nomePizza, tamanho, borda, sabores } = calculatePizzaPrice();

  if (precoFinal <= 0) {
    alert('Escolha pelo menos 1 sabor e um tamanho válido.');
    return;
  }

  const meta = { tamanho, borda, sabores };
  addToCart(`${nomePizza} (${tamanho})`, precoFinal, 1, meta);
  pizzaModal.classList.remove('open');
  document.body.classList.remove('lock-scroll');
});

/* Carregar carrinho salvo ao abrir a página */
renderCart();
