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
import { useState, useCallback } from "react";
import { useAppSelector } from "../../app/hooks";
import selectedNft from '../../assets/img/selectedNft.svg'
import {useGetNotStakingNft} from '../../hooks/getNotStakingNft'
import {Modal} from 'web3uikit'
import {useNotification} from 'web3uikit';


interface stakingI {
   token_id:string,
   reward:number,
   isStaking:boolean,
}

const StakingOnly = () => {
   const [isModal, setModal] = useState<boolean>(false)
   const [dedicatedNfts, setDedicatedNfts] = useState<stakingI[]>([])
   const stakingOrUnstaking = dedicatedNfts.some((dedicatedNft:stakingI) => dedicatedNft.isStaking) ? 'Unstake' : 'Stake'
   const staking = useAppSelector(state => state.staking)
   const AllNftStaking = [...staking.nftNotStaking, ...staking.nftStaking] 
   const dispatchNotification = useNotification();

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

   const onModal = useCallback(() => {
      setModal(!isModal)
   }, [isModal])

   const handleNewNotification = useCallback((
      type: any,
      text:string,
      icon?: any, 
   ) => {
      dispatchNotification({
         type,
         message: text,
         title: type,
         icon,
         position: 'topR',
      });
   }, [dispatchNotification])

   const onIsStaking = useCallback((type:string) => () => {
      if(dedicatedNfts.length) {
      
         handleNewNotification('success', type === 'Stake' ? 'You have successfully staking the nft.' : 'You have successfully unStaking the nft.')
      } else {
         handleNewNotification('error', 'Select at least one nft.')
      }

   }, [dedicatedNfts, handleNewNotification])

   useGetNotStakingNft()

   return(
      <>
         <Modal 
            isVisible={isModal}
            onCloseButtonPressed={onModal}
            onCancel={onModal}
            onOk={onModal}
            title="What is Staking?"
            children={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu posuere tortor. Maecenas ac suscipit lacus. Fusce at enim sagittis justo accumsan pellentesque. Proin faucibus posuere varius. Nam egestas, purus eget auctor aliquam, sem nisi iaculis tortor, at posuere urna lorem vitae est. Aliquam tempus eu risus vitae aliquet. Nulla suscipit diam eget interdum iaculis. Etiam sed turpis mi. Sed blandit, diam quis rhoncus viverra, magna massa posuere purus, in vulputate magna orci id risus. Curabitur rhoncus libero eget malesuada ultrices. Quisque pellentesque lacus tincidunt, ultrices metus vel, luctus justo. Quisque dapibus lectus vel sem sodales, in mollis nisi hendrerit. Aliquam hendrerit consequat tellus tincidunt sollicitudin. Praesent efficitur mauris sed risus egestas, sed feugiat tortor pretium. </p>}
         /> 

         <TitleCont>
            <Title>Spacebulls Unboxed ({AllNftStaking.length})</Title>
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
            {AllNftStaking.length ? 
               AllNftStaking.map((nft:stakingI) => {
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
               <h1 className="nothing_title">You don't have any SpaceBulls unboxed</h1>
            }
         </StakingNft>
      </>
   );
}

export default StakingOnly