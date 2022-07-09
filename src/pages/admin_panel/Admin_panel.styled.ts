import styled from 'styled-components'

export const Container = styled.div`
   width: 100%;
   margin-top:40px;
   display:flex;
   flex-direction: column;
   align-items: center;
`

export const TitleName = styled.h1`
   font-size:30px;
   text-align:center;
`

export const Form = styled.div`
   width: 100%;
   margin-top:20px;
   margin-bottom:40px;
   display:flex;
   flex-direction:column;
   align-items: center;
`

export const InputPrice = styled.input`
   width: 80%;
   height:45px;
   background-color: #171923;
   border:1px solid #f8cb2c;
   border-radius:10px;
   padding: 0 10px;
   color:white;
`

export const BtnConfrim = styled.button`
   width: 70%;
   height:40px;
   background-color: #292f4e;
   border-radius:10px;
   margin-top:20px;
   color:white;
   cursor:pointer;
   border:none;
`