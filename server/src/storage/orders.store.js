// server/src/storage/orders.store.js
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardaremos em server/var/orders.json
const VAR_DIR = path.resolve(__dirname, '../../var');
const ORDERS_FILE = path.join(VAR_DIR, 'orders.json');

async function ensureVar() {
  await fs.mkdir(VAR_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    // cria arquivo inicial
    await fs.writeFile(ORDERS_FILE, JSON.stringify({ lastId: 0, data: [] }, null, 2), 'utf-8');
  }
}

export async function loadAll() {
  await ensureVar();
  try {
    const raw = await fs.readFile(ORDERS_FILE, 'utf-8');
    const json = JSON.parse(raw || '{"lastId":0,"data":[]}');
    const lastId = Number(json?.lastId) || 0;
    const data = Array.isArray(json?.data) ? json.data : [];
    return { lastId, data };
  } catch (e) {
    // Se o arquivo estiver corrompido/incompleto, retorna vazio em vez de quebrar
    console.error('[orders.store] loadAll falhou; usando vazio:', e?.message || e);
    return { lastId: 0, data: [] };
  }
}

export async function appendOrder(orderPayload) {
  const { lastId, data } = await loadAll();
  const id = lastId + 1;

  const order = {
    id,
    createdAt: new Date().toISOString(),
    ...orderPayload,
  };

  const next = { lastId: id, data: [...data, order] };

  // escrita “atômica” simples: grava em .tmp e renomeia
  const tmp = ORDERS_FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(next, null, 2), 'utf-8');
  await fs.rename(tmp, ORDERS_FILE);

  return order;
}
