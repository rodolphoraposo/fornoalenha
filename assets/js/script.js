/*************************************************
 * CONFIGURAÇÃO — AJUSTE PARA SEU NEGÓCIO
 *************************************************/

const WHATSAPP_NUMBER = "5582991201916";

const PIX_KEY = "59.130.875/0001-50";

/*************************************************
 * DADOS DO CARDÁPIO
 *************************************************/

const PRECO_PIZZA = {
  Tradicional: { Brotinho: 19.90, Média: 36.90, Grande: 46.90 },
  Especial:    { Brotinho: 29.90, Média: 48.90, Grande: 58.90 },
  Doce:        { Brotinho: null,  Média: 38.90, Grande: 48.90 }
};

const PRECO_BORDA = { Brotinho: 0.00, Média: 11.90, Grande: 14.90 };

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
    { name: "Ovomaltine", imagePath: "../imgs/pizza/ovomaltine.webp" },
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
  bairro: "", // Bairro vira campo de texto
  
  // CAMPOS PARA PAGAMENTO
  formaPagamento: "dinheiro", // dinheiro | debito | credito | pix
  valorPago: 0,
  precisaTroco: false,
  trocoPara: 0
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
const comandaDigitalEl = document.getElementById('comanda-digital'); 

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
const dinheiroFields = document.getElementById('dinheiro-fields');
const pixFields = document.getElementById('pix-fields');
const pixKeyEl = document.getElementById('pix-key');
const inputTroco = document.getElementById('troco-para');
const checkboxTroco = document.getElementById('precisa-troco');

// Header / Nav
const header = document.getElementById('site-header');
const navLinks = document.querySelectorAll('.main-nav .nav-link');


/*************************************************
 * NAV & HEADER EFFECTS
 *************************************************/
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 6);
});
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.forEach(n => n.classList.remove('active'));
    a.classList.add('active');
    if (cartDrawer?.classList.contains('open')) closeCart();
    document.body.classList.remove('lock-scroll');
  });
});


/*************************************************
 * INICIALIZAÇÃO — CAMPOS DE ENTREGA E PAGAMENTO
 *************************************************/
(function initDeliveryAndPaymentFields() {
  
  // Inicialização PIX (CNPJ)
  if (pixKeyEl) {
    pixKeyEl.value = PIX_KEY;
    pixKeyEl.parentElement.addEventListener('click', () => {
      navigator.clipboard.writeText(PIX_KEY);
      alert("Chave PIX copiada para a área de transferência!");
    });
  }

  // Garante que o input de troco está disabled se o checkbox não estiver marcado
  if (inputTroco && checkboxTroco && !checkboxTroco.checked) {
      inputTroco.disabled = true; 
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

  // Captura de dados de entrega e contato
  inputBairro?.addEventListener('input', e => deliveryState.bairro = e.target.value);
  inputRua?.addEventListener('input', e => deliveryState.rua = e.target.value);
  inputNumero?.addEventListener('input', e => deliveryState.numero = e.target.value);
  inputComplemento?.addEventListener('input', e => deliveryState.complemento = e.target.value);
  inputCep?.addEventListener('input', e => deliveryState.cep = e.target.value);
  inputReferencia?.addEventListener('input', e => deliveryState.referencia = e.target.value);
  inputNome?.addEventListener('input', e => deliveryState.nome = e.target.value);
  inputTelefone?.addEventListener('input', e => deliveryState.telefone = e.target.value);
  
  // Inicialização Pagamento (Lógica para o Select)
  if (selectFormaPagamento) {
      selectFormaPagamento.addEventListener('change', (e) => {
          deliveryState.formaPagamento = e.target.value;
          dinheiroFields.classList.add('hidden');
          pixFields.classList.add('hidden');
          
          // Reseta campos de troco
          deliveryState.precisaTroco = false;
          deliveryState.trocoPara = 0;
          if (checkboxTroco) checkboxTroco.checked = false;
          if (inputTroco) inputTroco.value = "";
          
          if (deliveryState.formaPagamento === "dinheiro") {
              dinheiroFields.classList.remove('hidden');
              // Certifica que o input de troco está disabled ao selecionar 'Dinheiro'
              if (inputTroco) inputTroco.disabled = true; 
          } else if (deliveryState.formaPagamento === "pix") {
              pixFields.classList.remove('hidden');
          }
          renderCart();
      });
  }
  
  // Lógica de Troco
  checkboxTroco?.addEventListener('change', e => {
    deliveryState.precisaTroco = e.target.checked;
    if (!e.target.checked) {
      deliveryState.trocoPara = 0;
      if (inputTroco) inputTroco.value = "";
    }
    // Controla o estado disabled
    if (inputTroco) inputTroco.disabled = !e.target.checked; 
  });
  
  inputTroco?.addEventListener('input', e => {
    let valor = parseFloat(e.target.value.replace(',', '.')) || 0;
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0); 
    
    // Se o valor digitado for menor que o total, mas não zero, sugere o valor total para troco.
    if (valor < total && valor !== 0) {
      // Formata de volta para o padrão com vírgula para o usuário
      e.target.value = total.toFixed(2).replace('.', ','); 
      valor = total;
    }
    
    deliveryState.trocoPara = valor;
  });
  
})();


