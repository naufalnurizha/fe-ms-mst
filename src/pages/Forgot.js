import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Page from 'components/Page';
import basicAuthAPI from 'utils/axios/basicAuthAPI';

class Forgot extends Component {

    componentDidMount() {
    }

    render() {
        const onFinish = async (values) => {
            console.log('Received values of form: ', values);
            await basicAuthAPI({
                method: 'POST',
                url: 'http://localhost:3001' + '/v1/oauth2/otp',
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                data: {
                    email: values.email,
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
                <h5>Forgot Password</h5>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
                <a href="/confirm">Click to change password!</a>
            </Page >
        );
    }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Forgot);