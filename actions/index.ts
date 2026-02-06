'use server'
import { State } from "@/types";
import { updateCoffeeStore } from "@/lib/airtable";

export  const upvoteAction = async(preState: State) => {
    const {id} =  preState;
      const data = await updateCoffeeStore(preState.id);
      if(data){
        return {voting:data.length>0 ? data[0].voting : 0, id}
      } else{
        console.log("preState", preState);
        return preState;
      }

  }