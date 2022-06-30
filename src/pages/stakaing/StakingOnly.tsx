import { 
   TitleCont,
   Title,
   IsStaking,
   StakingNft,
   Nft,
   NftImgBody,
   NftImg,
   NftImgText,
   NftInfoBody,
   NftInfoName,
   NftInfoYield,
   NftInfoStaking,
   IsSelectedNft,
   StakeAllBtn,
   ClearNft,
   ContStakeBtn
} from "./Staking.styled";
import { useState, useCallback, useRef } from "react";
import { useMoralis } from "react-moralis";
import { useAppSelector } from "../../app/hooks";
import selectedNft from '../../assets/img/selectedNft.svg'
import {useGetNotStakingNft} from '../../hooks/getNotStakingNft'
import {useGetStakingNft} from '../../hooks/getStakingNft'
import {useNewNotification} from '../../hooks/NewNotification'
import {useOnDedicatedNft} from './hooks/onDedicatedNft'
import {useModal} from './hooks/onModal'
import {useStake} from './hooks/stake'
import {useUnStake} from './hooks/unstake'
import {Modal} from 'web3uikit';
import {networks} from '../../shared/variable'

export interface stakingI {
   token_id:string,
   reward:number,
   isStaking:boolean,
}

const StakingOnly = () => {
   const handleNewNotification = useNewNotification();
   const stake = useStake();
   const unStake = useUnStake();
   const {
      isModalStaking,
      onModal
   } = useModal();

   const {chainId} = useMoralis();
   const staking = useAppSelector(state => state.staking)

   const [dedicatedNfts, setDedicatedNfts] = useState<stakingI[]>([])
   const onDedicatedNft = useOnDedicatedNft(dedicatedNfts, setDedicatedNfts);

   const AllNftStaking = [...staking.nftStaking, ...staking.nftNotStaking,]

   let stakingOrUnstaking = useRef('Stake')
   stakingOrUnstaking.current = dedicatedNfts
   .some((dedicatedNft:stakingI) => dedicatedNft.isStaking) ? 'Unstake' : 'Stake';

   useGetNotStakingNft();
   useGetStakingNft();

   const onClear = useCallback(() =>  {
      setDedicatedNfts([])
   }, [])

   const onIsStaking = useCallback((type:string) => async () => {
      if(dedicatedNfts.length) {
         if(chainId !== networks.ETH_BYTE) {
            handleNewNotification('error', 'Select the polygon network')
            return
         }

         if(type === 'Stake') {
            stake(dedicatedNfts)
         } else {
            unStake(dedicatedNfts)
         }

      } else {
         handleNewNotification('error', 'Select at least one nft.')
      }

   }, [dedicatedNfts, chainId])
   
   return(
      <>
         <Modal 
            isVisible={isModalStaking}
            onCloseButtonPressed={onModal('staking')}
            onCancel={onModal('staking')}
            onOk={onModal('staking')}
            title="What is Staking?"
            children={
               <div>
                  <p style={{"marginTop": "5px"}}>Staking your Unboxed SpaceBulls allows them to collect $Antimatter automatically.</p>
                  <p style={{"marginTop": "15px"}}>As soon as your SpaceBull starts staking, a timer will immediately begin to clock to generate $Antimatter. With enough $Antimatter you will be able to exchange it for ETH, NFTs from SpaceBulls and partner collections, claim various prizes, use it in the p2e game, and more.</p>
                  <p style={{"margin": "15px 0"}}>IMPORTANT NOTE: While your SpaceBull is staking, you won't be able to sell it on secondary marketplaces like OpenSea. To do this, you'll need to un-stake your SpaceBull directly on this website.</p>
               </div>
            }
         /> 

         <TitleCont>
            <Title>Spacebulls Unboxed ({AllNftStaking.length})</Title>
            <IsStaking onClick={onModal('staking')}>What is staking?</IsStaking>
         </TitleCont>

         <ContStakeBtn>
            <StakeAllBtn 
               onClick={onIsStaking(stakingOrUnstaking.current)}
               isSelected={Boolean(dedicatedNfts.length)}
            >
               {stakingOrUnstaking.current}
            </StakeAllBtn>
            <ClearNft onClick={onClear}>Clear</ClearNft>
         </ContStakeBtn>

         <StakingNft>
            {AllNftStaking.length ? 
               AllNftStaking.map((nft:stakingI) => (
                  <Nft 
                     key={nft.token_id}
                     isSelected={dedicatedNfts.some((dedicatedNft:stakingI) => dedicatedNft.token_id === nft.token_id)}
                  >
                     <NftImgBody>
                        <NftImg 
                           alt=""
                           src={`ipfs://bafybeibftqctvpba6ugogcxvtdcszt2ybo7frv6c35oudsolbe22awdicm/${nft.token_id}.png`}
                        />
                        <NftImgText>ID: {nft.token_id}</NftImgText>
                        {dedicatedNfts.some((dedicatedNft:stakingI) => dedicatedNft.token_id === nft.token_id) &&
                           <IsSelectedNft>
                              <img 
                                 src={selectedNft}
                                 alt=""
                              />
                           </IsSelectedNft>
                        }
                     </NftImgBody>

                     <NftInfoBody>
                        <NftInfoName>The Space Bull #{nft.token_id}</NftInfoName>
                        <NftInfoYield>{nft.reward === 2 ? 'Matching Pair' : 'No Pair'}</NftInfoYield>
                        <NftInfoYield>Yield: {50 * nft.reward} $Antimatter</NftInfoYield>
                        <NftInfoStaking onClick={onDedicatedNft(nft)}>{nft.isStaking ? 'Unstake' : 'Stake'}</NftInfoStaking>
                     </NftInfoBody>
                  </Nft>
               ))
               :
               <h1 className="nothing_title">You don't have any SpaceBulls unboxed</h1>
            }
         </StakingNft>
      </>
   );
}

export default StakingOnly