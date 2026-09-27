import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

function formatPrice(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.getProduct(id).then((data) => {
      setProduct(data);
      // Pré-seleciona a primeira variação disponível em estoque, se houver
      const firstAvailable = data.variants.find((v) => v.stock > 0);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.size);
        setSelectedColor(firstAvailable.color);
      }
    });
  }, [id]);

  if (!product) return <p className="text-center py-20 text-gray-400">Carregando...</p>;

  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  const selectedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  function handleAddToCart() {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem(product, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-cream-500 hover:underline">
        ← Voltar para a loja
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="aspect-[3/4] bg-cream-100 rounded-2xl overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cream-300 font-display text-xl">
              Moda Maria
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-2xl text-gray-800">{product.name}</h1>
          <p className="text-cream-600 text-xl font-semibold mt-2">{formatPrice(product.price)}</p>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Tamanho</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-full border text-sm transition-colors ${
                    selectedSize === size
                      ? 'bg-cream-500 text-white border-cream-500'
                      : 'border-cream-200 text-gray-600 hover:bg-cream-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-gray-700 mb-2">Cor</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                    selectedColor === color
                      ? 'bg-cream-500 text-white border-cream-500'
                      : 'border-cream-200 text-gray-600 hover:bg-cream-50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {selectedVariant && selectedVariant.stock === 0 && (
            <p className="text-red-400 text-sm mt-4">Essa combinação está esgotada.</p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="mt-8 w-full bg-cream-500 hover:bg-cream-600 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors text-white py-3 rounded-full font-medium"
          >
            {added ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </div>
    </main>
  );
}
