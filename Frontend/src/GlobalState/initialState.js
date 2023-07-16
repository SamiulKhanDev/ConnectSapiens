export const initialState = {
  isAuth: false,
  user: null,
  identifier: "",
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
  SET_AUTH_USER:"SET_AUTH_USER"
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
        identifier: action.identifier,
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
    case actionTypes.SET_AUTH_USER:
      return {
        ...state,
        isAuth: action.isAuth,
        user:action.user
      }
    default:
      return state;
  }
};
