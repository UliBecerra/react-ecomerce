import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosEcomerce, getCongig } from "../utils/configAxios";
import PurchaseCard from "../components/purchases/PurchaseCard";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
  
    axiosEcomerce
      .get("purchases", getCongig())
      .then((res) => /* setPurchases(res.data) */
      {
        //# Ordenar por fecha lasa compras
        const orderPurchases = res.data.sort ((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setPurchases(orderPurchases)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="max-w-[860px] mx-auto px-2">
      <section className="flex gap-2 items-center my-2 ">
        <Link to="/">Home</Link>
        <div className="h-[7px] aspect-square bg-red-500 rounded-full"></div>
        <span className="font-bold">Purchases</span>
      </section>

      <section className="grid gap-6  py-10">
         {
          purchases.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase}/>)
         }
      </section>
    </main>
  );
}

export default Purchases;
