import { Router } from 'express';
import menuRoutes from './menu.routes.js';
import orderRoutes from './orders.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, message: 'Forno a Lenha API' });
});

router.get('/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date().toISOString() });
});

router.get('/api/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date().toISOString() });
});

// Monte as rotas da API aqui:
router.use('/api/menu', menuRoutes);
router.use('/api/orders', orderRoutes);

export default router;

