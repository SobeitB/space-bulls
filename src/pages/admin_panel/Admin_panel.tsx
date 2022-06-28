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

import { useNFTBalances } from "react-moralis";
import { useEffect, useState, useCallback, useMemo } from "react";
import { PaginationPage } from '../../components/shared/PaginationPages/PaginationPages';

const AdminPanel = () => {
   const { getNFTBalances, isLoading } = useNFTBalances();
   const [selectNft, setSelectNft] = useState<any[]>([]);
   const [allNft, setAllNft] = useState<any[]>([]);
   const [pages, setPages] = useState<number>(0)

   const allNftMemo = useMemo(() => [...allNft], []);
   
   console.log(allNftMemo)

   useEffect(() => {
      getNFTBalances({
         params: {
            address: '0x7F8e240cd693A61380804b47DcB31A3866b34C7f', // 0xa5E49ABB65C2a1C4a742023b5475c52De9bb0658
            chain:'0x1'
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
   }, [])

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
                  {allNftMemo.splice(pages, 10).map((nft:any) => {
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
                           src={nft.image}
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

            {!isLoading && selectNft.length === 0 &&
               
               <PaginationPage 
                  pages={pages}
                  setPages={setPages}
                  allPages={allNft.length}
               />
            }
         </div>
      </Container>
   )
}

export default AdminPanel;