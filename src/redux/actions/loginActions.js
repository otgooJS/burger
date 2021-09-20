import axios from "axios";

import * as actions from "./signupActions";

//084_06.30
export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwk-3w4XkpBys5qF3oKnO0fpvkqSV0zOM",
        data
      )
      .then((result) => {
        // console.log(result.data);
        //localStorage-ruu hadgalna.
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000); //092_07.55 Not only expiresIn/3600/ 3600 boloh timeStart heregtei
        const refreshToken = result.data.refreshToken;

        localStorage.setItem(`token`, token); //090_06.27 save to localStorage
        localStorage.setItem(`userId`, userId);
        localStorage.setItem(`expireDate`, expireDate);
        localStorage.setItem(`refreshToken`, refreshToken);

        // dispatch(loginUserSuccess(result.data));
        dispatch(loginUserSuccess(token, userId)); //090_05.21
        //timer
        //092_05.50: avch bgaa utgaa 3600 bish yag firebase-ees irj bgaa nereer ni oruulna
        dispatch(actions.autoLogoutAfterMillisec(expiresIn * 1000)); //1 tsagiin daraa automat-aar logout hii gesen function;
        // dispatch(actions.autoLogoutAfterMillisec(5000));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(loginUserError(err));
      });
  };
};
export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};
//firebaseResultData shuu!! Not deerhi const=data {email, password} bish
export const loginUserSuccess = (token, userId) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    token,
    userId,
  };
};
export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};
