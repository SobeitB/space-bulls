import styled from "styled-components";

export const Title = styled.h1`
   margin-top:20px;
   text-align:center;
`

export const HowSell = styled.h3`
   margin-top:10px;
   text-align:center;
`

export const ContainerBtnChange = styled.div`
   width: 60%;
   margin-top:20px;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media (max-width:992px) {
      flex-direction: column;
   }
`

interface propsBtn {
   isSelect:boolean;
}

export const BodyChange = styled.div`
   display:flex;
   flex-direction:column;
   margin:0 10px;

   @media (max-width:992px) {
      margin-top:30px;
   }
`

export const ImgChange = styled.img`
   width:100%;
   height:300px;
   margin-bottom:15px;
`

export const ButtonChange = styled.button.attrs((props: propsBtn) => props)`
   background:#81e6d9;
   border:none;
   color:#2d2c36;
   cursor:pointer;
   border-radius:40px;
   margin: 0 10px;
   padding: 0 10px;
   height:45px;
   border:${(props) => props.isSelect && '3px solid #f8cb2c'};
`

export const ContainerPrice = styled.div`
   width: 50%;
   margin-top:20px
`