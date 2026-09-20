import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Cada item do carrinho é identificado pela combinação produto + variante (tamanho/cor)
  function addItem(product, variant, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.variantId === variant.id);

      if (existing) {
        return current.map((item) =>
          item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          variantId: variant.id,
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          size: variant.size,
          color: variant.color,
          quantity,
        },
      ];
    });
  }

  function removeItem(variantId) {
    setItems((current) => current.filter((item) => item.variantId !== variantId));
  }

  function updateQuantity(variantId, quantity) {
    if (quantity < 1) return removeItem(variantId);
    setItems((current) =>
      current.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart precisa ser usado dentro de um CartProvider');
  return context;
}
