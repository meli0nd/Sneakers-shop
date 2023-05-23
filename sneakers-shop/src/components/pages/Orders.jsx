import React, { useContext, useEffect, useState } from "react"
import Card from "../Card/Card"
import { AppContext } from "../../App"
import axios from "axios"

const Orders = ({ onAddToCart, onAddToFavorite }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = JSON.parse(localStorage.getItem("orders")) || []

    // turning a nested array into one whole and puting it to the state
    setOrders(fetchOrders.reduce((prev, obj) => [...prev, ...obj.items], []))
  }, [])

  console.log(orders)

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои заказы</h1>
      </div>

      <div className="d-flex cardContainer">
        {orders.map((s, index) => {
          return (
            <Card
              key={index}
              name={s.name}
              price={s.price}
              image={s.image}
              id={s.id}
              favorited
              addToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
            />
          )
        })}
      </div>
    </div>
  )
}
export default Orders
