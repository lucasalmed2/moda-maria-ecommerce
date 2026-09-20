const prisma = require('../config/prisma');

// GET /api/products - lista todos os produtos ativos (com filtro opcional por categoria)
async function listProducts(req, res) {
  try {
    const { category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(category && { category: { slug: category } }),
      },
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}

// GET /api/products/:id - detalhe de um produto
async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, variants: true },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
}

// POST /api/products - cria um novo produto (rota protegida, só admin)
async function createProduct(req, res) {
  try {
    const { name, description, price, images, categoryId, variants } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images,
        categoryId,
        variants: {
          create: variants, // ex: [{ size: "P", color: "Preto", stock: 10, sku: "VEST-P-PRETO" }]
        },
      },
      include: { variants: true },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

// PUT /api/products/:id - atualiza um produto (rota protegida, só admin)
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, images, active, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: { name, description, price, images, active, categoryId },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}

// DELETE /api/products/:id - remove um produto (rota protegida, só admin)
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
