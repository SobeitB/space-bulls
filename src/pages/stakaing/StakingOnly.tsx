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
import {PaginationPage} from '../../components/shared/PaginationPages/PaginationPages'
import { useState, useCallback, useRef } from "react";
import { useMoralis } from "react-moralis";
import { useAppSelector } from "../../app/hooks";
import selectedNft from '../../assets/img/selectedNft.svg'
import {useGetNotStakingNft} from '../../hooks/getNotStakingNft'
import {useNotification, Modal} from 'web3uikit';
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';

interface stakingI {
   token_id:string,
   reward:number,
   isStaking:boolean,
}

const StakingOnly = () => {
   const dispatchNotification = useNotification();
   const {chainId} = useMoralis();
   const staking = useAppSelector(state => state.staking)

   const [isModalStaking, setModalStaking] = useState<boolean>(false)
   const [isModalWarning, setModalWarning] = useState<boolean>(false)
   const [dedicatedNfts, setDedicatedNfts] = useState<stakingI[]>([])
   const AllNftStaking = [...staking.nftNotStaking, ...staking.nftStaking, ] 

   const [pages, setPages] = useState<number>(0)

   let stakingOrUnstaking = useRef('Stake')
   stakingOrUnstaking.current = dedicatedNfts.some((dedicatedNft:stakingI) => dedicatedNft.isStaking) ? 'Unstake' : 'Stake';

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

   const onModal = useCallback((type:string) => () => {
      if(type === 'warning') {
         setModalWarning(!isModalWarning)
      } else {
         setModalStaking(!isModalStaking)
      }
   }, [isModalStaking, isModalWarning])

   const handleNewNotification = useCallback((
      type: notifyType,
      text:string,
      icon?: TIconType, 
   ) => {
      dispatchNotification({
         type,
         message: text,
         title: type,
         icon,
         position: 'topR',
      });
   }, [])

   const onIsStaking = useCallback((type:string) => async () => {
      if(dedicatedNfts.length) {
         if(chainId !== '0x89') {
            handleNewNotification('error', 'Select the polygon network')
            return
         }
         // const ethers = Moralis.web3Library;

         // const provider = await Moralis.enableWeb3();
         // const signer = provider.getSigner()

         handleNewNotification('success', type === 'Stake' ? 'You have successfully staking the nft.' : 'You have successfully unStaking the nft.')
      } else {
         handleNewNotification('error', 'Select at least one nft.')
      }

   }, [dedicatedNfts, chainId])

   useGetNotStakingNft()
   
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

         <Modal 
            isVisible={isModalWarning} 
            onCloseButtonPressed={onModal('warning')} 
            onCancel={onModal('warning')}
            onOk={onModal('warning')}
            title="WARNING"
            children={
               <div>
                  <p style={{"marginTop": "5px"}}>You no longer have a matching pair SpaceBull in your wallet, ID 1 </p> {/* заменить на переменную с id нфт, которого не хватает */}
                  <p style={{"margin": "15px 0"}}>If you proceed to claim $Antimatter collected so far, the total yield will be 1</p> {/* актуальное количество */}
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
               AllNftStaking.splice(pages, 10).map((nft:stakingI) => (
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

         {AllNftStaking.length ? 
            <PaginationPage
               pages={pages}
               setPages={setPages}
               allPages={AllNftStaking.length}
            />
         : ""}
      </>
   );
}

export default StakingOnly