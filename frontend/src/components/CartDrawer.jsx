import { useCart } from '../context/CartContext';
import { buildWhatsappCheckoutUrl } from '../utils/whatsapp';

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (!open) return null;

  const whatsappUrl = buildWhatsappCheckoutUrl(items, total);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* fundo escurecido, clicar fecha o carrinho */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-blush-100">
          <h2 className="font-display text-xl text-blush-700">Seu carrinho</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-10">Seu carrinho está vazio.</p>
          )}

          {items.map((item) => (
            <div key={item.variantId} className="flex gap-3 items-start">
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Tam. {item.size} • {item.color}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-blush-100 text-blush-700 text-sm"
                  >
                    −
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-blush-100 text-blush-700 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-xs text-red-400 hover:text-red-600 mt-1"
                >
                  remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-blush-100 space-y-3">
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-full font-medium"
            >
              Finalizar pedido no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
