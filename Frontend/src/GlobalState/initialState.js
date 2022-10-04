export const initialState = {
  isAuth: false,
  user: null,
  phone: "",
  hash: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_OTP: "SET_OTP",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        isAuth: true,
      };
    case actionTypes.SET_OTP:
      return {
        ...state,
        hash: action.hash,
        phone: action.phone,
      };
    default:
      return state;
  }
};
