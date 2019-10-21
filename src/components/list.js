import React, { Component } from 'react';
import '../css/common.css';

class List extends Component {
    
    render() {
        let displayreponames;
        if (this.props.repose.length > 0 && this.props.status === 200) {
            // To display repositories of particular user 
            displayreponames = this.props.repose.map((repo) =>
                <div id="list" key={repo.id}>
                    <ul key={repo.id}>{repo.name}</ul>
                </div>   
            )
        } 
        return(
            <React.Fragment>
                {displayreponames}
            </React.Fragment>
        )
    }
}

export default List;