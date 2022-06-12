import {
    Form,
    Input,
    Upload,
    Button,
    Result,
    Modal
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { Redirect } from 'react-router-dom'
// import Modal from 'components/Modal';
import basicAuthAPI from 'utils/axios/basicAuthAPI';
import axios from 'axios';

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
};

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
};

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalVisible: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    componentDidMount() {
    }

    render() {
        const onFinish = async (values) => {
            console.log('Received values of form: ', values);
            const formData = new FormData();
            formData.append('upfile', values.upload[0].originFileObj);
            // console.log(event.target.files[0]);
            axios({
                method: 'POST',
                url: 'http://localhost:3001' + '/upload?type=user',
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
                data: formData
            }).then(async (res) => {
                console.log('apani', res);
                await basicAuthAPI({
                    method: 'POST',
                    url: 'http://localhost:3001' + '/v1/user/register',
                    config: {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    data: {
                        data: {
                            username: values.username,
                            password: values.username,
                            fullName: values.fullname,
                            email: values.email,
                            photo: res.data.targetFileName
                        }
                    }
                }).then((resp) => {
                    const { data } = resp;
                    console.log(data);
                    if (data.message) {
                        window.alert('register berhasil silahkan cek email')
                        setTimeout(() => window.location.reload(), 300);
                    }
                })
            })

        };

        const normFile = (e) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }

            return e?.fileList;
        };
        return (
            <Page>
                <h5>Register User</h5>
                <Form
                    {...formItemLayout}
                    // form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="fullname"
                        label="Fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
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
                    </Form.Item> */}
                    <Form.Item
                        name="upload"
                        label="Upload Photo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="logo" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <a href="/">Click to Login!</a>
            </Page>
        );
    }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Register);