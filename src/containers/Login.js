/**
 * Created by cuitao on 2016/12/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import * as Act from '../actions'

function a(props) {
    return <div className="modal fade in" tabIndex="-1" style={{display: props.login.showLoginForm && "block"}}>
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close">
                    <span>&times;</span>
                    <span className="sr-only">关闭</span>
                </button>
                <h4 className="modal-title">登陆</h4>
            </div>
            <div className="modal-body">
                <h4>登陆信息</h4>
                <div className="form-group input-group">
                <span className="input-group-addon">
                        <span className="glyphicon glyphicon-user"/>
                    </span>
                    <input className="form-control" type="text" placeholder="用户名"/>
                </div>
                <div className="form-group input-group">
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-off"/>
                </span>
                    <input className="form-control" type="password" placeholder="密码"/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={() => props.loginFormClose()}>Close
                </button>
                <button type="button" className="btn btn-primary" disabled={props.login.loading}
                        onClick={() => props.loginReq({username: "ct", password: "123"})}>Save changes
                </button>
            </div>
        </div>
    </div>
}

export default connect(s => ({login: s.login}), {
    loginFormClose: Act.loginFormClose,
    loginCancel: Act.loginCancel,
    loginReq: Act.loginReq
})(a)