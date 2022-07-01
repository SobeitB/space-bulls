import abi_staking from '../../../shared/abi/SpaceStaking.json'
import {address_staking} from '../../../shared/variable'
import {useNewNotification} from '../../../hooks/NewNotification'
import {useWeb3ExecuteFunction, useMoralisCloudFunction, useMoralis } from "react-moralis";
import {stakingI} from '../StakingOnly'
import {networks} from '../../../shared/variable'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {setNftStaking, setNftNotStaking} from '../../../app/state/staking/stakingSlice'

export const useUnStake = () => {
   const dispatch = useAppDispatch();
   const staking = useAppSelector(state => state)

   const smart = useWeb3ExecuteFunction();
   const handleNewNotification = useNewNotification();
   const {account} = useMoralis()
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");
   const {chainId} = useMoralis()

   const unStake = async (
      dedicatedNfts:stakingI[],
      setDedicatedNfts: React.Dispatch<React.SetStateAction<stakingI[]>>
   ) => {
      
      if(chainId !== networks.POL_BYTE) {
         handleNewNotification('error', 'Please switch to Polygon network in your wallet application');
         return;
      }

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
         functionName: "unstake",
         abi: abi_staking.abi,
         params: {
            tokenIds:dedicatedNfts.map((nft:stakingI) => Number(nft.token_id)),
             
            // moralis code
            signedTokenIds:resSignedTokenIds.signedTokenIds,
            nonce:resSignedTokenIds.nonce,
            signature:resSignedTokenIds.signature
         }
      }

      smart.fetch({
         params: options,
         onSuccess: (res: any) => {
            console.log(res);
            handleNewNotification('success','You have successfully unstaked the nft.')

            dispatch(setNftNotStaking(
               dedicatedNfts.map((nft) => (
                  {
                     token_id:nft.token_id,
                     reward:nft.reward,
                     isStaking:false
                  }
               ))
            ))
      
            const s = new Set(dedicatedNfts.map((e) => JSON.stringify(e)));
            dispatch(setNftStaking(
               staking.staking.nftNotStaking.filter((e) => !s.has(JSON.stringify(e)))
            ))
      
            setDedicatedNfts([])
         }, 

         onError: (err:Error) => {
            if(err.message.includes("reading")) return;

            handleNewNotification('error', 'An Error Has Occurred!')
            console.log(err)
         }
      })
   } 

   return unStake
}