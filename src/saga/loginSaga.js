/**
 * Created by cuitao on 2016/12/27.
 */

import {takeLatest} from 'redux-saga'
import * as Const from '../constants'
import * as Act from '../actions'

import {race, call, take, put, cancel, fork} from 'redux-saga/effects'
import loginApi from '../api/loginApi'

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
}

function *loginWork(action) {
    const {username, password} = action.payload
    try {
        const {timeout, req} = yield race({
            timeout: call(delay, 5000),
            req: call(loginApi, username, password),
            cancel: take(Const.LOGIN_CANCEL),
            close: take(Const.LOGIN_FORM_CLOSE)
        })

        if (timeout)
            yield put(Act.loginFail("login timeout!"))
        else if (req === "success")
            yield put(Act.loginSuccess(username))
        else if(req) {
            yield put(Act.loginFail(req))
        }
    } catch (e) {
        yield put(Act.loginFail(e))
    }
}

export default function *loginSaga() {
    yield *takeLatest(Const.LOGIN_REQ, loginWork)
}