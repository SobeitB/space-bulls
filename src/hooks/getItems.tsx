import {useState, useEffect, useDeferredValue} from 'react'
import {useMoralis} from "react-moralis";
import {rewardsI} from '../types/rewards.interface'

export const useGetItems = (nameQuery: string) => {
   const [pages, setPages] = useState<number>(0)
   const pagesDeferred = useDeferredValue(pages);
   const [allPages, setAllPages] = useState<number>(0);
   const [items, setItems] = useState<rewardsI[] | any>([]);
   const {Moralis, isInitialized, account} = useMoralis();

   useEffect(() => {
      async function getItems () {
         const Items = Moralis.Object.extend(nameQuery);
         const query = new Moralis.Query(Items);
         const objAll = await query
         .find();

         setAllPages(objAll.length)

         const obj = await query
         .limit(10)
         .skip(10 * pagesDeferred)
         .find()
         

         if(nameQuery === "Rewards") {
            const myItems = obj.filter((value) => value.attributes.address.toLowerCase() === account)
            const itemFilter:rewardsI[] = myItems.map((item) => {
               return {
                  id: item.id,
                  antimatter:Number(item.attributes.antimatter),
               }
            })

            
            setItems(itemFilter)
         } else {
            console.log('marketPlace')
            setItems(obj)
         }
      }

      if(isInitialized) {
         getItems() 
      }
   }, [pages, isInitialized, pagesDeferred, Moralis, account, nameQuery])

   return {
      pagesDeferred, 
      setPages, 
      allPages, 
      items
   }
}