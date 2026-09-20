import { Link } from 'react-router-dom';

function formatPrice(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductCard({ product }) {
  const image = product.images?.[0];
  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[3/4] bg-blush-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blush-300 font-display text-lg">
            Moda Maria
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
        <p className="text-blush-600 font-semibold mt-1">{formatPrice(product.price)}</p>
        {totalStock === 0 && (
          <span className="text-xs text-gray-400 mt-1 block">Esgotado</span>
        )}
      </div>
    </Link>
  );
}
