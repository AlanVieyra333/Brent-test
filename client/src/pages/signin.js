import React from "react";

import { useHistory, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { signin } from "../actions/auth";

import { Space, Row, Col, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography

const SignIn = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const onFinish = (values) => {
        const { username, password } = values;

        dispatch(signin(username, password, history));
    };

    return (
        <Row>
            <Col xs={2} sm={6} md={8} lg={9} />
            <Col xs={20} sm={12} md={8} lg={6}>
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                    <Title level={3}>Sign In</Title>
                    <Text type="danger">{auth.signinError}</Text>
                </Space>
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={auth.waiting}
                            style={{ width: '100%' }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    Do not have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Col>
        </Row>
    )
}

export default SignIn;