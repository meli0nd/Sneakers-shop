import React, { useContext, useEffect, useState } from "react"
import Card from "../Card/Card"
import { AppContext } from "../../App"

const Orders = ({ onAddToCart, onAddToFavorite }) => {
  const [orders, setOrders] = useState([])
  const { favorited } = useContext(AppContext)

  useEffect(() => {
    const fetchOrders = JSON.parse(localStorage.getItem("orders")) || []

    // turning a nested array into one whole and puting it to the state
    setOrders(fetchOrders.reduce((prev, obj) => [...prev, ...obj.items], []))
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Мои заказы</h1>
      </div>

      {orders.length > 0 ? (
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
      ) : (
        <div>
          <h1>У вас нет заказов</h1>
        </div>
      )}
    </div>
  )
}
export default Orders
