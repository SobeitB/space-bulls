import styled from 'styled-components'

export const ConnectWalletBtn = styled.button`
   width:170px;
   height:40px;
   color: #322342;
   border:none;
   border-radius: 0.375rem;
   background-color: #81e6d9;
   font-size:12px;
   padding:0 3px;
   cursor:pointer;
   margin-right:10px;

  @media (max-width: 768px) {
    margin-right:5px;
  }

  @media (max-width: 450px) {
    width:140px;
    height:35px;
    font-size:10px;
  }
  
  @media (max-width: 340px) {
    width:120px;
    height:30px;
    font-size:8px;
  }
`

export const BodyConnectWallet = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   cursor:pointer;
  
  @media(max-width: 600px) {
    flex-direction: column;
  }

  @media(max-width: 420px) {
    font-size: 13px;
  }
`