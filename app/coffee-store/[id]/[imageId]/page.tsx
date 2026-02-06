import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { fetchCoffeeStore, fetchCoffeeStores } from '@/lib/coffee-stores';
import { createCoffeeStore, findRecordByFilter, updateCoffeeStore } from '@/lib/airtable';
import Upvote from '@/components/upvote.client';
import { coffeeStoresType } from '@/types';
import { metadata } from '@/app/layout';
import { get } from 'http';
import { getDomain } from '@/utils';

export const generateStaticParams = async () => {
    const coffeeStores = await fetchCoffeeStores({lati:43.718122800745334, long:-79.3945523808999}, 6);
    if(!coffeeStores) return [];
    return coffeeStores.map((store: { id: string, imgId: string }) => ({
        id: String(store.id),
        imageId: store.imgId
}
    ));
};
export const generateMetadata = async ({ params }: { params: { id: string, imageId: string } }) => {
    const { id, imageId } = await params;
    const coffeeStore = await fetchCoffeeStore(id, imageId);
    return {
        title: coffeeStore?.name || 'Coffee Store',
        description: `Details about ${coffeeStore?.name || 'the coffee store'}.`,
        metadataBase: getDomain(),
        alternates:{
            canonical: `/coffee-store/${id}/${imageId}`
        }
    };
}

// export const dynamic = 'force-dynamic';

const page = async (props:{params:{id:string, imageId?:string}}) => {
 

    const { id, imageId } = await props.params;
    //   const searchParams = await props.searchParams; // ✅ unwrap the promise
//   const imgId = searchParams.imageId;

//  console.log('imgId', imageId);
    const getData = async (id:string, imgId:string) => {
        const coffeeStoreFromOverPass = await fetchCoffeeStore(id, imgId);
        const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromOverPass, id);
        const voting = _createCoffeeStore ? _createCoffeeStore[0].voting : 0;
        return  coffeeStoreFromOverPass?{
            ...coffeeStoreFromOverPass,
            voting: voting
        }:{};
}
    const coffeeStore = await getData(id, imageId || '');
    const {name='', address='', imgUrl='', city='', voting=0}: coffeeStoresType = coffeeStore;
    // console.log(coffeeStore);

  return (
    <div className='h-full pb-80'>
        <div className='m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4'>
            <div>
                <div>
                    <Link href={'/'} className='font-bold'>↩ Back to Home</Link>
                </div>
                <div className="my-4">
                 <h1 className='text-4xl'>{name}</h1>
             </div>
                <Image 
                src={imgUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'}
                width={740}
                height={360}
                className='max-h-[420px] min-w-full max-w-full rounded-lg sepia lg:max-w-[470px]'
                alt={name}
             />
            </div>
            <div className='glass  mt-12 flex-col rounded-lg p-4 lg:mt-24'>
                {address && (
                    <div className="mb-4 flex ">                               <Image
                               src={"/static/icons/location.png"}
                               width={24}
                               height={24}
                               alt="star icon"
                               />
                        <p className="pl-2 font-bold text-2xl">{address}</p>
                    </div>
                )}
            <Upvote voting={voting} id={id}/>
            </div>
        </div>  
    </div>
  )
}

export default page;