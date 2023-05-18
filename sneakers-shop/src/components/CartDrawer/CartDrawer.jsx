import React, { useEffect } from 'react'
import s from './CartDrawer.module.scss'

const CartDrawer = ({ showCart, cartItems = [], deleteFromCart }) => {


    const deleteItem = (id) => {
        deleteFromCart(id)
    }

    useEffect(() => { console.log('rerender') }, [cartItems])


    return (
        <div className={s.overlay}>
            <div className={s.drawer + '  d-flex flex-column'}>
                <h2 className='mb-30 d-flex justify-between'>Корзина
                    <img onClick={showCart} className={s.removeBtn + ' cu-p'} src="/img/btn-remove.svg" alt="CloseCart" />
                </h2>



                {cartItems.length >= 1 ?
                    <>
                        <div className={s.items}>
                            {cartItems.map(i => {
                                return (
                                    <div className={s.cartItem + ' d-flex align-center mb-20'} key={i.id} >
                                        <div style={{ backgroundImage: `url(${i.image})` }} className={s.cardItemImg}></div>
                                        <div className='mr-20 flex'>
                                            <p className='mb-5'>{i.name}</p>
                                            <b>{i.price} руб.</b>
                                        </div>
                                        <img onClick={() => deleteItem(i.id)} className={s.removeBtn + ' cu-p'} src="/img/btn-remove.svg" alt="removeFromCart" />
                                    </div>
                                )
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
                            <button className={s.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </>
                    : <div className={s.cartEmpty + ' d-flex align-center justify-center flex-column flex'}>
                        <img src="/img/empty-cart.png" alt="Empty cart" width={120} height={120} />
                        <h2>Корзина пустая</h2>
                        <p className='opacity-6'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button className={s.greenButton} onClick={showCart}>
                            <img src="/img/arrow.svg" alt="arrow" />
                            Вернуться назад
                        </button>
                    </div>
                }



            </div>
        </div >

    )
}

export default CartDrawer