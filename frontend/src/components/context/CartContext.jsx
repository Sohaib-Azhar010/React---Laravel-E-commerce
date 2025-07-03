import { createContext, useContext, useEffect, useState } from 'react';
import { getCart } from '../utils/cart';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]); // ← this updates the context state, which causes re-render
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount , clearCart);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
