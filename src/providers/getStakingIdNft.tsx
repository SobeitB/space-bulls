import {useWeb3ExecuteFunction, useMoralis, useMoralisCloudFunction} from 'react-moralis'
import { useEffect } from "react";
import {address_staking} from '../shared/variable'
import abi_staking from '../shared/abi/SpaceStaking.json'

interface props {
   children:React.ReactChild | React.ReactNode;
}

export const GetIdStakingNft = ({children}: props) => {
   const contract = useWeb3ExecuteFunction();
   // const getSignedTokenIdsDebug = useMoralisCloudFunction("getSignedTokenIdsDebug");
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");
   const {account} = useMoralis()

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
               
            }
         })

      }
   }, [account])   

   return children
}