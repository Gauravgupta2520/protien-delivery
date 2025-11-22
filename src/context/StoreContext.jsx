// Setting up the Context API
import { createContext, useEffect } from "react";
import { useState } from "react"; 

import { food_list } from "../assets/frontend_assets/assets";   

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Initialize cartItems from localStorage or empty object
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return {};
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Promo codes database
  const promoCodes = {
    "UG20": 20, // 20% off
    "UG10": 10, // 10% off
    "WELCOME": 15 // 15% off
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedQuantity = prev[itemId] - 1;

      if (updatedQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest; // removes item from cart
      }

      return {
        ...prev,
        [itemId]: updatedQuantity
      };
    });
  };

  const validatePromoCode = (code) => {
    const upperCode = code.toUpperCase().trim();
    if (promoCodes[upperCode]) {
      setPromoCode(upperCode);
      setDiscountApplied(true);
      return { valid: true, discount: promoCodes[upperCode] };
    }
    setDiscountApplied(false);
    return { valid: false, discount: 0 };
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountApplied(false);
  };

  const clearCart = () => {
    setCartItems({});
    removePromoCode();
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    promoCode,
    discountApplied,
    validatePromoCode,
    removePromoCode,
    clearCart,
    promoCodes
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
