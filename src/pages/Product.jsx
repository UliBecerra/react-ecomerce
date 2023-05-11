import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import ProductDetail from "../components/product/ProductDetail";

function Product() {
  const { id } = useParams();


  return (
    <main className="px-2">
      

      <ProductDetail productId={id}/>
    </main>
  );
}

export default Product;
