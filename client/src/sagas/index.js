import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
    signin,
    signup,
    signout,
} from "./auth";

export function* watchAuth() {
    yield takeEvery(actionTypes.SIGNUP, signup);
    yield takeEvery(actionTypes.SIGNIN, signin);
    yield takeEvery(actionTypes.SIGNOUT, signout);
}