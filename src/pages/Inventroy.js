import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Navigation from '../components/navigation'

export default class InventroyPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <>
                <Navigation props={this.props} />
                
                <div className='container-fluid'>
                    <div className='row'>
                        <h3> Inventory Lists </h3>
                    </div>
                </div>
            </>
        )
    }
}

