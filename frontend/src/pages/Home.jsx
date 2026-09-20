import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .getProducts(activeCategory)
      .then(setProducts)
      .catch(() => setError('Não foi possível carregar os produtos. Verifique se o backend está rodando.'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl text-blush-700">
          Moda <span className="text-gold-500">Maria</span>
        </h1>
        <p className="text-gray-500 mt-2">Peças femininas selecionadas com carinho ✨</p>
      </section>

      <div className="flex gap-2 justify-center mb-8 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
            activeCategory === null
              ? 'bg-blush-500 text-white border-blush-500'
              : 'border-blush-200 text-blush-600 hover:bg-blush-50'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              activeCategory === category.slug
                ? 'bg-blush-500 text-white border-blush-500'
                : 'border-blush-200 text-blush-600 hover:bg-blush-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-400">Carregando produtos...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-400">Nenhum produto encontrado nessa categoria.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
