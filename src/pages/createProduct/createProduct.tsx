import {
   Title,
   HowSell,
   ButtonChange
} from './createProduct.styled'

const CreateProduct = () => {
   return(
      <>
         <Title>Sell a kidney of Antimatter</Title>
         <HowSell>How much to sell matter?</HowSell>
         <ButtonChange>1.000 $Antimatter</ButtonChange>
         <ButtonChange>5.000 $Antimatter</ButtonChange>
         <ButtonChange>10.000 $Antimatter</ButtonChange>
      </>
   )
}

export default CreateProduct;