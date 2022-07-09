import {address_antimatter, address_staking, serv} from "../shared/variable";
import abi_antimatter from "../shared/abi/Antimatter.json";
import {useMoralis, useNewMoralisObject, useWeb3ExecuteFunction} from "react-moralis";

export const useTransferMatter = () => {
   const smart = useWeb3ExecuteFunction();
   const {Moralis} = useMoralis()

   const transfer = async (valMatter: string, callbackSucess: (res:any) => void) => {
      const options = {
         contractAddress:address_antimatter,
         functionName: "transfer",
         abi: abi_antimatter.abi,
         params: {
            to:address_staking,
            amount:Moralis.Units.ETH(valMatter),
         }
      }

      await smart.fetch({
         params: options,
         onSuccess: async (res: any) => callbackSucess(res)
      })
   }

   return transfer
}