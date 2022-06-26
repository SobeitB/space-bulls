import {
   Form,
   InputPrice,
   BtnConfrim
} from '../Admin_panel.styled'
import {memo, useCallback, useRef, useState} from 'react'

interface FormProps {
   nft: any;
}

export const FormPrice = ({nft}:FormProps) => {
   const [price, setPrice] = useState<string>('')

   const textRef = useRef('');
   textRef.current = price

   const onClick = useCallback(() => {
      console.log('send price', nft)
   }, [nft])

   return(
      <Form >
         <InputPrice 
            type="number"
            value={price}        
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder="$Antimatter"       
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