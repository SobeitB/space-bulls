import { useCallback, useState } from "react";

export const useModal = () => {
   const [isModalStaking, setModalStaking] = useState<boolean>(false)
   const [isModalWarning, setModalWarning] = useState<boolean>(false)

   const onModal = useCallback((type:string) => () => {
      type === "warning" && setModalWarning(!isModalWarning);
      type === "staking" && setModalStaking(!isModalStaking);

   }, [isModalStaking, isModalWarning])

   return {
      isModalStaking,
      isModalWarning,
      onModal,
   }
}