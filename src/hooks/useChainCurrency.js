import chains from "../utils/Constants.json";

function useChainCurrency (chainId) {
    const elem = chains.find((elem)=>{
        return chainId === elem.chainId;
    })
    if(elem)
        return elem.nativeCurrency.symbol;
    else 
        return undefined
}

export default useChainCurrency;