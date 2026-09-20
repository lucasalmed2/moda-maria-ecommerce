const express = require('express');
const router = express.Router();
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { requireAuth } = require('../middleware/auth.middleware');

// Rotas públicas - qualquer visitante da loja pode acessar
router.get('/', listProducts);
router.get('/:id', getProduct);

// Rotas protegidas - só a admin logada (sua prima) pode acessar
router.post('/', requireAuth, createProduct);
router.put('/:id', requireAuth, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

module.exports = router;
