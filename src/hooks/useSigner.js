import { useContext, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { AppContext } from "../App";

function useSigner() {
  const { state, dispatch } = useContext(AppContext);

  const handleAccountChange = useCallback(async function (accounts) {
    if (accounts.length === 0) {
      dispatch({
        type: "SET_SIGNER",
        payload: {
          signer: null,
        },
      });
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      if (signer && signer._isSigner) {
        dispatch({
          type: "SET_SIGNER",
          payload: {
            signer: signer,
          },
        });
      }
    }
  }, [dispatch]);
  
  useEffect(() => {
      async function checkConnection() {
        if (window && window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length) {
            handleAccountChange(accounts);
          }
        }
      }
    checkConnection();
  }, [handleAccountChange]);
  if (window && window.ethereum) {
    window.ethereum.on("accountsChanged", handleAccountChange);
  }

  return state.signer;
}

export default useSigner;
