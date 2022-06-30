import { useCallback, useState } from "react";

export const useModal = () => {
   const [isModalStaking, setModalStaking] = useState<boolean>(false)
   const [isModalWarning, setModalWarning] = useState<boolean>(false)

   const onModal = useCallback((type:string) => () => {
      if(type === 'warning') {
         setModalWarning(!isModalWarning)
      } else {
         setModalStaking(!isModalStaking)
      }
   }, [isModalStaking, isModalWarning])

   return {
      isModalStaking,
      isModalWarning,
      onModal,
   }
}