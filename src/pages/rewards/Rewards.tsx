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

import Pagination from '../../components/screens/Pagination/Pagination'
import {rewardsI} from '../../types/rewards.interface'
import {useGetItems} from '../../hooks/getItems'

const Rewards = () => {
   const {pagesDeferred, setPages, allPages, items} = useGetItems("Rewards")

   return(
      <>
         <StakingNft heigth={true}>

            {items.length ? items.map((reward:rewardsI) => (
               <Item key={reward.id}>
                  <Img 
                     alt=""
                  />
                  <BodyText>
                     <Title>$Antimatter: {reward.antimatter}</Title>
                     <Network>Network: polygon</Network>
                     <Description>lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum lorem Ipsum</Description>
                  </BodyText>
                  <Claim>Already claimed</Claim>
               </Item>
            ))
            :
            <h1 className="nothing_title">You don't have any awards.</h1>
         }
         </StakingNft>

         <Pagination 
            pages={pagesDeferred}
            allPages={allPages}
            setPages={setPages}
         />
      </>
   )
}

export default Rewards;