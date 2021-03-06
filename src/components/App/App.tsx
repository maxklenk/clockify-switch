import React from 'react';
import './App.css';
import Workspace from "../Workspace/Workspace";
import EnterApiKey from "../EnterApiKey/EnterApiKey";
import {ClockifyWorkspace, getWorkspaces, setApiToken} from "../../services/Clockify";

type AppProps = {}
type AppState = {
    workspaces: Array<ClockifyWorkspace>;
    apiToken: string | null;
}

class App extends React.Component<AppProps, AppState> {
    interval: NodeJS.Timeout | undefined;
    state = {
        workspaces: [],
        apiToken: localStorage.getItem('ClockifyApiToken'),
    };

    componentDidMount() {
        if (this.state.apiToken) {
            this.onEnterApiKey(this.state.apiToken);
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    onEnterApiKey(token: string) {
        setApiToken(token)
            .then(() => {
                localStorage.setItem('ClockifyApiToken', token);
                this.setState({
                    apiToken: token,
                });
                this.loadWorkspaces();
                this.interval = setInterval(() => this.loadWorkspaces(), 10 * 60 * 1000);
            })
            .catch(() => {
            });
    }

    loadWorkspaces() {
        return getWorkspaces()
            .then((workspaces) => {
                this.setState({workspaces: workspaces});
                return workspaces;
            });
    }

    logout() {
        localStorage.removeItem('ClockifyApiToken');
        window.location.reload();
    }

    renderSpaces() {
        return this.state.workspaces.map((workspace: ClockifyWorkspace) => {
            return <Workspace key={workspace.id} workspace={workspace}/>
        });
    }

    render() {
        const logout = <button className="App-logout" onClick={this.logout}>Logout</button>;

        const input = (
            <EnterApiKey onEnter={(token: string) => this.onEnterApiKey(token)}/>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Clockify Switch</h1>

                    {this.state.apiToken && this.renderSpaces()}
                    {this.state.apiToken && logout}
                    {!this.state.apiToken && input}
                </header>
            </div>
        );
    }
}

export default App;
