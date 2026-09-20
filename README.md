# Moda Maria — E-commerce (projeto de estudo/portfólio)

Loja de roupas femininas online, inspirada na loja real [@use_modademaria](https://www.instagram.com/use_modademaria/).
Projeto criado para aprendizado prático de desenvolvimento full-stack.

## Estrutura

- `/backend` — API em Node.js + Express + PostgreSQL (Prisma)
- `/frontend` — Interface em React (a construir na próxima etapa)

## Como este projeto funciona

Em vez de gateway de pagamento (Stripe/Mercado Pago), o checkout inicial
redireciona o cliente para o WhatsApp da loja com o pedido já formatado.
A integração de pagamento real fica planejada para uma fase futura.

## Status do projeto

- [x] Modelagem do banco de dados
- [x] API backend (produtos, categorias, autenticação)
- [ ] Front-end em React
- [ ] Lógica de carrinho + checkout via WhatsApp
- [ ] Deploy
- [ ] Integração de pagamento (futuro)

Veja `/backend/README.md` para instruções de como rodar a API localmente.
