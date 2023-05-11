import { useEffect, useState } from "react"
import { axiosEcomerce } from "../../utils/configAxios"
import ProductCard from "../../components/home/ProductCard";

function SimilarProduct({categoryId, productId}) {
  const [similarProducts, setSimilarProducts] = useState();
  
  useEffect(() => {
    if(categoryId){
      axiosEcomerce.get(`products?categoryId=${categoryId}`)
      .then((res) => {
        const otherProducts = res.data.filter((product) => product.id !== productId)
        setSimilarProducts(otherProducts)
      })
      .catch((err) => console.log(err))
    }
    
  },[categoryId, productId])
  return (
    <section className="px-2">
      <h2 className="text-red-500 font-bold text-lg mb-6 ">Discover similar items </h2>

      <section className="grid gap-6 py-4">
        {
          similarProducts?.map(product => <ProductCard key={product.id} product={product} /> )
        }
      </section>
    </section>
  )
}

export default SimilarProduct
