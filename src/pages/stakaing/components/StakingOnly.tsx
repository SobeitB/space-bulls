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
} from "../Staking.styled";
import {stakingI} from '../StakingHome'
import { useState, useCallback } from "react";
import selectedNft from '../../../assets/img/selectedNft.svg'

interface props {
   onModal:() => void;
   staking:stakingI[];
}

const StakingOnly = ({onModal, staking}: props) => {
   const [dedicatedNfts, setDedicatedNfts] = useState<stakingI[]>([])
   const stakingOrUnstaking = dedicatedNfts.some((dedicatedNft:stakingI) => dedicatedNft.isStaking) ? 'Unstake' : 'Stake'

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

   const onClear = useCallback(() =>  {
      setDedicatedNfts([])
   }, [])

   const onIsStaking = useCallback((type:string) => () => {
      if(dedicatedNfts.length) {
         console.log(dedicatedNfts)
      } 
   }, [dedicatedNfts])


   return(
      <>
         <TitleCont>
            <Title>Spacebulls Unboxed ({staking.length})</Title>
            <IsStaking onClick={onModal}>What is staking?</IsStaking>
         </TitleCont>

         <ContStakeBtn>
            <StakeAllBtn 
               onClick={onIsStaking(stakingOrUnstaking)}
               isSelected={Boolean(dedicatedNfts.length)}
            >
               {stakingOrUnstaking}
            </StakeAllBtn>
            <ClearNft onClick={onClear}>Clear</ClearNft>
         </ContStakeBtn>

         <StakingNft>
            {staking.length ? 
               staking.map((nft:stakingI) => {
                  return(
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
                  )
               })
               :
               <h1>You don't have any SpaceBulls unboxed</h1>
            }
         </StakingNft>
      </>
   );
}

export default StakingOnly