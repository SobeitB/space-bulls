import {useNotification} from 'web3uikit';
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';
import { useCallback } from "react";

export const useNewNotification = () => {
   const dispatchNotification = useNotification();

   const handleNewNotification = useCallback((
      type: notifyType,
      text:string,
      icon?: TIconType, 
   ) => {
      dispatchNotification({
         type,
         message: text,
         title: type,
         icon,
         position: 'topR',
      });
   }, [])

   return handleNewNotification
}