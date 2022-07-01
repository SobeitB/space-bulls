import { useEffect } from "react";
import {useAppDispatch} from '../app/hooks'
import {setNftStaking} from '../app/state/staking/stakingSlice'
import {address_staking} from '../shared/variable'
import abi_staking from '../shared/abi/SpaceStaking.json'
import {useWeb3ExecuteFunction, useMoralis, useMoralisCloudFunction} from 'react-moralis'

export const useGetStakingNft = () => {
   const dispatch = useAppDispatch()
   const {account} = useMoralis()
   const contract = useWeb3ExecuteFunction();
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");

   useEffect(() => {
      if(account) {
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
   
         contract.fetch({
            params: optionsRetrieve,
            onSuccess: (res: any) => {
               
               getSignedTokenIds.fetch({
                  params:{
                     address:account
                  },
                  onError(error) {
                     console.log(error)
                  },
                  onSuccess: (res: any) => {
                     console.log(res)

                     const optionsNftStaking = {
                        contractAddress: address_staking,
                        functionName: "claimable",
                        abi: abi_staking.abi,
                        params: {
                           sender:account,
                           signedTokenIds:res.signedTokenIds
                        }
                     }
                     
                     contract.fetch({
                        params: optionsNftStaking,
                        onSuccess(results:any) {

                           const StakeNft:any[] = [];
                           results.items.forEach((item:any) => {
                              StakeNft.push({
                                 token_id:Number(item.tokenId).toString(),
                                 reward:item.hasPair ? 2 : 1,
                                 isStaking:true
                              })
                           })
                           
                           dispatch(setNftStaking(StakeNft));
                        },
                        onError(error) {
                           console.log(error)
                        },
                     })
                  }
               })
            }, 
            onError: (err:any) => {
               console.log(err)
            }
         })
      }

   }, [account])
}