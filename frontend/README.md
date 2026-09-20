# Moda Maria — Frontend

Interface da loja, feita em React + Vite + Tailwind CSS.

## Como rodar localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure a URL da API:**
   - Copie `.env.example` para `.env`
   - Confirme que `VITE_API_URL` aponta para onde seu backend está rodando (por padrão, `http://localhost:3333`)
   - **Importante:** o backend precisa estar rodando (`npm run dev` na pasta `backend`) para a loja mostrar produtos

3. **Suba o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

   O site vai abrir em `http://localhost:5173`

## Estrutura

```
frontend/
├── src/
│   ├── components/     # Header, ProductCard, CartDrawer
│   ├── pages/           # Home (listagem) e ProductDetail (detalhe)
│   ├── context/         # CartContext — estado global do carrinho
│   ├── services/        # api.js — chamadas HTTP para o backend
│   ├── utils/           # whatsapp.js — gera o link de checkout
│   ├── App.jsx           # rotas da aplicação
│   └── main.jsx          # ponto de entrada
├── tailwind.config.js    # paleta de cores (rosa/dourado)
└── package.json
```

## Antes de usar em produção

- Troque `WHATSAPP_NUMBER` em `src/utils/whatsapp.js` pelo número real da loja
- Adicione fotos reais dos produtos (hoje os produtos de teste não têm imagem)

## Próximos passos

- [ ] Trocar número de WhatsApp de teste pelo real
- [ ] Adicionar upload de imagens (Cloudinary) no backend
- [ ] Criar painel simples de admin para cadastrar produtos sem usar Postman
- [ ] Deploy (Vercel)
