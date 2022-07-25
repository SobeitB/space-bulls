import {address_antimatter} from "../shared/variable";
import abi_antimatter from "../shared/abi/Antimatter.json";
import {useMoralis, useWeb3ExecuteFunction} from "react-moralis";
import {useNotification} from "web3uikit";

export const useTransferMatter = () => {
   const smart = useWeb3ExecuteFunction();
   const {Moralis, account} = useMoralis();
   const dispatchNotification = useNotification();

   const transfer = async (valMatter: string, callbackSucess: (res:any) => void) => {

      const options = {
         contractAddress:address_antimatter,
         functionName: "burn",
         abi: abi_antimatter.abi,
         params: {
            from:account ? account : '',
            amount:Moralis.Units.ETH(valMatter),
         },
         gasLimit: 100000000,
         gasPrice: 100000
      }

      await smart.fetch({
         params: options,
         onSuccess: async (res: any) => callbackSucess(res),
         onError: ((error:any) => {
            dispatchNotification({
               type:"error",
               message: `You don't have enough $Antimatter`,
               title: "Error",
               icon:"info",
               position: 'topL',
            })
            console.log(error)
         })
      })
   }

   return transfer
}