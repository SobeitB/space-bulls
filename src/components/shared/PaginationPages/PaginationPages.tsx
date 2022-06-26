import {memo} from 'react'
import {
   BtnPagintion,
   Pagintion,
} from './PaginationPages.styled'

interface propsPagination {
   pages:number;
   setPages:(page: number) => void;
   allPages:number;
}

export const PaginationPage = memo(({pages, setPages, allPages}:propsPagination) => {
    
   const updatePages = (nameEvent: string) => () => {
      if(nameEvent === 'next') {
         pages + 1 < Math.ceil(allPages / 10) && setPages(pages + 1)
      } else {
         pages > 0 && setPages(pages - 1)  
      }
   }

   return (
      <Pagintion>
         <BtnPagintion onClick={updatePages('prev')}>
            Previous
         </BtnPagintion>

         <p>
            Page  
            {` ${pages + 1} `}
            of {Math.ceil(allPages / 10)}
         </p>

         <BtnPagintion onClick={updatePages('next')}>
            Next
         </BtnPagintion>
      </Pagintion>
   )
})