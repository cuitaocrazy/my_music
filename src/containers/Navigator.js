/**
 * Created by cuitao on 2016/12/30.
 */

import React from 'react'
import {connect} from 'react-redux'
import {loginFormOpen, logout} from '../actions'

export default connect(s => ({user: s.user}), {loginFormOpen, logout})(function (props) {
    return <div>
        <div className="pull-right">
            {props.user.loggedIn ?
                <span>{props.user.username} <a onClick={() => props.logout()}>注销</a></span> :
                <a onClick={() => props.loginFormOpen()} href="#">登陆</a>}
        </div>
    </div>
})
