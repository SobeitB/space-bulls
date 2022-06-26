import { useEffect } from "react";
import { useNFTBalances, useMoralis } from "react-moralis";

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
               address: '0xa5E49ABB65C2a1C4a742023b5475c52De9bb0658', // 0xa5E49ABB65C2a1C4a742023b5475c52De9bb0658
               chain:'0x1',
               token_addresses:["0x07a8ba3f4fd4db7f3381c07ee5a309c1aace9c59"]
            },
            onSuccess(data) {
               if(
                  typeof data !== 'undefined' &&
                  data !== null &&
                  typeof data.result !== 'undefined'
               ) setBull3D(data.result)
            }
         })
   
         getNFTBalances({
            params: {
               address: '0xa5E49ABB65C2a1C4a742023b5475c52De9bb0658', // typeof account === "string" ? account : ''
               chain:'polygon',
               token_addresses:["0x152f18f676576f78acc29d88a43f8fcde996c567"]
            },
   
            onSuccess(data) {
               if(
                  typeof data !== 'undefined' &&
                  data !== null &&
                  typeof data.result !== 'undefined'
               ) setBull2D(data.result)
            }
         })
      }
   }, [getNFTBalances, account, isAuthenticated, setBull2D, setBull3D])
}