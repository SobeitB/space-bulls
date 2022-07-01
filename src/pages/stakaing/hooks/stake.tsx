import abi_1155 from '../../../shared/abi/ERC1155.json'
import abi_staking from '../../../shared/abi/SpaceStaking.json'
import {address_bulls} from '../../../shared/variable'
import {address_staking} from '../../../shared/variable'
import {useNewNotification} from '../../../hooks/NewNotification'
import {useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import {stakingI} from '../StakingOnly'
import {networks} from '../../../shared/variable'
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {setNftStaking, setNftNotStaking} from '../../../app/state/staking/stakingSlice'

export const useStake = () => {
   const dispatch = useAppDispatch();
   const staking = useAppSelector(state => state)
   const smart = useWeb3ExecuteFunction();

   const handleNewNotification = useNewNotification();
   const {chainId, account} = useMoralis()

   const stake = async (
      dedicatedNfts:stakingI[], 
      setDedicatedNfts: React.Dispatch<React.SetStateAction<stakingI[]>>
   ) => {
      // approve
      if(chainId !== networks.POL_BYTE) {
         handleNewNotification('error', 'Please switch to Polygon network in your wallet application');
         return;
      }

      const optionsIsApprove = {
         contractAddress: address_bulls.TWO_D,
         functionName: "isApprovedForAll",
         abi: abi_1155.abi,
         params: {
            account:account,
            operator:address_staking
         }
      }

      const isApprovedForAll = await smart.fetch({
         params: optionsIsApprove,
         onSuccess: (result: any) => {
            console.log(result)
         },
         onError:(err:any) => {
            console.log(err)
         }
      })


      if(!isApprovedForAll) {
         const optionsApprove = {
            contractAddress: address_bulls.TWO_D,
            functionName: "setApprovalForAll",
            abi: abi_1155.abi,
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
               if(err.message.includes("reading")) return
   
               handleNewNotification('error', 'An Error Has Occurred!')
               console.log(err)
            }
         })
      }

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
            handleNewNotification('success','You have successfully staked the nft.');
            
            dispatch(setNftStaking(
               dedicatedNfts.map((nft) => (
                  {
                     token_id:nft.token_id,
                     reward:nft.reward,
                     isStaking:true
                  }
               ))
            ))
      
            const s = new Set(dedicatedNfts.map((e) => JSON.stringify(e)));
            dispatch(setNftNotStaking(
               staking.staking.nftNotStaking.filter((e) => !s.has(JSON.stringify(e)))
            ))
      
            setDedicatedNfts([])
         }, 

         onError: (err:any) => {
            handleNewNotification('error', 'An Error Has Occurred!')
            console.log(err)
         }
      })
   } 

   return stake
}