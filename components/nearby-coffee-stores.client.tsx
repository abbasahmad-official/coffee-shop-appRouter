'use client';
import React, { useEffect, useState } from 'react'
import Banner from './banner.client'
import Card from './card.server';
import useTrackLocation from '@/hooks/use-track-location';
import { coffeeStoresType } from '@/types';


const NearbyCoffeeStores = () => {
    const[coffeeStores, setCoffeeStores] = useState([]);
    const {handleTrackLocation, isFindingLocation, location, locationErrorMsg} = useTrackLocation();
        const handleOnCLick=()=> {
    handleTrackLocation();
  }
    const  fetchCoffeeStoresNearBy = async()=>{
      try{
 if (location.lati && location.long){
    const limit:number = 10;
     const res =  await fetch(`/api/getCoffeeStoresByLocation?lat=${location.lati}&long=${location.long}&limit=${limit}`); 
    const stores = await res.json();  
  
    if(stores.length === 0){
        console.log("No stores found");
        return [];
     }  
     if(!stores){
            return [];
        }   else {
            setCoffeeStores(stores);
            // console.log(stores);
        }
    }
  } catch (error) {
    console.error("Error fetching coffee stores nearby:", error);
  }
    }
  useEffect(() => {
 
    fetchCoffeeStoresNearBy();
   
  },[location]);
  

  return (
    <div>
      <Banner handleOnClick={handleOnCLick} 
      buttonText={isFindingLocation ? "Locating stores..." : "View stores nearby"}
      /> 
      {locationErrorMsg &&<p className='font-bold text-red-300 text-3xl'>Error: {locationErrorMsg}</p>}
       {coffeeStores.length>0 && <div className="mt-20">
        <h2 className="text-white font-bold text-4xl lg:text-left sm:text-center">Stores near me</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores?.map((coffeeStore:coffeeStoresType, i:number) => (
            <Card
              key={`${coffeeStore.name}-${i}`}
              name={coffeeStore.name}
              imgUrl={coffeeStore.imgUrl}
              href={`/coffee-store/${coffeeStore.id}/${coffeeStore.imgId}`}
              />))}
          </div>
          </div>}
    </div>
  )
}

export default NearbyCoffeeStores
