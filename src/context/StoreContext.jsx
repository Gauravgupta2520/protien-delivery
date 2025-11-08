// Setting up the Context API
import { createContext, useEffect } from "react";
import { useState } from "react"; 

import { food_list } from "../assets/frontend_assets/assets";   

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
const[cartItems,setCartItems]=useState({});

const addToCart = (itemId) => {
if(!cartItems[itemId]){
  setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
}
else{
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
}


}
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

useEffect(() => {console.log(cartItems);}, [cartItems]);  


  const contextValue = {
    // You can add values here which you want to share across components

food_list,

    cartItems,
    addToCart,
    removeFromCart


  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
