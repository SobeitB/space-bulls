import {
   Form,
   InputPrice,
   BtnConfrim
} from '../../../pages/admin_panel/Admin_panel.styled'
import {memo, useCallback, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useWeb3ExecuteFunction, useMoralis} from 'react-moralis'
import {address_market} from '../../../shared/variable'
import abi_market from '../../../shared/abi/SpaceMarket.json'
import abi_721 from '../../../shared/abi/ERC721.json'

interface FormProps {
   nft?: any;
   type:string;
}

export const FormPrice = ({nft, type}:FormProps) => {
   const navigate = useNavigate()
   const [price, setPrice] = useState<string>('')
   const {fetch} = useWeb3ExecuteFunction();
   const {account, Moralis} = useMoralis()
   const textRef = useRef('');

   textRef.current = price

   const onClick = useCallback(async () => {
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
            price:Moralis.Units.ETH(price),
         }
      }

      await fetch({
         params: optionsMarket,
         onSuccess: (res: any) => {
            console.log(res);
            navigate('/marketPlace')
         }, 
         onError: (err:any) => {
            console.log(err)
         }
      })

   }, [nft, account])

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