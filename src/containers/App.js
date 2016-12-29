/**
 * Created by cuitao on 2016/12/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import {loginFormOpen} from '../actions'

module.exports = connect(undefined, {loginFormOpen})(function (props) {
    return <div>
        <a className="btn btn-success" onClick={e => props.loginFormOpen()}>show</a>
        <span className="glyphicon glyphicon-asterisk icon-spin" />
        <Login/>
    </div>
})