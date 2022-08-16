import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/cart.css";

import Publication from "../Publication";
import Alert from "../Alert";
import { actionBuyCart, actionClearCart } from "../../store/slices/user";

export default function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      const amount = user.cart
        .map((p) => p.price)
        .reduce((current, next) => current + next, 0);
      setTotal(amount);
    }
  }, [user]);

  const handleBuyCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const { msg } = await dispatch(actionBuyCart(token, total));
      Alert("success", msg);
    } catch (e) {
      Alert("error", e.msg);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const { msg } = await dispatch(actionClearCart(token));
      Alert("success", msg);
    } catch (e) {
      Alert("error", e.msg);
    }
  };

  return (
    <div className="cart">
      <div className="leftSide">
        <h2>Cart</h2>
        <div className="cardsContainer">
          {Object.keys(user).length > 0 ? (
            user.cart.length > 0 ? (
              user.cart.map((p, i) => (
                <Publication key={i} product={p} owner={false} cart={true} />
              ))
            ) : (
              <p>No hay nada</p>
            )
          ) : (
            <p>Cargando</p>
          )}
        </div>
      </div>
      {Object.keys(user).length > 0 && (
        <div className="rightSide">
          <h2>Total: ${total}</h2>
          <div className="actions">
            <button className="btnPrimary" onClick={() => handleBuyCart()}>
              Buy all
            </button>
            <button className="btnSecondary" onClick={() => clearCart()}>
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
