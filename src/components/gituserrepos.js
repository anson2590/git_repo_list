import React, { Component } from 'react';
import Input from './input';
import List from './list';
import {userRepoService} from '../service';
import '../css/common.css';

class GitUserRepos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allrepose: [], // allrepose stores repositories of user, this state variable wont be modifield
            repose: [], // repose stores user repositories, this will be modified as user filter happens
            status: 0,
            isClear: false,
            invaliduser: false,
            userfieldemptycheck: false
        }
        this.getUserRepos = this.getUserRepos.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
    }

    // To filter repositories based on string entered in search field
    filterResults = query => {
        let filterresult = this.state.allrepose
        filterresult = filterresult.filter(function(item){
            return item.name.toLowerCase().search(
              query.toLowerCase()) !== -1;
          });
        this.setState({
            repose: filterresult
        })
    }

    // To clear search repositories textbox or user textbox based on clear button triggered
    onClickClear = (eventname) => {
        let clearlist = []
        if(eventname === "user_clear") {
            clearlist = []; // to clear user textbox
        } else if(eventname === "filter_clear") {
            clearlist = this.state.allrepose; // to clear search repositories textbox
        }

        this.setState({
            allrepose: clearlist,
            repose: clearlist,
            invaliduser: false,
            isClear: true,
            userfieldemptycheck: false
        })
    }

    // This method does api call to get repositories of particular user entered.
    getUserRepos = (username) => {
        if(username === '') {
            this.setState({
                userfieldemptycheck: true,
                invaliduser: false,
                repose: [],
                allrepose: [],
                status: 200,
                isClear: false
            })
        } else {
            userRepoService(username).then((response) => {
                if(response.data.length === 0) {
                    this.setState({
                        invaliduser: true,
                        repose: response.data,
                        allrepose: response.data,
                        status: response.status,
                        isClear: false,
                        userfieldemptycheck: false,
                    })
                } else {
                    this.setState({
                        repose: response.data,
                        allrepose: response.data,
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

export default GitUserRepos;