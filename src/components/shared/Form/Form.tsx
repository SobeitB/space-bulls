import {
   Form,
   InputPrice,
   BtnConfrim
} from '../../../pages/admin_panel/Admin_panel.styled'
import {memo, useCallback, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useWeb3ExecuteFunction, useMoralis, useNewMoralisObject} from 'react-moralis'
import {address_spaceBags, address_antimatter, address_market} from '../../../shared/variable'
import abi_antimatter from '../../../shared/abi/Antimatter.json'
import abi_market from '../../../shared/abi/SpaceMarket.json'
import {useNotification} from 'web3uikit';

interface FormProps {
   nft?: any;
   pack?:number;
   type:string;
   date?:string;
   urlOpesea?:string;
}

export const FormPrice = ({
   nft, 
   type, 
   pack = 0,
   date = '',
   urlOpesea = '',
}:FormProps) => {
   const navigate = useNavigate()
   const [price, setPrice] = useState<string>('')
   const {fetch} = useWeb3ExecuteFunction();
   const {save} = useNewMoralisObject('raffle');
   const {account,Moralis} = useMoralis()
   const textRef = useRef('');
   const dispatchNotification = useNotification();

   textRef.current = price

   const onClickPack = useCallback(async () => {
      if(textRef.current.length === 0) {
         dispatchNotification({
            type:'info',
            message: `Enter the amount.`,
            title: 'info',
            icon:'info',
            position: 'topR',
         })
         return;
      }

      if(textRef.current.length > 999) {
         dispatchNotification({
            type:'info',
            message: `The number is too large.`,
            title: 'info',
            icon:'info',
            position: 'topR',
         })
         return;
      }

      // chekc allowance matter
      const optionsAllowanceCheck = {
         contractAddress: address_antimatter,
         functionName: "allowance",
         abi: abi_antimatter.abi,
         params: {
            owner:account,
            spender: address_market,
         }
      }

      const summ:any = await fetch({
         params: optionsAllowanceCheck,
         onError: (err:any) => {
            console.log(err)
         }
      })

      if(Number(Moralis.Units.FromWei(summ)) < pack + 1 ) {
         // increaseAllowance matter
         const optionsAllowance = {
            contractAddress: address_antimatter,
            functionName: "increaseAllowance",
            abi: abi_antimatter.abi,
            params: {
               spender: address_market,
               addedValue:Moralis.Units.ETH(100000)
            }
         }

         dispatchNotification({
            type:'info',
            message: `Please confirm the sale of ${pack} $Antimatter`,
            title: 'info',
            icon:'info',
            position: 'topR',
         })
   
         await fetch({
            params: optionsAllowance,
            onError: (err:any) => {
               console.log(err)
            }
         })
      }

      // create pack and offer
      
      const optionsMarket = {
         contractAddress: address_market,
         functionName: "packAndCreate",
         abi: abi_market,
         params: {
            amount:Moralis.Units.ETH(pack),
            recipient:account,
            paymentContract:address_antimatter,
            price:Moralis.Units.ETH(textRef.current),
         }
      }

      await fetch({
         params: optionsMarket,
         onSuccess: (res: any) => {
            console.log(res)
            dispatchNotification({
               type:'info',
               message: 'You have successfully placed a sale of your Antimatter!',
               title: 'info',
               icon:'info',
               position: 'topR',
            })
         },
         onError: (err:any) => {
            console.log(err)
         }
      })
   }, [pack, fetch])

   const onClick = useCallback(async () => {
      
      if(textRef.current.length === 0) {
         return;
      }

      const saveOffer = {
         raffle_nft_name:nft.name + ' #' + nft.token_id,
         start_duration:'0',
         Duration:Number(new Date(date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))).toString(),
         entry_cost:textRef.current,
         url_opensea:urlOpesea,
         url_img:JSON.parse(nft.metadata).image.replace("ipfs://", "http://tsb.imgix.net/ipfs/"),
         users:[],
      };

      await save(
         saveOffer, 
         {
            onError:(error:any) => {
               console.log(error)
            }
         }
      )

      navigate('/marketPlace')

   }, [nft, account, Moralis,urlOpesea, date])

   return(
      <Form >
         <InputPrice 
            type="number"
            value={price}        
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder={`${type === 'admin_panel' ? '$Antimatter' : "matic"}`}       
         />
         
         <SendButton onClick={type === 'createProduct' ? onClickPack : onClick} />
      </Form>
   );
} 

interface ButtonProps {
   onClick: () => void;
}

export const SendButton = memo(({onClick}: ButtonProps) => {
   return <BtnConfrim onClick={onClick}>Confirm</BtnConfrim>
})