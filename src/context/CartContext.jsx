import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart from backend when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await api.get('/api/shopping-cart');
          const cartData = response.data;
          
          // Yeni yapıya göre (cartItems -> product + quantity) eşleme yapıyoruz
          const items = Array.isArray(cartData?.cartItems) 
            ? cartData.cartItems.map(item => ({
                ...item.product,
                cartItemId: item.id, // Cart içindeki kendi ID'si
                quantity: item.quantity
              })).sort((a, b) => (a.title || '').localeCompare(b.title || ''))
            : [];
            
          setCart(items);
        } catch (error) {
          console.error('Error fetching cart:', error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  const refreshCart = async () => {
    if (user) {
      try {
        const response = await api.get('/api/shopping-cart');
        const cartData = response.data;
        const items = Array.isArray(cartData?.cartItems) 
          ? cartData.cartItems.map(item => ({
              ...item.product,
              cartItemId: item.id,
              quantity: item.quantity
            })).sort((a, b) => (a.title || '').localeCompare(b.title || ''))
          : [];
        setCart(items);
      } catch (error) {
        console.error('Error refreshing cart:', error);
      }
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post(`/api/shopping-cart/add/${product.id}`, {
        quantity: quantity,
        price: product.price,
        title: product.title,
        image: product.image
      });

      // Refresh cart from server to stay in sync
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Standard REST delete for a product in cart
      await api.delete(`/api/shopping-cart/${productId}`);

      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, amount) => {
    const item = cart.find(i => i.productId === productId || i.id === productId);
    if (item) {
      const newQuantity = item.quantity + amount;
      if (newQuantity > 0) {
        // We reuse addToCart logic to update/add
        await addToCart({ ...item, id: productId }, amount);
      }
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/api/shopping-cart/clear');
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartTotal = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
