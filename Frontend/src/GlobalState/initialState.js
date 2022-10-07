export const initialState = {
  isAuth: false,
  user: null,
  phone: "",
  hash: "",
  name: "",
  avatar: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_OTP: "SET_OTP",
  SET_USER_NAME: "SET_USER_NAME",
  SET_AVATAR: "SET_AVATAR",
  SET_AUTH: "SET_AUTH",
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
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        name: action.name,
      };
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        avatar: action.avatar,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};
