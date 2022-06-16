import styled from 'styled-components'

export const Item = styled.div`
   width:330px;
   height:230px;
   border-radius:20px;
   background-color:#171923;

   display:flex;
   flex-direction:column;
   align-items:center;
   margin-bottom:25px !important;
   margin-right:25px;

   @media (max-width: 480px) {
      margin-right:0px;
      margin: 0 auto;
   }

   @media (max-width: 340px) {
      margin: 0 10px;
   }
`

export const Img = styled.img`
   width:100%;
   height:150px;
`

export const BodyText = styled.div`
   width:90%;
`

export const Title = styled.h4`
   color: #fcfcfc;
   font-weight:bold;
   font-size:13px;
   margin-top:14px;
`

export const Network = styled.p`
   color: #fcfcfc;
   font-weight:bold;
   font-size:11px;
   margin-top:7px;
`

export const Description = styled.p`
   color: #fcfcfc;
   font-weight:bold;
   font-size:11px;
   margin-top:7px;
`

export const Claim = styled.button`
   width:90%;
   height:35px;
   background-color:#726f4c;
   color: #25282c;
   font-weight:bold;
   border: none;
   border-radius:5px;
   cursor: pointer;
   margin-top:10px;

   &:hover{
      color: #fcfcfc;
   }
`