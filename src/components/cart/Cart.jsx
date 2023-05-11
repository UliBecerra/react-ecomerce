import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'

import { changeIsShowCart, getCartProducts, purchaseCart } from '../../store/slices/cart.slices'
import { useEffect } from "react"
import CartProduct from "./CartProduct"

export default function Cart() {
  const {isShowCart, products} =useSelector(store => store.cart)

  const {token} =useSelector(store => store.userInfo)
  const dispatch = useDispatch()
  const handleClickChangeShowCart = () =>{
    dispatch(changeIsShowCart())
  }
  const totalPrice = products.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0 )
  console.log(totalPrice)

  const handleClickCheckout = () =>{
    dispatch(purchaseCart())
  }

  useEffect(() => {
    if(isShowCart){
      dispatch(getCartProducts())
    }
  },[isShowCart])
  return (
    <section className={`fixed  bg-white shadow-xl h-[calc(100vh_-_60px)] top-[60px] w-[300px]  ${isShowCart && token ? 'right-0' : '-right-full'} duration-700  p-2 grid grid-rows-[auto_1fr_auto]`}>
      <h2 className="text-xl font-bold py-3">Shopping cart</h2>
      <i onClick={handleClickChangeShowCart} className="bx bx-x absolute top-2 right-3 text-xl hover:text-red-500 cursor-pointer"></i>

      <section className="overflow-y-auto grid  gap-10 py-4 content-start">
      {
        products.map((product) => <CartProduct key={product.id} product={product}/>)
      }
      </section>

      <section className="grid grid-cols-2 py-8 border-t-[1px] border-gray-400 ">
        <span>Total</span>
        <h4 className="text-end">$ {totalPrice}.00</h4>
        <button onClick={handleClickCheckout} className='w-full col-span-2 bg-red-500 py-2 text-white  hover:bg-red-600 transition-colors rounded-sm my-6  '>Checkout</button>
      </section>
    </section>
  )
}
