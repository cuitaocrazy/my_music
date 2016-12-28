/**
 * Created by cuitao on 2016/12/27.
 */

import {createReducer} from 'redux-act'
import * as Act from '../actions'
import {combineReducers} from 'redux'

const loginReducer = createReducer({
    [Act.loginFormOpen]: s => ({...s, showLoginForm: true}),
    [Act.loginFormClose]: s => ({...s, showLoginForm: false, loading: false}),
    [Act.loginReq]: s => ({...s, loading: true}),
    [Act.loginSuccess]: s => ({...s, loading: false, showLoginForm: false}),
    [Act.loginFail]: s => ({...s, loading: false}),
    [Act.loginCancel]: s => ({...s, loading: false})
}, {})

export default combineReducers({
    login: loginReducer
})

