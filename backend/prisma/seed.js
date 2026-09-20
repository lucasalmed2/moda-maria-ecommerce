const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Cria a conta de admin (login da sua prima no painel)
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@modamaria.com' },
    update: {},
    create: {
      name: 'Admin Moda Maria',
      email: 'admin@modamaria.com',
      password: hashedPassword,
    },
  });
  console.log('Admin criado:', admin.email);

  // Cria categorias baseadas na loja real
  const vestidos = await prisma.category.upsert({
    where: { slug: 'vestidos' },
    update: {},
    create: { name: 'Vestidos', slug: 'vestidos' },
  });

  const fitness = await prisma.category.upsert({
    where: { slug: 'fitness' },
    update: {},
    create: { name: 'Fitness', slug: 'fitness' },
  });

  console.log('Categorias criadas:', vestidos.name, fitness.name);

  // Cria um produto de exemplo com variações de tamanho/cor
  const produto = await prisma.product.create({
    data: {
      name: 'Vestido Midi Manga Longa',
      description: 'Vestido midi em malha, manga longa, caimento justo. Peça queridinha da loja.',
      price: 129.9,
      images: [],
      categoryId: vestidos.id,
      variants: {
        create: [
          { size: 'P', color: 'Preto', stock: 5, sku: 'VEST-MIDI-P-PRETO' },
          { size: 'M', color: 'Preto', stock: 8, sku: 'VEST-MIDI-M-PRETO' },
          { size: 'G', color: 'Preto', stock: 3, sku: 'VEST-MIDI-G-PRETO' },
          { size: 'P', color: 'Rosa', stock: 4, sku: 'VEST-MIDI-P-ROSA' },
        ],
      },
    },
  });

  console.log('Produto criado:', produto.name);
  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
