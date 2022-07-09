import styled from 'styled-components'
import {ReactComponent as DsLogo} from '../../../assets/img/ds.svg'

export const HeaderComp = styled.header`
   height: 84px;
   border-bottom: 1px solid #292929;
   background: #181818;

  @media (max-width: 768px) {
    height: 130px;
  }
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

export const FlexContBtn = styled.div`
    width: 340px;
    display: flex;
    align-content: center;
    justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content:flex-end;
    align-items:flex-end;
  }
`

export const ConnectDs = styled.button`
      display: inline-flex;
      appearance: none;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      user-select: none;
      position: relative;
      white-space: nowrap;
      vertical-align: middle;
      outline: transparent solid 2px;
      outline-offset: 2px;
      line-height: 1.2;
      border-radius: 0.375rem;
      font-weight: 600;
      height: 2.5rem;
      min-width: 2.5rem;
      font-size: 0.8rem;
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;
      background: rgb(87, 104, 234);
      padding-top: 0.15rem;
      border: 1px solid rgb(57, 73, 200);
      opacity: 1;
      transition: all 0.2s ease 0s;
      color:white;
      text-decoration: none;
      cursor: pointer;
      margin-right:10px;
  
      @media (max-width: 768px) {
        margin-bottom:20px;
        min-width: 170px;
        margin-right:5px;
      }

     @media (max-width: 450px) {
       min-width:140px;
       height:35px;
       font-size:10px;
     }

     @media (max-width: 340px) {
       min-width:120px;
       height:30px;
       font-size:8px;
     }
`

export const DsImg = styled.span`
  position: relative;
  top: 2.5px;
  fill: white;
  margin-right: 2.5px;
`

export const DsImgLogo = styled(DsLogo)`
  & * {
    color:white;
    fill:white;
  }
`

export const ImgAvatar = styled.img`
  width:30px;
  height:30px;
  border-radius: 50%;
  margin-right: 8px;
`
