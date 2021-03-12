import { useHistory, Route, Switch } from "react-router-dom";

import { Layout, Button } from 'antd'

import { useDispatch } from "react-redux";

import Dashboard from "../components/dashboard";
import CreateProfile from '../components/create-profile'

import { signout } from "../actions/auth";

const { Header, Content } = Layout

const Data = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signout(history));
    }

    return (
        <Layout>
            <Header>
                <div
                    style={{ width: '100%', display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                    <Button
                        type="primary"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Button>
                </div>
            </Header>
            <Content>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/create-profile" component={CreateProfile} />
                </Switch>
            </Content>
        </Layout>
    )
}

export default Data