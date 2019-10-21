import React, { Component } from 'react';
import Input from './input';
import List from './list';
import {userRepoService} from '../service';
import '../css/common.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmprepose: [],
            repose: [],
            status: 0,
            isClear: false,
            invaliduser: false,
            userfieldemptycheck: false
        }
        this.getUserRepos = this.getUserRepos.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
    }

    filterResults = query => {
        let filterresult = this.state.tmprepose
        filterresult = filterresult.filter(function(item){
            return item.name.toLowerCase().search(
              query.toLowerCase()) !== -1;
          });
        this.setState({
            repose: filterresult
        })
    }

    onClickClear = (eventname) => {
        let clearlist = []
        if(eventname === "user_clear") {
            clearlist = [];
        } else if(eventname === "filter_clear") {
            clearlist = this.state.tmprepose;
        }

        this.setState({
            tmprepose: clearlist,
            repose: clearlist,
            invaliduser: false,
            isClear: true,
            userfieldemptycheck: false
        })
    }

    getUserRepos = (username) => {
        if(username === "") {
            this.setState({
                userfieldemptycheck: true,
                invaliduser: false,
                repose: [],
                tmprepose: [],
                status: 200,
                isClear: false
            })
        } else {
            userRepoService(username).then((response) => {
                if(response.data.length === 0) {
                    this.setState({
                        invaliduser: true,
                        repose: response.data,
                        tmprepose: response.data,
                        status: response.status,
                        isClear: false,
                        userfieldemptycheck: false,
                    })
                } else {
                    this.setState({
                        repose: response.data,
                        tmprepose: response.data,
                        status: response.status,
                        isClear: false,
                        invaliduser: false,
                        userfieldemptycheck: false,
                    })
                } 
            })
        }
    }            

    render() {
        const { repose, status, error, invaliduser, userfieldemptycheck } = this.state;
    
        return(
            <React.Fragment>
                <Input 
                    getUserRepos={this.getUserRepos} 
                    filterResults={this.filterResults} 
                    error={error} 
                    onClickClear={this.onClickClear} 
                    invalidUser={invaliduser} 
                    userfieldemptycheck={userfieldemptycheck}
                />
                <List repose={repose} status={status} />
            </React.Fragment>
        )
    }
}

export default Main;