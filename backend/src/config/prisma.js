const { PrismaClient } = require('@prisma/client');

// Uma única instância do Prisma Client reutilizada em todo o projeto
const prisma = new PrismaClient();

module.exports = prisma;
