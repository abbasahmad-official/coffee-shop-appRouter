import Image from "next/image";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import Card from "@/components/card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { coffeeStoresType } from "@/types";
import Link from "next/link";
import { Metadata } from "next";
import { getDomain } from "@/utils";




export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover Your Next Favorite Coffee Shops near You",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {

  const coffeeStores = await fetchCoffeeStores({lati:43.718122800745334, long:-79.3945523808999}, 6);
     if(!process.env.UNSPLASH_ACCESS_KEY || !process.env.AIRTABLE_TOKEN) {
        throw new Error("Missing UNSPLASH_ACCESS_KEY environment variable");
    }

 
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">

        <h2 className="text-white font-bold text-4xl lg:text-left sm:text-center">Toronto Stores</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores?.map((coffeeStore:coffeeStoresType, i:number) => (
            <Card
            key={`${coffeeStore.name}-${i}`}
            name={coffeeStore.name}
            imgUrl={coffeeStore.imgUrl}
            href={`/coffee-store/${coffeeStore.id}/${coffeeStore.imgId}`}
            />))}
         </div>
      </div>
      </main>
      </div>
  );
}
