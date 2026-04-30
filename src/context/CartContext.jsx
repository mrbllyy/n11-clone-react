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
      // Try to get username from user object (it might be username or email depending on login)
      const username = user?.username || user?.email;
      
      if (username) {
        try {
          const response = await api.get(`/api/shopping-cart/${username}`);
          setCart(response.data || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
          setCart([]);
        }
      } else {
        // Fallback to localStorage for guest users if desired, 
        // but description implies service usage.
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post('/api/shopping-cart', {
        productId: product.id,
        quantity: quantity,
        price: product.price,
        title: product.title,
        image: product.image
      });
      
      // Refresh cart from server to stay in sync
      const username = user?.username || user?.email;
      if (username) {
        const response = await api.get(`/api/shopping-cart/${username}`);
        setCart(response.data || []);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Standard REST delete for a product in cart
      await api.delete(`/api/shopping-cart/${productId}`);
      
      const username = user?.username || user?.email;
      if (username) {
        const response = await api.get(`/api/shopping-cart/${username}`);
        setCart(response.data || []);
      }
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

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const cartTotal = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
