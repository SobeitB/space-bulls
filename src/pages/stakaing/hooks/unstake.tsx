import abi_staking from '../../../shared/abi/SpaceStaking.json'
import {address_staking} from '../../../shared/variable'
import {useNewNotification} from '../../../hooks/NewNotification'
import {useWeb3ExecuteFunction, useMoralisCloudFunction, useMoralis } from "react-moralis";
import {stakingI} from '../StakingOnly'

export const useUnStake = () => {
   const smart = useWeb3ExecuteFunction();
   const handleNewNotification = useNewNotification();
   const {account} = useMoralis()
   const getSignedTokenIdsDebug = useMoralisCloudFunction("getSignedTokenIdsDebug");
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");

   const unStake = async (dedicatedNfts:stakingI[]) => {
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

      console.log(resRetrieve.items.map((token:any) => Number(token)))
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
            handleNewNotification('success','You have successfully unStaking the nft.')
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