import React from 'react';
import './App.css';
import Workspace from "../Workspace/Workspace";
import EnterApiKey from "../EnterApiKey/EnterApiKey";
import {getWorkspaces, setApiToken} from "../Clockify";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workspaces: [],
      apiToken: localStorage.getItem('ClockifyApiToken'),
    };
  }

  componentDidMount() {
    if (this.state.apiToken) {
      this.onEnterApiKey(this.state.apiToken);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onEnterApiKey(token) {
    setApiToken(token)
      .then(() => {
        localStorage.setItem('ClockifyApiToken', token);
        this.setState({
          apiToken: token,
        });
        this.loadWorkspaces();
        this.interval = setInterval(() => this.loadWorkspaces(), 10*60*1000);
      })
      .catch(() => {});
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
    return this.state.workspaces.map((workspace) => {
      return <Workspace key={workspace.id} workspace={workspace} />
    });
  }

  render() {
    const logout = <button className="App-logout" onClick={this.logout}>Logout</button>;

    const input = (
      <EnterApiKey onEnter={(token) => this.onEnterApiKey(token)}/>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Clockify Switch</h1>

          {this.state.apiToken ? [this.renderSpaces(), logout] : input}
        </header>
      </div>
    );
  }
}

export default App;
