import {
  createContext,
  useState,
} from "react";

export const CartContext =
  createContext();

function CartProvider({
  children,
}) {

  const [cartItems,
    setCartItems] =
    useState([]);

  // Add To Cart
  const addToCart = (product) => {

    const existingItem =
      cartItems.find(

        (item) =>
          item._id === product._id
      );

    if (existingItem) {

      setCartItems(

        cartItems.map((item) =>

          item._id === product._id

            ? {
                ...item,

                quantity:
                  item.quantity + 1,
              }

            : item
        )
      );

    } else {

      setCartItems([

        ...cartItems,

        {
          ...product,

          quantity: 1,
        },
      ]);
    }
  };

  // Remove From Cart
  const removeFromCart = (id) => {

    setCartItems(

      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  return (

    <CartContext.Provider

      value={{

        cartItems,

        setCartItems,

        addToCart,

        removeFromCart,

      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export default CartProvider;