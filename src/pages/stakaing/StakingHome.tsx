import { useEffect, useState, useCallback } from "react";
import {Suspense, lazy} from 'react';
import {useInitNft} from '../../hooks/initNft'
import { 
   Container,
   ContainerInfo,
   InfoBlock,
   InfoText,
   Pagination,
   PaginationTabs,
   Tabs,
   InfoBlockBody, 
} from "./Staking.styled";
import {Modal} from 'web3uikit'
import {useMoralis} from "react-moralis";
import { Loader } from "../../components/Loader";
import MarketPlace from "../../components/marketPlace/marketPlace";

const Home = lazy(() => import ('../../components/home/Home'));
const StakingOnly = lazy(() => import ('./components/StakingOnly'));

export interface stakingI {
   token_id:string,
   reward:number,
   isStaking:boolean,
}

const Staking = () => {
   const [bull3D, setBull3D] = useState<any[]>([]);
   const [bull2D, setBull2D] = useState<any[]>([]);
   const [nftNotStaking, setNftNotStaking] = useState<stakingI[]>([]);
   const [nftStaking, setNftStaking] = useState<stakingI[]>([]);
   const [isModal, setIsModal] = useState<boolean>(false);
   const [tab, setTab] = useState<string>('staking');
   const {account} = useMoralis();

   const onModal = useCallback(() => {
      setIsModal(!isModal)
   }, [isModal])

   const onTabs = useCallback((name:string) => () => {
      setTab(name);
   }, [tab])
   
   // получаем не застейканные нфт
   useInitNft(setBull3D, setBull2D);
   useEffect(() => {
      if(bull2D.length > 0) {
         let stakingArr: any[] = [];

         bull3D.forEach((nft3d) => {
            if(!stakingArr.includes(JSON.stringify({
               token_id:nft3d.token_id,
               reward:bull2D.some((nft2d) => nft3d.token_id === nft2d.token_id),
               isStaking:false
            }))) {
               stakingArr.push(JSON.stringify({
                  token_id:nft3d.token_id,
                  reward:bull2D.some((nft2d) => nft3d.token_id === nft2d.token_id) ? 2 : 1,
                  isStaking:false
               }))
            }
         })

         const resultStake = stakingArr.map((val) => {
            return JSON.parse(val)
         })

         setNftNotStaking(resultStake)
      }
   }, [bull3D, bull2D])
   
   return(
      <Container>
         {account ? 
            <>
               <Modal 
                  isVisible={isModal}
                  onCloseButtonPressed={onModal}
                  onCancel={onModal}
                  onOk={onModal}
                  title="What is Staking?"
                  children={<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu posuere tortor. Maecenas ac suscipit lacus. Fusce at enim sagittis justo accumsan pellentesque. Proin faucibus posuere varius. Nam egestas, purus eget auctor aliquam, sem nisi iaculis tortor, at posuere urna lorem vitae est. Aliquam tempus eu risus vitae aliquet. Nulla suscipit diam eget interdum iaculis. Etiam sed turpis mi. Sed blandit, diam quis rhoncus viverra, magna massa posuere purus, in vulputate magna orci id risus. Curabitur rhoncus libero eget malesuada ultrices. Quisque pellentesque lacus tincidunt, ultrices metus vel, luctus justo. Quisque dapibus lectus vel sem sodales, in mollis nisi hendrerit. Aliquam hendrerit consequat tellus tincidunt sollicitudin. Praesent efficitur mauris sed risus egestas, sed feugiat tortor pretium. </p>}
               /> 

               <ContainerInfo>
                  <InfoBlockBody>
                     <InfoText>Staked</InfoText>
                     <InfoBlock>{nftStaking.length}</InfoBlock>
                  </InfoBlockBody>

                  <InfoBlockBody>
                     <InfoText>Unstaked</InfoText>
                     <InfoBlock>{nftNotStaking.length}</InfoBlock>
                  </InfoBlockBody>

                  <InfoBlockBody>
                     <InfoText>Balance</InfoText>
                     <InfoBlock>2222</InfoBlock>
                  </InfoBlockBody>

                  <InfoBlockBody>
                     <InfoText>Daily yield</InfoText>
                     <InfoBlock>
                        {
                           nftStaking.length && nftStaking.reduce((prev, {reward}: {reward: number}) => (
                              prev + (reward * 50) 
                           ), 0)
                        }
                     </InfoBlock>
                  </InfoBlockBody>
               </ContainerInfo>

               <Pagination>
                  <PaginationTabs>
                     <Tabs
                        onClick={onTabs("staking")} 
                        active={tab === "staking"}
                     >Staking</Tabs>
                     <Tabs
                        onClick={onTabs("marketPlace")}  
                        active={tab === "marketPlace"}
                     >MarketPlace</Tabs>
                  </PaginationTabs>
               </Pagination>

               {tab === "staking" ?
                  <Suspense fallback={
                     <div className="mainLoader">
                        <Loader />
                     </div>
                  }>
                     <StakingOnly 
                        staking={[...nftNotStaking, ...nftStaking]}
                        onModal={onModal}
                     />
                  </Suspense>
                  :
                  <MarketPlace />
               }
            </>
            :
            <Suspense fallback={
               <div className="mainLoader">
                  <Loader />
               </div>
            }>
               <Home />
            </Suspense>
         }
      </Container>
   )
}

export default Staking;