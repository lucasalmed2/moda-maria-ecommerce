import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header({ onCartClick }) {
  const { itemCount } = useCart();

  return (
    <header className="bg-white/80 backdrop-blur border-b border-cream-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-cream-700 tracking-wide">
          Moda <span className="text-caramel-500">Maria</span>
        </Link>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-cream-500 hover:bg-cream-600 transition-colors text-white px-4 py-2 rounded-full text-sm"
        >
          Carrinho
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-caramel-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
