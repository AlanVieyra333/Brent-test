import React from "react";

import { useHistory, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { signup } from "../actions/auth";

import { Space, Row, Col, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography

const SignUp = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const onFinish = (values) => {
    const { username, email, password } = values;
    dispatch(signup(username, email, password, history));
  };

  return (
    <Row>
      <Col xs={2} sm={6} md={8} lg={9} />
      <Col xs={20} sm={12} md={8} lg={6}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3} style={{ width: '100%', textAlign: 'center' }}>Sign Up</Title>
          <Text type="danger">{auth.signupError}</Text>
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "This field is required" },
                { type: "email", message: "Wrong email format" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "This field is required" },
                () => ({
                  validator(rule, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{8,}$/;
                    if (regex.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Min 8 symbols, 1 special charactor, 1 number, 1 capital letter"
                    );
                  },
                }),
              ]}
              hasFeedback
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
                Create account
              </Button>
            </Form.Item>
          </Form>
          <div>
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default SignUp;
