import { airTableRecordType, coffeeStoresType } from "@/types";


var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base('appY3srvr5AZ0vp77');
const table = base('coffee-stores');

// find record by filter

const getMiifiedRecords = async (records: airTableRecordType[]) => {
  return  records.map((record: airTableRecordType)=> {
        return {
            recordId:record.id,
            ...record.fields
        };
    });
}

export const findRecordByFilter = async (id: string) => {
    const findRecords = await table.select({
    filterByFormula: `id="${id}"`
}).firstPage(); 
    return getMiifiedRecords(findRecords);
}

export const createCoffeeStore = async(coffeStore: coffeeStoresType, id:string) =>{
   const { name='', address='', imgUrl='', city='',voting=0} = coffeStore;
  
  try{
    if(id){
const records =  await findRecordByFilter(id);
    if(records.length === 0){
        const createRecords = await table.create([
            {
                fields: {
                    id,
                    name,
                    address,
                    voting,
                    imgUrl
                }
            }
        ]);
        if(createRecords.length > 0){
            console.log('Coffee Store created successfully with id:', id);
        }
        return getMiifiedRecords(createRecords);
        
    } else {
        console.log("Record already exists:", records[0].recordId);
        return records;
    }
    }
   
    }catch(error){
    console.error("Error creating coffee store", error);
  }
}

export const updateCoffeeStore = async(id:string)=>{
//   const { name='', address='', imgUrl='', city='',voting=0} = coffeStore;
  
  try{
    if(id){
const records =  await findRecordByFilter(id);

    if(records.length !== 0){
        const record = records[0];
         const currentVoting = record.voting ? record.voting : 0;
            const  updateVoting = currentVoting + 1;
            const updateRecords = await table.update([
                {
                    id: record.recordId,
                    fields: {
                        voting: updateVoting
                    }
                }
            ]);
            if(updateRecords.length > 0){
                console.log('Coffee Store updated successfully with id:', id);
            }
            return getMiifiedRecords(updateRecords);
        
        
    } else {
        console.log("Record already exists:", records[0].recordId);
        // return records;
    }
    } else{
        console.error("Id is required to update the coffee store");
    }
   
    }catch(error){
    console.error("Error upvoting coffee store", error);
  }
}