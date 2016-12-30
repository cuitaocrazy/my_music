/**
 * Created by cuitao on 2016/12/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import * as Act from '../actions'

function a(props) {
    const loginInfo = {username: "", password: ""}
    return <div className={"modal fade in"} style={{display: props.login.showLoginForm && "block"}}>
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close">
                    <span onClick={() => props.loginFormClose()}>&times;</span>
                </button>
                <h4 className="modal-title">登陆</h4>
            </div>
            <div className="modal-body">
                <h4>登陆信息</h4>
                <div className="form-group input-group">
                <span className="input-group-addon">
                        <span className="glyphicon glyphicon-user"/>
                    </span>
                    <input className="form-control" type="text" placeholder="用户名"
                           onChange={ e => loginInfo.username = e.target.value}/>
                </div>
                <div className="form-group input-group">
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-off"/>
                </span>
                    <input className="form-control" type="password" placeholder="密码"
                           onChange={ e => loginInfo.password = e.target.value}/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={() => props.loginFormClose()}>关闭
                </button>
                <button type="button" className="btn btn-default" onClick={() => props.loginCancel()}
                        disabled={!props.login.loading}>取消
                </button>
                <button type="button" className="btn btn-primary" disabled={props.login.loading}
                        onClick={() => props.loginReq(loginInfo)}><span
                    className={props.login.loading ? "glyphicon glyphicon-asterisk icon-spin" : "glyphicon glyphicon-send"}/> 登陆
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