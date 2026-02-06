'use client'
import React from 'react'
import Image from 'next/image'
import { useFormState, useFormStatus } from 'react-dom'
import { updateCoffeeStore } from '@/lib/airtable';
import { State } from '@/types';
import { upvoteAction } from '@/actions';


function Submit() {
  const {pending} = useFormStatus();
  return <button disabled={pending}>
     {pending ? "Upvoting..." : "Up vote!"}
    </button>
}

export default function Upvote({voting, id}: {voting:number, id:string}) {

  const initialState: State = {id, voting};
const [state, dispatch] = useFormState(upvoteAction, initialState);


  
  return ( 
    <form action={dispatch}>
      <div className="mb-6 flex items-center">
        <Image
        src={"/static/icons/star.png"}
        width={24}
        height={24}
        alt="star icon"
        />
        <p className="pl-2 font-bold text-2xl">{state.voting}</p>
      </div>
      <Submit />
    </form>
  )
}
