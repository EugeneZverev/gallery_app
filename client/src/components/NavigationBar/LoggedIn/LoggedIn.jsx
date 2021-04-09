import React from 'react'
import { Button, Space } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeLogout } from '../../../redux/actions'

const logoutHandler = (authToken, dispatchLogout) => {
    return () => {
        if (authToken) dispatchLogout()
    }
}

const LoggedIn = props => {
    return (
        <div className="NavigationBar">
            <Space>
                <Button type="primary">
                    <NavLink to="/gallery">Gallery</NavLink>
                </Button>
                <Button type="primary" onClick={logoutHandler(props.authToken, props.makeLogout)}>Log out</Button>
            </Space>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.root.authToken,
    }
}
const mapDispatchToProps = {
    makeLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn) 