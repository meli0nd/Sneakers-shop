import React, { useContext, useEffect, useState } from "react";
import s from "./CartDrawer.module.scss";
import { AppContext } from "../../App";
import Info from "../common/Info";
import axios from "axios";

const CartDrawer = ({ showCart, deleteFromCart }) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const orderId = Math.trunc(Math.random() * 1000);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const fetchFromLS = JSON.parse(localStorage.getItem("orders")) || [];
      const arrayToPush = [...cartItems, "Номер заказа: " + orderId];
      const LSArray = [...fetchFromLS, arrayToPush];
      localStorage.setItem("orders", JSON.stringify(LSArray));

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart/" + item.id
        );
      }

      setIsOrderCompleted(true);
      setCartItems([]);
    } catch (error) {
      alert("Ошибка при создании заказа.");
      window.location.reload();
    }
    setIsLoading(false);
  };

  const deleteItem = (id) => {
    deleteFromCart(id);
  };

  useEffect(() => {}, [cartItems]);

  return (
    <div className={s.overlay}>
      <div className={s.drawer + "  d-flex flex-column"}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={showCart}
            className={s.removeBtn + " cu-p"}
            src="/img/btn-remove.svg"
            alt="CloseCart"
          />
        </h2>

        {cartItems.length >= 1 ? (
          <>
            <div className={s.items}>
              {cartItems.map((i) => {
                return (
                  <div
                    className={s.cartItem + " d-flex align-center mb-20"}
                    key={i.id}
                  >
                    <div
                      style={{ backgroundImage: `url(${i.image})` }}
                      className={s.cardItemImg}
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{i.name}</p>
                      <b>{i.price} руб.</b>
                    </div>
                    <img
                      onClick={() => deleteItem(i.id)}
                      className={s.removeBtn + " cu-p"}
                      src="/img/btn-remove.svg"
                      alt="removeFromCart"
                    />
                  </div>
                );
              })}
            </div>
            <div className={s.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={s.greenButton}
                onClick={onClickOrder}
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderCompleted
                ? "/img/complete-order.png"
                : "/img/empty-cart.png"
            }
          />
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
