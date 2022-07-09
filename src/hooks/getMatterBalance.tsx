import {useEffect} from "react";
import {address_antimatter} from "../shared/variable";
import {useERC20Balances, useMoralis} from "react-moralis";

export const useGetMatterBalance = () => {
   const {account, chainId} = useMoralis()
   const { fetchERC20Balances, data } = useERC20Balances({chain:chainId === '0x4' ? '0x4' : '0x89'});

   useEffect(() => {
      if(account && chainId) {
         fetchERC20Balances({
            params:{
               address:account,
               chain:chainId === '0x4' ? '0x4' : '0x89',
               token_addresses:[address_antimatter],
            }
         })
      }
   }, [account, fetchERC20Balances, chainId])

   return data
}