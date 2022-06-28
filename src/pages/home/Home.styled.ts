import styled from 'styled-components'

export const Body = styled.div`
   display:flex;
   flex-direction: column;
   align-items: center;
   justify-content:center;
`

export const BodyLogo = styled.div`
   margin-bottom:20px;
   max-width:33%;
   height: auto;

   @media (max-width:1440px) {
      max-width: 45%;
   }

   @media (max-width:992px) {
      max-width: 57%;
   }

   @media (max-width:768px) {
      max-width: 430px;
   }

   @media (max-width:480px) {
      max-width: 100%;
   }

   @media (max-width:350px) {
      max-width: 85%;
   }
`

export const Logo = styled.img`
   width:100%;
   height: 100%;
`

export const Title = styled.h1`
   font-size:2.75rem;
   text-align:center;
   margin-top: 10px;
   margin-bottom: 24px;
   color:#f8cb2c;

   @media (max-width: 1000px) {
      font-size:2.3rem;
   }

   @media (max-width: 769px) {
      font-size:1.5rem;
   }
`

export const Text = styled.p`
   color:white;
   width:75%;
   font-size:1rem;
   line-height: 1.4;
   margin-bottom: 20px;
   text-align:center;

   @media (max-width: 1440px) {
      width:85%;
   }

   @media (max-width: 1000px) {
      font-size:15px;
   }

   @media (max-width: 992px) {
      width:95%;
   }

   @media (max-width: 769px) {
      width:100%;
      font-size:14px;
      line-height: 1.5;
   }

   @media (max-width: 481px) {
      font-size:13px;
      line-height: 1.6;
   }

   @media (max-width:350px) {
      width:90%;
   }
`