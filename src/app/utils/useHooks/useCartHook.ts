import { useEffect, useState } from "react";
import { ICart } from "../type";
import { useAppCustomContext } from "../context";

const useCartHook = () => {
  const { dispatch, state } = useAppCustomContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartListData = state.cart;

  const addCartHandler = (cart: ICart) => {
    const carts = state.cart;
    const isAlreadyAdded = carts.find((c) => c._id == cart._id);

    // if already cart added then just incrment quantity
    if (isAlreadyAdded) {
      isAlreadyAdded.quantity = isAlreadyAdded.quantity + 1;
      const updateCarts = carts.filter((c) => c._id !== isAlreadyAdded._id);
      updateCarts.push(isAlreadyAdded);
      dispatch({ type: "SET_CART", payload: [...updateCarts] });
      return;
    }

    dispatch({ type: "SET_CART", payload: [...cartListData, cart] });
  };
  const emptyCartHandler = () => {
    dispatch({ type: "SET_CART", payload: [] });
  };
  const deleteCartHandler = (i: number) => {
    const newCart = cartListData.filter((cart, idx) => i !== idx);
    dispatch({ type: "SET_CART", payload: [...newCart] });
  };
  useEffect(() => {
    let total = 0;
    cartListData?.map((cart) => {
      total = total + cart.price * cart.quantity;
    });
    setTotalAmount(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCartHandler]);

  const incQuantity = (i: number) => {
    const cart = cartListData.find((cart, index) => i === index) || {
      quantity: 0,
      name: null,
    };
    cart.quantity = cart?.quantity + 1;

    if (cart.name) {
      dispatch({ type: "SET_CART", payload: new Set([...cartListData, cart]) });
    }
  };

  const decQuantity = (i: number) => {
    const cart = cartListData.find((cart, index) => i === index) || {
      quantity: 0,
      name: null,
    };
    cart.quantity = cart?.quantity - 1;

    if (cart.quantity == 0) {
      const carts = cartListData.filter((cart, index) => index !== i);
      dispatch({ type: "SET_CART", payload: new Set([...carts]) });
      return;
    }
    if (cart.name) {
      dispatch({ type: "SET_CART", payload: new Set([...cartListData, cart]) });
    }
  };

  return {
    totalAmount,
    cartListData,
    addCartHandler,
    deleteCartHandler,
    incQuantity,
    decQuantity,
    emptyCartHandler,
  };
};

export default useCartHook;
