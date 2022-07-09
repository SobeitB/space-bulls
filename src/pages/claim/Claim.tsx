import {
    Body,
    Title,
    Balance,
    ClaimBtn,
    ClaimBody
} from './Claim.styled'
import {Modal, Input, useNotification} from 'web3uikit';
import {useCallback, useState} from 'react'
import {
    useNativeBalance,
    useMoralis,
    useNewMoralisObject
} from "react-moralis";
import {serv} from "../../shared/variable";
import {useGetMatterBalance} from "../../hooks/getMatterBalance";
import {useTransferMatter} from "../../hooks/transerMatter";

const Claim = () => {
    const [isClaim, setIsClaim] = useState(false);
    const [isCorrection, setIsCorrection] = useState(false);
    const [valMatter, setValMatter] = useState<string>('');
    const { data: balance } = useNativeBalance({ chain : "eth", address:"0x893D708c3175c345aE62095d900eC75F9280e0B4" });
    const {Moralis, account, user, chainId} = useMoralis()
    const { save } = useNewMoralisObject('claim');
    const dispatchNotification = useNotification();
    const transfer = useTransferMatter()
    const data = useGetMatterBalance()

   const onIsClaim = useCallback(() => {
       setIsClaim(!isClaim)
   }, [isClaim])

    const onIsCorrection = useCallback(() => {
        setIsClaim(false)
        setIsCorrection(!isCorrection)
    }, [isCorrection])

   const onClaim = useCallback(async () => {
       if(balance.balance && user) {
           const minClaim = chainId === '0x4' ? 1 : 150000
           if(Number(valMatter) <= minClaim) {
               dispatchNotification({
                   type:"error",
                   message: `You need at least 150.000 Antimatter!`,
                   title: "Error",
                   icon:"info",
                   position: 'topL',
               })
               return;
           }

          transfer(valMatter, (res:any) => {
             const recipis = (Number(valMatter) * 100) / 30_000_000 // процент числа от 30кк
             console.log(recipis)

             const optUserClaim = {
                ds_username:user.attributes.discord_name + '#' + user.attributes.ds_IdDiscriminator,
                ethAddress:account,
                recipis:recipis
             }

             save(optUserClaim, {
                onSuccess:async(res:any) => {
                   const addRole = await fetch(`${serv}addRole?id=${user.attributes.discord_id}&role=994308663831433227`, {
                      method:'POST',
                   })

                   if(addRole.status === 200) {
                      dispatchNotification({
                         type:"success",
                         message: `You have successfully received the CLAIM roles on the server!`,
                         title: "Success",
                         icon:"info",
                         position: 'topL',
                      })

                      setIsCorrection(false);
                      setIsClaim(false);
                   }
                }
             })
          })
     }
   }, [valMatter, balance, user, account])

   return(
      <Body>
         <Title>Ethereum Wallet balance:</Title>
          {balance.balance &&
              <Balance>{Moralis.Units.FromWei(balance.balance)} eth</Balance>
          }

         <ClaimBtn onClick={onIsClaim}>Claim</ClaimBtn>

          <Modal
              isVisible={isCorrection}
              onCloseButtonPressed={onIsCorrection}
              onCancel={onIsCorrection}
              onOk={onClaim}
              children={
                  <div style={{"marginTop": "5px", "marginBottom": '15px'}}>
                      This amount of $Antimatter equals to {valMatter} share of Space Vault. Do you wish to proceed?
                  </div>
              }
          />

          <Modal
            isVisible={isClaim}
            onCloseButtonPressed={onIsClaim}
            onCancel={onIsClaim}
            onOk={onIsCorrection}
            title="What amount of $Antimatter do you wish to use for claiming?"
            children={
               <ClaimBody>
                   <Input
                       label="claim Antimatter"
                       name="claim"
                       type="number"
                       value={valMatter}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValMatter(e.target.value)}
                   />
               </ClaimBody>
            }
         />
      </Body>
   );
}

export default Claim;