import React from 'react'
import { connect } from 'react-redux'
import LoggedIn from './LoggedIn/LoggedIn'
import LoggedOut from './LoggedOut/LoggedOut'

const NavigationBar = props => {
    if (props.authToken) {
        return <LoggedIn />
    } else {
        return <LoggedOut />
    }
}

const mapStateToProps = state => {
    return ({
        authToken: state.root.authToken
    })
}

export default connect(mapStateToProps, null)(NavigationBar) 