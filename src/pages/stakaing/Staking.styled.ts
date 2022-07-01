import styled from 'styled-components'

export const Container = styled.div`
   max-width:1440px;
   margin:0 auto;

   @media (max-width:1440px) {
      max-width: 992px;
   }

   @media (max-width:992px) {
      max-width: 768px;
   }

   @media (max-width:768px) {
      max-width: 480px;
   }

   @media (max-width:480px) {
      max-width: 320px;
   }

   @media (max-width:320px) {
      max-width: none;
   }
`

export const ContainerInfo = styled.div`
   width:100%;
   display: flex;
   align-items:center;
   justify-content:space-between;
   margin-top:40px;

   @media (max-width:769px) {
     flex-direction: column;
   }
`

export const InfoBlockBody = styled.div`
   width:200px;

   @media (max-width:1440px) {
      width:150px;
   }

   @media (max-width:992px) {
      width:140px;
   }

   @media (max-width:769px) {
      width:80%;
      margin-bottom:20px;
      display: flex;
      flex-direction: column;
      align-items: center;
   }
`

export const InfoText = styled.h2`
   color:#f8cb2c;
   margin-block-start: 0;
   margin-block-end: 0;
   font-size:17px;

   @media (max-width:992px) {
     font-size:14px;
   }

   @media (max-width:769px) {
      font-size:15px;
      text-align: center;
   }
`

export const InfoBlock = styled.div`
   width:100%;
   height:40px;
   display: flex;
   align-items: center;
   padding-left:10px;
   margin-top: 10px;

   background-color:#323232;
   font-size:18px;

   @media (max-width:769px) {
      width:80%;
   }
`

export const Pagination = styled.div`
   width:100%;
   margin:15px 0 20px 0;
   border-bottom: 2px solid #323232;
   @media (max-width: 330px) {
      margin: 15px 10px 20px 10px;
   }
`

export const PaginationTabs = styled.div`
   height:50px;
   display: flex;
   align-items: center;

   @media (max-width: 500px) {
      flex-direction: column;
      height:170px;
   }
`

interface propsTabs{
   active: boolean;
}

export const Tabs = styled.button.attrs((props: propsTabs) => props)`
   height:100%;
   border: none;
   background: none;
   cursor: pointer;
   font-size:13.5px;
   color:${props => props.active ? '#c3c3c3' : '#919191'};
   border-bottom:2px solid ${props => props.active ? '#f8cb2c' : '#e0ecff'};
   margin-left:15px;

   &:nth-child(1){
      margin-left:0px;
   }

   @media (max-width: 400px) {
      font-size:11px;
      margin-left:10px;
   }

   @media (max-width: 500px) {
      margin-left:0px;
   }
`

export const TitleCont = styled.div`
   width:100%;
   display: flex;
   align-items: center;
   justify-content: space-between;

   @media (max-width: 330px) {
      margin:0 10px;
   }
`

export const Title = styled.h1`
   color: #f8cb2c;
   font-size:20px;

   @media (max-width: 360px) {
      font-size:15px;
   }
`

export const IsStaking = styled.button`
   height:100%;
   border: none;
   background: none;
   cursor: pointer;
   font-size:14px;
   color:#a5a5a5;

   @media (max-width: 360px) {
      font-size:12px;
   }
`

interface StakingNftprops {
   heigth:boolean;
}

export const StakingNft = styled.div.attrs((props: StakingNftprops) => props)`
   width:100%;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap:wrap;
   margin:0 auto;
   margin:30px 0;
`

interface propsNft{
   isSelected:boolean;
}

export const Nft = styled.div.attrs((props: propsNft) => props)`
   height:100%;
   width:200px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   background: #191919;
   border:{props => props.isSelected && '1px solid #f8cb2c'};
   border-radius:15px;
   margin-right:25px;
   margin-top:25px;

   @media (max-width: 480px) {
      margin-right:0px;
   }
`

export const NftImgBody = styled.div`
   height:60%;
   width:100%;
   position: relative;
   border-radius:15px 15px 0 0;
`

export const NftImg = styled.img`
   height:100%;
   width:100%;
   border-radius:15px 15px 0 0;
`

export const NftImgText = styled.span`
   width:70px;
   height:21px;
   position: absolute;
   bottom:5px;
   left:10px;
   color:#d6d6d6;
   background-color: rgb(75,75,75,0.8);
   font-size:10px;
   font-weight: bold;

   display: flex;
   align-items: center;
   justify-content: center;
`

export const NftInfoBody = styled.div`
   height:40%;
   width:95%;
`

export const NftInfoName = styled.h3`
   color: #fcfcfc;
   font-weight:bold;
   font-size:11px;
   margin-top:13px;
`

export const NftInfoYield = styled.p`
   color: #fcfcfc;
   font-weight:bold;
   font-size:10px;
   margin-top:10px;
`

export const NftInfoStaking = styled.button`
   width: 100%;
   height:35px;
   border-radius:10px;
   border:none;
   background-color:#2b2b2b;
   margin-top:15px;
   color:#fdfdfd;
   font-size:14px;
   font-weight:bold;
   cursor:pointer;
`

export const IsSelectedNft = styled.div`
   width:25px;
   height:25px;
   position: absolute;
   top:5px;
   right:10px;
   color:#d6d6d6;
   background-color: rgb(75,75,75,0.8);
   font-size:13px;
   font-weight: bold;

   display: flex;
   align-items: center;
   justify-content: center;
`

export const ContStakeBtn = styled(TitleCont)`
   justify-content: flex-start;
`

export const StakeAllBtn = styled.button.attrs((props: propsNft) => props)`
   width: 100px;
   height:35px;
   border-radius:10px;
   border:none;
   background-color:#2b2b2b;
   border: 1px solid ${(props) => props.isSelected ? '#f8cb2c' : 'none'};
   margin-top:15px;
   color:#fdfdfd;
   font-size:14px;
   font-weight:bold;
   cursor:pointer;

   @media (max-width: 360px) {
      font-size:12px;
      width: 80px;
      height:30px;
   }
`

export const ClearNft = styled(StakeAllBtn)`
   margin-left:15px;
   background:none;
`

export const Claimble = styled(StakeAllBtn)`
   width: 120px;
   height:35px;
   margin-right:15px;
   border:1px solid #f8cb2c;
`