import { useCallback } from "react";
import {stakingI} from '../StakingOnly'

export const useOnDedicatedNft = (
   dedicatedNfts:stakingI[],
   setDedicatedNfts:React.Dispatch<React.SetStateAction<stakingI[]>>,
) => {
   const onDedicatedNft = useCallback((nft: stakingI) => () => {
      if(dedicatedNfts.length) {

         if(nft.isStaking === dedicatedNfts[0].isStaking) {
            if(!dedicatedNfts.some((dedicatedNft: stakingI) => dedicatedNft.token_id === nft.token_id)) {
               setDedicatedNfts([...dedicatedNfts, nft])
            } else {
               let newArr = [...dedicatedNfts];
               newArr.splice(dedicatedNfts.indexOf(nft), 1);
               setDedicatedNfts(newArr);
            }
         }
      } else {
         setDedicatedNfts([...dedicatedNfts, nft])
      }
   }, [dedicatedNfts])

   return onDedicatedNft
}