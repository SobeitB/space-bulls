import {
   Form,
   InputPrice,
   BtnConfrim
} from '../../../pages/admin_panel/Admin_panel.styled'
import {memo, useCallback, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useWeb3ExecuteFunction, useMoralis, useNewMoralisObject} from 'react-moralis'
import {address_market, address_antimatter} from '../../../shared/variable'
import abi_market from '../../../shared/abi/SpaceMarket.json'
import abi_721 from '../../../shared/abi/ERC721.json'
import {useNotification} from 'web3uikit';

interface FormProps {
   nft?: any;
   type:string;
}

export const FormPrice = ({nft, type}:FormProps) => {
   const navigate = useNavigate()
   const [price, setPrice] = useState<string>('')
   const {fetch} = useWeb3ExecuteFunction();
   const {save} = useNewMoralisObject('MarketPlace');
   const {account,Moralis} = useMoralis()
   const textRef = useRef('');
   const dispatchNotification = useNotification();

   textRef.current = price

   const onClick = useCallback(async () => {
      console.log(textRef.current)
      if(textRef.current.length === 0) {
         return;
      }
      
      const optionsErc721 = {
         contractAddress: nft.token_address,
         functionName: "approve",
         abi: abi_721.abi,
         params: {
            to:address_market,  
            tokenId:Number(nft.token_id)
         }
      }

      await fetch({
         params: optionsErc721,
         onError: (err:any) => {
            console.log(err)
         }
      })

      const optionsMarket = {
         contractAddress: address_market,
         functionName: "create",
         abi: abi_market,
         params: {
            nftContract:nft.token_address,  
            tokenId:Number(nft.token_id),
            recipient:account,
            paymentContract:address_antimatter,
            price:Moralis.Units.ETH(textRef.current),
         }
      }
      
      await fetch({
         params: optionsMarket,
         onSuccess: async (res: any) => {
            
            const saveOffer = {
               token_id:nft.token_id,
               img_url:JSON.parse(nft.metadata).image,
               collection_name:nft.name,
            };

            await save(saveOffer)

            navigate('/marketPlace')
         }, 
         onError: (err:any) => {
            console.log(err)
            if(err.message.includes('ERR_APPROVE')) {
               dispatchNotification({
                  type:'warning',
                  message: `Try again!`,
                  title: "Warning",
                  icon:'info',
                  position: 'topR',
               });
            }
         }
      })

   }, [nft, account, Moralis])

   return(
      <Form >
         <InputPrice 
            type="number"
            value={price}        
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder={`${type === 'admin_panel' ? '$Antimatter' : "matic"}`}       
         />
         
         <SendButton onClick={onClick} />
      </Form>
   );
} 

interface ButtonProps {
   onClick: () => void;
}

export const SendButton = memo(({onClick}: ButtonProps) => {
   return <BtnConfrim onClick={onClick}>Confrim</BtnConfrim>
})