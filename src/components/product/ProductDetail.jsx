import React, { useEffect, useState } from 'react'
import { axiosEcomerce } from '../../utils/configAxios';
import SimilarProduct from './SimilarProduct';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addProductCart } from '../../store/slices/cart.slices';

const stylePositionImages = {
  "0" : "-ml-[0%]",
  "1" : "-ml-[100%]",
  "2" : "-ml-[200%]"
}

function ProductDetail({productId}) {
  const [productData, setProductData] = useState();
  const [counter, setCounter] = useState(1);
  const [imageToShow, setImageToShow] = useState(1);
  const dispatch = useDispatch()
  const handleClickPlus = () => {
    const newCounter = counter + 1
    setCounter(newCounter)
  }

  const handleClickLess = () => {
    const newCounter = counter - 1
    if (counter>1)  setCounter(newCounter)
  }

    const handleClickAddToCart = () =>{
      dispatch(addProductCart({quantity:counter, productId: productId}))
      setCounter(1)
    }

    const nextImage = () => {
      const nextImagePosition = imageToShow + 1
      if (imageToShow < 2) {
        setImageToShow(nextImagePosition)
      }else{
        setImageToShow(0)
      }
    }
    const previousImage = () => {
      const previousImagePosition = imageToShow - 1
      if (imageToShow > 0) {
        setImageToShow(previousImagePosition)
      }else{
        setImageToShow(2)
      }
    }
  useEffect(() => {
   
    axiosEcomerce.get(`products/${productId}`)
    .then((res) => setProductData(res.data))
    .catch((err) => console.log(err));
  }, [productId]);
  return (
    <>
    <section className="flex gap-2 items-center">
        <Link to="/">Home</Link>
        <div className="h-[7px] aspect-square bg-red-500 rounded-full">
        </div>
        <span>{productData?.title}</span>
        <span className="font-bold"></span>
      </section>
    <section  className='r grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto'>
      <section className='overflow-hidden relative '>
      <section className={`flex w-[300%] ${stylePositionImages[imageToShow]} duration-200 `}>
        <div className='h-[300px] p-4 w-[calc(100%_/_3)]' >
          <img className='h-full w-full object-contain' src={productData?.images[0].url} alt="" />
        </div>
        <div className='h-[300px] p-4 w-[calc(100%_/_3)]'>
          <img className='h-full w-full object-contain' src={productData?.images[1].url} alt="" />
        </div>
        <div className='h-[300px] p-4 w-[calc(100%_/_3)]'>
          <img className='h-full w-full object-contain' src={productData?.images[2].url} alt="" />
        </div>
      </section>
      <i onClick={previousImage} className='bx bxs-left-arrow-circle absolute text-xl  top-1/2 translate-y-1/2 left-2 text-red-600 hover:text-red-400 cursor-pointer'></i>
      <i onClick={nextImage} className='bx bxs-right-arrow-circle absolute  text-xl top-1/2 translate-y-1/2 right-2 text-red-600 hover:text-red-400 cursor-pointer'></i>
      </section>
      <section>
      <h4 className='text-gray-400 font-bold mt-6'>{productData?.brand}</h4>
      <h3 className='font-bold text-lg ml-2'>{productData?.title}</h3>

      <section className='grid grid-cols-2'>
        <article>
          <h4 className='text-gray-400 font-bold'>Price</h4>
          <span className='font-bold text-lg ml-2'>{productData?.price}</span>
        </article>

        <article>
          <h4 className='text-gray-400 font-bold'>Quantity</h4>
          <div>
            <button onClick={handleClickLess} className='p-2 border-[1px] px-4 hover:bg-red-500 hover:text-white transition-colors '>-</button>
            <span className='p-2 border-[1px] px-4'>{counter}</span>
            <button onClick={handleClickPlus} className='p-2 border-[1px] px-4 hover:bg-red-500 hover:text-white transition-colors '>+</button>
          </div>
        </article>
        </section>
        <button onClick={handleClickAddToCart} className='w-full bg-red-500 py-2 text-white  hover:bg-red-600 transition-colors rounded-sm my-6  '>
          Add to cart <i className='bx bx-cart'></i>
        </button>

        <p className='text-sm my-6 text-gray-800'>{productData?.description}</p>
      </section>
      
    </section>

    <SimilarProduct categoryId={productData?.categoryId} productId={productData?.id}/>
    </>
  )
}

export default ProductDetail
