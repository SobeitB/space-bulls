import {
   Item,
   Img,
   Network,
   BodyText,
   Claim,
} from '../../components/shared/UI/items.styled'

import {
   StakingNft,
} from "../stakaing/Staking.styled";
import {useCallback, useEffect, useState} from 'react'
import {useTransferMatter} from "../../hooks/transerMatter";
import {serv} from "../../shared/variable";
import {useMoralis} from 'react-moralis'
import {useNotification} from "web3uikit";
import nitro from './img/Discord_Nitro.png';
import Moralis from "moralis";
import {NoSaSles} from "./LimitedOffer.styled";
import Pagination from '../../components/screens/Pagination/Pagination'

const LimitedOffers = () => {
   const [pages, setPages] = useState(0)
   const [allPages, setAllPages] = useState(0)
   const [data, setData] = useState<any[]>([])

   const {user} = useMoralis()
   const transfer = useTransferMatter()
   const dispatchNotification = useNotification();

   useEffect(() => {
      async function getLimitedOffres() {
         const LimitedOffers = Moralis.Object.extend("LimitedOffers");
         const query = new Moralis.Query(LimitedOffers);
         const LimitedOffersAll = await query.find();

         const obj = await query
            .limit(10)
            .skip(10 * pages)
            .find()
         setAllPages(LimitedOffersAll.length)

         setData(obj)
      }

      getLimitedOffres()
   }, [pages])

   console.log(data)
   const buyNitro = useCallback((name:string, price:string, id: string, role: string) => async () => {

      if(user) {

         transfer(price, async (res:any) => {
            if(name === 'Discord Nitro') {
               const addRole = await fetch(`${serv}/addRole?id=${user.attributes.discord_id}&role=975947420485705808`, {
                  method:'POST',
                  mode: 'cors',
                  headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                     'Access-Control-Allow-Origin':'*'
                  },
               })

               if(addRole.status === 200) {
                  const LimitedOffer = Moralis.Object.extend("LimitedOffers");
                  const query = new Moralis.Query(LimitedOffer);
                  query.equalTo("objectId", id);
                  const limitedOffer = await query.first();

                  if(limitedOffer) {
                     limitedOffer.destroy()
                  }

                  dispatchNotification({
                     type:"success",
                     message: `You got the role of NITRO on the server!`,
                     title: "Success",
                     icon:"info",
                     position: 'topL',
                  })
               }
            } else {
               const addRole = await fetch(`${serv}/addRole?id=${user.attributes.discord_id}&role=${role}`, {
                  method:'POST',
                  mode: 'cors',
                  headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                     'Access-Control-Allow-Origin':'*'
                  },
               })

               if(addRole.status === 200) {
                  const LimitedOffer = Moralis.Object.extend("LimitedOffers");
                  const query = new Moralis.Query(LimitedOffer);
                  query.equalTo("objectId", id);
                  const limitedOffer = await query.first();

                  if(limitedOffer) {
                     limitedOffer.destroy()
                  }

                  dispatchNotification({
                     type:"success",
                     message: `You have received the role of a whitelist on the server!`,
                     title: "Success",
                     icon:"info",
                     position: 'topL',
                  })
               }
            }
         })
      }
   }, [transfer, user])

   return(
      <>
         <StakingNft>
            {
               user &&
               user.attributes?.discord_name.length !== 0?
                  <>
                     {data.length !== 0 ? data.map((item) => {

                           return(
                              <Item key={item.id}>
                                 <Img
                                    src={item.attributes.name === 'Discord Nitro' ? nitro : item.attributes.img}
                                    alt="nitro"
                                 />

                                 <BodyText>
                                    <Network>{item.attributes.name}</Network>
                                    <Network>{item.attributes.price} antimatter</Network>
                                 </BodyText>

                                 <Claim onClick={buyNitro(
                                    item.attributes.name,
                                    item.attributes.price,
                                    item.id,
                                    item.attributes.name === 'Discord Nitro' ? '' : item.attributes.role
                                 )}>Buy</Claim>
                              </Item>
                           )
                        })
                        : <NoSaSles>There are no sales yet!</NoSaSles>}
                  </>
                  :
                  <NoSaSles>Please connect your discord account to access this tab</NoSaSles>
            }
         </StakingNft>
         {
            user &&
            user.attributes?.discord_name.length !== 0 &&
            data.length !== 0 &&
             <Pagination
                 pages={pages}
                 allPages={allPages}
                 setPages={setPages}
             />
         }
      </>
   )
}

export default LimitedOffers;