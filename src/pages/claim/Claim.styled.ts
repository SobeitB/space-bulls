import styled from 'styled-components'

export const Body = styled.div`
   width: 100%;
   display:flex;
   flex-direction: column;
   align-items: center;
   padding-top:40px;
`

export const Title = styled.h1`
   text-align: center;

   @media (max-width:790px) {
      font-size:27px;
   }

   @media (max-width:530px) {
      font-size:24px;
   }

   @media (max-width:410px) {
      font-size:22px;
   }

   @media (max-width:380px) {
      font-size:18px;
   }
`

export const Balance = styled.h2`
   text-align: center;
   margin-top:20px;

   @media (max-width:790px) {
      font-size:23.5px;
   }

   @media (max-width:530px) {
      font-size:19px;
   }

   @media (max-width:410px) {
      font-size:17px;
   }

   @media (max-width:380px) {
      font-size:15px;
   }
`

export const ClaimBtn = styled.button`
   margin:0 auto;
   margin-top:40px;
   width:160px;
   height:40px;
   border:none;
   border-radius:15px;
   background-color:#81e6d9;
   color:#1a2231;
   cursor:pointer;
`

export const ClaimBody = styled.div`
   height: 70px;
    width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`