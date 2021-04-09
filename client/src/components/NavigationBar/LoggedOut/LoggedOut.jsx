import React from 'react'
import { Button, Space } from 'antd'
import { NavLink } from 'react-router-dom'

const LoggedOut = () => {
    return (
        <div className="NavigationBar">
            <Space>
                <Button type="primary">
                    <NavLink to="/login">Log in</NavLink>
                </Button>
                <Button type="primary">
                    <NavLink to="/register">Register</NavLink>
                </Button>
            </Space>
        </div>
    )
}

export default LoggedOut