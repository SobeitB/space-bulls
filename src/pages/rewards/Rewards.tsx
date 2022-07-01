import {
   Item,
   Img,
   Title,
   Network,
   Description,
   BodyText,
   Claim,
} from '../../components/shared/UI/items.styled'

import {
   StakingNft,
} from "../stakaing/Staking.styled";

import {useNotification} from 'web3uikit';
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';
import { useCallback } from 'react';

const Rewards = () => {
   const dispatchNotification = useNotification();

   const handleNewNotification = (
      type: notifyType,
      icon?: TIconType,
   ) => {
      dispatchNotification({
         type,
         message: type === "error" ? 'An error has occurred!' : 'You have successfully made a purchase!',
         title: type,
         icon,
         position: 'topR',
      });
   };

   const getReward = useCallback((id:string) => async () => {
      handleNewNotification('success')
      handleNewNotification('error')
   }, [])

   return(
      <>
         <StakingNft heigth={true}>

            {/* {items.length ? items.map((reward:rewardsI) => (
               <Item key={reward.id}>
                  <Img 
                     alt=""
                  />
                  <BodyText>
                     <Title>$Antimatter: {reward.antimatter}</Title>
                     <Network>Network: polygon</Network>
                     <Description>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</Description>
                  </BodyText>
                  <Claim onClick={getReward(reward.id)}>Already claimed</Claim>
               </Item>
               ))
               :
               <h1 className="nothing_title">You don't have any awards.</h1>
            } */}
         </StakingNft>

         {/* <Pagination 
            pages={pagesDeferred}
            allPages={allPages}
            setPages={setPages}
         /> */}
      </>
   )
}

export default Rewards;