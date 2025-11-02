// src/routes/menu.routes.js
import { Router } from 'express';
import { CATEGORIES, getAllMenu, getByCategory, searchMenu } from '../data/menu.js';

const router = Router();

// GET /api/menu → retorna todas as categorias + itens
router.get('/', (req, res) => {
  res.json({
    categories: CATEGORIES,
    data: getAllMenu()
  });
});

// GET /api/menu/:categoria → retorna itens da categoria
router.get('/:categoria', (req, res) => {
  const { categoria } = req.params;
  const items = getByCategory(categoria);
  if (!items) {
    return res.status(404).json({
      error: 'Categoria não encontrada',
      categoriaDisponiveis: CATEGORIES
    });
  }
  res.json({ categoria: categoria.toLowerCase(), items });
});

// GET /api/search?q=termo → busca global
router.get('/_search/all', (req, res) => {
  // rota interna para evitar conflito com /:categoria
  const { q } = req.query;
  const results = searchMenu(q);
  res.json({ q: q || '', count: results.length, results });
});

export default router;
