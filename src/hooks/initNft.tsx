import { useEffect } from "react";
import { useNFTBalances, useMoralis } from "react-moralis";
import {networks} from '../shared/variable'
import {address_bulls} from '../shared/variable'

export const useInitNft = (
   setBull3D: (value: React.SetStateAction<any[]>) => void, 
   setBull2D: (value: React.SetStateAction<any[]>) => void
) => {
   const { getNFTBalances } = useNFTBalances();
   const {account, isAuthenticated} = useMoralis();

   useEffect(() => {
      if(isAuthenticated) {
         getNFTBalances({
            params: {
               address: typeof account === "string" ? account : '', 
               chain:networks.ETH_BYTE,
               token_addresses:[address_bulls.THREE_D],
            },
            async onSuccess(data:any) {
               if(
                  typeof data !== 'undefined' &&
                  data !== null &&
                  typeof data.result !== 'undefined'
               ) setBull3D(data.result)
            }
         })
   
         getNFTBalances({
            params: {
               address: typeof account === "string" ? account : '', // typeof account === "string" ? account : ''
               chain: networks.POL_BYTE === '0x89' ? networks.POL_BYTE : networks.ETH_BYTE,  //networks.POL_BYTE === '0x13881' ? networks.ETH_BYTE : networks.POL_BYTE
               token_addresses:[address_bulls.TWO_D]
            },
   
            onSuccess(data) {
               if(
                  typeof data !== 'undefined' &&
                  data !== null &&
                  typeof data.result !== 'undefined'
               ) {
                  setBull2D(data.result)
               }
            }
         })
      }
   }, [getNFTBalances, account, isAuthenticated, setBull2D, setBull3D])
}