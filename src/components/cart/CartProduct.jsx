import { useDispatch } from "react-redux"
import { deleteProductCart } from "../../store/slices/cart.slices"

export default function CartProduct({product}) {
  const dispatch = useDispatch()
  const handleClickDekete = () =>{
    dispatch(deleteProductCart(product.id))
  }
  return (
    <article>
    <section className="grid grid-cols-[auto_1fr_auto] gap-1 pr-4">
      <div className="h-[90px] aspect-square row-span-2 p-2">
        <img className="h-full w-full object-contain" src={product.product.images[2].url} alt="" />
      </div>
      <h4>{product.product.title}</h4>
      <i onClick={handleClickDekete} className="bx bx-trash text-red-400 cursor-pointer"></i>
      <div>
            <button className='p-2 border-[1px] px-2 hover:bg-red-500 hover:text-white transition-colors '>-</button>
            <span className='p-2 border-[1px] px-4'>{product.quantity}</span>
            <button className='p-2 border-[1px] px-2 hover:bg-red-500 hover:text-white transition-colors '>+</button>
          </div>
    </section>
    <h4 className="text-end"> Total: <span>${(product.quantity * product.product.price).toFixed(1)}</span>
    </h4>
    </article>
  )
}
