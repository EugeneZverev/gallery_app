import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { makeRegister, makeLogin } from './../../redux/actions'
import './RegisterForm.css'

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

const RegisterForm = props => {
    const [form] = Form.useForm()

    const dispatch = useDispatch()
    const onFinish = values => {
        dispatch(makeRegister(values.email, values.password)).then(result => {
            if (result.responseText.includes('user')) dispatch(makeLogin(values.email, values.password))
            else message.error(result.responseText)
        })
    }

    if (!props.authToken) {
        return (
            <Form
                {...formItemLayout}
                form={form}
                className="register-form"
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    tooltip="'password' must be between 8 and 15 characters"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                            min: 8,
                            max: 15,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    return <div>You are already logged in</div>
}

const mapStateToProps = state => ({
    authToken: state.root.authToken,
    registerResponse: state.root.registerResponse
})

export default connect(mapStateToProps, null)(RegisterForm)