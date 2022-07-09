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
// import Countdown from "react-countdown";
import {useCallback, useEffect} from 'react'
import {useTransferMatter} from "../../hooks/transerMatter";
import {serv} from "../../shared/variable";
import {useMoralis, useMoralisQuery} from 'react-moralis'
import {useNotification} from "web3uikit";
import nitro from './img/Discord_Nitro_.png';
import Moralis from "moralis";
import {NoSaSles} from "./LimitedOffer.styled";

const LimitedOffers = () => {
   const { data } = useMoralisQuery("LimitedOffers", )
   const {user} = useMoralis()
   const transfer = useTransferMatter()
   const dispatchNotification = useNotification();

   const buyNitro = useCallback((name:string, price:string, id: string) => async () => {

      if(user) {
         transfer(price, async () => {
            if(name === 'Discord Nitro') {
               const addRole = await fetch(`${serv}addRole?id=${user.attributes.discord_id}&role=975947420485705808`, {
                  method:'POST',
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

            }
         })
      }
   }, [transfer, user])

   return(
      <StakingNft>
         {data.length !== 0 ? data.map((item) => {

            return(
               <Item>
                  <Img
                     src={item.attributes.name === 'Discord Nitro' ? nitro : ''}
                     alt="nitro"
                  />

                  <BodyText>
                     <Network>{item.attributes.name}</Network>
                     <Network>{item.attributes.price} antimatter</Network>
                  </BodyText>

                  <Claim onClick={buyNitro(item.attributes.name, item.attributes.price, item.id)}>Buy</Claim>
               </Item>
            )
         }) : <NoSaSles>There are no sales yet!</NoSaSles>}
      </StakingNft>
   )
}

export default LimitedOffers;