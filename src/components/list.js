import React, { Component } from 'react';

class List extends Component {
    
    render() {

        let res;
        res = (
            this.props.repose.map((number) =>
                    <div id="content">
                        <ul>{number.name}</ul>
                    </div>
                )
        )

        return(
            <React.Fragment>
                
            </React.Fragment>
        )
    }
}

export default List;