/*************************************************
 * UI DO MODAL — MONTE SUA PIZZA
 *************************************************/
function renderGrupoSabores(titulo, lista, familia) {
  // CORREÇÃO: Usando a lista de objetos SABORES (name)
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

  // CORREÇÃO: Usando a lista de objetos BORDAS (name)
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

function limitPizzaFlavors() {
  const selected = pizzaForm.querySelectorAll('input[name="sabor"]:checked');
  if (selected.length > 2) {
    // Desmarca o último sabor escolhido
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
      if (isBrotinho) r.checked = true; // Força "Nenhuma" se for Brotinho
    } else {
      r.disabled = isBrotinho; // Desabilita outras bordas para Brotinho
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
function saveCart() {
  localStorage.setItem("cart_fornoalenha", JSON.stringify(cart));
}
function formatBRL(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`;
}
function addToCart(name, price, qty = 1, meta = {}) {
  const key = JSON.stringify({ name, price, meta });
  const existing = cart.find(i => JSON.stringify({ name: i.name, price: i.price, meta: i.meta }) === key);

  if (existing) existing.qty += qty;
  else cart.push({ name, price, qty, meta });

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
    // Exibe apenas os dois primeiros sabores na linha meta do carrinho para manter compacto
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

  const total = subtotal; // Não há taxa de entrega implementada aqui.

  cartSubtotal.textContent = formatBRL(subtotal);
  cartTotal.textContent    = formatBRL(total);
  cartCount.textContent    = cart.reduce((s,i)=>s+i.qty,0);

  saveCart();
}


/*************************************************
 * FUNÇÃO DE RENDERIZAÇÃO DA COMANDA DIGITAL
 *************************************************/
function renderComandaDigital() {
    // NOTE: Caminho da logo deve ser relativo à base do projeto ou absoluto se o cardapio.html estiver em assets/html/
    const LOGO_PATH = '../imgs/fornoalenha.webp'; 
    
    const cartItemsHtml = cart.map(i => {
        const meta = [];
        if (i.meta?.tamanho) meta.push(`T: ${i.meta.tamanho}`);
        if (i.meta?.borda && i.meta?.borda !== "Nenhuma") meta.push(`Borda: ${i.meta.borda}`);
        
        // Exibe todos os sabores na comanda
        const saboresDisplay = i.meta?.sabores?.join(' / ');
        if (saboresDisplay) meta.push(`Sabores: ${saboresDisplay}`);

        const metaText = meta.join(' | ');
        const linePrice = formatBRL(i.price * i.qty);

        return `
            <div class="item-comanda">
                <span class="qty">${i.qty}x</span>
                <span class="name">${i.name}</span>
                <span class="price">${linePrice}</span>
                ${metaText ? `<span class="meta-comanda">${metaText}</span>` : ''}
            </div>
        `;
    }).join('');

    const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
    const total = subtotal;
    // ID de pedido simples para referência
    const randomOrderId = Math.floor(Math.random() * 9000) + 1000; 


    let pagamentoInfo = '';
    if (deliveryState.formaPagamento === "dinheiro") {
        pagamentoInfo = `Dinheiro`;
        if (deliveryState.precisaTroco) {
            const troco = deliveryState.trocoPara - total;
            pagamentoInfo += ` | Troco para: ${formatBRL(deliveryState.trocoPara)} (Devolver ${formatBRL(troco)})`;
        }
    } else if (deliveryState.formaPagamento === "debito") {
        pagamentoInfo = `Cartão de Débito (Máquina)`;
    } else if (deliveryState.formaPagamento === "credito") {
        pagamentoInfo = `Cartão de Crédito (Máquina)`;
    } else if (deliveryState.formaPagamento === "pix") {
        pagamentoInfo = `PIX (Comprovante será enviado)`;
    }

    let enderecoInfo = '';
    if (deliveryState.modo === "delivery") {
        enderecoInfo = `
            <p><strong>Entrega:</strong> Delivery</p>
            <p><strong>End.:</strong> ${deliveryState.rua}, ${deliveryState.numero} - ${deliveryState.bairro}</p>
            ${deliveryState.complemento ? `<p><strong>Comp.:</strong> ${deliveryState.complemento}</p>` : ''}
            ${deliveryState.referencia ? `<p><strong>Ref.:</strong> ${deliveryState.referencia}</p>` : ''}
            ${deliveryState.cep ? `<p><strong>CEP:</strong> ${deliveryState.cep}</p>` : ''}
        `;
    } else {
        enderecoInfo = `<p><strong>Entrega:</strong> Retirada no Balcão</p>`;
    }


    const comandaHtml = `
        <div class="header-comanda">
            <img src="${LOGO_PATH}" alt="Logo Forno à Lenha" class="comanda-logo"> 
            <h3>FORNO À LENHA PIZZARIA</h3>
            <p>Pedido #${randomOrderId} | ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>

        <div>${cartItemsHtml}</div>

        <div class="footer-comanda">
            <p>Subtotal: ${formatBRL(subtotal)}</p>
            <p>Taxa de Entrega: ${formatBRL(0)}</p>
            <p class="total-comanda">Total: ${formatBRL(total)}</p>
            <p style="margin-top:10px;"><strong>Pagamento:</strong> ${pagamentoInfo}</p>
        </div>

        <div class="dados-cliente">
            <p><strong>Nome:</strong> ${deliveryState.nome || "Não informado"}</p>
            <p><strong>Tel.:</strong> ${deliveryState.telefone || "Não informado"}</p>
            ${enderecoInfo}
        </div>
        
        <p style="text-align:center; font-size:0.8rem; margin-top:20px;">Obrigado pelo seu pedido!</p>
    `;

    if (comandaDigitalEl) {
        comandaDigitalEl.innerHTML = comandaHtml;
    }
}


/*************************************************
 * FUNÇÃO DE MENSAGEM WHATSAPP (Apenas fallback)
 *************************************************/
// Função mantida apenas para fallback em caso de erro na geração da imagem
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
  const total = subtotal;

  linhas.push("");
  linhas.push(`Subtotal: *${formatBRL(subtotal)}*`);
  linhas.push(`Total: *${formatBRL(total)}*`);
  linhas.push("");
  
  // Detalhes da Forma de Pagamento
  linhas.push("*Forma de Pagamento:*");
  if (deliveryState.formaPagamento === "dinheiro") {
    linhas.push(`• Dinheiro`);
    if (deliveryState.precisaTroco) {
      const troco = deliveryState.trocoPara - total;
      linhas.push(`• Precisa de troco para: *${formatBRL(deliveryState.trocoPara)}*`);
      linhas.push(`• Troco a ser devolvido: *${formatBRL(troco)}*`);
    } else {
      linhas.push(`• Não precisa de troco.`);
    }
  } else if (deliveryState.formaPagamento === "debito") {
    linhas.push(`• Cartão de Débito (Máquina na entrega)`);
  } else if (deliveryState.formaPagamento === "credito") {
    linhas.push(`• Cartão de Crédito (Máquina na entrega)`);
  } else if (deliveryState.formaPagamento === "pix") {
    linhas.push(`• PIX (Comprovante será enviado em seguida)`);
    linhas.push(`• Chave PIX da empresa: ${PIX_KEY}`);
  }
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
  if (!cart.length) { alert('Seu carrinho está vazio.'); return false; }
  if (!deliveryState.nome || !deliveryState.telefone) {
    alert('Informe seu nome e telefone (WhatsApp).'); return false;
  }
  if (deliveryState.modo === "delivery") {
    if (!deliveryState.rua || !deliveryState.numero || !deliveryState.bairro) { 
        alert('Informe o Bairro, Rua/Avenida e número para a entrega.'); return false; 
    }
  }
  
  // Validação de Troco
  if (deliveryState.formaPagamento === "dinheiro" && deliveryState.precisaTroco) {
      const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
      if (deliveryState.trocoPara < total) {
          alert('O valor para troco deve ser maior ou igual ao total do pedido.');
          return false;
      }
  }
  
  // Confirmação para PIX
  if (deliveryState.formaPagamento === "pix") {
      if (!confirm("Você selecionou PIX. Certifique-se de que o pagamento será feito ANTES de enviar o pedido. Deseja continuar?")) {
          return false;
      }
  }
  
  return true;
}


/*************************************************
 * FUNÇÕES DE EVENTOS GERAIS
 *************************************************/
function openCart(){
  cartDrawer.classList.add('open');
  document.body.classList.add('lock-scroll');
}
function closeCart(){
  cartDrawer.classList.remove('open');
  document.body.classList.remove('lock-scroll');
}

function initAppListeners() {

    openCartBtn?.addEventListener('click', openCart);
    closeCartBtn?.addEventListener('click', closeCart);

    btnContinuar?.addEventListener('click', () => {
      closeCart();
      document.querySelector('.container')?.scrollIntoView({behavior:'smooth', block:'start'}); 
    });

    // LÓGICA DE GERAÇÃO DE IMAGEM E REDIRECIONAMENTO WHATSAPP
    btnFinalizar?.addEventListener('click', () => {
      if (!validarDadosAntesDeEnviar()) return;
      
      // 1. Renderiza o HTML da comanda no elemento oculto
      renderComandaDigital();
      
      // 2. Torna a comanda visível temporariamente
      comandaDigitalEl?.classList.add('comanda-active'); 

      // 3. Usa html2canvas para gerar a imagem
      // NOTE: A biblioteca html2canvas deve estar inclusa no <head> do cardapio.html
      // Ex: <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      if (typeof html2canvas === 'undefined') {
          console.error("html2canvas não está carregado. Enviando por mensagem de texto.");
          alert('Ocorreu um erro ao gerar a comanda digital. O pedido será enviado por mensagem de texto.');
          comandaDigitalEl?.classList.remove('comanda-active'); 
          // Fallback: Se der erro, usa a mensagem de texto completa como backup
          const texto = montarMensagemWhatsApp();
          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
          window.open(url, '_blank');
          return;
      }

      html2canvas(comandaDigitalEl, { 
          backgroundColor: '#ffffff',
          scale: 3, // Alta resolução
          useCORS: true
      }).then(canvas => {
          
          // 4. Oculta o elemento HTML da comanda novamente
          comandaDigitalEl?.classList.remove('comanda-active'); 
          
          // 5. Converte o Canvas para Data URL (PNG)
          const imageURL = canvas.toDataURL('image/png');
          
          // 6. Oferece ao usuário o download da imagem da comanda
          const link = document.createElement('a');
          link.href = imageURL;
          link.download = `Comanda_FornoALenha_${new Date().getTime()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // 7. CRIA MENSAGEM CURTA PARA WHATSAPP
          const totalText = cartTotal.textContent;
          const mensagemCurta = 
    `🍕 *NOVO PEDIDO - Forno à Lenha*
 
 Olá, segue a imagem da comanda digital em anexo (PNG) para finalizar meu pedido!
 
 *Total:* ${totalText}
 *Nome:* ${deliveryState.nome || "Não informado"}
 *Telefone:* ${deliveryState.telefone || "Não informado"}`;

          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagemCurta)}`;
          
          // 8. Abre o WhatsApp após um pequeno atraso para o download iniciar
          setTimeout(() => {
              window.open(url, '_blank');
          }, 500); 
          
      }).catch(error => {
          console.error('Erro ao gerar a imagem da comanda:', error);
          alert('Não foi possível gerar a comanda digital. Enviando pedido por mensagem de texto.');
          
          comandaDigitalEl?.classList.remove('comanda-active'); 
          // Fallback: Se der erro, usa a mensagem de texto completa como backup
          const texto = montarMensagemWhatsApp();
          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
          window.open(url, '_blank');
      });
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
    // Adiciona o listener do botão "Voltar" do modal
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
// Carregar carrinho salvo ao abrir a página
renderCart();

// Inicia todos os listeners de botões APÓS renderizar o carrinho
initAppListeners();