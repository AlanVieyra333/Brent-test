import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Space, Row, Col, Spin, Typography } from "antd";

import axios from 'axios'

const { Title } = Typography

const Dashboard = () => {

    const [fetching, setFetching] = useState(false)

    const [profileContent, setProfileContent] = useState(null)

    useEffect(() => {
        setFetching(true)

        axios.get('/api/profile')
            .then(resp => {
                const profile = resp.data

                let content = null
                if (!profile) {
                    content = (
                        <React.Fragment>
                            <Title level={5}>You have not yet setup a profile, please add some info.</Title>
                            <Link to="/create-profile">
                                Create Profile
                            </Link>
                        </React.Fragment>
                    )
                }
                else {
                    content = (
                        <React.Fragment>
                            <Title level={5}>Location: {profile.location}</Title>
                            <Title level={5}>Bio: {profile.bio}</Title>
                            <Title level={5}>Github User Name: {profile.githubusername}</Title>
                        </React.Fragment>
                    )
                }

                setProfileContent(content)
                setFetching(false)
            }).catch(error => {
                console.log(error)
                setFetching(false)
            })
    }, [])

    return (
        <Row>
            <Col xs={2} sm={4} md={6} lg={8} />
            <Col xs={20} sm={16} md={12} lg={8}>
                <Title level={3}>Dashboard</Title>
                <Space direction="vertical">

                    {fetching ?
                        <Spin size="large" /> :
                        profileContent
                    }
                </Space>
            </Col>
        </Row>
    )
}

export default Dashboard;