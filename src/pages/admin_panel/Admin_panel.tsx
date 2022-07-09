import {
   Container,
   TitleName,
   Form,
   InputPrice,
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
   const [date, setDate] = useState<string>('');
   const [openSea, setOpenSea] = useState<string>('');
   const [allNft, setAllNft] = useState<any[]>([]);
   const {account} = useMoralis();

   useEffect(() => {
      getNFTBalances({
         params: {
            address: typeof account === "string" ? account : '',
            chain:networks.POL_BYTE 
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
                              src={JSON.parse(nft.metadata).image.replace("ipfs://", "http://tsb.imgix.net/ipfs/")}
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
                           src={JSON.parse(nft.metadata).image.replace("ipfs://", "http://tsb.imgix.net/ipfs/")}
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
               <Form>
                  <InputPrice 
                     type="date" 
                     placeholder="date" 
                     onChange={(e) => setDate(e.target.value)}
                     value={date}
                  />

                  <div 
                     style={{
                        marginTop: '20px'
                     }}
                  />
                  <InputPrice 
                     placeholder="url opensea" 
                     onChange={(e) => setOpenSea(e.target.value)}
                     value={openSea}
                  />

                  <FormPrice 
                     type='admin_panel'
                     nft={selectNft[0]} 
                     date={date}
                     urlOpesea={openSea}
                  />
               </Form>
            }
         </div>
      </Container>
   )
}

export default AdminPanel;