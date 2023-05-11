import axios from "axios";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import ProductCard from "../components/home/ProductCard";
import { axiosEcomerce } from "../utils/configAxios";
import Footer from "../components/layout/Footer";

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();

  const [currentCategory, setCurrentCategory] = useState(0);
  const [showCategories, setShowCategories] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProductName = e.target.productName.value
    setProductName(newProductName)
    setProductPrice(null)
  }
  const handleSubmitPriceFilter = (e) => {
    e.preventDefault()
    const newValuesPriceFilter = {
      from: Number.parseInt(e.target.fromPrice.value),
      to: Number.parseInt(e.target.toPrice.value)
    }
    setProductPrice(newValuesPriceFilter)
  }

  const handleClickCategory = (e) =>{
    setCurrentCategory(Number(e.target.dataset.category))
  }


 let productByName= useMemo(() => {
 
    return products.filter((product) => product.title.toLowerCase().includes(productName.toLowerCase()))
  
    
  
 }, [products, productName, productPrice])

 const handleClickShowCategories = () =>{
  setShowCategories(!showCategories)
 }

 const handleClickShowPriceFilter = () =>{
  setShowPriceFilter(!showPriceFilter)
 }

 const handleClickShowFilter = () =>{
    setShowFilter(!showFilter)
 }

  useEffect(() => {
    /* Este UseEffect hace una peticion con un endpoint(URL) get para obtener las categorias */
   

    if (currentCategory === 0 ) {
      axiosEcomerce
      .get('categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
    }
  },[currentCategory]);


  useEffect(() =>{
   if (currentCategory === 0) {
    axiosEcomerce
    .get('products')
    .then((res) => setProducts(res.data))
    .catch((err) => console.log(err));
   }
   
  
  },[currentCategory])

  

  if (productPrice && productPrice?.to || productPrice?.from ) {
    
    productByName = products.filter(product => (product.price < productPrice.to && product.price > productPrice.from) || ( !productPrice.to && product.price > productPrice.from) || (product.price < productPrice.to && !productPrice.from) )
    console.log(productByName)
  }


  useEffect(() =>{
    if(currentCategory !==0){
      axiosEcomerce.get(`products?categoryId=${currentCategory}`)
    .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
      setShowFilter(!showFilter)
    }
  }, [currentCategory])
  return (
    <>
    <main className="hlg:pl-[300px] hlg:max-w-[1500px] mx-auto w-full">
      <form className=" w-full   h-[45px] mt-10 mb-2 " onSubmit={handleSubmit}>
        <div className=" max-w-[510px] hlg:max-w-[900px] right-0 grid grid-cols-[1fr_auto] px-4 mx-auto ">
          <input className="min-w[190px] max-w-[475px] hlg:max-w-[900px] border-[1px] border-gray-200 pl-4" id="productName" type="text" placeholder="What are you looking for?" />
          <button className="w-[45px] hlg:w-[100px] hlg:aspect-auto hlg:h-[45px] aspect-square flex justify-center items-center  bg-red-500 text-white text-xl">
            
            <i className="bx bx-search "></i>
          </button>
        </div>
        
      </form>
      <section className="w-full flex justify-end pr-5 mb-5 ">
     <div onClick={handleClickShowFilter} className=' hlg:hidden  text-base font-medium flex   gap-3  items-center text-gray-300 cursor-pointer'>
     <i  className='block bx bx-filter-alt text-2xl ' > </i> <h4> Filters</h4> 
     </div>
     
     </section>
      <section className={` overflow-hidden fixed bg-white w-[300px] top-[60px] bottom-[200px] shadow-xl hlg:h-[calc(100vh_-_260px)] h-full  z-10 ${showFilter ? 'right-0': '-right-[300px]'} p-2 py-10 cursor-pointer transition-all duration-700 hlg:left-0 hlg:shadow-none `}>
      <i onClick={handleClickShowFilter} className='bx bx-x absolute right-0 top-0 p-5 text-2xl hover:text-red-500 hlg:hidden' ></i>
        <h3 className="text-lg font-semibold py-4 text-gray-700">Filters</h3>
        
        <section>
          <div onClick={handleClickShowPriceFilter} className="flex justify-between border-b-2 border-gray-200 cursor-pointer ">
          <h2 className="text-lg font-medium text-gray-700">Price</h2>
          <i  className={`bx bx-chevron-up ${showPriceFilter ? 'rotate-180' : 'rotate-0'} transition-transform duration-700 `} ></i>
          </div>
          <form className={ `overflow-hidden ${showPriceFilter ? 'h-[250px]' : 'h-0'} transition-[height]  duration-700 px-2`} onSubmit={handleSubmitPriceFilter} >
            <div className={`grid grid-cols-[1fr_4fr] w-[264px] justify-end gap-4 py-6`}>
            <label className=" text-lg text-[#4f4f4f]"  htmlFor="fromPrice">From</label>
            <input className="h-[35px] border-[1px]" type="number" name="fromPrice" id="fromPrice" />
            <label className=" text-lg text-[#4f4f4f]" htmlFor="toPrice">To</label>
            <input className="h-[35px] border-[1px]"  type="number" name="toPrice" id="toPrice" />
            </div>

            <div className="w-full flex justify-end">
            <button className="bg-[#f85555] w-[99px] rounded-md text-white p-2  ">Filter price</button>
            </div>
            
          </form>
        </section>
        <section className="grid gap-2" > 

        <div onClick={handleClickShowCategories} className="flex  justify-between border-b-2 border-gray-200 cursor-pointer   ">
        <h2 className="text-lg font-medium text-gray-700" >Category</h2>
        <i  className={`bx bx-chevron-up ${showCategories ? 'rotate-180' : 'rotate-0'} transition-transform duration-700 `} ></i>
        </div>
      <ul className={`overflow-hidden ${showCategories ? 'h-[150px]' : 'h-0' } transition-[height]  duration-700 px-6 pt-4`}>
          <li className="cursor-pointer text-lg text-[#4f4f4f]" onClick={handleClickCategory} data-category={0}>All</li>
          {
            categories.map((category) => <li className="cursor-pointer text-lg text-[#4f4f4f] "   onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li> )
          }
        </ul>
        </section>
        
      </section>
      <section className="grid gap-6 p-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] auto-rows-auto">
        {
          productByName.map((product) => <ProductCard  key={product.id} product={product}></ProductCard>) 

        }
      </section>

      
    </main>
    <Footer className=""/>
    </>
  );
}

export default Home;
