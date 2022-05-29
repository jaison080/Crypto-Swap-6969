export const initialState = {
  signer: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SIGNER": {
      return {
        ...state,
        signer: action.payload.signer,
      };
    }
    default:
      return state;
  }
};
