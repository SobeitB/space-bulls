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
               address:'0xfEe64D9c90507f4Fd1B6393A04Dda2b8a402A9Ab',
               chain:chainId === '0x4' ? '0x4' : '0x89',
               token_addresses:[address_antimatter],
            },
            onSuccess:(res) => {
               console.log(res)
            }
         })
      }
   }, [account, fetchERC20Balances, chainId])

   return data
}