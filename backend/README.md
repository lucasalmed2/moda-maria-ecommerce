# Moda Maria — Backend

API da loja de roupas femininas Moda Maria. Feita para aprendizado e portfólio.

## Tecnologias

- Node.js + Express
- PostgreSQL + Prisma (ORM)
- JWT para autenticação da admin
- bcrypt para hash de senha

## Como rodar localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o banco de dados:**
   - Instale o PostgreSQL localmente, ou crie um banco gratuito em [Neon](https://neon.tech) ou [Railway](https://railway.app)
   - Copie `.env.example` para `.env` e preencha o `DATABASE_URL` com a string de conexão do seu banco

3. **Rode as migrations** (cria as tabelas no banco):
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Suba o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

   A API vai estar rodando em `http://localhost:3333`

5. **(Opcional) Explore o banco visualmente:**
   ```bash
   npm run prisma:studio
   ```

## Estrutura de pastas

```
backend/
├── prisma/
│   └── schema.prisma      # modelo do banco de dados
├── src/
│   ├── config/
│   │   └── prisma.js      # instância compartilhada do Prisma Client
│   ├── controllers/
│   │   └── product.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   └── auth.routes.js
│   └── server.js          # ponto de entrada da aplicação
└── package.json
```

## Rotas disponíveis

| Método | Rota                  | Protegida? | Descrição                    |
|--------|------------------------|------------|-------------------------------|
| GET    | /api/products           | Não        | Lista produtos (filtro `?category=slug`) |
| GET    | /api/products/:id       | Não        | Detalhe de um produto        |
| POST   | /api/products           | Sim        | Cria produto                 |
| PUT    | /api/products/:id       | Sim        | Atualiza produto              |
| DELETE | /api/products/:id       | Sim        | Remove produto                |
| GET    | /api/categories         | Não        | Lista categorias              |
| POST   | /api/categories         | Sim        | Cria categoria                |
| POST   | /api/auth/login         | Não        | Login da admin, retorna token |

## Próximos passos

- [ ] Criar o front-end em React que consome essa API
- [ ] Implementar a lógica do carrinho e checkout via WhatsApp
- [ ] Fazer deploy (Render/Railway + banco em Neon)
- [ ] (Futuro) Integrar gateway de pagamento real
