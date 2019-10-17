import React, { Component } from 'react';
import '../css/common.css';

class Input extends Component {
    render() {
        return(
            <div id="border">
                <input type="text" placeholder="Enter Git username" />
                <button type="submit" id="button_go">Go</button>
                <button id="button_clear">Clear</button>

                <input type="text" placeholder="Enter some keywords to filter Eg: algo" />
                <button type="submit" id="button_clear">Clear</button>
            </div>
        )
    }
}

export default Input;