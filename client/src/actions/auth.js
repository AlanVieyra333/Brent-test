import * as actionTypes from "./actionTypes";

export const signup = (name, email, password, history) => {
    return {
        type: actionTypes.SIGNUP,
        name,
        email,
        password,
        history,
    };
};

export const signin = (name, password, history) => {
    return {
        type: actionTypes.SIGNIN,
        name,
        password,
        history,
    };
};

export const signout = (history) => {
    return {
        type: actionTypes.SIGNOUT,
        history,
    };
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START,
    };
};

export const signinStart = () => {
    return {
        type: actionTypes.SIGNIN_START,
    };
};

export const signoutStart = () => {
    return {
        type: actionTypes.SIGNOUT_START,
    };
};

export const signupSuccess = (signupEmail) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        signupEmail,
    };
};

export const signinSuccess = (user) => {
    return {
        type: actionTypes.SIGNIN_SUCCESS,
        user,
    };
};

export const signoutFinish = () => {
    return {
        type: actionTypes.SIGNOUT_FINISH,
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error,
    };
};

export const signinFail = (error) => {
    return {
        type: actionTypes.SIGNIN_FAIL,
        error,
    };
};

export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS,
    };
}