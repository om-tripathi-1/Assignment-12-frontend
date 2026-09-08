import { createContext, useContext, useEffect, useState } from "react";
import {
  addCartItem,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../api/cart.service";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const loadCart = async () => {
      if (isAuthLoading) return;

      if (!user) {
        if (isCurrent) {
          setItems([]);
          setIsLoading(false);
        }
        return;
      }

      if (isCurrent) setIsLoading(true);
      try {
        const cartItems = await getCartItems();
        if (isCurrent) setItems(cartItems);
      } catch (error) {
        console.error("Could not load user cart:", error);
        if (isCurrent) setItems([]);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadCart();

    return () => {
      isCurrent = false;
    };
  }, [user, isAuthLoading]);

  const addItem = async (productId, quantity = 1, metadata = {}) => {
    const updatedItems = await addCartItem(productId, quantity, metadata);
    setItems(updatedItems);
    return updatedItems;
  };

  const updateItem = async (productId, quantity) => {
    const updatedItems = await updateCartItem(productId, quantity);
    setItems(updatedItems);
    return updatedItems;
  };

  const removeItem = async (productId) => {
    const updatedItems = await removeCartItem(productId);
    setItems(updatedItems);
    return updatedItems;
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isLoading,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

