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
import { useMoralis, useWeb3ExecuteFunction, } from 'react-moralis';
import {address_market, address_antimatter} from '../../shared/variable'
import abi_market from '../../shared/abi/SpaceMarket.json'
import abi_antimatter from '../../shared/abi/Antimatter.json'
import {networks} from '../../shared/variable'

const MarketPlace = () => {
   const {chainId, Moralis} = useMoralis();
   const {fetch} = useWeb3ExecuteFunction();
   const [pages, setPages] = useState(1)
   const [allPages, setAllPages] = useState(1)
   const [items, setItems] = useState<any[]>([])
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
            contractAddress:address_market,
            functionName: "retrieve",
            abi: abi_market,
            params: {
               offset:pages,
               limit:10,
            }
         }
   
         await fetch({
            params: optionsView,
            onSuccess: async (res:any) => {
               const MarketPlace = Moralis.Object.extend("MarketPlace");
               const query = new Moralis.Query(MarketPlace);
               const objAll = await query.find();

               res.items.forEach((itemOffer:any) => {
                  objAll.forEach((item:any) => {
                     if(Number(item?.attributes.token_id) === Number(itemOffer.nftTokenId)) {
                        setItems((prev:any) => {
                           return [
                              ...prev,
                              {
                                 ...itemOffer,
                                 img:item?.attributes.img_url,
                                 name:item?.attributes.collection_name
                              }
                           ]
                        })    
                     }
                  })
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

   const buyOffer = useCallback((id:number, price:string, addressContract:string, type:string, network:string) => async () => {
      if(type === 'matter') {
         // if(networks.POL_BYTE !== chainId) {
         //    dispatchNotification({
         //       type:'error',
         //       message: 'Change the network to polygon!',
         //       title: 'error',
         //       icon:'info',
         //       position: 'topR',
         //    });
         //    return;
         // }

         // покупка нфт
      } else {
         if(network !== chainId) {
            dispatchNotification({
               type:'error',
               message: `Change the network to ${network === networks.ETH_BYTE ? 'mainnet' : 'polygon'}!`,
               title: 'error',
               icon:'info',
               position: 'topR',
            });
            return;
         }

         // разрешение покупки
         const optionsAllowance = {
            contractAddress:address_antimatter,
            functionName: "increaseAllowance",
            abi: abi_antimatter.abi,
            params: {
               spender:address_market,
               addedValue:Moralis.Units.ETH(price),
            }
         }

         console.log(optionsAllowance)
         await fetch({
            params: optionsAllowance,
            onSuccess: (res:any) => {
               console.log(res)
            },

            onError: (err:any) => {
               console.log(err)
            }
         })

         // покупка nft
         const optionsBuy = {
            contractAddress:address_market,
            functionName: "execute",
            abi: abi_market,
            params: {
               nftContract:addressContract,
               tokenId:id,
               execute:Number(Moralis.Units.ETH(0))
            }
         }
         
         await fetch({
            params: optionsBuy,
            onSuccess: async (res:any) => {

               const MarketPlace = Moralis.Object.extend("MarketPlace");
               const query = new Moralis.Query(MarketPlace);
               const thisOffer = await query
               .equalTo("token_id", id)
               .first();

               if(thisOffer) {
                  thisOffer.destroy()
               }

               handleNewNotification('success')
               console.log(res)
            },

            onError: (err:any) => {
               console.log(err)
               if(err.message.includes('"message":"execution reverted: ERC20: insufficient allowance"')) {
                  dispatchNotification({
                     type:'error',
                     message: `There is not enough Antimatter on the balance!`,
                     title: 'error',
                     icon:'info',
                     position: 'topR',
                  });
               }
            }
         })
      }
   }, [chainId, Moralis])

   return(
      <>
         <StakingNft heigth={true}>
            {items.length ? items.map((item:any, index:number) => {
               return(
                  <Item key={index}>
                     <Img 
                        alt=""
                        src={item?.img ? item.img : ''}
                     />
                     <BodyText>
                        {item?.name && 
                           <Network>Name: {item.name}</Network>
                        }
                        <Network>TokenId: {Number(item.nftTokenId)}</Network>
                        <Network>Price: {Moralis.Units.FromWei(item.price)} antimatter</Network>
                     </BodyText>
                     <Claim onClick={
                        buyOffer(Number(item.nftTokenId), 
                        Moralis.Units.FromWei(item.price), 
                        item.nftContract, 
                        "nft", 
                        networks.ETH_BYTE
                     )}>Buy</Claim>
                  </Item>
               )
            })
            :
               <h1 className="nothing_title">There are no sales at the moment.</h1>
            }
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