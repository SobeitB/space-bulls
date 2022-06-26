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
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';
import { useCallback } from 'react';
import { useMoralis } from 'react-moralis';

const MarketPlace = () => {
   const {chainId} = useMoralis();
   const {pagesDeferred, setPages, allPages, items} = useGetItems("MarketPlace");
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

   const buyCoins = useCallback((id:string, type:string, network:string) => async () => {
      if(type === 'matter') {
         if('0x89' !== chainId) {
            dispatchNotification({
               type:'error',
               message: 'Change the network to polygon!',
               title: 'error',
               icon:'info',
               position: 'topR',
            });
            return;
         }

         // покупка
      } else {
         if(network !== chainId) {
            dispatchNotification({
               type:'error',
               message: `Change the network to ${network === '0x1' ? 'mainnet' : 'polygon'}!`,
               title: 'error',
               icon:'info',
               position: 'topR',
            });
            return;
         }

         // покупка
      }

      handleNewNotification('success')
      // handleNewNotification('error')
   }, [chainId])

   return(
      <>
         <StakingNft heigth={true}>
            {items.length ? items.map((item:any) => (
               <Item key={item.id}>
                  <Img 
                     alt=""
                     src={item.attributes.img}
                  />
                  <BodyText>
                     {item.attributes.type === 'nft' ?
                        <>
                           <Network>Network: {item.attributes.network === '0x1' ? 'mainnet' : 'polygon'}</Network>
                           <Network>Name: {item.attributes.nftName}</Network>
                           <Network>Price: {item.attributes.nftprice} antimatter</Network>
                        </>
                        :
                        <>
                           <Title>Antimatter supply: {item.attributes.matterSupply}</Title>
                           <Network>Price: {item.attributes.matterPrice} matic</Network>
                           <Network>Seler: {
                              item.attributes.matterSeller
                              .replace(/.+/, (e: any) => e.slice(0,3)+'.'.repeat(e.slice(3,9).length)+e.slice(-3))
                           }</Network>
                        </>
                     }
                  </BodyText>
                  <Claim onClick={buyCoins(item.id, item.attributes.type, item.attributes.network)}>Buy</Claim>
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