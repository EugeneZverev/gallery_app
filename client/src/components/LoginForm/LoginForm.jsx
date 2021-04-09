import React from 'react'
import { Form, Input, Button } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { connect, useDispatch } from 'react-redux'
import { makeLogin } from './../../redux/actions'
import './LoginForm.css'

const LoginForm = props => {
    const dispatch = useDispatch()
    const onFinish = values => dispatch(makeLogin(values.email, values.password))

    if (!props.authToken) {
        return (
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        type="email"
                        placeholder="E-mail"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: `'password' must be between 8 and 15 characters`,
                            min: 8,
                            max: 15,
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                </Button>
                </Form.Item>
            </Form>
        )
    }

    return <div>You are already logged in</div>
}

const mapStateToProps = state => ({
    authToken: state.root.authToken
})

export default connect(mapStateToProps, null)(LoginForm)