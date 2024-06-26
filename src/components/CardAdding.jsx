import React, { useEffect, useState } from 'react'
import Card from './Card'
import banner from "../assets/under_banner.png";
import Layout from '../Layout'
import {db} from "../Firebase"
import app from '../Firebase'
import { collection ,getDocs } from 'firebase/firestore'

function CardAdding() {
  const [productDatas,setProductData]=useState([])
  
  useEffect(() => {
    const getDatas = async () => {
      try {
        const productsCollectionReference = collection(db, "products");
        const snapshot = await getDocs(productsCollectionReference);
  
        const arr = snapshot.docs.map((doc) =>doc.data());
        console.log(arr)
        setProductData(arr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getDatas();
  }, []);
  
  return (
    <>
    <Layout>
    <div className='2xl:mx-36 '>
    <div className='2xl:ml-[5px] xl:ml-[90px] lg:ml-[80px] md:ml-[70px] text-2xl mt-4'> Fresh recommendations</div>
    <div className=' container max-sm:grid-cols-1 max-sm:mx-auto mx-auto md:grid-cols-2 2xl:mx-auto xl:mx-auto md:gap-0 2xl:grid-cols-4 md:mx-auto  lg:mx-auto mt-6 grid xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0  2xl:gap-0  xl:gap-0'>
      {productDatas.map((datas,index)=>{
        console.log(datas.id)
        return <Card key={index} id={datas.id} values={datas}></Card>
      })}
     
    </div>
    </div>
    <div className='w-full flex justify-center mt-6 mb-6'>
      <div className=' px-2 py-2 border-2 inputborderapp cursor-pointer  font-bold'>Load more</div>
    </div>
    <img className='mt-2 w-full banner' src={banner} alt="" />
    </Layout>
    </>
    )
}

export default CardAdding