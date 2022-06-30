import {
   Container,
   TitleName,
} from './Admin_panel.styled'

import {
   StakingNft,
} from '../stakaing/Staking.styled'

import {
   Item,
   BodyText,
   Title,
   Img,
   Claim,
   Description
} from '../../components/shared/UI/items.styled'
import {FormPrice} from '../../components/shared/Form/Form'

import { useNFTBalances, useMoralis} from "react-moralis";
import { useEffect, useState, useCallback } from "react";
import {networks} from '../../shared/variable'

const AdminPanel = () => {
   const { getNFTBalances, isLoading } = useNFTBalances();
   const [selectNft, setSelectNft] = useState<any[]>([]);
   const [allNft, setAllNft] = useState<any[]>([]);
   const {account} = useMoralis();

   useEffect(() => {
      getNFTBalances({
         params: {
            address: typeof account === "string" ? account : '',
            chain:networks.ETH_BYTE
         },

         onSuccess: (value) => {
            
            if(
               typeof value !== 'undefined' &&
               value !== null &&
               typeof value.result !== 'undefined'
            ) {
               setAllNft(value?.result);
            }
         }
      })
   }, [account])

   const onSelectNft = useCallback((nft:any, type:string) => () => {
      if(type === 'clear') {
         setSelectNft([])
         return;
      }
      
      setSelectNft([nft])
   }, [])

   return(
      <Container>
         <TitleName>Publish your nft for sale on Antimatter.</TitleName>
         <div style={{"marginTop": "40px"}}>
            {!isLoading && selectNft.length === 0 &&
               <StakingNft>
                  {allNft.map((nft:any) => {
                     
                     if(typeof JSON.parse(nft.metadata)?.image !== 'string') {
                        return ''
                     }

                     return(
                        <Item key={nft.block_number}>
                           <Img 
                              alt=""
                              src={JSON.parse(nft.metadata).image}
                           />
                           <BodyText>
                              <Title>Name: {nft?.name ? nft?.name : 'no name'}</Title>
                              <Description>Token id: {nft?.token_id ? nft?.token_id.substring(5, -1) : 'no token ID'}</Description>
                           </BodyText>
                           <Claim onClick={onSelectNft(nft, "add")}>Already claimed</Claim>
                        </Item>
                     )
                  })}
               </StakingNft>
            }  

            {isLoading && <h1>Loading..</h1>}

            {selectNft.length !== 0 && 
               selectNft.map((nft:any) => {
                  return(
                     <Item key={nft.block_number} select={true}>
                        <Img 
                           alt=""
                           src={JSON.parse(nft.metadata).image}
                        />
                        <BodyText>
                           <Title>Name: {nft?.name ? nft?.name : 'no name'}</Title>
                           <Description>Token id: {nft?.token_id ? nft?.token_id.substring(5, -1) : 'no token ID'}</Description>
                        </BodyText>
                        <Claim onClick={onSelectNft(nft, "clear")}>Clear</Claim>
                     </Item>
                  )
               })
            }

            {selectNft.length !== 0 && 
               <FormPrice 
                  type='admin_panel'
                  nft={selectNft[0]} 
               />
            }
         </div>
      </Container>
   )
}

export default AdminPanel;