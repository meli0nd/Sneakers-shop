import { useContext } from "react"
import { AppContext } from "../../App"

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext)
  //   counting total price to show it in Headerd and in Cart with a percentage of the tax

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0)

  return { cartItems, setCartItems, totalPrice }
}
