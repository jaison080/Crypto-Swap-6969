import { ethers } from "ethers";
import { useContext } from "react";
import { AppContext } from "../App";
function useConnectWallet() {
    const { dispatch } = useContext(AppContext);
    async function connectWallet() {
        try {
            if(!window.ethereum) {
                alert("Please Install Metamask or enable the extension to continue.");
                return false;
            } else {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                if(signer && signer._isSigner) {
                    dispatch({
                        type : "SET_SIGNER",
                        payload : {
                          signer : signer,
                        }
                    });
                }
            }
        }catch(err) {
            console.log(err);
            alert(err.message);
        }
    }

    return [connectWallet];
}

export default useConnectWallet;