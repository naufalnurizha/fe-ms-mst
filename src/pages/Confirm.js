import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Page from 'components/Page';
import basicAuthAPI from 'utils/axios/basicAuthAPI';

class Confirm extends Component {

    componentDidMount() {
    }

    render() {
        const onFinish = async (values) => {
            console.log('Received values of form: ', values);
            await basicAuthAPI({
                method: 'POST',
                url: 'http://localhost:3001' + '/v1/oauth2/forgot',
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                data: {
                    email: values.email,
                    password: values.password,
                    otp: parseInt(values.otp, 10)
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
                <h5>Change Password</h5>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
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
                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your OTP!',
                            },
                        ]}
                    >
                        <Input placeholder="OTP" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
                <a href="/">Click to login!</a>
            </Page>
        );
    }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Confirm);