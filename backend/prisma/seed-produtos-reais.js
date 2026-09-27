const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Cores padrão disponíveis em quase todas as peças
const CORES = ['Marrom', 'Preto', 'Azul', 'Cinza', 'Verde água', 'Rosa bebê', 'Off', 'Amarelo'];
const ESTOQUE_PADRAO = 3;

// Gera um código (SKU) simples e único por produto+cor
function gerarSku(nomeProduto, cor) {
  const base = nomeProduto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-');
  const corSlug = cor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-');
  return `${base}-${corSlug}`;
}

// Lista de produtos reais, com o nome dos arquivos de imagem já organizados por você
const PRODUTOS = [
  {
    name: 'Blusa Ana',
    price: 69.9,
    categoria: 'Blusas',
    images: ['/images/blusa_ana1.jpg', '/images/blusa_anamodelo.jpg'],
  },
  {
    name: 'Blusa Vitória',
    price: 59.99,
    categoria: 'Blusas',
    images: ['/images/blusa_vitoria.jpg', '/images/blusa_vitoriamodelo.jpg'],
  },
  {
    name: 'Blusa Júlia',
    price: 69.9,
    categoria: 'Blusas',
    images: ['/images/blusa_julia.jpg', '/images/blusa_juliamodelo.jpg'],
  },
  {
    name: 'Blusa Cloe',
    price: 59.9,
    categoria: 'Blusas',
    images: ['/images/blusa_cloe.jpg', '/images/blusa_cloe2.jpg'],
  },
  {
    name: 'Blusa Sofia',
    price: 69.9,
    categoria: 'Blusas',
    images: ['/images/blusa_sofia.jpg', '/images/blusa_sofia1.jpg'],
  },
  {
    name: 'Body Liz',
    price: 59.9,
    categoria: 'Body',
    images: ['/images/body_liz.jpg'],
  },
  {
    name: 'Body Kamily',
    price: 79.9,
    categoria: 'Body',
    images: ['/images/body_kamily.jpg'],
  },
  {
    name: 'Body Juliana',
    price: 79.9,
    categoria: 'Body',
    images: ['/images/body_juliana.jpg'],
  },
];

function slugify(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

async function main() {
  console.log('Cadastrando produtos reais da Moda Maria...');

  // Garante que as categorias existem (cria se não existir, sem duplicar)
  const categoriasCache = {};
  for (const nomeCategoria of ['Blusas', 'Body']) {
    const categoria = await prisma.category.upsert({
      where: { slug: slugify(nomeCategoria) },
      update: {},
      create: { name: nomeCategoria, slug: slugify(nomeCategoria) },
    });
    categoriasCache[nomeCategoria] = categoria;
  }

  for (const produto of PRODUTOS) {
    const categoria = categoriasCache[produto.categoria];

    const criado = await prisma.product.create({
      data: {
        name: produto.name,
        description: `${produto.name} — disponível em várias cores. Peça exclusiva Moda Maria.`,
        price: produto.price,
        images: produto.images,
        categoryId: categoria.id,
        variants: {
          create: CORES.map((cor) => ({
            size: 'Único',
            color: cor,
            stock: ESTOQUE_PADRAO,
            sku: gerarSku(produto.name, cor),
          })),
        },
      },
    });

    console.log(`✔ ${criado.name} cadastrado com ${CORES.length} cores`);
  }

  console.log('Todos os produtos reais foram cadastrados!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
