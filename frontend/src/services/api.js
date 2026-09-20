// Centraliza todas as chamadas HTTP para o backend.
// Assim, se a URL da API mudar (ex: depois do deploy), só precisa trocar em um lugar.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Erro ao comunicar com o servidor');
  }

  // Respostas 204 (No Content) não têm corpo pra converter em JSON
  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  getProducts: (categorySlug) =>
    request(`/api/products${categorySlug ? `?category=${categorySlug}` : ''}`),

  getProduct: (id) => request(`/api/products/${id}`),

  getCategories: () => request('/api/categories'),
};
