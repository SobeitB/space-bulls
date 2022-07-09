import { FormPrice } from '../../components/shared/Form/Form';
import {
   Title,
   HowSell,
   ButtonChange,
   BodyChange,
   ImgChange,
   ImgChangeTablet,
   ImgChangeMobile,
   ContainerBtnChange,
   ContainerPrice
} from './createProduct.styled'
import {useState} from 'react'
import oneK from './img/1K.png'
import fiveK from './img/5K.png'
import tenK from './img/10K.png'

import oneKTablet from './img/179/1K.png'
import fiveKTablet from './img/179/5K.png'
import tenKTablet from './img/179/10K.png'

import oneKMobile from './img/172/1K.png'
import fiveKMobile from './img/172/5K.png'
import tenKMobile from './img/172/10K.png'

const CreateProduct = () => {
   const [selectPack, setSelectPack] = useState(1000)

   return(
      <>
         <Title>Sell $Antimatter Package</Title>
         <HowSell>Choose a package to sell</HowSell>

         <ContainerBtnChange>
            <BodyChange>
               <ImgChange 
                  src={oneK}
                  alt=""
               />

               <ImgChangeTablet 
                  src={oneKTablet}
                  alt=""
               />

               <ImgChangeMobile 
                  src={oneKMobile}
                  alt=""
               />

               <ButtonChange 
                  onClick={() => setSelectPack(1000)}
                  isSelect={selectPack === 1000}
               >1.000 $Antimatter</ButtonChange>
            </BodyChange>
            
            <BodyChange>
               <ImgChange 
                  src={fiveK}
                  alt=""
               />

               <ImgChangeTablet 
                  src={fiveKTablet}
                  alt=""
               />

               <ImgChangeMobile 
                  src={fiveKMobile}
                  alt=""
               />

               <ButtonChange 
                  onClick={() => setSelectPack(5000)}
                  isSelect={selectPack === 5000}
               >5.000 $Antimatter</ButtonChange>
            </BodyChange>

            <BodyChange>
               <ImgChange 
                  src={tenK}
                  alt=""
               />

               <ImgChangeTablet 
                  src={tenKTablet}
                  alt=""
               />

               <ImgChangeMobile 
                  src={tenKMobile}
                  alt=""
               />
               
               <ButtonChange 
                  onClick={() => setSelectPack(10000)}
                  isSelect={selectPack === 10000}
               >10.000 $Antimatter</ButtonChange>
            </BodyChange>
         </ContainerBtnChange>

         <ContainerPrice>
            <FormPrice 
               pack={selectPack}
               type="createProduct" 
            />
         </ContainerPrice>
      </>
   )
}

export default CreateProduct;