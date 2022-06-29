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
import {useNotification} from 'web3uikit';
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import {address_market} from '../../shared/variable'
import abi_market from '../../shared/abi/SpaceMarket.json'
import {networks} from '../../shared/variable'

const MarketPlace = () => {
   const {chainId} = useMoralis();
   const {fetch} = useWeb3ExecuteFunction();
   const [pages, setPages] = useState(1)
   const [allPages, setAllPages] = useState(1)
   const dispatchNotification = useNotification();

   useEffect(() => {
      async function getSlotsNft() {
         const optionsViewAllPages = {
            contractAddress:address_market,
            functionName: "totalActive",
            abi: abi_market,
         }

         await fetch({
            params: optionsViewAllPages,
            onSuccess: (res:any) => {
               setAllPages(Number(res))
            },
            onError: (err:any) => {
               console.log(err)
            }
         })

         const optionsView = {
            contractAddress:"0xdaeb39f21d3a978ab6fe2e338833e3cebf33b60e",
            functionName: "retrieve",
            abi: abi_market,
            params: {
               offset:pages,
               limit:10,
            }
         }
   
         await fetch({
            params: optionsView,
            onSuccess: (res:any) => {
               console.log(res)
               
               res.forEach((itemOffer:any[]) => {
                  console.log(Number(itemOffer))
               })
            },
            onError: (err:any) => {
               console.log(err)
            }
         })
      }

      getSlotsNft()
   }, [])

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

   const buyOffer = useCallback((id:string, addressContract:string, type:string, network:string) => async () => {
      if(type === 'matter') {
         if(networks.POL_BYTE !== chainId) {
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
               message: `Change the network to ${network === networks.POL_BYTE ? 'mainnet' : 'polygon'}!`,
               title: 'error',
               icon:'info',
               position: 'topR',
            });
            return;
         }

         // покупка nft

         const optionsBuy = {
            contractAddress:address_market,
            functionName: "execute",
            abi: abi_market,
            params: {
               nftContract:addressContract,
               tokenId:Number(id),
            }
         }
         console.log(optionsBuy)
   
         await fetch({
            params: optionsBuy,
            onSuccess: (res:any) => {
               handleNewNotification('success')
               console.log(res)
            },

            onError: (err:any) => {
               console.log(err)
            }
         })
      }

      
      // handleNewNotification('error')
   }, [chainId])

   return(
      <>
         <StakingNft heigth={true}>
            {/* {items.length ? items.map((item:any) => (
               <Item key={item.id}>
                  <Img 
                     alt=""
                     src={item.attributes.img}
                  />
                  <BodyText>
                     {item.attributes.type === 'nft' ?
                        <>
                           <Network>Network: {networks.ETH_BYTE === '0x1' ? 'mainnet' : 'polygon'}</Network>
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
                  <Claim onClick={buyOffer(item.id, item.attributes.type, item.attributes.network)}>Buy</Claim>
               </Item>
            ))
            :
               <h1 className="nothing_title">There are no sales at the moment.</h1>
            } */}
         </StakingNft>

         <Pagination 
            pages={pages - 1}
            allPages={allPages}
            setPages={setPages}
         />
      </>
   )
}

export default MarketPlace;