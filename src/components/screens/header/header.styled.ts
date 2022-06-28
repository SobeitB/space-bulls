import styled from 'styled-components'

export const HeaderComp = styled.header`
   height: 84px;
   border-bottom: 1px solid #292929;
   background: #181818;
`

export const Container = styled.div`
   max-width:1700px;
   height: 100%;
   margin: 0 auto;

   @media (max-width:1440px) {
      max-width: 992px;
   }

   @media (max-width:992px) {
      max-width: 768px;
   }

   @media (max-width:768px) {
      max-width: 480px;
   }
`

export const ContainerHeader = styled.div`
   width:100%;
   height: 100%;
   display: flex;
   align-items:center;
   justify-content:space-between;
`

export const Logo = styled.img`
   width:200px;
   height:200px;

   @media (max-width:480px) {
      width:150px;
      height:150px;
   }

   @media (max-width:350px) {
      width:125px;
      height:120px;
   }
`

export const Address = styled.p`
   margin-right:10px;
   font-size:13px;
   @media (max-width:430px) {
      order:2;
      margin-top:10px;
   }
`