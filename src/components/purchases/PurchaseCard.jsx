import { formatDateDDMMYYYY } from "../../utils/date";

export default function PurchaseCard({purchase}) {
  return (
    <article className="grid grid-cols-2 items-center gap-2 text-sm sm:text-base">
      <section className="flex gap-2 items-center">
        <div className="sm:h-[80px] h-[50px] aspect-square ">
          <img className="object-contain w-full h-full" loading="lazy" src={purchase.product.images[0].url} alt="" />
        </div>
        <h4 className="">{purchase.product.title}</h4>
      </section>

      <section className="grid   text-center  gap-3 sm:grid-cols-3 ">
        <span className="text-gray-400">{formatDateDDMMYYYY(purchase.createdAt)}</span>
        <div className="">
          <span className="border-[1px] border-gray-400 p-2">{purchase.quantity}</span>
        </div>
        <h4 className="font-bold">$ {(purchase.quantity * purchase.product.price).toFixed(2)}</h4>
      </section>
    </article>
  )
}
