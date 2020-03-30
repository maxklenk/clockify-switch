import React from 'react';
import "./EnterApiKey.css";

class EnterApiKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onEnter(this.state.value);
  }

  render() {
    return (
      <form className={"EnterApiKey"} onSubmit={this.handleSubmit}>
        <label>
          <p>Please enter your Clockify API Key:</p>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={"API Key"} />
          <p className={"right"}><a target="_blank" rel="noopener noreferrer" href="https://clockify.me/user/settings">Get it here.</a></p>
        </label>
        <input className={"submit"} type="submit" value="Submit" />
      </form>
    );
  }
}

export default EnterApiKey;
