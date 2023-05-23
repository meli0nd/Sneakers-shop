import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart"

const Header = ({ showCart }) => {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logoSneakers.svg" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="profile-icons mr-30 cu-p" onClick={showCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>{totalPrice && totalPrice} руб.</span>
        </li>
        <li className="profile-icons mr-20">
          <Link to="/favorites">
            <img
              width={18}
              height={18}
              src="/img/favorites.svg"
              alt="Favorite"
            />
          </Link>
        </li>
        <li className="profile-icons">
          <Link to="/orders">
            <img width={18} height={18} src="/img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
