import axios from "axios";
import { put } from "redux-saga/effects";
import jwt_decode from 'jwt-decode'

import {
    signupStart,
    signinStart,
    signoutStart,
    signupSuccess,
    signinSuccess,
    signoutFinish,
    signupFail,
    signinFail,
} from "../actions/auth";

import setAuthToken from "../utils/setAuthToken";

export function* signup(action) {
    yield put(signupStart());

    const authData = {
        name: action.name,
        email: action.email,
        password: action.password,
    };

    try {
        yield axios.post("/api/user/signup", authData);

        yield put(signupSuccess(action.email));

        action.history.push("/signin");
    } catch (error) {
        console.log("SignUp Error:");
        console.log(error.response.data);

        let errorMsg = "Sign up failed.";
        if (error.response.status === 400) {
            errorMsg = error.response.data;
        }

        yield put(signupFail(errorMsg));
    }
}

export function* signin(action) {
    yield put(signinStart());

    const authData = {
        name: action.name,
        password: action.password,
    };

    try {
        const response = yield axios.post("/api/user/login", authData);

        //  Save token to local storage
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);

        //  Set token to auth header
        setAuthToken(token);

        const user = jwt_decode(token);

        yield put(signinSuccess(user));

        action.history.push("/dashboard");
    } catch (error) {
        console.log("SignIn Error:");
        console.log(error.response.data);

        let errorMsg = "Sign in failed.";
        if (error.response.status === 400) {
            errorMsg = error.response.data;
        }

        yield put(signinFail(errorMsg));
    }
}

export function* signout(action) {
    yield put(signoutStart());

    yield localStorage.removeItem("jwtToken");

    setAuthToken(null);

    yield put(signoutFinish());

    action.history.push("/signin");
}