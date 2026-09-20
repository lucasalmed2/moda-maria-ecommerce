const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const { requireAuth } = require('../middleware/auth.middleware');

// GET /api/categories - lista todas (público, usado no menu do site)
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// POST /api/categories - cria categoria nova (só admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.create({ data: { name, slug } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

module.exports = router;
