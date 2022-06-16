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
               chain:'0x1'
            },
            onSuccess(data) {
               if(
                  data !== undefined && data !== null
                  &&
                  data!.result !== undefined && data!.result !== null
               ) {
                  const Bulls = data!.result.filter((nft) => {
                     if(nft.symbol === "TSB") {
                        return true
                     }
                     return false
                  })
         
                  setBull3D(Bulls)
               }
            }
         })
   
         getNFTBalances({
            params: {
               address: '0xa5E49ABB65C2a1C4a742023b5475c52De9bb0658', // typeof account === "string" ? account : ''
               chain:'polygon'
            },
   
            onSuccess(data) {
               if(
                  data !== undefined && data !== null
                  &&
                  data!.result !== undefined && data!.result !== null
               ) {
                  const Bulls = data!.result.filter((nft) => {
                     if(nft.name === "Space Bulls Unboxed") {
                        return true
                     }
                     return false
                  })
         
                  setBull2D(Bulls)
               }
            }
         })
      }
   }, [getNFTBalances, account, isAuthenticated, setBull2D, setBull3D])
}