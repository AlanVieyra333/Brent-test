import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Space, Row, Col, Form, Input, Button, Typography } from "antd";

import axios from 'axios'

const { Title } = Typography

const CreateProfile = () => {

    const history = useHistory();

    const [creating, setCreating] = useState(false)

    const onFinish = (values) => {

        setCreating(true)
        const { location, bio, githubusername } = values;
        axios.post("/api/profile", { location, bio, githubusername })
            .then(() => {
                history.push("/dashboard")
            }).catch(error => {
                console.log(error)
                setCreating(false)
            })
    };

    return (
        <Row>
            <Col xs={2} sm={4} md={6} lg={8} />
            <Col xs={20} sm={16} md={12} lg={8}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Title level={4} style={{ width: '100%', textAlign: 'center' }}>Create Profile</Title>
                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="location"
                            rules={[{ required: true, message: "This field is required" }]}
                        >
                            <Input
                                placeholder="Location"
                            />
                        </Form.Item>
                        <Form.Item
                            name="bio"
                            rules={[{ required: true, message: "This field is required" }]}
                        >
                            <Input
                                placeholder="Short Bio"
                            />
                        </Form.Item>
                        <Form.Item
                            name="githubusername"
                            rules={[{ required: true, message: "This field is required" }]}
                        >
                            <Input
                                placeholder="Github User Name"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={creating}
                                style={{ width: '100%' }}
                            >
                                Create Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Col>
        </Row>
    )
}

export default CreateProfile;