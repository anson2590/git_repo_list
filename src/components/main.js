import React, { Component } from 'react';
import axios from 'axios';
import Input from './input';
import '../css/common.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmprepose: [],
            repose: [],
            status: 0,
            isClear: false
        }
        this.getUserRepos = this.getUserRepos.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
    }

    filterResults = query => {
        let r = this.state.tmprepose

        r = r.filter(function(item){
            return item.name.toLowerCase().search(
              query.toLowerCase()) !== -1;
          });
        this.setState({
            repose: r
        })
    }

    onClickClear = (eventname) => {
        let tmp = []
        if(eventname === "user_clear") {
            tmp = [];
        } else if(eventname === "filter_clear") {
            tmp = this.state.tmprepose;
        }

        this.setState({
            tmprepose: tmp,
            repose: tmp,
            isClear: true
        })
    }

    getUserRepos = (username) => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/vnd.github.v3+json',
            }
          };

        axios(`https://api.github.com/users/${username}/repos`, axiosConfig)
            .then(response => {
                this.setState({
                    repose: response.data,
                    tmprepose: response.data,
                    status: response.status,
                    isClear: false
                })
            })
    }

    render() {
        let res = [];
        let invaliduser = false;
        if (this.state.repose.length > 0 && this.state.status === 200) {
            res = this.state.repose.map((number) =>
            <div id="content">
                <ul>{number.name}</ul>
            </div>
            );
        } 

        if (this.state.repose.length === 0 && this.state.status === 200 && this.state.isClear === false) {
            invaliduser = true
        }

        return(
            <React.Fragment>
                <Input getUserRepos={this.getUserRepos} filterResults={this.filterResults} error={this.state.error} onClickClear={this.onClickClear} invalidUser={invaliduser} />
                {res}
            </React.Fragment>
        )
    }
}

export default Main;