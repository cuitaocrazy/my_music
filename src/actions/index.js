import {createAction} from 'redux-act'
import * as Const from '../constants'

export const loginFormOpen = createAction(Const.LOGIN_FORM_OPEN)
export const loginFormClose = createAction(Const.LOGIN_FORM_CLOSE)
export const loginReq = createAction(Const.LOGIN_REQ)
export const loginSuccess = createAction(Const.LOGIN_SUCCESS)
export const loginFail = createAction(Const.LOGIN_FAIL)
export const loginCancel = createAction(Const.LOGIN_CANCEL)
