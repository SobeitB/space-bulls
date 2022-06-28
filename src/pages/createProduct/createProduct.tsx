import { FormPrice } from '../../components/shared/Form/Form';
import {
   Title,
   HowSell,
   ButtonChange,
   ContainerBtnChange,
   ContainerPrice
} from './createProduct.styled'
import {useState} from 'react'

const CreateProduct = () => {
   const [selectPack, setSelectPack] = useState('')

   return(
      <>
         <Title>Sell $Antimatter Package</Title>
         <HowSell>Choose a package to sell</HowSell>

         <ContainerBtnChange>
            <ButtonChange 
               onClick={() => setSelectPack('10k')}
               isSelect={selectPack === '10k'}
            >10.000 $Antimatter</ButtonChange>
            <ButtonChange 
               onClick={() => setSelectPack('5k')}
               isSelect={selectPack === '5k'}
            >5.000 $Antimatter</ButtonChange>
            <ButtonChange 
               onClick={() => setSelectPack('1k')}
               isSelect={selectPack === '1k'}
            >1.000 $Antimatter</ButtonChange>
         </ContainerBtnChange>

         <ContainerPrice>
            <FormPrice type="createProduct" />
         </ContainerPrice>
      </>
   )
}

export default CreateProduct;