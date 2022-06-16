import {
   Item,
   Img,
   Title,
   Network,
   BodyText,
   Claim,
} from '../../components/shared/UI/items.styled'
import {
   StakingNft,
} from "../stakaing/Staking.styled";

import Pagination from '../../components/screens/Pagination/Pagination'
import {useGetItems} from '../../hooks/getItems'
import {useNotification} from 'web3uikit';
// import {TIconType, notifyType} from 'web3uikit/';

const MarketPlace = () => {
   const {pagesDeferred, setPages, allPages, items} = useGetItems("MarketPlace");
   const dispatchNotification = useNotification();

   const handleNewNotification = (
      type: any,
      icon?: any,
   ) => () => {
      dispatchNotification({
         type,
         message: type === "error" ? 'An error has occurred!' : 'You have successfully made a purchase!',
         title: type,
         icon,
         position: 'topR',
      });
   };

   return(
      <>
         <StakingNft heigth={true}>
            {items.length ? items.map((item:any) => (
               <Item key={item.id}>
                  <Img 
                     alt=""
                  />
                  <BodyText>
                     <Title>$Antimatter: {item.attributes.antimatter}</Title>
                     <Network>Price: {item.attributes.price} matic</Network>
                     <Network>Seler: {
                        item.attributes.seller
                        .replace(/.+/, (e: any) => e.slice(0,3)+'.'.repeat(e.slice(3,9).length)+e.slice(-3))
                     }</Network>
                  </BodyText>
                  <Claim onClick={handleNewNotification('success')}>Buy</Claim>
               </Item>
            ))
            :
            <h1 className="nothing_title">There are no sales at the moment.</h1>
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

export default MarketPlace;