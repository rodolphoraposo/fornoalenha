// server/src/routes/orders.routes.js
import { Router } from 'express';
import { loadAll, appendOrder } from '../storage/orders.store.js';
import { toCSV } from '../utils/csv.js';

const router = Router();

/* -------- validação simples do payload -------- */
function validateOrder(body) {
  const errors = [];
  if (!body || typeof body !== 'object') return ['Corpo da requisição inválido.'];

  const { items, customer, delivery, payment, notes } = body;

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Informe ao menos 1 item no pedido.');
  } else {
    items.forEach((it, idx) => {
      if (!it?.name) errors.push(`Item[${idx}] sem nome.`);
      if (typeof it?.price !== 'number' || it.price <= 0) errors.push(`Item[${idx}] preço inválido.`);
      if (!Number.isInteger(it?.qty) || it.qty <= 0) errors.push(`Item[${idx}] quantidade inválida.`);
    });
  }

  if (!customer?.name) errors.push('Nome do cliente é obrigatório.');
  if (!customer?.phone) errors.push('Telefone (WhatsApp) é obrigatório.');

  if (!['retirada', 'delivery'].includes(delivery?.mode)) {
    errors.push('Modo de entrega inválido (retirada|delivery).');
  }
  if (delivery?.mode === 'delivery') {
    if (!delivery?.address?.bairro) errors.push('Bairro é obrigatório para delivery.');
    if (!delivery?.address?.rua) errors.push('Rua/Avenida é obrigatória para delivery.');
    if (!delivery?.address?.numero) errors.push('Número é obrigatório para delivery.');
  }

  if (!['dinheiro', 'debito', 'credito', 'pix'].includes(payment?.method)) {
    errors.push('Forma de pagamento inválida.');
  }

  if (notes && typeof notes !== 'string') errors.push('Observações devem ser texto.');

  return errors;
}

/* -------- POST /api/orders → cria e persiste -------- */
router.post('/', async (req, res) => {
  try {
    const errors = validateOrder(req.body);
    if (errors.length) return res.status(400).json({ ok: false, errors });

    const created = await appendOrder(req.body);
    res.status(201).json({ ok: true, orderId: created.id, message: 'Pedido recebido.' });
  } catch (err) {
    console.error('[orders] erro ao criar pedido:', err);
    res.status(500).json({ ok: false, error: 'Erro interno ao criar pedido.' });
  }
});

/* -------- GET /api/orders → listar (debug) -------- */
router.get('/', async (_req, res) => {
  try {
    const { data } = await loadAll();
    res.json({ count: data.length, data });
  } catch (err) {
    console.error('[orders] erro ao listar pedidos:', err);
    res.status(500).json({ ok: false, error: 'Erro interno ao listar pedidos.' });
  }
});

/* -------- GET /api/orders/csv → exportar CSV -------- */
router.get('/csv', async (_req, res) => {
  try {
    const { data } = await loadAll();
    const pedidos = Array.isArray(data) ? data : [];

    // uma linha por item
    const rows = [];
    for (const order of pedidos) {
      const id = order?.id ?? '';
      const createdAt = order?.createdAt ?? '';
      const customer = order?.customer || {};
      const delivery = order?.delivery || {};
      const address = delivery?.address || {};
      const payment = order?.payment || {};
      const notes = typeof order?.notes === 'string' ? order.notes : '';

      const items = Array.isArray(order?.items) ? order.items : [];
      for (const it of items) {
        rows.push({
          orderId: id,
          createdAt,
          customer_name: customer?.name ?? '',
          customer_phone: customer?.phone ?? '',
          delivery_mode: delivery?.mode ?? 'retirada',
          bairro: address?.bairro ?? '',
          rua: address?.rua ?? '',
          numero: address?.numero ?? '',
          complemento: address?.complemento ?? '',
          cep: address?.cep ?? '',
          referencia: address?.referencia ?? '',
          payment_method: payment?.method ?? '',
          notes,
          item_name: it?.name ?? '',
          item_qty: Number(it?.qty ?? 0),
          item_price: Number(it?.price ?? 0),
          item_total: Number(it?.price ?? 0) * Number(it?.qty ?? 0),
        });
      }
    }

    const headers = [
      'orderId','createdAt',
      'customer_name','customer_phone',
      'delivery_mode','bairro','rua','numero','complemento','cep','referencia',
      'payment_method','notes',
      'item_name','item_qty','item_price','item_total'
    ];

    const csv = rows.length ? toCSV(rows, headers) : toCSV([{ info: 'Sem pedidos' }], ['info']);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
    res.status(200).send(csv);
  } catch (err) {
    console.error('[orders.csv] erro:', err);
    res
      .status(500)
      .type('application/json')
      .send(JSON.stringify({ ok: false, error: String(err?.message || err) }));
  }
});

export default router;
