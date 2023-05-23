import React, { useEffect, useState } from "react"
import s from "./CartDrawer.module.scss"
import Info from "../common/Info"
import axios from "axios"
import { useCart } from "../hooks/useCart"

const CartDrawer = ({ showCart, deleteFromCart, opened }) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const orderId = Math.trunc(Math.random() * 1000)
  const { cartItems, setCartItems, totalPrice } = useCart()

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      // taking array from LS, then adding it to new mutated array and pushing it back
      const fetchFromLS = JSON.parse(localStorage.getItem("orders")) || []
      const arrayToPush = { items: cartItems, orderId }
      const LSArray = [...fetchFromLS, arrayToPush]
      localStorage.setItem("orders", JSON.stringify(LSArray))

      // clearing server cart after sending the order
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          "https://6465c1f7228bd07b3551ac58.mockapi.io/api/1/cart/" + item.id
        )
      }
      // to show that order was sended to proccess
      setIsOrderCompleted(true)
      // clearing UI cart after await functions
      setCartItems([])
    } catch (error) {
      alert("Ошибка при создании заказа.")
      window.location.reload()
    }
    setIsLoading(false)
  }

  const deleteItem = (id) => {
    deleteFromCart(id)
  }

  useEffect(() => {}, [cartItems])
  return (
    <div className={`${s.overlay} ${opened ? `${s.overlayVisible}` : ""}`}>
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
                )
              })}
            </div>
            <div className={s.cartTotalBlock}>
              <ul>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{Math.trunc(totalPrice * 0.05)} руб.</b>
                </li>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{Math.trunc(totalPrice - totalPrice * 0.05)} руб.</b>
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
  )
}

export default CartDrawer
