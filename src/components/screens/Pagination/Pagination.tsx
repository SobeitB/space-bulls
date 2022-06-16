import {
   PaginationReward,
   PaginationButton,
   PaginationPage
} from './Pagination.styled'

interface props {
   pages:number;
   setPages:React.Dispatch<React.SetStateAction<number>>;
   allPages:number;
}

const Pagination = ({ pages, setPages, allPages, }: props) => {

   const updatePages = (nameEvent: string) => () => {
      if(nameEvent === 'next') {
         pages + 1 < Math.ceil(allPages / 10) && setPages(pages + 1)
      } else {
         pages > 0 && setPages(pages - 1)  
      }
   }

   return (
      <PaginationReward>
         <PaginationButton 
            onClick={updatePages('prev')}>Prev</PaginationButton>
         <PaginationPage >
            {pages + 1}/
            {Math.ceil(allPages / 10)}
         </PaginationPage>
         <PaginationButton 
            onClick={updatePages('next')}>Next</PaginationButton>
      </PaginationReward>
   )
}

export default Pagination;