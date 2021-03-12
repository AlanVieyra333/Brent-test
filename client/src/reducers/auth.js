import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    user: null,
    signupEmail: null,
    signupError: null,
    signinError: null,
    waiting: false
}

const signupStart = (state, action) => {
    return { ...state, signupError: null, waiting: true };
};

const signinStart = (state, action) => {
    return { ...state, isAuthenticated: false, signinError: null, waiting: true };
};

const signoutStart = (state, action) => {
    return { ...state, waiting: true };
};

const signupSuccess = (state, action) => {
    return {
        ...state,
        signupEmail: action.signupEmail,
        signupError: null,
        waiting: false,
    };
};

const signinSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        signinError: null,
        waiting: false,
    };
};

const signoutFinish = (state, action) => {
    return {
        ...state,
        isAuthenticated: false,
        user: null,
        waiting: false,
    };
};

const signupFail = (state, action) => {
    return {
        ...state,
        signupError: action.error,
        waiting: false,
    };
};

const signinFail = (state, action) => {
    return {
        ...state,
        isAuthenticated: false,
        signinError: action.error,
        waiting: false,
    };
};

const clearErrors = (state, action) => {
    return {
        ...state,
        signupError: null,
        signinError: null,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNIN_START:
            return signinStart(state, action);
        case actionTypes.SIGNOUT_START:
            return signoutStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.SIGNIN_SUCCESS:
            return signinSuccess(state, action);
        case actionTypes.SIGNOUT_FINISH:
            return signoutFinish(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        case actionTypes.SIGNIN_FAIL:
            return signinFail(state, action);
        case actionTypes.CLEAR_ERRORS:
            return clearErrors(state, action);
        default:
            return state;
    }
}

export default reducer