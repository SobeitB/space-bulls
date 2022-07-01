import { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction, useMoralisCloudFunction } from "react-moralis";
import {address_staking} from '../../../shared/variable'
import abi_staking from '../../../shared/abi/SpaceStaking.json'

export const useValidPairs = (onModal:(type: string) => () => void) => {
   const {account} = useMoralis();
   const smart = useWeb3ExecuteFunction();
   
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");

   useEffect(() => {
      if(account) {
         const validPairs = async () => {
            const optionsRetrieve = {
               contractAddress: address_staking,
               functionName: "retrieve",
               abi: abi_staking.abi,
               params: {
                  owner:account,
                  offset:0,
                  limit:1000
               }
            }
   
            const resRetrieve:any = await smart.fetch({
               params: optionsRetrieve,
            })

            const resSignedTokenIds:any = await getSignedTokenIds.fetch({
               params:{
                  token_ids:resRetrieve.items.map((token:any) => Number(token)),
                  address:account
               }
            })

            const options = {
               contractAddress: address_staking,
               functionName: "claimable",
               abi: abi_staking.abi,
               params: {
                  sender:account,
                  signedTokenIds:resSignedTokenIds.signedTokenIds
               }
            }
      
            smart.fetch({
               params: options,
               onSuccess: (res: any) => {
                  console.log(res)
                  // проверяем, продавал нфт майннет юзер или нет
                  if(res.pairs !== 0 && res.singles > 0) {
                     onModal('staking')()
                  }
               }, 
      
               onError: (err:any) => {
                  // handleNewNotification('error', 'An Error Has Occurred!')
                  // console.log(err)
               }
            })
         }

         validPairs()
      }
   }, [account])

} 