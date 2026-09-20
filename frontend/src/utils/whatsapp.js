// Troque pelo número real da loja no formato: código do país + DDD + número (só dígitos)
// Exemplo Brasília (61): "556199999999"
const WHATSAPP_NUMBER = '5561981450631';

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsappCheckoutUrl(items, total) {
  const lines = [
    'Olá! Gostaria de fazer o seguinte pedido na Moda Maria:',
    '',
    ...items.map(
      (item) =>
        `• ${item.name} — Tam. ${item.size}, Cor: ${item.color} (x${item.quantity}) — ${formatPrice(
          item.price * item.quantity
        )}`
    ),
    '',
    `*Total: ${formatPrice(total)}*`,
  ];

  const message = lines.join('\n');
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
