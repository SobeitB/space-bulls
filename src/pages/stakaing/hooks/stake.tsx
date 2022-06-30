import abi_721 from '../../../shared/abi/ERC721.json'
import abi_staking from '../../../shared/abi/SpaceStaking.json'
import {address_bulls} from '../../../shared/variable'
import {address_staking} from '../../../shared/variable'
import {useNewNotification} from '../../../hooks/NewNotification'
import {useWeb3ExecuteFunction } from "react-moralis";
import {stakingI} from '../StakingOnly'

export const useStake = () => {
   const smart = useWeb3ExecuteFunction();
   const handleNewNotification = useNewNotification();

   const stake = async (dedicatedNfts:stakingI[]) => {
      // approve
      const optionsApprove = {
         contractAddress: address_bulls.TWO_D,
         functionName: "setApprovalForAll",
         abi: abi_721,
         params: {
            operator:address_staking,  
            approved:true,
         }
      }

      await smart.fetch({
         params: optionsApprove,
         onSuccess: (res: any) => {
            console.log(res);
         }, 

         onError: (err:Error) => {
            if(err.message.includes("reading ")) return

            handleNewNotification('error', 'An Error Has Occurred!')
            console.log(err)
         }
      })


      // stake
      const optionsStake = {
         contractAddress: address_staking,
         functionName: "stake",
         abi: abi_staking.abi,
         params: {
            tokenIds:dedicatedNfts.map((nft:stakingI) => Number(nft.token_id)),
         }
      }

      await smart.fetch({
         params: optionsStake,
         onSuccess: (res: any) => {
            console.log(res);
            handleNewNotification('success','You have successfully staking the nft.') 
         }, 

         onError: (err:any) => {
            handleNewNotification('error', 'An Error Has Occurred!')
            console.log(err)
         }
      })
   } 

   return stake
}