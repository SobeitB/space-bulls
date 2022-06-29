import {useInitNft} from './initNft'
import { useEffect, useState } from "react";
import {useAppDispatch} from '../app/hooks'
import {setNftNotStaking} from '../app/state/staking/stakingSlice'

export const useGetNotStakingNft = () => {
   const dispatch = useAppDispatch()
   const [bull3D, setBull3D] = useState<any[]>([]);
   const [bull2D, setBull2D] = useState<any[]>([]);
   useInitNft(setBull3D, setBull2D);

   useEffect(() => {
      if(bull2D.length > 0) {
         let stakingArr: any[] = [];

         bull2D.forEach((nft2d) => {
            if(!stakingArr.includes(JSON.stringify({
               token_id:nft2d.token_id,
               reward:bull3D.some((nft3d) => nft3d.token_id === nft2d.token_id),
               isStaking:false 
            }))) {
               stakingArr.push(JSON.stringify({
                  token_id:nft2d.token_id,
                  reward:bull3D.some((nft3d) => nft3d.token_id === nft2d.token_id) ? 2 : 1,
                  isStaking:false
               }))
            }
         })

         const resultStake = stakingArr.map((val) => {
            return JSON.parse(val)
         })
      
         dispatch(setNftNotStaking(resultStake))
      }
      
   }, [bull3D, bull2D])
} 