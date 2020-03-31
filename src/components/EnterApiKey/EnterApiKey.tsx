import React from 'react';
import "./EnterApiKey.css";

type EnterApiKeyProps = {
    onEnter: Function;
}
type EnterApiKeyState = {
    value: string;
}

class EnterApiKey extends React.Component<EnterApiKeyProps, EnterApiKeyState> {
    constructor(props: EnterApiKeyProps) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onEnter(this.state.value);
    }

    render() {
        return (
            <form className={"EnterApiKey"} onSubmit={(event) => this.handleSubmit(event)}>
                <label>
                    <p>Please enter your Clockify API Key:</p>
                    <input type="text" value={this.state.value} onChange={(event) => this.handleChange(event)} placeholder={"API Key"}/>
                    <p className={"right"}><a target="_blank" rel="noopener noreferrer" href="https://clockify.me/user/settings">Get it here.</a></p>
                </label>
                <input className={"submit"} type="submit" value="Submit"/>
            </form>
        );
    }
}

export default EnterApiKey;
