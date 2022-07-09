import styled from 'styled-components'

interface itmeProps {
   select: boolean
}

export const Item = styled.div.attrs((props: itmeProps) => props)`
   width:330px;
   min-height:230px;
   border-radius:20px;
   background-color:#171923;
   border:${props => props.select && '1px solid #f8cb2c'};

   display:flex;
   flex-direction:column;
   align-items:center;
   margin-bottom:${(props) => props.select ? '0px' : '25px !important'};
   margin-right:${(props) => props.select ? '0px' : '25px'};

   @media (max-width: 480px) {
      margin-right:0px;
      margin: 0 auto;
   }

   @media (max-width: 430px) {
     width:260px;
     min-height:240px;
   }

   @media (max-width: 340px) {
      margin: 0 10px;
   }
`

export const Img = styled.img`
   width:100%;
   height:335px;
   border-radius:20px 20px 0 0;
   object-fit: cover;
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
export const OpenseaLink = styled.a`
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
   min-height:35px;
   background-color:#726f4c;
   color: #25282c;
   font-weight:bold;
   border: none;
   border-radius:5px;
   cursor: pointer;
   margin:10px 0;

   &:hover{
      color: #fcfcfc;
   }
`

export const DeleteOffer = styled(Claim)`
   width:50%;
`