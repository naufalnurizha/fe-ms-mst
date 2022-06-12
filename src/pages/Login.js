import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Page from 'components/Page';
import basicAuthAPI from 'utils/axios/basicAuthAPI';

class Login extends Component {

    componentDidMount() {
    }

    render() {
        const onFinish = async (values) => {
            console.log('Received values of form: ', values);
            await basicAuthAPI({
                method: 'POST',
                url: 'http://localhost:3001' + '/v1/oauth2/token',
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                data: {
                    grant_type: 'password',
                    username: values.username,
                    password: values.password,
                    scope: 'user offline_access'
                }
            }).then((resp) => {
                const { data } = resp;
                console.log(data);
                if (data.status === "success") {
                    window.alert('Silahkan cek email anda')
                    setTimeout(() => window.location.reload(), 300);
                }
            })
        };
        return (
            <Page>
                <h5>Login</h5>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
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
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/forgot">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </Page>
        );
    }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Login);