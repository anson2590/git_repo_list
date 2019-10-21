import React, { Component } from 'react';
import '../css/common.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            search: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmitGetUsername = this.onSubmitGetUsername.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmitGetUsername = () => {
        this.setState({
            search: ""
        })
        this.props.getUserRepos(this.state.username);
    }

    onChangeGetValues = e => {
        this.setState({
            search: e.target.value
        })
        this.props.filterResults(e.target.value);
    }

    onClickClear = event_name => {
        if (event_name === "user_clear") {
            this.setState({
                username: '',
                search: ''
            })
            this.props.onClickClear("user_clear")
        } else if(event_name === "filter_clear") {
            this.setState({
                search: ''
            })
            this.props.onClickClear("filter_clear")
        }
    }

    render() {
        let isError;
        if(this.props.invalidUser === true) {
            isError = <p id="error">Entered user is not a git user</p>
        }
        if(this.props.userfieldemptycheck === true) {
            isError = <p id="error">Please enter git user</p>
        }
        return(
            <div id="content">
                {isError}
                <input type="text" value={this.state.username} onChange={this.onChangeUsername} placeholder="Enter Git username" />
                <button type="submit" id="button_go" onClick={this.onSubmitGetUsername}>Go</button>
                <button type="submit" name="user_clear" id="button_clear" onClick={() => this.onClickClear("user_clear")}>Clear</button>

                <input type="text" value={this.state.search} placeholder="Enter some keywords to filter Eg: algo" onChange={this.onChangeGetValues} />
                <button type="submit" name="filter_clear" id="button_clear" onClick={() => this.onClickClear("filter_clear")}>Clear</button>
            </div>
        )
    }
}

export default Input;