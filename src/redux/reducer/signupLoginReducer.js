const initialState = {
  saving: false, //spinner for saving to firebase
  logginIn: false, //086_10.50
  firebaseError: null,
  firebaseErrorCode: null,
  token: null,
  userId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START":
      return {
        ...state,
        saving: true,
      };
    case "SIGNUP_USER_SUCCESS":
      return {
        ...state,
        saving: false,
        // token: action.data.idToken,
        // userId: action.data.localId,
        token: action.token, //0901_02.09
        userId: action.userId, //0901_02.09
      };
    case "SIGNUP_USER_ERROR":
      return {
        ...state,
        saving: false,
        firebaseError: action.error.response.data.error.message,
      };
    case "LOGIN_USER_START":
      return {
        ...state,
        logginIn: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        logginIn: false,
        // token: action.data.idToken,
        // userId: action.data.localId,
        token: action.token, //090_05.47
        userId: action.userId, //090_05.50
      };
    case "LOGIN_USER_ERROR":
      return {
        ...state,
        logginIn: false,
        firebaseError: action.error.response.data.error.message,
        firebaseErrorCode: action.error.response.data.error.code,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        firebaseError: null,
        firebaseErrorCode: null,
      };
    default:
      return state;
  }
};

export default reducer;
