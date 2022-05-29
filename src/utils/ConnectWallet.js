import { ethers } from "ethers";

async function connectWallet() {
    try {
        if(!window.ethereum) {
            alert("Please Install Metamask or enable the extension to continue.");
            return false;
        } else {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log('signer', signer);
            return signer;
        }
    }catch(err) {
        console.log(err);
        alert(err.message);
        return false;
    }
}

export {
    connectWallet,
}