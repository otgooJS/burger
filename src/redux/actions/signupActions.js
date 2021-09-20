import axios from "axios";

//084_06.30
export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwk-3w4XkpBys5qF3oKnO0fpvkqSV0zOM",
        data
      )
      .then((result) => {
        //091_01.07
        const token = result.data.idToken;
        const userId = result.data.localId;

        localStorage.setItem(`token`, token);
        localStorage.setItem(`userId`, userId);

        // console.log(result.data);
        // dispatch(signupUserSuccess(result.data));
        dispatch(signupUserSuccess(token, userId)); //091_01.25
      })
      .catch((err) => {
        // console.log(err);
        dispatch(signupUserError(err));
      });
  };
};
export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};
//firebaseResultData shuu!! Not deerhi const=data {email, password} bish
export const signupUserSuccess = (token, userId) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    token,
    userId,
  };
};
export const signupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};

export const logout = () => {
  //090_08.15 Logout hiihed token, userId-iig delete hiih
  localStorage.removeItem(`token`);
  localStorage.removeItem(`userId`);
  localStorage.removeItem(`expireDate`);
  localStorage.removeItem(`refreshToken`);
  return {
    type: "LOGOUT",
  };
};
//092_03.30_04.50: timer => asynchrom /heseg t-nii daraa ajillah/ => so thunk-aar hiigdene!!!???
export const autoLogoutAfterMillisec = (ms) => {
  return function (dispatch) {
    setTimeout(() => {
      //092_21.00 token shinechleh: Ene hesgiig zalhuurab...
      //http://securetoken.googleapis.com/v1/token?key=[API_KEY]
      //auto logout
      https: dispatch(logout());
    }, ms);
  };
};
