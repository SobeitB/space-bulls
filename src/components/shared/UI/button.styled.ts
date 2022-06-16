import styled from 'styled-components'

export const ContainerConnect = styled.div`
   border: none;
   box-sizing: border-box;
   line-height: 1;
   margin: 0;
   outline: none;
   padding: 0;
   -webkit-align-items: center;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   height: 40px;
   margin: 0 16px;
   white-space: nowrap;

   @media (max-width:430px) {
      flex-direction: column;
      order:2;
   }
`

export const Connect = styled.button`
   background: none;
   border: none;
   color: inherit;
   cursor: pointer;
   font: inherit;
   outline: inherit;
   padding: 0;
   -webkit-font-smoothing: antialiased;
   color: #68738D;
   fill: #68738D;
   font-family: 'Open Sans',sans-serif;
   font-size: 16px;
   font-style: normal;
   font-weight: 400;
   -webkit-letter-spacing: 0;
   -moz-letter-spacing: 0;
   -ms-letter-spacing: 0;
   letter-spacing: 0;
   line-height: 24px;
   font-weight: 600;
   background-color: #F2F6FF;
   border-radius: 16px;
   border: 2px solid transparent;
   height: 100%;
   padding: 4px 16px;
   -webkit-transition: all 0.1s ease-out;
   transition: all 0.1s ease-out;

   font-size: 16px;
   font-style: normal;
   letter-spacing: 0;
   line-height: 24px;
   font-weight: 600;
   color: #2E7DAF;
`
