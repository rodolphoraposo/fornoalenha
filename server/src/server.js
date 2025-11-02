import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import router from './routes/index.js';
import logger from './utils/logger.js';

const app = express();

/* --- CORS: aceita CORS_ORIGIN (única) ou CORS_ORIGINS (lista) --- */
function buildCorsOrigins() {
  const single = process.env.CORS_ORIGIN?.trim();
  const multi = process.env.CORS_ORIGINS?.split(',').map(s => s.trim()).filter(Boolean);
  const list = (multi && multi.length) ? multi : (single ? [single] : ['http://127.0.0.1:5500']);
  return list;
}
const ALLOWED_ORIGINS = buildCorsOrigins();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // permite ferramentas locais sem origin (curl, etc.)
    const ok = ALLOWED_ORIGINS.includes(origin);
    cb(ok ? null : new Error('CORS bloqueado: ' + origin), ok);
  },
  credentials: false,
}));
  // log simples de início de request
  logger.info('req', { method: req.method, url: req.url, ip: req.ip });
  next();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // para servir imagens locais ao front
}));
app.use(compression());
app.use(express.json({ limit: '1mb' }));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // permite ferramentas locais sem origin (curl, etc.)
    const ok = ALLOWED_ORIGINS.includes(origin);
    cb(ok ? null : new Error('CORS bloqueado: ' + origin), ok);
  },
  credentials: false,
}));

// Rate limit básico (por IP): 300 req / 5 min
app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 300,
}));

// Access logs
app.use(morgan('combined', {
  stream: { write: (msg) => logger.info(msg.trim()) }
}));

// Rotas
app.use(router);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Erros
app.use((err, req, res, next) => {
  logger.error('error', { message: err.message, stack: err.stack });
  res.status(500).json({ error: 'Erro interno' });
});

const port = Number(process.env.PORT || 3333);
app.listen(port, () => {
  console.log(`🚀 Forno a Lenha API rodando em http://localhost:${port}`);
});
